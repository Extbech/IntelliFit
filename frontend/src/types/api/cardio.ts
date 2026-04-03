export enum WorkoutType {
    Running = "Running",
    Cycling = "Cycling",
    Swimming = "Swimming",
    Rowing = "Rowing",
    Elliptical = "Elliptical",
}

export interface CardioWorkoutResponse {
    id: number;
    workout_type: WorkoutType;
    distance: number;
    duration: number;
    date: string; // ISO format date string
}

export interface CardioWorkoutRequest {
    workout_type: WorkoutType;
    distance: number;
    duration: number;
    date: string; // ISO format date string
}