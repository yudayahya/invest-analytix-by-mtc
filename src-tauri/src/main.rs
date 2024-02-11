// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod commands;
mod libs;
mod models;
mod repositories;

#[tokio::main]
async fn main() {
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    tauri::Builder::default()
        .setup(|app| {
            tokio::task::spawn(async move {
                libs::db::init()
                    .await
                    .expect("failed while initializing database");
            });

            let window = app.get_window("main").unwrap();
            window.open_devtools();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::user::sign_in,
            commands::account::get_account,
            commands::account::get_ib_account,
            commands::account::create_account,
            commands::account::update_account,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
