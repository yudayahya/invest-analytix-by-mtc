use sea_orm_migration::{
    prelude::*,
    sea_orm::{EnumIter, Iterable},
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Accounts::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Accounts::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Accounts::FullName)
                            .string_len(255)
                            .not_null(),
                    )
                    .col(ColumnDef::new(Accounts::Code).string_len(255).not_null())
                    .col(
                        ColumnDef::new(Accounts::Gender)
                            .enumeration(Gender::Table, Gender::iter().skip(1)),
                    )
                    .col(ColumnDef::new(Accounts::City).string_len(255).null())
                    .col(ColumnDef::new(Accounts::Email).string_len(255).not_null())
                    .col(
                        ColumnDef::new(Accounts::EmailPassword)
                            .string_len(255)
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Accounts::Bank)
                            .enumeration(Bank::Table, Bank::iter().skip(1)),
                    )
                    .col(
                        ColumnDef::new(Accounts::BankAccountNumber)
                            .string_len(255)
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Accounts::InternetBankAccountNumber)
                            .string_len(255)
                            .null(),
                    )
                    .col(
                        ColumnDef::new(Accounts::Post)
                            .enumeration(Post::Table, Post::iter().skip(1)),
                    )
                    .col(
                        ColumnDef::new(Accounts::AccountNumber)
                            .string_len(255)
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Accounts::AccountPassword)
                            .string_len(255)
                            .not_null(),
                    )
                    .col(ColumnDef::new(Accounts::AccountIB).integer().not_null())
                    .col(ColumnDef::new(Accounts::PhoneNumber).string_len(255).null())
                    .col(ColumnDef::new(Accounts::MacAddress).string_len(255).null())
                    .col(ColumnDef::new(Accounts::Bonus).float().null())
                    .col(
                        ColumnDef::new(Accounts::Status)
                            .enumeration(Status::Table, Status::iter().skip(1)),
                    )
                    .col(ColumnDef::new(Accounts::CreatedAt).date_time().null())
                    .col(ColumnDef::new(Accounts::UpdatedAt).date_time().null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Accounts::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Accounts {
    Table,
    Id,
    FullName,
    Code,
    Gender,
    City,
    Email,
    EmailPassword,
    Bank,
    BankAccountNumber,
    InternetBankAccountNumber,
    Post,
    AccountNumber,
    AccountPassword,
    AccountIB,
    PhoneNumber,
    MacAddress,
    Bonus,
    Status,
    CreatedAt,
    UpdatedAt,
}

#[derive(Iden, EnumIter)]
pub enum Gender {
    Table,
    #[iden = "male"]
    Male,
    #[iden = "female"]
    Female,
}

#[derive(Iden, EnumIter)]
pub enum Post {
    Table,
    #[iden = "ib"]
    Ib,
    #[iden = "client"]
    Client,
}

#[derive(Iden, EnumIter)]
pub enum Bank {
    Table,
    #[iden = "bca"]
    Bca,
    #[iden = "bri"]
    Bri,
    #[iden = "bni"]
    Bni,
    #[iden = "mandiri"]
    Mandiri,
}

#[derive(Iden, EnumIter)]
pub enum Status {
    Table,
    #[iden = "primary"]
    Primary,
    #[iden = "unverified"]
    Unverified,
    #[iden = "verified"]
    Verified,
    #[iden = "deactivated"]
    Deactivated,
}
