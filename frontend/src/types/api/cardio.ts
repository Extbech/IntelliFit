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
    /*Distance in kilometers (km)*/
    distance: number;
    /*Duration in seconds (s)*/
    duration: number;
    /*Date in ISO format (YYYY-MM-DD)*/
    date: string;
}

export interface CardioWorkoutRequest {
    workout_type: WorkoutType;
    /*Distance in kilometers (km)*/
    distance: number;
    /*Duration in seconds (s)*/
    duration: number;
    /*Date in ISO format (YYYY-MM-DD)*/
    date: string;
}