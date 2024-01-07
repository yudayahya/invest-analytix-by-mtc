pub use sea_orm_migration::prelude::*;

mod m20240103_160521_create_table_accounts;
mod m20240103_165333_create_table_users;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20240103_160521_create_table_accounts::Migration),
            Box::new(m20240103_165333_create_table_users::Migration),
        ]
    }
}
