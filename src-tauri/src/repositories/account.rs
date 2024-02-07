use crate::libs::db::establish_connection;
use chrono::Local;
use entity::{accounts, prelude::Accounts};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, Condition, EntityTrait, FromQueryResult, QueryFilter,
    QueryOrder, QuerySelect, QueryTrait, Set,
};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

#[derive(serde::Deserialize)]
pub struct CreateAccountStruct {
    full_name: String,
    code: String,
    gender: Option<String>,
    city: Option<String>,
    email: String,
    email_password: String,
    bank: Option<String>,
    bank_account_number: String,
    internet_bank_account_number: Option<String>,
    post: Option<String>,
    account_number: String,
    account_password: String,
    account_ib: Option<i32>,
    phone_number: Option<String>,
    mac_address: Option<String>,
    bonus: Option<f64>,
    status: Option<String>,
}

#[derive(FromQueryResult, serde::Serialize)]
pub struct PartialIbAccount {
    pub id: i32,
    pub full_name: String,
}

pub async fn get_all() -> Result<Vec<accounts::Model>> {
    let db = establish_connection().await?;
    let result = Accounts::find()
        .order_by_desc(accounts::Column::Id)
        .apply_if(Some(200), QuerySelect::limit)
        .all(&db)
        .await?;

    Ok(result)
}

pub async fn get_ib_accounts() -> Result<Vec<PartialIbAccount>> {
    let db = establish_connection().await?;
    let result = Accounts::find()
        .select_only()
        .columns([accounts::Column::Id, accounts::Column::FullName])
        .filter(
            Condition::all()
                .add(accounts::Column::Post.eq(accounts::Post::Ib))
                .add(accounts::Column::Status.is_not_in(vec![accounts::Status::Deactivated])),
        )
        .order_by_desc(accounts::Column::Id)
        .into_model::<PartialIbAccount>()
        .all(&db)
        .await?;

    Ok(result)
}

pub async fn create(data: CreateAccountStruct) -> Result<accounts::Model> {
    let db = establish_connection().await?;

    let account = accounts::ActiveModel {
        full_name: Set(data.full_name),
        code: Set(data.code),
        gender: Set(data.gender),
        city: Set(data.city),
        email: Set(data.email),
        email_password: Set(data.email_password),
        bank: Set(data.bank),
        bank_account_number: Set(data.bank_account_number),
        internet_bank_account_number: Set(data.internet_bank_account_number),
        post: Set(data.post),
        account_number: Set(data.account_number),
        account_password: Set(data.account_password),
        account_ib: Set(data.account_ib),
        phone_number: Set(data.phone_number),
        mac_address: Set(data.mac_address),
        bonus: Set(data.bonus),
        status: Set(data.status),
        created_at: Set(Some(Local::now().to_rfc3339())),
        updated_at: Set(Some(Local::now().to_rfc3339())),
        ..Default::default()
    };

    let result = account.insert(&db).await?;

    Ok(result)
}
