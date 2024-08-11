use actix_web::{web, Responder};

pub fn strength_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(workout);
}

#[actix_web::get("/workout")]
async fn workout() -> impl Responder {
    format!("Strength Workout Info !")
}
