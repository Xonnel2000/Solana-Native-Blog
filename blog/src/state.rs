use solana_program::{
    pubkey::Pubkey,
};

use borsh::{BorshSerialize, BorshDeserialize};
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieAccountState {

    pub authority:Pubkey,
    pub bump: u8,
    // Post count
    pub post_count: u64,
}