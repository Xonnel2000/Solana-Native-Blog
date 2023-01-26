
// import { get, derived} from 'svelte/store';
// import { programId, NativeprogramId, MAIN_NET, DEV_NET, config } from '$lib/constants';
// import { LENNOX_MINT, DODO_MINT } from "$lib/helpers/const"
//    // import { TokenSwap, TOKEN_SWAP_PROGRAM_ID, TokenSwapLayout } from "@solana/spl-token-swap"


// import path from 'path';
// import { dirname } from "path"


// import {
//     clusterApiUrl,
//     Keypair,
//     Connection,
//     PublicKey,
//     LAMPORTS_PER_SOL,
//     SystemProgram,
//     TransactionInstruction,
//     Transaction,
//     sendAndConfirmTransaction,
//   } from '@solana/web3.js';
// import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
// //import { web3, Program, AnchorProvider } from '@project-serum/anchor';
// import * as token from "@solana/spl-token"

// // import {
// //     MINT_SIZE,
// //     TOKEN_PROGRAM_ID,
// //     getMinimumBalanceForRentExemptMint,
// //     createInitializeMintInstruction,
// //     getAssociatedTokenAddress,
// //     createAssociatedTokenAccountInstruction,
// //     ASSOCIATED_TOKEN_PROGRAM_ID
// //   } from "@solana/spl-token";

//   import * as web3 from "@solana/web3.js";
//   import {  walletconnected } from '$lib/stores';


// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// const wallet = get(walletStore)

// //let getUserWalletPubKeydd = window.solana;

//  let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

//  let PubWalletKey 
//  let walletKey
//  //let Mintaddress

//  let useWallet
//  let   newpublicKey




// console.log("this is wallet",walletconnected)





//     export  function getWallett() {
//          useWallet = get(walletStore)
//     if(useWallet?.connected){
//         console.log("this is wallet", "connecteed")
        
//         }else{
//         console.log("this is wallet", "Disconnecteed")
    
//         }
//         PubWalletKey= useWallet?.publicKey
//         newpublicKey = new PublicKey(PubWalletKey)
//     console.log("this is wallet", newpublicKey.toString())
    
//     }

//     const transaction = new web3.Transaction();


//     export async function  createTokenSwapState(tokenSwapStateAccount) {
    
//         if (!connection || !newpublicKey) {
//           return;
//         }
//         const TokenSwapRent = TokenSwap.getMinBalanceRentForExemptTokenSwap(connection)
//         const tokenSwapStateAccountInstruction = await web3.SystemProgram.createAccount({
//             newAccountPubkey: tokenSwapStateAccount.publicKey,
//             fromPubkey: newpublicKey,
//             lamports: TokenSwapRent,
//             space: TokenSwapLayout.span,
//             programId: TOKEN_SWAP_PROGRAM_ID
//         })
    
//         transaction.add(tokenSwapStateAccountInstruction)

     
//         let   signaturer = await useWallet.sendTransaction(transaction, connection,{
//             signers: [tokenSwapStateAccount],
//             }).then((sig) =>{
//              console.log(sig)
//                console.log( tokenSwapStateAccount.publicKey.toString())
//             })
//             // await connection.confirmTransaction(signaturer, 'confirmed')
//             // console.log(signaturer)
//             return tokenSwapStateAccount.publicKey.toString();
        
//       };



//       export async  function createTokenSwapAcc(LENNOX_MINT,swapAuthority) {
//     console.log("fjfjjjfjf")
//     console.log(LENNOX_MINT)
//     console.log(swapAuthority)

//     let tokenAAccountAddress = await token.getAssociatedTokenAddress(
//         LENNOX_MINT, // mint
//         swapAuthority, // owner
//         true // allow owner off curve
//     )

//     const tokenAAccountInstruction = await token.createAssociatedTokenAccountInstruction(
//         useWallet.publicKey, // payer
//         tokenAAccountAddress, // ata
//         swapAuthority, // owner
//         LENNOX_MINT // mint
//     )

//     transaction.add(tokenAAccountInstruction);
   
//     useWallet.sendTransaction(transaction, connection).then((sig) => {
//       console.log(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
//        //tokenAAccountAddress.toString();
//     });
//     return  tokenAAccountAddress.toString();

//   };


//   export async  function createPoolTokenMintAcc(swapAuthority) {

//     const poolTokenMint = await token.createMint(
//         connection,
//         useWallet,
//         swapAuthority,
//         null,
//         2
//     )

//     console.log(
//         `Token Mint: https://explorer.solana.com/address/${poolTokenMint}?cluster=devnet`
//     );

//     return poolTokenMint;

// }



// export async function  createPoolTokkenAcc(poolTokenMint) {
    
//     if (!connection || !newpublicKey) {
//       return;
//     }

