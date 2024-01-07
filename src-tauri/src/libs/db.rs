use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DbConn, DbErr};

pub async fn init() -> Result<(), DbErr> {
    // Apply all pending migrations
    let connection = establish_connection().await?;
    Migrator::up(&connection, None)
        .await
        .expect("failed while running database migrations");

    Ok(())
}

pub async fn establish_connection() -> Result<DbConn, DbErr> {
    let database_url = String::from("sqlite://db.sqlite?mode=rwc");
    let connection = Database::connect(&database_url)
        .await
        .expect("failed while connecting to database");

    Ok(connection)
}
