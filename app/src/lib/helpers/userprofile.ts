// import bs58 from 'bs58'
import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh';
import { get } from 'svelte/store';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

import { browser } from '$app/environment';






const MOVIE_REVIEW_PROGRAM_ID = '6G1cAAbXP7A8nuXqC3r8gGrBwPFkcCx8A85kX1kG65Cf'
const programId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)


const UserprofileborshAccountSchema = borsh.struct([
    borsh.bool('is_initialized'),
    borsh.publicKey('authority'),
    borsh.publicKey('user_id'),
    borsh.u8('bump'),
    borsh.str('firstname'),
    borsh.str('lastname'),
    borsh.str('email'),
    borsh.str('image_url'),
]) 



const UserprofileInstructionLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('firstname'),
    borsh.str('lastname'),
    borsh.str('email'),
    borsh.str('image_url'),
])

let PubWalletKey:any 
//let walletKey:web3.PublicKey
let walletKey;

let userPublickey


let wallet:any
let ngng 

// if(browser){
//     const { adapter, connected } = get(walletStore);
// console.log("this is gi ", adapter?.publicKey, connected)



// let getUserWalletPubKeydd = window.solana.publicKey;
// console.log("this is browwer ", getUserWalletPubKeydd)
// getWallett ()
// }


export function getWallett() {
    let wallet = get(walletStore);
    if (wallet) {
        console.log("this is wallet", "connecteed");
    }
    else {
        console.log("this is wallet", "Disconnecteed");
    }
    PubWalletKey = wallet?.publicKey;
    walletKey = new web3.PublicKey(PubWalletKey);
    console.log("this is wallet", PubWalletKey.toBase58());
}


// getWallett()


export default class UserProfile{
    constructor(){
    
    
    }

