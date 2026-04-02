use serde::{Deserialize, Serialize};
use turso::Connection;

#[derive(Serialize, Deserialize)]
pub enum WorkoutType {
    Running,
    Cycling,
    Swimming,
    Rowing,
    Elliptical,
}

impl From<String> for WorkoutType {
    fn from(s: String) -> Self {
        match s.as_str() {
            "Running" => WorkoutType::Running,
            "Cycling" => WorkoutType::Cycling,
            "Swimming" => WorkoutType::Swimming,
            "Rowing" => WorkoutType::Rowing,
            "Elliptical" => WorkoutType::Elliptical,
            _ => panic!("Unknown workout type: {}", s),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Workout {
    pub id: i32,
    pub workout_type: WorkoutType,
    pub duration: f64, // in seconds
    pub distance: f64, // in meters
}

pub async fn init_cardio_table(conn: &Connection) {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS cardio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            duration REAL NOT NULL,
            distance REAL NOT NULL
        )",
        (),
    )
    .await
    .expect("Error creating Cardio table.");

    println!("Cardio table is ready.");
}
pub async fn get_all_workouts(
    conn: &Connection,
) -> Result<Vec<Workout>, Box<dyn std::error::Error>> {
    println!("Preparing statement for fetching workouts.");

    let mut stmt = conn
        .prepare("SELECT id, type, duration, distance FROM cardio")
        .await
        .expect("Error preparing query!");

    println!("Prepared statement for fetching workouts.");

    let mut rows = stmt.query(()).await?;

    println!("Got rows for fetching workouts.");

    let mut workouts = Vec::new();

    while let Some(row) = rows.next().await? {
        let id: i32 = row.get(0)?;
        let workout_type_str: String = row.get(1)?;
        let duration: f64 = row.get(2)?;
        let distance: f64 = row.get(3)?;

        let workout_type = workout_type_str.into();

        workouts.push(Workout {
            id,
            workout_type,
            duration,
            distance,
        });
    }
    Ok(workouts)
}
