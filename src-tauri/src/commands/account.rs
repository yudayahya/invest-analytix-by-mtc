use entity::accounts;

use crate::{
    libs::response::{error, success, ErrorResponse, SuccessResponse},
    repositories::account,
};

#[tauri::command]
pub async fn get_account() -> Result<SuccessResponse<Vec<accounts::Model>>, ErrorResponse> {
    let result = account::get_all().await;

    match result {
        Ok(res) => Ok(success("success".to_owned(), res)),
        Err(_e) => Err(error("cannot get account".to_owned())),
    }
}

#[tauri::command]
pub async fn get_ib_account(
) -> Result<SuccessResponse<Vec<account::PartialIbAccount>>, ErrorResponse> {
    let result = account::get_ib_accounts().await;

    match result {
        Ok(res) => Ok(success("success".to_owned(), res)),
        Err(_e) => Err(error("cannot get ib account".to_owned())),
    }
}

#[tauri::command]
pub async fn create_account(
    data: account::CreateAccountStruct,
) -> Result<SuccessResponse<accounts::Model>, ErrorResponse> {
    let result = account::create(data).await;

    match result {
        Ok(res) => Ok(success("success".to_owned(), res)),
        Err(_e) => Err(error("cannot create account".to_owned())),
    }
}
