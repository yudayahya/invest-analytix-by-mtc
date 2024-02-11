use entity::accounts;
use sea_orm::FromQueryResult;

#[derive(serde::Deserialize)]
pub struct ReqCreateAccountModel {
    pub full_name: String,
    pub code: String,
    pub gender: Option<String>,
    pub city: Option<String>,
    pub email: String,
    pub email_password: String,
    pub bank: Option<String>,
    pub bank_account_number: String,
    pub internet_bank_account_number: Option<String>,
    pub post: Option<String>,
    pub account_number: String,
    pub account_password: String,
    pub account_ib: Option<i32>,
    pub phone_number: Option<String>,
    pub mac_address: Option<String>,
    pub bonus: Option<f64>,
    pub status: Option<String>,
}

#[derive(serde::Serialize)]
pub struct AccountModel {
    pub id: i32,
    pub full_name: String,
    pub code: String,
    pub gender: Option<String>,
    pub city: Option<String>,
    pub email: String,
    pub email_password: String,
    pub bank: Option<String>,
    pub bank_account_number: String,
    pub internet_bank_account_number: Option<String>,
    pub post: Option<String>,
    pub account_number: String,
    pub account_password: String,
    pub account_ib: Option<i32>,
    pub related_account_ib: Option<accounts::Model>,
    pub phone_number: Option<String>,
    pub mac_address: Option<String>,
    pub bonus: Option<f64>,
    pub status: Option<String>,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

impl From<(accounts::Model, Option<accounts::Model>)> for AccountModel {
    fn from((a, b): (accounts::Model, Option<accounts::Model>)) -> Self {
        AccountModel {
            id: a.id,
            full_name: a.full_name,
            code: a.code,
            gender: a.gender,
            city: a.city,
            email: a.email,
            email_password: a.email_password,
            bank: a.bank,
            bank_account_number: a.bank_account_number,
            internet_bank_account_number: a.internet_bank_account_number,
            post: a.post,
            account_number: a.account_number,
            account_password: a.account_password,
            account_ib: a.account_ib,
            related_account_ib: b,
            phone_number: a.phone_number,
            mac_address: a.mac_address,
            bonus: a.bonus,
            status: a.status,
            created_at: a.created_at,
            updated_at: a.updated_at,
        }
    }
}

#[derive(FromQueryResult, serde::Serialize)]
pub struct AccountIbModel {
    pub id: i32,
    pub full_name: String,
}
