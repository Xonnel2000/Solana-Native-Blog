use solana_program::{
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar},
    program::{invoke_signed},
    borsh::try_from_slice_unchecked,
    program_pack::{IsInitialized},
};
use std::convert::TryInto;
use borsh::BorshSerialize;
use crate::instruction::MovieInstruction;
use crate::state::UserProfileInfo;
use crate::error::StudentIntroError;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
  ) -> ProgramResult {
    let instruction = MovieInstruction::unpack(instruction_data)?;
    match instruction {
        MovieInstruction::AddUserProfile {firstname,lastname,email,image_url }  => {
            add_userprofile_intro(program_id, accounts, firstname,lastname,email,image_url )
        },
        MovieInstruction::UpdateUserProfile { firstname,lastname,email,image_url } => {
            update_userprofile_intro(program_id, accounts, firstname,lastname,email,image_url )
        },
      
    }
}

pub fn add_userprofile_intro(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  firstname: String,
  lastname: String,
  email: String,
  image_url: String,
) -> ProgramResult {
    msg!("Adding User profile info...");
    msg!("firstname: {}", firstname);
    msg!("lastname: {}", lastname);
    msg!("email: {}", email);
    msg!("image_url: {}", image_url);
    
    
    let account_info_iter = &mut accounts.iter();

    let authority_account = next_account_info(account_info_iter)?;
    let user_account_pda = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;
    
    if !authority_account.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
      }

    let (user_pda, user_bump) = Pubkey::find_program_address(
        &[b"userprofile".as_ref(), authority_account.key.as_ref()],
        program_id 
    );

    if user_pda != *user_account_pda.key {
        msg!("Invalid seeds for PDA");
        return Err(StudentIntroError::InvalidPDA.into())
    }

    // // let total_len: usize = 1 + (4 + name.len()) + (4 + message.len());
    // // if total_len > 1000 {
    // //     msg!("Data length is larger than 1000 bytes");
    // //     return Err(StudentIntroError::InvalidDataLength.into())
    // // }
     let account_len: usize = 1000;

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(account_len);

    invoke_signed(
            &system_instruction::create_account(
            authority_account.key,
            user_account_pda.key,
            rent_lamports,
            account_len.try_into().unwrap(),
            program_id,
        ),
        &[authority_account.clone(), user_account_pda.clone(), system_program.clone()],
        &[&[b"userprofile".as_ref(), authority_account.key.as_ref(), &[user_bump]]],
    )?;

    msg!("PDA created: {}", user_pda);

    msg!("unpacking Userprofile account");
    let mut user_account_data = try_from_slice_unchecked::<UserProfileInfo>(&user_account_pda.data.borrow()).unwrap();
    msg!("borrowed account data");

    msg!("checking if user account is already initialized");
    if user_account_data.is_initialized() {
        msg!("Account already initialized");
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    user_account_data.firstname = firstname;
    user_account_data.lastname = lastname;
    user_account_data.authority = *authority_account.key;
    user_account_data.user_id = user_pda;
    user_account_data.bump = user_bump;
    user_account_data.image_url = image_url;
    user_account_data.email = email;
    user_account_data.is_initialized = true;
    
    msg!("serializing account");
    user_account_data.serialize(&mut &mut user_account_pda.data.borrow_mut()[..])?;
    msg!("User profile account serialized");

    Ok(())

}

pub fn update_userprofile_intro(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  firstname: String,
  lastname: String,
  email: String,
  image_url: String,
) -> ProgramResult {
    msg!("Updating User profile info....");
    msg!("firstname: {}", firstname);
    msg!("lastname: {}", lastname);
    msg!("email: {}", email);
    msg!("image_url: {}", image_url);
    
    let account_info_iter = &mut accounts.iter();

    let initializer = next_account_info(account_info_iter)?;
    let user_account_pda = next_account_info(account_info_iter)?;

    if user_account_pda.owner != program_id {
        return Err(ProgramError::IllegalOwner)
      }

      if !initializer.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    msg!("unpacking state account");
    let mut user_account_data = try_from_slice_unchecked::<UserProfileInfo>(&user_account_pda.data.borrow()).unwrap();
    msg!("borrowed account data");

    // let (user_pda, user_bump) = Pubkey::find_program_address(
    //     &[b"userprofile".as_ref(), initializer.key.as_ref()],
    //     program_id 
    // );

    msg!("checking if account is initialized");
    if !user_account_data.is_initialized() {
        msg!("Account is not initialized");
        return Err(StudentIntroError::UninitializedAccount.into());
    }

    
    // // let update_len: usize = 1 + (4 + account_data.name.len()) + (4 + message.len());
    // // if update_len > 1000 {
    // //     msg!("Data length is larger than 1000 bytes");
    // //     return Err(StudentIntroError::InvalidDataLength.into())
    // // }

    user_account_data.firstname = firstname;
    user_account_data.lastname = lastname;
    // user_account_data.authority = *initializer.key;
    // user_account_data.bump = user_bump;
    user_account_data.image_url = image_url;
    user_account_data.email = email;
    user_account_data.is_initialized = true;
    
    msg!("serializing account");
    user_account_data.serialize(&mut &mut user_account_pda.data.borrow_mut()[..])?;
    msg!("User profile account serialized");

    Ok(())

}
