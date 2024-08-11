use actix_web::{web, HttpResponse, Responder};

pub fn user_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(user_info);
}

#[actix_web::get("/user_info")]
async fn user_info() -> Result<impl Responder, actix_web::Error> {
    Ok(HttpResponse::Ok().json("User Info !"))
}
