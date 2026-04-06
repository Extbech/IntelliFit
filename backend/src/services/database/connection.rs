use turso::Builder;

use crate::services::database::{
    cardio::init_cardio_table,
    weight::{init_weight_table, seed_weight_data},
};

pub async fn connect() -> turso::Connection {
    let db = Builder::new_local("fit.db")
        .build()
        .await
        .expect("Error building local db!");
    if let Ok(conn) = db.connect() {
        return conn;
    } else {
        panic!("Failed to connect to the database");
    }
}

pub async fn ensure_tables(conn: &turso::Connection) {
    ensure_users_table(conn).await;
    init_weight_table(conn).await;
    seed_weight_data(conn).await;
    init_cardio_table(conn).await;
    ensure_strength_table(conn).await;
}

async fn ensure_users_table(conn: &turso::Connection) {
    let create_users_table = "
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        );
    ";
    conn.execute(create_users_table, ())
        .await
        .expect("Failed to create users table");
}

async fn ensure_strength_table(conn: &turso::Connection) {
    let create_strength_table = "
        CREATE TABLE IF NOT EXISTS strength (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            sets INTEGER NOT NULL,
            reps INTEGER NOT NULL,
            weight REAL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    ";
    conn.execute(create_strength_table, ())
        .await
        .expect("Failed to create strength table");
}
