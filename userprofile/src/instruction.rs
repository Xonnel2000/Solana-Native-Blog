use borsh::{BorshDeserialize};
use solana_program::{program_error::ProgramError};

#[derive(Debug)]
pub enum MovieInstruction {
 
    AddUserProfile {

        firstname: String,
        lastname: String,
        email: String,
        image_url: String,
    },

    UpdateUserProfile {

        firstname: String,
        lastname: String,
        email: String,
        image_url: String,
        }
}


#[derive(BorshDeserialize, Debug)]
struct UserProfilePayload {
        firstname: String,
        lastname: String,
        email: String,
        image_url: String,   
}



impl MovieInstruction {
    // Unpack inbound buffer to associated Instruction
    // The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        // Split the first byte of data
        let (&variant, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        // Deserializes instruction byte data into the payload struct
        
  
        Ok( match variant {

            0 => {
                let payload = UserProfilePayload::try_from_slice(rest).unwrap();

            Self::AddUserProfile {
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                image_url: payload.image_url,
            }
        },
            1 => {
        let payload = UserProfilePayload::try_from_slice(rest).unwrap();
            Self::UpdateUserProfile {
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                image_url: payload.image_url,
            }
        },
            _ => return Err(ProgramError::InvalidInstructionData)
        })
    }
}