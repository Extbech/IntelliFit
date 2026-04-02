// MODS
mod cardio;
mod routes;
mod services;
mod strength;

// LOCAL IMPORTS
use routes::{cardio_routes, diet_routes, strength_routes, user_routes};

// THIRD PARTY CRATE IMPORTS
use actix_cors::Cors;
use actix_web::{web, App, HttpServer};

use crate::services::database::connection::{connect, ensure_tables};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let conn = connect().await;
    ensure_tables(&conn).await;
    println!("Connected to the database successfully! ");

    println!("Starting server on http://127.0.0.1:8000");

    HttpServer::new(move || {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(conn.clone()))
            .service(
                web::scope("/api")
                    .service(web::scope("/user").configure(user_routes::user_scope_config))
                    .service(web::scope("/diet").configure(diet_routes::diet_scope_config))
                    .service(web::scope("/cardio").configure(cardio_routes::cardio_scope_config))
                    .service(
                        web::scope("/strength").configure(strength_routes::strength_scope_config),
                    ),
            )
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
