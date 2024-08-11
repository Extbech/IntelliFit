use uuid::Uuid;

pub enum StrengthExercise {}
pub struct StrengthWorkoutSession {
    pub workout_session_id: Uuid,
    pub user_id: Uuid,
    pub work_out_sets: Vec<WorkoutSet>,
}

pub struct WorkoutSet {
    pub workout_set_id: Uuid,
}
