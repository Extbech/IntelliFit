export enum WorkoutType {
    Running = "Running",
    Cycling = "Cycling",
    Swimming = "Swimming",
    Rowing = "Rowing",
    Elliptical = "Elliptical",
}

export interface CardioWorkout {
    id: number;
    workout_type: WorkoutType;
    duration_minutes: number;
    distance_km: number;
}