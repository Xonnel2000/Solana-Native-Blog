
import { get, derived} from 'svelte/store';
import { programId, NativeprogramId, MAIN_NET, DEV_NET, config } from '$lib/constants';



// import path from 'path';
// import { dirname } from "path"




import {
    clusterApiUrl,
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
  } from '@solana/web3.js';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
//import { web3, Program, AnchorProvider } from '@project-serum/anchor';
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    getMinimumBalanceForRentExemptMint,
    createInitializeMintInstruction,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getMint,
    getOrCreateAssociatedTokenAccount,
    getAccount,
    AccountLayout
    
  
  } from "@solana/spl-token";
  import * as web3 from "@solana/web3.js";
  import {  walletconnected } from '$lib/stores';





const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const wallet = get(walletStore)

let getUserWalletPubKeydd = window.solana;




 let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

     
    
 let PubWalletKey 
 let walletKey
 //let Mintaddress

 let useWallet
 let   newpublicKey


//  let newpublicKeyd = walletStore.subscribe(value => {
//     useWallet = value
//     PubWalletKey= useWallet?.publicKey
//     new PublicKey(PubWalletKey)
 //walletconnected.subscribe($walletconnected => newpublicKey = $walletconnected)

console.log("this is wallet",walletconnected)


//   })


// useWallet = get(walletStore)
// PubWalletKey = useWallet?.publicKey;
// console.log("this is wallet", PubWalletKey)

// walletStore.subscribe($walletStore => newpublicKey = $walletStore.connected)
 
// console.log("this is wallet", newpublicKey)



//   export const getsum = derived([walletStore ],([$walletStore])  => {
//     useWallet = walletStore
//   PubWalletKey= useWallet?.publicKey
//   return  $newpublicKey =  new PublicKey(PubWalletKey)

//   })

//     useWallet = walletStore.subscribe()
//    newpublicKey = useWallet 

    //    getWallett() {
    //     useWallet = get(walletStore)
    //    if(useWallet?.connected){
    //        console.log("this is wallet", "connecteed")
    //        }else{
    //        console.log("this is wallet", "Disconnecteed")
    //        }
    //        PubWalletKey= useWallet?.publicKey
    //        newpublicKey = new PublicKey(PubWalletKey)
    //    console.log("this is wallet", newpublicKey.toString())
       
    //    }



    export  function getWallett() {
         useWallet = get(walletStore)
    if(useWallet?.connected){
        console.log("this is wallet", "connecteed")
        
        }else{
        console.log("this is wallet", "Disconnecteed")
    
        }
        PubWalletKey= useWallet?.publicKey
        newpublicKey = new PublicKey(PubWalletKey)
    console.log("this is wallet", newpublicKey.toString())
    
    }




export default class NativeClient {
    constructor({ useWalleter } = {}) {
         this.useWalleter = useWalleter 
       // console.log(this.useWalleter.publicKey)

    }

 

    transferMoni = async (moni, senderPublickey) => {
      getWallett()

       if (!connection || !newpublicKey) {
		console.log("reaching", moni,senderPublickey)
          return;
        }
        const recentBlockhash = await connection.getLatestBlockhash();
      const transaction = new Transaction({ recentBlockhash: recentBlockhash.blockhash,}).add(
        SystemProgram.transfer({
          fromPubkey: newpublicKey,
          toPubkey: senderPublickey,
          lamports: moni * LAMPORTS_PER_SOL,
        })
      );

      await transaction.add(
        new TransactionInstruction({
          keys: [{ pubkey: newpublicKey, isSigner: true, isWritable: true }],
          data: Buffer.from("Data to send in transaction", "utf-8"),
          programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
        })
      );
  
      //const signature = await useWallet.sendTransaction(transaction, connection);
  
    //  await connection.confirmTransaction(signature, "processed");
   // }, [newpublicKey, sendTransaction, connection]);


   try {
    
    let tx = await useWallet.sendTransaction(transaction, connection);
    const fees = await transaction.getEstimatedFee(connection);
    console.log(`Estimated SOL transfer cost: ${fees} lamports`);
    alert(
        `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    )
    console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`  
    )
} catch (e) {
    console.log(JSON.stringify(e))

  //  Blog.logError(e)
    alert(JSON.stringify(e))
}

    }
   
     

