use serde::{Deserialize, Serialize};
use turso::Connection;

#[derive(Serialize, Deserialize)]
pub struct WeightEntry {
    pub date: String, // TODO
    pub weight: f64,  // in kg
}

pub async fn init_weight_table(conn: &Connection) {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS weight (
            date DATE PRIMARY KEY NOT NULL,
            weight REAL NOT NULL
        )",
        (),
    )
    .await
    .expect("Failed to create weight table");

    println!("Weight table initialized");
}

pub async fn seed_weight_data(conn: &Connection) {
    let mut entries = Vec::new();
    let today = chrono::Local::now().naive_local();
    for i in 1..1000 {
        let date = (today - chrono::Duration::days(i)).to_string();
        let weight = 75.0 + 10.0 * f64::sin(i as f64 / 300.0).abs(); // Sample weight data
        entries.push(WeightEntry { date, weight });
    }

    for entry in entries {
        add_weight_entry(conn, entry).await.unwrap();
    }

    println!("Sample weight data seeded");
}

pub async fn get_all_weight_entries(
    conn: &Connection,
) -> Result<Vec<WeightEntry>, Box<dyn std::error::Error>> {
    let mut stmt = conn
        .prepare("SELECT date, weight FROM weight ORDER BY date ASC")
        .await
        .expect("Failed to prepare statement");

    let mut rows = stmt.query(()).await.expect("Failed to execute query");

    let mut entries = Vec::new();
    while let Some(row) = rows.next().await? {
        let date: String = row.get(0)?;
        let weight: f64 = row.get(1)?;
        entries.push(WeightEntry { date, weight });
    }
    Ok(entries)
}

pub async fn add_weight_entry(
    conn: &Connection,
    entry: WeightEntry,
) -> Result<(), Box<dyn std::error::Error>> {
    conn.execute(
        "INSERT INTO weight (date, weight) VALUES (?, ?)
         ON CONFLICT(date) DO UPDATE SET weight = excluded.weight",
        (entry.date, entry.weight),
    )
    .await
    .expect("Failed to insert/update weight entry");

    Ok(())
}
