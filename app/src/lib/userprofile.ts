// import bs58 from 'bs58'
import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh';
import { get } from 'svelte/store';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'))






const MOVIE_REVIEW_PROGRAM_ID = 'v5TuYAmEGFgYiQ2LLpfU3JWQAevgNxb8DNevK4bH1up'
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
let walletKey
let walletSecret 

let wallet:any
let ngng = get(walletStore)
let getUserWalletPubKeydd = window.solana.publicKey;

//const wtt = window
console.log(getUserWalletPubKeydd)




   function  getWallett () {
     walletStore.subscribe(value => {
      wallet= value.publicKey?.toBase58()
        
      //console.log(wallet.publicKey?.toBase58())

// walletKey = new web3.PublicKey(PubWalletKey)
//         console.log("this is wallet", walletKey.toString())
// if(wallet?.connected){
//         console.log("this is wallet", "connecteed")
        
//         }else{
//         console.log("this is wallet", "Disconnecteed")
    
//         }

        // function sayHi() {
        //     console.log(wallet);
        // }
    
        // return sayHi;
     })
     // console.log(wallet.publicKey?.toBase58())


    // let wallet =  get(walletStore)
    // console.log(wallet)
// 

//     PubWalletKey= wallet?.publicKey
// //walletKey = new web3.PublicKey(PubWalletKey)
// console.log("this is wallet", PubWalletKey.toString())

}
    
getWallett ()







export class UserProfile{
    constructor(){
        let wallet = get(walletStore)
        let userPublickey =  wallet?.publicKey

    }
   

//  static async CreateUser(firstname:string, lastname:string, email:string, image_url:string) {
//     getWallett()
//     let wallet = get(walletStore)

// let userPublickey = await wallet?.publicKey
// console.log("this is the ", userPublickey?.toString())
// console.log("this is the programId ", programId.toString())


//   //  let bufferPost = Buffer.alloc(1000)
//    let bufferState = Buffer.alloc(1000)

//     //const bufferState = Buffer.alloc(UserprofileInstructionLayout.span);
//     // UserprofileInstructionLayout.encode({
//     //   variant: 0
//     // }, bufferState);


//     UserprofileInstructionLayout.encode(
//         {
//             variant: 0,
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             image_url: image_url,
//         },
//         bufferState
//     )

  

//    bufferState = bufferState.slice(0, UserprofileInstructionLayout.getSpan(bufferState))

//     console.log(bufferState)
//    // console.log(bufferPost)
//     let mintPayloadCopy =  UserprofileInstructionLayout.decode(bufferState)
//     console.log(mintPayloadCopy)
// //     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
// //    console.log(mintPayloadCopy)

   

//     // // blog post
//     const [userprofilePda] = await web3.PublicKey.findProgramAddressSync(
//        [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
//         programId
//     ) // ABCD



//     console.log("Statepda is:", userprofilePda.toBase58())



//    const transaction = new web3.Transaction()
 
    
//    const instructionBlog = new web3.TransactionInstruction({
//        programId: programId,
//        data: bufferState,
//        keys: [
//            {
//                pubkey: wallet?.publicKey,
//                isSigner: true,
//                isWritable: false
//            },
//            {
//                pubkey: userprofilePda,
//                isSigner: false,
//                isWritable: true
//            },
//            {
//                pubkey: web3.SystemProgram.programId,
//                isSigner: false,
//                isWritable: false
//            }
//        ]
//    });

 

// //   const memoIx =  new web3.TransactionInstruction({
// //     keys: [
// //       { pubkey: userPublickey, isSigner: true, isWritable: false },
// //     ],
// //     data: Buffer.from("Data to send in transaction", "utf-8"),
// //     programId: new web3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
// //   })


//    transaction.add(instructionBlog)

//    const latestBlockHash = await connection.getLatestBlockhash();
//    //let   signaturer = await wallet?.sendTransaction(transaction, connection)

// //    await connection.confirmTransaction({
// //     blockhash: latestBlockHash.blockhash,
// //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
// //     signature: signaturer,
// //   });


//    try {
//     let tx =     await wallet?.sendTransaction(transaction, connection)
//     alert(
//         `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
//     )
//     console.log(
//         `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`  
//     )
// } catch (e) {
//     console.log(JSON.stringify(e))
//     alert(JSON.stringify(e))
// }


// }


static async GetPost(){
console.log("fjjfjjf", wallet)

// walletStore.subscribe(value => {
//   let   walleted= value.publicKey?.toBase58()
       
//     // console.log(wallet.publicKey?.toBase58())


//     })

//     console.log("thtifnfn", walleted)



//     let userPublickey:web3.PublicKey = walletKey
// console.log("this is the wallet ", walletKey)

//     const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
//     const movieProgramId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
//    // const pdaProgramId = new web3.PublicKey(title)
//     //let userprofileAccount = await connection.getProgramAccounts(movieProgramId)

//      const [blogAccount] = await web3.PublicKey.findProgramAddressSync(
//         [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
//         movieProgramId
//       );
    
// //    console.log(blogAccount.toBase58())
// //    console.log(pdaProgramId.toBase58())

//      const blogAccountInfo = await connection.getAccountInfo(blogAccount);
//       const blogAccountState = UserprofileborshAccountSchema.decode(
//         blogAccountInfo
//       );



//    console.log(blogAccountState)
   
//     return blogAccountState
    }


    
 

}