use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SuccessResponse<T> {
    message: String,
    data: T,
}

#[derive(Serialize, Deserialize)]
pub struct ErrorResponse {
    message: String,
}

pub fn success<T>(message: String, data: T) -> SuccessResponse<T> {
    SuccessResponse { message, data }
}

pub fn error(message: String) -> ErrorResponse {
    ErrorResponse { message }
}
