use actix_web::{
    web::{self, Json},
    HttpResponse,
};
use turso::Connection;

use crate::services::database::weight::{add_weight_entry, get_all_weight_entries, WeightEntry};

pub fn weight_scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_weight_entries).service(post_weight_entry);
}

#[actix_web::get("/entries")]
async fn get_weight_entries(
    conn: web::Data<Connection>,
) -> Result<Json<Vec<WeightEntry>>, actix_web::Error> {
    if let Ok(entries) = get_all_weight_entries(&conn).await {
        Ok(web::Json(entries))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to retrieve weight entries",
        ))
    }
}

#[actix_web::post("/entries")]
async fn post_weight_entry(
    conn: web::Data<Connection>,
    entry: Json<WeightEntry>,
) -> Result<HttpResponse, actix_web::Error> {
    if let Ok(()) = add_weight_entry(&conn, entry.into_inner()).await {
        Ok(HttpResponse::Ok().json(()))
    } else {
        Err(actix_web::error::ErrorInternalServerError(
            "Failed to add weight entry",
        ))
    }
}
