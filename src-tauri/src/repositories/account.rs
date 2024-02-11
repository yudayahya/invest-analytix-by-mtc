use crate::{
    libs::db::establish_connection,
    models::account::{AccountIbModel, ReqCreateAccountModel},
};
use chrono::Local;
use entity::{accounts, prelude::Accounts};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, Condition, EntityTrait, QueryFilter, QueryOrder, QuerySelect,
    QueryTrait, Set,
};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

pub async fn get_all() -> Result<Vec<(accounts::Model, Option<accounts::Model>)>> {
    let db = establish_connection().await?;
    let result = Accounts::find()
        .find_also_linked(accounts::SelfReferencingLink)
        .order_by_desc(accounts::Column::Id)
        .apply_if(Some(200), QuerySelect::limit)
        .all(&db)
        .await?;

    Ok(result)
}

pub async fn get_ib_accounts() -> Result<Vec<AccountIbModel>> {
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
        .into_model::<AccountIbModel>()
        .all(&db)
        .await?;

    Ok(result)
}

pub async fn create(data: ReqCreateAccountModel) -> Result<accounts::Model> {
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

pub async fn update(data: ReqCreateAccountModel) -> Result<bool> {
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
        updated_at: Set(Some(Local::now().to_rfc3339())),
        ..Default::default()
    };

    Accounts::update_many()
        .set(account)
        .filter(accounts::Column::Id.eq(data.id.unwrap()))
        .exec(&db)
        .await?;

    Ok(true)
}
