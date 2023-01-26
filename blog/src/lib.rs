
use solana_program::{
  entrypoint,
  entrypoint::ProgramResult,
  pubkey::Pubkey,
  clock::Clock,
  msg,
  account_info::{next_account_info, AccountInfo},
  system_instruction,
  program_error::ProgramError,
  sysvar::{rent::Rent, Sysvar},
  program::{invoke_signed},
 borsh::try_from_slice_unchecked
};
use borsh::{BorshDeserialize, BorshSerialize};


pub mod instruction;
use instruction::MovieInstruction;

use std::convert::TryInto;
pub mod state;
pub mod error;
pub mod post;
use state::MovieAccountState;
use post::MovieAccountPost;
use post::MovieComment;
use post::MovieCommentCounter;
use error::ReviewError;



#[derive(BorshSerialize, BorshDeserialize, Debug)]
// the AddressSchema we pass to the blockchain
pub struct UserStateSchema {
 authority:Pubkey,
 pub bump: u8,

// Post count
 post_count: u64,
}



entrypoint!(process_instruction);


// Entry point is a function call process_instruction
pub fn process_instruction(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  instruction_data: &[u8]
) -> ProgramResult {
  // Unpack called
  let instruction = MovieInstruction::unpack(instruction_data)?;
  // Match against the data struct returned into `instruction` variable
  match instruction {


MovieInstruction::AddMovieReview {title, text, poster_url } => {
  msg!("AddMovieReview instruction");
  process_create_post(program_id, accounts, title, text, poster_url)
}

MovieInstruction::UpdateMovieReview {title, text, poster_url } => {
  msg!("AddMovieReview instruction");
update_movie_review(program_id, accounts, title, text, poster_url)
}


MovieInstruction::DeleteMovieReview {} => {
  msg!("DeleteMovieReview instruction");
delete_movie_review(program_id, accounts)
}

MovieInstruction::AddComment {comment} => {
  msg!("AddCommentReview instruction");
add_comment_blog(program_id, accounts,comment)
}


  }
  
}



