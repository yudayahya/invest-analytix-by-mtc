//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.10

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "accounts")]
pub struct Model {
    #[sea_orm(primary_key)]
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
    pub phone_number: Option<String>,
    pub mac_address: Option<String>,
    #[sea_orm(column_type = "Double", nullable)]
    pub bonus: Option<f64>,
    pub status: Option<String>,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(Some(1))")]
pub enum Gender {
    #[sea_orm(string_value = "male")]
    Male,
    #[sea_orm(string_value = "female")]
    Female,
}

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(Some(1))")]
pub enum Post {
    #[sea_orm(string_value = "ib")]
    Ib,
    #[sea_orm(string_value = "client")]
    Client,
}

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(Some(1))")]
pub enum Bank {
    #[sea_orm(string_value = "bca")]
    Bca,
    #[sea_orm(string_value = "bri")]
    Bri,
    #[sea_orm(string_value = "bni")]
    Bni,
    #[sea_orm(string_value = "mandiri")]
    Mandiri,
}

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum)]
#[sea_orm(rs_type = "String", db_type = "String(Some(1))")]
pub enum Status {
    #[sea_orm(string_value = "primary")]
    Primary,
    #[sea_orm(string_value = "verified")]
    Verified,
    #[sea_orm(string_value = "unverified")]
    Unverified,
    #[sea_orm(string_value = "deactivated")]
    Deactivated,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(belongs_to = "Entity", from = "Column::AccountIb", to = "Column::Id")]
    SelfReferencing,
}

pub struct SelfReferencingLink;

impl Linked for SelfReferencingLink {
    type FromEntity = Entity;

    type ToEntity = Entity;

    fn link(&self) -> Vec<RelationDef> {
        vec![Relation::SelfReferencing.def()]
    }
}

impl ActiveModelBehavior for ActiveModel {}
