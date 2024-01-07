use crate::libs::db::establish_connection;
use chrono::Local;
use entity::{prelude::Users, users};
use sea_orm::{ActiveModelTrait, EntityTrait, Set};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

pub async fn get() -> Result<Option<users::Model>> {
    let db = establish_connection().await?;
    let result = Users::find().one(&db).await?;

    Ok(result)
}

pub async fn create(email: String, password: String) -> Result<users::Model> {
    let db = establish_connection().await?;

    let user = users::ActiveModel {
        email: Set(email),
        password: Set(password),
        created_at: Set(Some(Local::now().to_rfc3339())),
        updated_at: Set(Some(Local::now().to_rfc3339())),
        ..Default::default()
    };

    let result = user.insert(&db).await?;

    Ok(result)
}
