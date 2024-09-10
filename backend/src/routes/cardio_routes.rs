use actix_web::{web, Responder};

pub fn cardio_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_workout);
}

#[actix_web::get("/workout")]
async fn get_workout() -> impl Responder {
    format!("workout info !")
}