//     const tokenAccountPool = web3.Keypair.generate()
//     const rent = await token.getMinimumBalanceForRentExemptAccount(connection)
//     const createTokenAccountPoolInstruction = web3.SystemProgram.createAccount({
//         fromPubkey: useWallet.publicKey,
//         newAccountPubkey: tokenAccountPool.publicKey,
//         space: token.ACCOUNT_SIZE,
//         lamports: rent,
//         programId: token.TOKEN_PROGRAM_ID,
//     })
//     const initializeTokenAccountPoolInstruction = token.createInitializeAccountInstruction(
//         tokenAccountPool.publicKey,
//         poolTokenMint,
//         useWallet.publicKey
//     )
    
//     transaction.add(createTokenAccountPoolInstruction)
//     transaction.add(initializeTokenAccountPoolInstruction)

 
//     let   signaturer = await useWallet.sendTransaction(transaction, connection,{
//         signers: [tokenAccountPool],
//         }).then((sig) =>{
//          console.log(sig)
//            console.log( tokenAccountPool.publicKey.toString())
//         })
//         // await connection.confirmTransaction(signaturer, 'confirmed')
//         // console.log(signaturer)
//         return tokenAccountPool.publicKey.toString();
    
//   };









//     export async function  createPoolTokkenFeeAcc(poolTokenMint) {
    
//         if (!connection || !newpublicKey) {
//           return;
//         }

//         const feeOwner = new web3.PublicKey('HfoTxFR1Tm6kGmWgYWD6J7YHVy1UwqSULUGVLXkJqaKN')

//         let tokenFeeAccountAddress = await token.getAssociatedTokenAddress(
//             poolTokenMint, // mint
//             feeOwner, // owner
//             true // allow owner off curve
//         )
        
//         const tokenFeeAccountInstruction = await token.createAssociatedTokenAccountInstruction(
//             useWallet.publicKey, // payer
//             tokenFeeAccountAddress, // ata
//             feeOwner, // owner
//             poolTokenMint // mint
//         )
        
//         transaction.add(tokenFeeAccountInstruction)
     
//         let   signaturer = await useWallet.sendTransaction(transaction, connection)
//         .then((sig) =>{
//              console.log(sig)
//               // console.log( tokenAccountPool.publicKey.toString())
//             })
//             // await connection.confirmTransaction(signaturer, 'confirmed')
//             // console.log(signaturer)
//             return  tokenFeeAccountAddress.toString();
        
//       };



 



 
   
     


    

//         // createMint = async () => {
//         //     getWallett()
//         // //event.preventDefault();
//         // console.log("reaching")
//         // console.log(connection)
//         // console.log(newpublicKey.toString())
//         // if (!connection || !newpublicKey) {
//         //   return;
//         // }
    
//         // const mint = web3.Keypair.generate();
    
//         // const mintlamports = await getMinimumBalanceForRentExemptMint(connection);
    
//         // const transaction = new web3.Transaction();
    
//         // transaction.add(
//         //   web3.SystemProgram.createAccount({
//         //     fromPubkey: newpublicKey, // the wallet or owner publicKey
//         //     newAccountPubkey: mint.publicKey, // Keypair generate publicKey
//         //     space: MINT_SIZE, // the mint size from the import sdk
//         //     lamports: mintlamports, // get from  the import spl-token getMinimumBalanceForRentExemptMint
//         //     programId: TOKEN_PROGRAM_ID,// the mint size from the import sdk
//         //   }),
//         //   createInitializeMintInstruction(
//         //     mint.publicKey, // Keypair generate publicKey
//         //     0, // decimal
//         //     newpublicKey, //payer publicKey
//         //     newpublicKey, //payer publicKey
//         //     TOKEN_PROGRAM_ID
//         //   )
//         // );
    
    
//         // let   signaturer = await useWallet.sendTransaction(transaction, connection,{
//         // signers: [mint],
//         // }).then((sig) =>{
//         //  console.log(sig)
//         //    console.log( mint.publicKey.toString())
//         // })
//         // // await connection.confirmTransaction(signaturer, 'confirmed')
//         // // console.log(signaturer)
//         // return mint.publicKey.toString();
    
//         // }



//         export async function SwapProgToken() {
//             LENNOX_MINT;
//              DODO_MINT;
//         const tokenSwapStateAccount = web3.Keypair.generate()

//             await getWallett()
//           const swapSt =  await createTokenSwapState(tokenSwapStateAccount);
//             const [swapAuthority, bump] = await web3.PublicKey.findProgramAddress(
//                 [tokenSwapStateAccount.publicKey.toBuffer()],
//                 TOKEN_SWAP_PROGRAM_ID,
//             )
            
//             const  poolTokenA = await createTokenSwapAcc(LENNOX_MINT,swapAuthority);
//             const poolminttoken = await createPoolTokenMintAcc(swapAuthority);
//             const tokenAccountPool = await createPoolTokkenAcc(poolminttoken);
//             const tokenFeeAccountAddress= await createPoolTokkenFeeAcc(poolminttoken);

//             console.log("this is swapSt", swapSt)
//             console.log("this is swapAuthority", swapAuthority)
//             console.log("this is poolTokenA", poolTokenA)
//             console.log("this is poolminttoken", poolminttoken)
//             console.log("this is tokenAccountPool", tokenAccountPool)
//             console.log("this is tokenFeeAccountAddress", tokenFeeAccountAddress)
          
//           }


  
