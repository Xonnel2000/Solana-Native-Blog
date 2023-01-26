use borsh::{BorshSerialize, BorshDeserialize};
use solana_program::{
    pubkey::Pubkey,
    program_pack::{IsInitialized, Sealed},
};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct UserProfileInfo {
    pub is_initialized: bool,
    pub authority: Pubkey,
    pub user_id: Pubkey,
    pub bump: u8,          
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub image_url: String,
}

impl Sealed for UserProfileInfo {}

impl IsInitialized for UserProfileInfo {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}