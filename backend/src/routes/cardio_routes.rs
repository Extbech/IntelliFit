use actix_web::web::{self, Json};
use turso::Connection;

use crate::services::database::cardio::{get_all_workouts, Workout};

pub fn cardio_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(workouts);
}

#[actix_web::get("/workouts")]
async fn workouts(conn: web::Data<Connection>) -> Result<Json<Vec<Workout>>, actix_web::Error> {
    if let Ok(workouts) = get_all_workouts(&conn).await {
        Ok(web::Json(workouts))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to retrieve workouts",
        ))
    }
}
