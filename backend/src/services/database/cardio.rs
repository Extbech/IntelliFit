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

impl Into<String> for WorkoutType {
    fn into(self) -> String {
        match self {
            WorkoutType::Running => "Running".to_string(),
            WorkoutType::Cycling => "Cycling".to_string(),
            WorkoutType::Swimming => "Swimming".to_string(),
            WorkoutType::Rowing => "Rowing".to_string(),
            WorkoutType::Elliptical => "Elliptical".to_string(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct CardioWorkoutResponse {
    pub id: i32,
    pub workout_type: WorkoutType,
    pub distance: f64, // in meters
    pub duration: f64, // in seconds
    pub date: String,  // TODO
}

#[derive(Serialize, Deserialize)]
pub struct CardioWorkoutRequest {
    pub workout_type: WorkoutType,
    pub distance: f64, // in meters
    pub duration: f64, // in seconds
    pub date: String,  // TODO
}

pub async fn init_cardio_table(conn: &Connection) {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS cardio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            distance REAL NOT NULL,
            duration REAL NOT NULL,
            date DATE NOT NULL
        )",
        (),
    )
    .await
    .expect("Error creating Cardio table.");

    println!("Cardio table is ready.");
}

pub async fn get_all_workouts(
    conn: &Connection,
) -> Result<Vec<CardioWorkoutResponse>, Box<dyn std::error::Error>> {
    let mut stmt = conn
        .prepare("SELECT id, type, distance, duration, date FROM cardio")
        .await
        .expect("Error preparing query!");

    let mut rows = stmt.query(()).await?;

    let mut workouts = Vec::new();

    while let Some(row) = rows.next().await? {
        let id: i32 = row.get(0)?;
        let workout_type_str: String = row.get(1)?;
        let distance: f64 = row.get(2)?;
        let duration: f64 = row.get(3)?;
        let date: String = row.get(4)?;

        let workout_type = workout_type_str.into();

        workouts.push(CardioWorkoutResponse {
            id,
            workout_type,
            distance,
            duration,
            date,
        });
    }
    Ok(workouts)
}

pub async fn add_workout(
    conn: &Connection,
    workout: CardioWorkoutRequest,
) -> Result<CardioWorkoutResponse, Box<dyn std::error::Error>> {
    let workout_type_str: String = workout.workout_type.into();
    let mut stmt = conn
        .prepare(
            "INSERT INTO cardio (type, distance, duration, date) VALUES (?, ?, ?, ?) RETURNING *",
        )
        .await
        .expect("Error preparing cardio workout post statement");

    let mut rows = stmt
        .query((
            workout_type_str,
            workout.distance,
            workout.duration,
            workout.date,
        ))
        .await
        .expect("Error executing cardio workout post statement");

    let row = rows.next().await?.expect("Error fetching inserted workout");

    Ok(CardioWorkoutResponse {
        id: row.get(0)?,
        workout_type: row.get::<String>(1)?.into(),
        distance: row.get(2)?,
        duration: row.get(3)?,
        date: row.get(4)?,
    })
}

pub async fn delete_workout(
    conn: &Connection,
    workout_id: i32,
) -> Result<(), Box<dyn std::error::Error>> {
    let mut stmt = conn
        .prepare("DELETE FROM cardio WHERE id = ?")
        .await
        .expect("Error preparing delete statement");

    stmt.execute((workout_id,))
        .await
        .expect("Error executing delete statement");

    Ok(())
}