        createTokenAccount = async (mint, owner) => {
            getWallett()
        console.log("fjfjjjfjf")
        console.log(mint)
        console.log(owner)
        // event.preventDefault();
        // if (!connection || !newpublicKey) {
        //   return;
        // }
        // const transaction = new web3.Transaction();
        // const owner = new web3.PublicKey(event.target.owner.value);
        // const mint = new web3.PublicKey(event.target.mint.value);
    
        // const associatedToken = await getAssociatedTokenAddress(
        //   mint,
        //   owner,
        //   false,
        //   TOKEN_PROGRAM_ID,
        //   ASSOCIATED_TOKEN_PROGRAM_ID
        // );
    
        // transaction.add(
        //   createAssociatedTokenAccountInstruction(
        //     newpublicKey, // the payer publicKey
        //     associatedToken,
        //     owner, // the onwer who created the mint token account
        //     mint, // publicKey of the mint account
        //     TOKEN_PROGRAM_ID,
        //     ASSOCIATED_TOKEN_PROGRAM_ID
        //   )
        // );
    
        // useWallet.sendTransaction(transaction, connection).then((sig) => {
        //   console.log(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
        //   setTokenAccount = associatedToken.toString();
        // });
      };
    

        createMint = async () => {
            getWallett()
        //event.preventDefault();
        console.log("reaching")
        console.log(connection)
        console.log(newpublicKey.toString())
        if (!connection || !newpublicKey) {
          return;
        }
    
        const mint = web3.Keypair.generate();
    
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
    
        const transaction = new web3.Transaction();
    
        transaction.add(
          web3.SystemProgram.createAccount({
            fromPubkey: newpublicKey, // the wallet or owner publicKey
            newAccountPubkey: mint.publicKey, // Keypair generate publicKey
            space: MINT_SIZE, // the mint size from the import sdk
            lamports, // get from  the import spl-token getMinimumBalanceForRentExemptMint
            programId: TOKEN_PROGRAM_ID,// the mint size from the import sdk
          }),
          createInitializeMintInstruction(
            mint.publicKey, // Keypair generate publicKey   mintAuthority
            0, // decimal 
            newpublicKey, //payer publicKey
            newpublicKey, //payer freezeAuthority
            TOKEN_PROGRAM_ID
          )
        );
    
    
        let   signaturer = await useWallet.sendTransaction(transaction, connection,{
        signers: [mint],
        }).then((sig) =>{
         console.log(sig)
           console.log( mint.publicKey.toString())
        })
        // await connection.confirmTransaction(signaturer, 'confirmed')
        // console.log(signaturer)
        return mint.publicKey.toString();
    
        }


        GetMintBalance = async (mint) => {
          getWallett()
          const mintInfo = await getMint(
            connection,
            mint
          )


console.log(mintInfo.supply);

        }

        GettokenAccountinfo = async (tokenAccount) => {
          getWallett()
          const tokenAccountInfo = await getAccount(
            connection,
            tokenAccount.address
          )

          console.log(tokenAccountInfo.amount);
          // 0
        }

        GetAlltokenAccountinfo = async () => {
          getWallett()
          const tokenAccounts = await connection.getTokenAccountsByOwner(
           // new PublicKey('8YLKoCu7NwqHNS8GzuvA2ibsvLrsg22YMfMDafxh1B15'),
           newpublicKey,
            {
              programId: TOKEN_PROGRAM_ID,
            }
          );
          console.log("Token                                         Balance");
          console.log("------------------------------------------------------------");
          tokenAccounts.value.forEach((tokenAccount) => {
            const accountData = AccountLayout.decode(tokenAccount.account.data);
            console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
          })
        }




    GetPost = async () => {
        let bd = connection.getProgramAccounts(programId)
        console.log(bd)
        return bd
        }

    	// dev only, use dev connection
        getBalance = async (PubWalletKey) => {
    // CLI: solana airdrop --url devnet 1 <recipientaddress>
try {
//let walletKey = new PublicKey(PubWalletKey)
let newBal = await connection.getBalance(PubWalletKey);
console.log('error', `Airdrop failed! ${newBal}`);
    return newBal;

} catch (error) {
	console.log('error', `Airdrop failed! ${error?.message}`);
}
	
};


	// dev only, use dev connection
airDrop = async (PubWalletKey, lamports = 2 * LAMPORTS_PER_SOL) => {
    // CLI: solana airdrop --url devnet 1 <recipientaddress>
try {
	const signature = await connection.requestAirdrop(
        new  PublicKey(PubWalletKey),
        lamports
    );
   const airdrop =  await connection.confirmTransaction(signature);
   //console.log("airdrop", airdrop)
    return await this.getBalance(publicKey);
} catch (error) {
	console.log('error', `Airdrop failed! ${error?.message}`);
}
   

	
};


  }