fn process_create_post(
program_id: &Pubkey,
accounts: &[AccountInfo],
title: String,
text: String,
poster_url: String
) -> ProgramResult {
// if slug.len() > 10 || content.len() > 20 || title.len() > 50 {
//     return Err(BlogError::InvalidPostData.into())
// }

msg!("pda_account_state: {}", title);
msg!("pda_account_state: {}", text);
msg!("pda_account_state: {}", poster_url);

 let clock = Clock::get()?;

let account_info_iter = &mut accounts.iter();

let authority_account = next_account_info(account_info_iter)?;
//let blog_account = next_account_info(account_info_iter)?;
let post_account = next_account_info(account_info_iter)?;
let pda_counter = next_account_info(account_info_iter)?;

let system_program = next_account_info(account_info_iter)?;


 
msg!("initializer: {:?}", authority_account);
//msg!("pda_account_state: {:?}", blog_account);
 msg!("pda_account_state: {:?}", post_account);


 if !authority_account.is_signer {
  msg!("Missing required signature");
  return Err(ProgramError::MissingRequiredSignature)
}

let (post_pda, post_bump) = Pubkey::find_program_address(&[authority_account.key.as_ref(), title.as_bytes().as_ref(),], program_id);
if post_pda != *post_account.key {
  msg!("Invalid seeds for PDA");
  return Err(ProgramError::InvalidArgument)
}


// let total_len: usize = 32 + 1 + (4 + title.len()) + (4 + text.len())  +(4 + poster_url.len()) + 1 + 32 + 1;
// if total_len > 1000 {
//   msg!("Data length is larger than 1000 bytes");
//   return Err(ReviewError::InvalidDataLength.into())
// }


if !authority_account.is_signer {
    return Err(ProgramError::MissingRequiredSignature);
}


   // Calculate account size required
  // let account_len: usize = 1 + 1 + (4 + title.len()) + (4 + description.len());
  //  let post_len: usize = 32 + 1 + (4 + title.len()) + (4 + text.len()) +(4 + poster_url.len()) + 1 + 32 + 1;
  //   let account_len: usize = 1000;

  //  let rent = Rent::get()?;
  //  let rent_lamports = rent.minimum_balance(account_len);

   // Calculate rent required


   let account_len: usize = 1000;

   if MovieAccountPost::get_account_size(title.clone(), text.clone(), poster_url.clone()) > account_len {
       msg!("Data length is larger than 1000 bytes");
       return Err(ReviewError::InvalidDataLength.into());
   }

     let rent = Rent::get()?;
     let rent_lamports = rent.minimum_balance(account_len);

let create_post_pda_ix = &system_instruction::create_account(
    authority_account.key,
    post_account.key,
    rent_lamports,
    account_len.try_into().unwrap(),
    // Rent::get()?.minimum_balance(std::mem::size_of::<UserPostSchema>()),
    // std::mem::size_of::<UserPostSchema>().try_into().unwrap(),
    program_id
);
msg!("Creating post account pda!");
invoke_signed(
    create_post_pda_ix, 
    &[
        authority_account.clone(),
        post_account.clone(),
        system_program.clone()
    ],
    &[&[
      authority_account.key.as_ref(), title.as_bytes().as_ref(), 
        &[post_bump]
    ]]
)?;

//
//msg!("PDA created: {}", blog_pda);
msg!("PDA created: {}", post_pda);


let mut post_account_state = try_from_slice_unchecked::<MovieAccountPost>(&post_account.data.borrow()).unwrap();


msg!("checking if movie account is already initialized");
if post_account_state.is_initialized {
    msg!("Account already initialized");
    return Err(ProgramError::AccountAlreadyInitialized);
};
post_account_state.discriminator = MovieAccountPost::DISCRIMINATOR.to_string();
post_account_state.user_pda = *authority_account.key;
post_account_state.blog = *post_account.key;
post_account_state.bump = post_bump;
post_account_state.title = title;
post_account_state.text = text;
post_account_state.poster_url = poster_url;
post_account_state.comment_count = 0;
post_account_state.post_time = clock.unix_timestamp;
post_account_state.is_initialized = true;



msg!("Serializing Post data");
msg!("serializing account");

post_account_state.serialize(&mut &mut post_account.data.borrow_mut()[..])?;
msg!("state account serialized");

//this is the counter section


msg!("create comment counter");
//let account_len_counter: usize = 1000;

let rent = Rent::get()?;
let counter_rent_lamports = rent.minimum_balance(MovieCommentCounter::SIZE);


let (counter, counter_bump) =
    Pubkey::find_program_address(&[post_pda.as_ref(), "comment".as_ref()], program_id);
if counter != *pda_counter.key {
    msg!("Invalid seeds for PDA");
    return Err(ProgramError::InvalidArgument);
}

invoke_signed(
    &system_instruction::create_account(
        authority_account.key,
        pda_counter.key,
        counter_rent_lamports,
        MovieCommentCounter::SIZE.try_into().unwrap(),
        program_id,
    ),
    &[
        authority_account.clone(),
        pda_counter.clone(),
        system_program.clone(),
    ],
    &[&[post_pda.as_ref(), "comment".as_ref(), &[counter_bump]]],
)?;
msg!("comment counter created");

let mut counter_data =
    try_from_slice_unchecked::<MovieCommentCounter>(&pda_counter.data.borrow()).unwrap();

msg!("checking if counter account is already initialized");
if counter_data.is_initialized {
    msg!("Account already initialized");
    return Err(ProgramError::AccountAlreadyInitialized);
}
counter_data.discriminator = MovieCommentCounter::DISCRIMINATOR.to_string();
counter_data.counter = 0;
counter_data.is_initialized = true;
msg!("comment count: {}", counter_data.counter);
counter_data.serialize(&mut &mut pda_counter.data.borrow_mut()[..])?;

Ok(())
}



pub fn update_movie_review(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  title: String,
  text: String,
  poster_url: String
) -> ProgramResult {
  msg!("Updating movie review...");

  let account_info_iter = &mut accounts.iter();

  let initializer = next_account_info(account_info_iter)?;
  let pda_account = next_account_info(account_info_iter)?;

  if pda_account.owner != program_id {
    return Err(ProgramError::IllegalOwner)
  }

  if !initializer.is_signer {
      msg!("Missing required signature");
      return Err(ProgramError::MissingRequiredSignature)
  }

  msg!("unpacking state account");
  let mut account_data = try_from_slice_unchecked::<MovieAccountPost>(&pda_account.data.borrow()).unwrap();
  msg!("review title: {}", account_data.title);

  // let (pda, _bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(), account_data.title.as_bytes().as_ref(),], program_id);
  // if pda != *pda_account.key {
  //     msg!("Invalid seeds for PDA");
  //     return Err(ReviewError::InvalidPDA.into())
  // }

  msg!("checking if movie account is initialized");
  if !account_data.is_initialized {
      msg!("Account is not initialized");
      return Err(ReviewError::UninitializedAccount.into());
  }



  // //let update_len: usize = 1 + 1 + (4 + description.len()) + account_data.title.len();
  // let update_len: usize = 32 + 32 + 1 + account_data.title.len() + (4 + text.len()) + (4 + poster_name.len()) +(4 + poster_url.len()) + 1 + 32;
  // if update_len > 1000 {
  //     msg!("Data length is larger than 1000 bytes");
  //     return Err(ReviewError::InvalidDataLength.into())
  // }

  msg!("Review before update:");
  msg!("Title: {}", account_data.title);
 

  account_data.title = title;
  account_data.text = text;
  account_data.poster_url = poster_url;
 

  msg!("Review after update:");
  msg!("Title: {}", account_data.title);


  msg!("serializing account");
  account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;
  msg!("Blog account serialized");


  Ok(())
}



