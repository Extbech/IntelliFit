use uuid::Uuid;

/// Running modifiers for calories burned.
const RUNNING_MODIFIER: f32 = 1.0;

/// Swimming modifiers for calories burned.
const SWIMMING_MODIFIER: f32 = 1.3;

/// Cycling modifiers for calories burned.
const CYCLING_MODIFIER: f32 = 0.9;

/// Represents the different types of cardio workouts you can do.
pub enum CardioExercise {
    Running,
    Swimming,
    Cycling,
}

/// Represents a Cardio Workout Session.
pub struct WorkoutSession {
    pub user_id: Uuid,
    pub exercise_type: CardioExercise,
    pub duration: f32,
    pub time: f32,
    pub date: String,
}

impl WorkoutSession {
    /// Init a new instance of `WorkoutSession`.
    pub fn new(exercise_type: CardioExercise, duration: f32, time: f32, date: String) -> Self {
        return WorkoutSession {
            user_id: Uuid::new_v4(),
            exercise_type,
            duration,
            time,
            date,
        };
    }
    /// Calculates calories burned from exercise session.
    pub fn calories_burned(self, weight: f32, height: f32) -> f32 {
        match self.exercise_type {
            CardioExercise::Running => RUNNING_MODIFIER * weight * height * self.duration,
            CardioExercise::Swimming => SWIMMING_MODIFIER * weight * height * self.duration,
            CardioExercise::Cycling => CYCLING_MODIFIER * weight * height * self.duration,
        }
    }
}
