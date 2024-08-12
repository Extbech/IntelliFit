// MODS
mod cardio;
mod routes;
mod strength;

// LOCAL IMPORTS
use routes::{cardio_routes, strength_routes, user_routes};

// THIRD PARTY CRATE IMPORTS
use actix_cors::Cors;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server on https://127.0.0.1:8080");
    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new().wrap(cors).service(
            web::scope("/api")
                .service(web::scope("/user").configure(user_routes::user_scope_config))
                .service(web::scope("/cardio").configure(cardio_routes::cardio_scope_config))
                .service(web::scope("/strength").configure(strength_routes::strength_scope_config)),
        )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
