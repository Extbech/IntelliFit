use actix_web::{
    web::{self, Json},
    HttpResponse,
};
use turso::Connection;

use crate::services::database::cardio::{
    add_workout, delete_workout, get_all_workouts, CardioWorkoutRequest, CardioWorkoutResponse,
};

pub fn cardio_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_workouts)
        .service(post_workout)
        .service(remove_workout);
}

#[actix_web::get("/workouts")]
async fn get_workouts(
    conn: web::Data<Connection>,
) -> Result<Json<Vec<CardioWorkoutResponse>>, actix_web::Error> {
    if let Ok(workouts) = get_all_workouts(&conn).await {
        Ok(web::Json(workouts))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to retrieve workouts",
        ))
    }
}

#[actix_web::post("/workouts")]
async fn post_workout(
    conn: web::Data<Connection>,
    workout: Json<CardioWorkoutRequest>,
) -> Result<Json<CardioWorkoutResponse>, actix_web::Error> {
    if let Ok(workout) = add_workout(&conn, workout.into_inner()).await {
        Ok(web::Json(workout))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to add workout",
        ))
    }
}

#[actix_web::delete("/workouts/{id}")]
async fn remove_workout(
    conn: web::Data<Connection>,
    id: web::Path<i32>,
) -> Result<HttpResponse, actix_web::Error> {
    if let Ok(()) = delete_workout(&conn, id.into_inner()).await {
        Ok(HttpResponse::Ok().json(()))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to delete workout",
        ))
    }
}
