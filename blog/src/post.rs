use solana_program::{
  
    pubkey::Pubkey,
    program_pack::{IsInitialized, Sealed},
 
};
use borsh::{BorshSerialize, BorshDeserialize};
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieAccountPost {
    pub discriminator: String,

     // Signer address
     pub is_initialized: bool,

         // Signer address
    pub user_pda: Pubkey,

    // Signer address
    pub blog: Pubkey,

    // Signer address
    pub bump: u8,          

    // Post title
    pub title: String,

    // Post text
    pub text: String,

    // Post creator url
    pub poster_url: String,

    // Comment counts of post
    pub comment_count: u64,

    // Post time
    pub post_time: i64,


}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieComment {
    pub discriminator: String,
    pub is_initialized: bool,
    pub blog_pda: Pubkey,
     // Post time
     pub comment_time: i64,
    pub commenter: Pubkey,
    pub comment: String,
    pub count: u64
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieCommentCounter {
    pub discriminator: String,
    pub is_initialized: bool,
    pub counter: u64
}

impl Sealed for MovieAccountPost {}

impl IsInitialized for MovieAccountPost {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl IsInitialized for MovieComment {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}


impl IsInitialized for MovieCommentCounter {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}


impl MovieAccountPost {
    pub const DISCRIMINATOR: &'static str = "blog";

    pub fn get_account_size(title: String, text: String, poster_url:String) -> usize {
        return (4 + MovieAccountPost::DISCRIMINATOR.len())
            + 1
            + 32
            + 32
            + 1
            + (4 + title.len())
            + (4 + text.len())
            + (4 + poster_url.len())
            + 8
            + 8
    }
}

impl MovieCommentCounter {
    pub const DISCRIMINATOR: &'static str = "counter";
    pub const SIZE: usize = (4 + MovieCommentCounter::DISCRIMINATOR.len()) + 1 + 8;
}

impl MovieComment {
    pub const DISCRIMINATOR: &'static str = "comment";

    pub fn get_account_size(comment: String) -> usize {
        return (4 + MovieComment::DISCRIMINATOR.len()) + 1 + 32 + 8 + 32 + (4 + comment.len()) + 8;
    }
}