// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod libs;
mod repositories;

#[tokio::main]
async fn main() {
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    tauri::Builder::default()
        .setup(|_app| {
            tokio::task::spawn(async move { libs::db::init() });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::user::sign_in])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
