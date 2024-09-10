use actix_web::{web, HttpResponse, Responder};

pub fn diet_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_meal);
}

#[actix_web::get("/meal")]
async fn get_meal() -> Result<impl Responder, actix_web::Error> {
    Ok(HttpResponse::Ok().json("Diet meals data..."))
}
