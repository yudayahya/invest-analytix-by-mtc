use entity::users::Model;

use crate::{
    libs::response::{error, success, ErrorResponse, SuccessResponse},
    models::user::{CreateUserReq, UserRes},
    repositories::user,
};

#[tauri::command]
pub async fn sign_in(data: CreateUserReq) -> Result<SuccessResponse<UserRes>, ErrorResponse> {
    let user = user::get().await;

    match user {
        Ok(user) => match user {
            Some(user) => verify_user(user, data.email, data.password).await,
            None => create_new_user(data).await,
        },
        Err(_e) => Err(error("cannot get user".to_owned())),
    }
}

async fn verify_user(
    user: Model,
    email: String,
    password: String,
) -> Result<SuccessResponse<UserRes>, ErrorResponse> {
    if user.email == email {
        let is_verified = bcrypt::verify(password, &user.password);
        let data = UserRes {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
        };

        match is_verified {
            Ok(result) => {
                if result {
                    Ok(success("success".to_owned(), data))
                } else {
                    Err(error("not verified".to_owned()))
                }
            }
            Err(_e) => Err(error("not verified".to_owned())),
        }
    } else {
        Err(error("user not found".to_owned()))
    }
}

async fn create_new_user(data: CreateUserReq) -> Result<SuccessResponse<UserRes>, ErrorResponse> {
    let password = bcrypt::hash(data.password, 4).unwrap();
    let new_user = user::create(data.email, password).await;

    match new_user {
        Ok(result) => Ok(success(
            "success".to_owned(),
            UserRes {
                id: result.id,
                email: result.email,
                created_at: result.created_at,
            },
        )),
        Err(_e) => Err(error("cannot create new user".to_owned())),
    }
}