    GetAllWallet = async ()=>{
        let wallet:any
await walletStore.subscribe(($a)=>{
    walletKey = $a
   PubWalletKey = wallet?.publicKey;
   //  userPublickey = new web3.PublicKey(PubWalletKey);
console.log("this is the ", PubWalletKey?.toString())
console.log("this is the programId ", programId.toString())
})

    //     PubWalletKey = wallet?.publicKey;
    //    //  userPublickey = new web3.PublicKey(PubWalletKey);
    // console.log("this is the ", PubWalletKey?.toString())
    // console.log("this is the programId ", programId.toString())

    }


EditUser = async (firstname:string, lastname:string, email:string, image_url:string)=> {
        let wallet = get(walletStore)
        PubWalletKey = wallet?.publicKey;
         userPublickey = new web3.PublicKey(PubWalletKey);
    console.log("this is the edit ", userPublickey?.toString())
    console.log("this is the programId ", programId.toString())
    
    
      //  let bufferPost = Buffer.alloc(1000)
       let bufferState = Buffer.alloc(1000)
    
        //const bufferState = Buffer.alloc(UserprofileInstructionLayout.span);
        // UserprofileInstructionLayout.encode({
        //   variant: 0
        // }, bufferState);
    
    
        UserprofileInstructionLayout.encode(
            {
                variant: 1,
                firstname: firstname,
                lastname: lastname,
                email: email,
                image_url: image_url,
            },
            bufferState
        )
    
      
    
       bufferState = bufferState.slice(0, UserprofileInstructionLayout.getSpan(bufferState))
    
        console.log(bufferState)
       // console.log(bufferPost)
        let mintPayloadCopy =  UserprofileInstructionLayout.decode(bufferState)
        console.log(mintPayloadCopy)
    //     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
    //    console.log(mintPayloadCopy)
    
       
    
        // // blog post
        const [userprofilePda] = await web3.PublicKey.findProgramAddressSync(
           [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
            programId
        ) // ABCD
    
    
    
        console.log("Statepda is:", userprofilePda.toBase58())
    
    
    
       const transaction = new web3.Transaction()
     
        
       const instructionBlog = new web3.TransactionInstruction({
           programId: programId,
           data: bufferState,
           keys: [
               {
                   pubkey: userPublickey,
                   isSigner: true,
                   isWritable: false
               },
               {
                   pubkey: userprofilePda,
                   isSigner: false,
                   isWritable: true
               },
               {
                   pubkey: web3.SystemProgram.programId,
                   isSigner: false,
                   isWritable: false
               }
           ]
       });

    
       transaction.add(instructionBlog)
    
       const latestBlockHash = await connection.getLatestBlockhash();    
    
       try {
        let tx =     await wallet?.sendTransaction(transaction, connection)
        alert(
            `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
        )
        console.log(
            `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`  
        )
    } catch (e) {
        console.log(JSON.stringify(e))
        alert(JSON.stringify(e))
    }
    
    }




   CreateUser = async (firstname:string, lastname:string, email:string, image_url:string)=> {
    let wallet = get(walletStore)
    PubWalletKey = wallet?.publicKey;
     userPublickey = new web3.PublicKey(PubWalletKey);
console.log("this is the ", userPublickey?.toString())
console.log("this is the programId ", programId.toString())


  //  let bufferPost = Buffer.alloc(1000)
   let bufferState = Buffer.alloc(1000)

    //const bufferState = Buffer.alloc(UserprofileInstructionLayout.span);
    // UserprofileInstructionLayout.encode({
    //   variant: 0
    // }, bufferState);


    UserprofileInstructionLayout.encode(
        {
            variant: 0,
            firstname: firstname,
            lastname: lastname,
            email: email,
            image_url: image_url,
        },
        bufferState
    )

  

   bufferState = bufferState.slice(0, UserprofileInstructionLayout.getSpan(bufferState))

    console.log(bufferState)
   // console.log(bufferPost)
    let mintPayloadCopy =  UserprofileInstructionLayout.decode(bufferState)
    console.log(mintPayloadCopy)
//     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
//    console.log(mintPayloadCopy)

   

    // // blog post
    const [userprofilePda] = await web3.PublicKey.findProgramAddressSync(
       [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
        programId
    ) // ABCD



    console.log("Statepda is:", userprofilePda.toBase58())



   const transaction = new web3.Transaction()
 
    
   const instructionBlog = new web3.TransactionInstruction({
       programId: programId,
       data: bufferState,
       keys: [
           {
               pubkey: userPublickey,
               isSigner: true,
               isWritable: false
           },
           {
               pubkey: userprofilePda,
               isSigner: false,
               isWritable: true
           },
           {
               pubkey: web3.SystemProgram.programId,
               isSigner: false,
               isWritable: false
           }
       ]
   });

 

//   const memoIx =  new web3.TransactionInstruction({
//     keys: [
//       { pubkey: userPublickey, isSigner: true, isWritable: false },
//     ],
//     data: Buffer.from("Data to send in transaction", "utf-8"),
//     programId: new web3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
//   })


   transaction.add(instructionBlog)

   const latestBlockHash = await connection.getLatestBlockhash();
   //let   signaturer = await wallet?.sendTransaction(transaction, connection)

//    await connection.confirmTransaction({
//     blockhash: latestBlockHash.blockhash,
//     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
//     signature: signaturer,
//   });


   try {
    let tx =     await wallet?.sendTransaction(transaction, connection)
    alert(
        `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    )
    console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`  
    )
} catch (e) {
    console.log(JSON.stringify(e))
    alert(JSON.stringify(e))
}

}

    GetPost = async () => {
        let $wallet = get(walletStore)
        PubWalletKey = $wallet?.publicKey;
        let userPublickey = new web3.PublicKey(PubWalletKey);
    console.log("this is the GetPost", userPublickey?.toBase58())
   // console.log("this is the programId ", programId.toBase58())

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const movieProgramId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
   // const pdaProgramId = new web3.PublicKey(title)
    //let userprofileAccount = await connection.getProgramAccounts(movieProgramId)

     const [blogAccount] = await web3.PublicKey.findProgramAddressSync(
        [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
        movieProgramId
      );
   console.log("this is account ", blogAccount)


    
//    console.log(blogAccount.toBase58())
//    console.log(pdaProgramId.toBase58())

     const blogAccountInfo = await connection.getAccountInfo(blogAccount);
   console.log("this is blog ", blogAccountInfo)

      const blogAccountStateing = UserprofileborshAccountSchema.decode(
        blogAccountInfo?.data
      );

//       let firstname= blogAccountStateing.firstname
//       let lastname= blogAccountStateing.lastname
//       let email= blogAccountStateing.email
//       let image_url= blogAccountStateing.lastname



//    console.log("this is final", firstname, lastname)

return  blogAccountStateing

    }



    
 
}
