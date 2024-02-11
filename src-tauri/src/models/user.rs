#[derive(serde::Deserialize)]
pub struct CreateUserReq {
    pub email: String,
    pub password: String,
}

#[derive(serde::Serialize)]
pub struct UserRes {
    pub id: i32,
    pub email: String,
    pub created_at: Option<String>,
}
