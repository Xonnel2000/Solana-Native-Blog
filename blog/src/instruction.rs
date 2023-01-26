use borsh::{BorshDeserialize};
use solana_program::{program_error::ProgramError};

#[derive(Debug)]
pub enum MovieInstruction {
 
    AddMovieReview {

    // Post title
     title: String,

    // Post text
     text: String,

    // Post creator url
     poster_url: String
  
    },
    UpdateMovieReview {

        // Post title
         title: String,
    
        // Post text
         text: String,
    
        // Post creator url
         poster_url: String
      
        },
        DeleteMovieReview,

        AddComment {
            comment: String
        }
   
}


// Next, define a MovieReviewPayload struct. This will act as an intermediary type for deserializtion so it should use the derive attribute macro to provide a default implementation for the BorshDeserialize trait.
#[derive(BorshDeserialize, Debug)]

struct MovieReviewPayload {
        //variant: u8,
        // Post title
        title: String,

        // Post text
         text: String,

    
        // Post creator url
         poster_url: String,
    
}


#[derive(BorshDeserialize)]
struct CommentPayload {
    comment: String
}




impl MovieInstruction { 
    // Unpack inbound buffer to associated Instruction
    // The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        // Split the first byte of data
        let (&variant, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        // `try_from_slice` is one of the implementations from the BorshDeserialization trait
        // Deserializes instruction byte data into the payload struct

       // let payload = MovieReviewPayload::try_from_slice(input).unwrap();
       // let payload2 = BlogStatePayload::try_from_slice(rest).unwrap();
        // Match the first byte and return the AddMovieReview struct
        Ok( match variant {

            0 => {
                let payload = MovieReviewPayload::try_from_slice(rest).unwrap();

                Self::AddMovieReview {
                    title: payload.title,
                    text: payload.text,
                    poster_url: payload.poster_url
                    }
                },
            1 => {
                    let payload = MovieReviewPayload::try_from_slice(rest).unwrap();

                Self::UpdateMovieReview {
                    title: payload.title,
                    text: payload.text,
                    poster_url: payload.poster_url
                }
            },
            2 => {
                let payload = MovieReviewPayload::try_from_slice(rest).unwrap();
                Self::DeleteMovieReview 
              },
            3 => {
                let payload = CommentPayload::try_from_slice(rest).unwrap();
                Self::AddComment {
                comment: payload.comment
               }
            },
            _ => return Err(ProgramError::InvalidInstructionData)
        })
    }
}