pub fn delete_movie_review(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
) -> ProgramResult {
  msg!("Deleting movie Account...");

  let account_info_iter = &mut accounts.iter();


  let dest_account_info = next_account_info(account_info_iter)?;
  let delete_pda_account = next_account_info(account_info_iter)?;

  if delete_pda_account.owner != program_id {
    return Err(ProgramError::IllegalOwner)
  }

  if !dest_account_info.is_signer {
      msg!("Missing required signature");
      return Err(ProgramError::MissingRequiredSignature)
  }

  let dest_starting_lamports = dest_account_info.lamports();
  **dest_account_info.lamports.borrow_mut() = dest_starting_lamports
      .checked_add(delete_pda_account.lamports())
      .unwrap();
  **delete_pda_account.lamports.borrow_mut() = 0;

  let mut source_data = delete_pda_account.data.borrow_mut();
  source_data.fill(0);

  msg!("Account has been close");



  Ok(())
}




pub fn add_comment_blog(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  comment: String
) -> ProgramResult {
  msg!("Adding Comment...");
  msg!("Comment: {}", comment);
 let clock = Clock::get()?;


  let account_info_iter = &mut accounts.iter();

  let commenter = next_account_info(account_info_iter)?;
  let pda_blog_review = next_account_info(account_info_iter)?;
  let pda_counter = next_account_info(account_info_iter)?;
  let pda_comment = next_account_info(account_info_iter)?;
  let system_program = next_account_info(account_info_iter)?;

  let mut counter_data = try_from_slice_unchecked::<MovieCommentCounter>(&pda_counter.data.borrow()).unwrap();
  let mut blogcounter_data = try_from_slice_unchecked::<MovieAccountPost>(&pda_blog_review.data.borrow()).unwrap();

  //let account_len = MovieComment::get_account_size(comment.clone());

  let account_len: usize = 1000;

  if MovieComment::get_account_size(comment.clone()) > account_len {
      msg!("Data length is larger than 1000 bytes");
      return Err(ReviewError::InvalidDataLength.into());
  }

  let rent = Rent::get()?;
  let rent_lamports = rent.minimum_balance(account_len);

  let (pda, bump_seed) = Pubkey::find_program_address(&[pda_blog_review.key.as_ref(), counter_data.counter.to_be_bytes().as_ref(),], program_id);
  if pda != *pda_comment.key {
      msg!("Invalid seeds for PDA");
      return Err(ReviewError::InvalidPDA.into())
  }

  invoke_signed(
      &system_instruction::create_account(
      commenter.key,
      pda_comment.key,
      rent_lamports,
      account_len.try_into().unwrap(),
      program_id,
      ),
      &[commenter.clone(), pda_comment.clone(), system_program.clone()],
      &[&[pda_blog_review.key.as_ref(), counter_data.counter.to_be_bytes().as_ref(), &[bump_seed]]],
  )?;

  msg!("Created Comment Account");

  let mut comment_data = try_from_slice_unchecked::<MovieComment>(&pda_comment.data.borrow()).unwrap();

  msg!("checking if comment account is already initialized");
  if comment_data.is_initialized {
      msg!("Account already initialized");
      return Err(ProgramError::AccountAlreadyInitialized);
  }

  comment_data.discriminator = MovieComment::DISCRIMINATOR.to_string();
  comment_data.blog_pda = *pda_blog_review.key;
  comment_data.commenter = *commenter.key;
  comment_data.comment = comment;
  comment_data.is_initialized = true;
  comment_data.comment_time = clock.unix_timestamp;
  msg!("serializing account");
  comment_data.serialize(&mut &mut pda_comment.data.borrow_mut()[..])?;
  msg!("Comment account serialized");

  blogcounter_data.comment_count +=1;
  msg!("serializing account");
  blogcounter_data.serialize(&mut &mut pda_blog_review.data.borrow_mut()[..])?;
  msg!("Blog account serialized");



  msg!("Comment Count: {}", counter_data.counter);
  counter_data.counter += 1;
  counter_data.serialize(&mut &mut pda_counter.data.borrow_mut()[..])?;
msg!("Counter {} time(s)!", counter_data.counter);


  Ok(())
}