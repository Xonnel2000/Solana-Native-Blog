import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh';
import { get } from 'svelte/store';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import BN from "bn.js"
import { Buffer } from 'buffer';


import bs58 from 'bs58';
import alasql from 'alasql';


const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

import { browser } from '$app/environment';






const MOVIE_REVIEW_PROGRAM_ID = '8MxcBdiiHDKUD8qMSWVNMnbK2eEXSZUnERn5PNbsiCMs'
const programId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)

const USERPROFILE_REVIEW_PROGRAM_ID = '6G1cAAbXP7A8nuXqC3r8gGrBwPFkcCx8A85kX1kG65Cf'


const BlogCommentCounterborshAccountSchema = borsh.struct([
    borsh.str('discriminator'),
    borsh.bool('initialized'),
    borsh.u64('counter'),
]) 



const BlogCommentInstructionLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('text'),
])


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

const borshAccountSchema = borsh.struct([

    borsh.str('discriminator'),
    borsh.bool('initialized'),
    borsh.publicKey('user_pda'),
    borsh.publicKey('blog'),
    borsh.u8('bump'),
    borsh.str('title'),
    borsh.str('text'),
    borsh.str('poster_url'),
    borsh.u64('comment_count'),
    borsh.i64('post_time'),
]);



const BlogborshAccountSchema = borsh.struct([
    borsh.str('discriminator'),
    borsh.bool('initialized'),
    borsh.publicKey('authority'),
    borsh.publicKey('blog'),
    borsh.u8('bump'),
    borsh.str('title'),
    borsh.str('text'),
    borsh.str('poster_url'),
    borsh.u64('comment_count'),
    borsh.i64('post_time'),
]) 



const BlogInstructionLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('title'),
    borsh.str('text'),
    borsh.str('poster_url'),
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


export default class Blogfunction{
   
        static accounts = [];
    static Commentaccounts = [];
    static newuseraccounts = [];
    
    

     prefetchAccounts = async (connection, search) =>{
        const offset = 4 + 6 + 1 + 32 + 32 + 1 + 4

        const accounts = await connection.getProgramAccounts(new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID), {
            dataSlice: { offset: 0, length: offset + 50 },
        
            filters: 
            search === ""
            ? [
                  {
                      memcmp: {
                          offset: 4,
                          bytes: bs58.encode(Buffer.from("blog")),
                      },
                  },
              ]
            : [
                  {
                      memcmp: {
                          offset: offset,
                          bytes: bs58.encode(Buffer.from(search)),
                      },
                  },
              ],
        });
        accounts.sort((a, b) => {
            const lengthA = a.account.data.readUInt32LE(0);
            const lengthB = b.account.data.readUInt32LE(0);
            const dataA = a.account.data.slice(offset, offset + lengthA);
            const dataB = b.account.data.slice(offset, offset + lengthB);
            return dataB.compare(dataA);
        });
        Blogfunction.accounts = accounts.map(account => account.pubkey);
    }
     fetchPage = async(page, perPage, search, reload = false)=> {
        console.log(perPage, search, page);
        //page = 0
        //console.log("this account tt ", Blogfunction.accounts.toString());
        if (Blogfunction.accounts.length === 0 || reload) {
            await this.prefetchAccounts(connection, search);
        }

        const paginatedPublicKeys = Blogfunction.accounts.slice(page, perPage);
        //console.log("this account ff", paginatedPublicKeys.toString());
        if (paginatedPublicKeys.length === 0) {
            return [];
        }

        const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys);
        const movies = accounts.reduce((accum, account) => {
     //  console.log("jhhhh", account?.data)

            const movie = borshAccountSchema.decode(account?.data);
            if (!movie) {
                return accum; 
            }
            return [...accum, movie];
        }, []);

        await this.GetAllUser(connection);
        const olduser = Blogfunction.newuseraccounts
       console.log("olduser", olduser)
       console.log("this is nomove",  movies)



        const res = alasql('SELECT * FROM ? movies Inner JOIN ? olduser ON movies.user_pda.toString() = olduser.authority.toString()',[movies, olduser]);
       console.log("this is res", res)

    // //    console.log(alasql('SELECT movies.*, olduser.* FROM movies JOIN olduser ON olduser.authority.PublicKey=moviesuser_id.PublicKey'))

      return res;
        
    }

     GetAllUser = async (connection)=>{
        const accounts = await connection.getProgramAccounts(new web3.PublicKey
            (USERPROFILE_REVIEW_PROGRAM_ID))


            const we = accounts.map(({ pubkey, account }) => {
                //console.log('Account:', pubkey.toBase58())
                 console.log('Data buffer:', account.data)
                //return borshAccountSchema.decode(account.data)
                const rr = UserprofileborshAccountSchema.decode(account.data);
              //  console.log("this rrrr1", rr);
                return rr
            });

         
           // console.log("this rrrr12", we);

           return Blogfunction.newuseraccounts =  we;
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




   CreateBlogComment = async ( text:string, blog_pda:any)=> {
    let wallet = get(walletStore)
    PubWalletKey = wallet?.publicKey;
     userPublickey = new web3.PublicKey(PubWalletKey);
console.log("this is the ", userPublickey?.toString())
console.log("this is the programId ", programId.toString())
console.log("this is the text ", text)
console.log("this is the blog_pda ", blog_pda)

const new_blog_pda = new web3.PublicKey(blog_pda)





  //  let bufferPost = Buffer.alloc(1000)
   let bufferState = Buffer.alloc(1000)

    //const bufferState = Buffer.alloc(BlogInstructionLayout.span);
    // BlogInstructionLayout.encode({
    //   variant: 0
    // }, bufferState);


    BlogCommentInstructionLayout.encode(
        {
            variant: 3,
            text: text,
        },
        bufferState
    )

  

   bufferState = bufferState.slice(0, BlogCommentInstructionLayout.getSpan(bufferState))

    console.log(bufferState)
   // console.log(bufferPost)
    let mintPayloadCopy =  BlogCommentInstructionLayout.decode(bufferState)
    console.log(mintPayloadCopy)
//     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
//    console.log(mintPayloadCopy)

   

    // // blog post
    const [CounterPda] = await web3.PublicKey.findProgramAddressSync(
       [new_blog_pda.toBuffer(), Buffer.from("comment"),],
        programId
    ) // ABCD


    const account = await connection.getAccountInfo(CounterPda)
    console.log("account is:", account?.data)

    let commentCount = await BlogCommentCounterborshAccountSchema.decode(account?.data)

       // blog post
       const [CommentPda] = await web3.PublicKey.findProgramAddressSync(
        [ new_blog_pda.toBuffer(),new BN([commentCount.counter]).toArrayLike(Buffer, "be", 8),],
         programId
     ) // ABCD

 



    console.log("blog_pda is:", blog_pda)
    console.log("Commentpda is:", CommentPda.toBase58())
    console.log("CounterPda is:", CounterPda.toBase58())
    console.log("commentCount is:", new BN(commentCount.counter).toString())
    // console.log("commentCount2 is:", commentCount.counter)
    // console.log("commentCount is:",   new BN([commentCount.count]).toArrayLike(Buffer, "be", 8))



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
            pubkey: new_blog_pda,
            isSigner: false,
            isWritable: true
        },
           {
               pubkey: CounterPda,
               isSigner: false,
               isWritable: true
           },
           {
            pubkey: CommentPda,
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

    DeleteBlog = async (blog_account)=> {
        let wallet = get(walletStore)
        PubWalletKey = wallet?.publicKey;
         userPublickey = new web3.PublicKey(PubWalletKey);
    console.log("this is the ", userPublickey?.toString())
    console.log("this is the programId ", programId.toString())
    
    let bufferState = Buffer.alloc(1000)
    
    //const bufferState = Buffer.alloc(BlogInstructionLayout.span);
    // BlogInstructionLayout.encode({
    //   variant: 0
    // }, bufferState);


    BlogInstructionLayout.encode(
        {
            variant: 2
        },
        bufferState
    )
    bufferState = bufferState.slice(0, BlogInstructionLayout.getSpan(bufferState))

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
                   pubkey: blog_account,
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


EditUser = async (title:string, text:string, poster_url:string, blog_pda:web3.PublicKey)=> {
        let wallet = get(walletStore)
        PubWalletKey = wallet?.publicKey;
         userPublickey = new web3.PublicKey(PubWalletKey);
    console.log("this is the edit ", userPublickey?.toString())
    console.log("this is the programId ", programId.toString())
    console.log("this is the programId ", title)
    console.log("this is the text ", text)
    console.log("this is the programId ", poster_url)
    
    
      //  let bufferPost = Buffer.alloc(1000)
       let bufferState = Buffer.alloc(1000)
    
        //const bufferState = Buffer.alloc(BlogInstructionLayout.span);
        // BlogInstructionLayout.encode({
        //   variant: 0
        // }, bufferState);

    
    
        BlogInstructionLayout.encode(
            {
                variant: 1,
                title: title,
                text: text,
                poster_url: poster_url,
            },
            bufferState
        )

        console.log("Statepda is:", bufferState)

    
      
    
       bufferState = bufferState.slice(0, BlogInstructionLayout.getSpan(bufferState))
    
        console.log(bufferState)
       // console.log(bufferPost)
        let mintPayloadCopy =  BlogInstructionLayout.decode(bufferState)
        console.log(mintPayloadCopy)
    //     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
    //    console.log(mintPayloadCopy)
    
       
    
        // // blog post
        // const [blog_pda] = await web3.PublicKey.findProgramAddressSync(
        //    [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
        //     programId
        // ) // ABCD
    
    
    
        console.log("Statepda is:", blog_pda)
    
    
    
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
                   pubkey: blog_pda,
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


    




   CreateBlog = async (title:string, text:string, poster_url:string)=> {
    let wallet = get(walletStore)
    PubWalletKey = wallet?.publicKey;
     userPublickey = new web3.PublicKey(PubWalletKey);
console.log("this is the ", userPublickey?.toString())
console.log("this is the programId ", programId.toString())




  //  let bufferPost = Buffer.alloc(1000)
   let bufferState = Buffer.alloc(1000)

    //const bufferState = Buffer.alloc(BlogInstructionLayout.span);
    // BlogInstructionLayout.encode({
    //   variant: 0
    // }, bufferState);


    BlogInstructionLayout.encode(
        {
            variant: 0,
            title: title,
            text: text,
            poster_url: poster_url,
        },
        bufferState
    )

  

   bufferState = bufferState.slice(0, BlogInstructionLayout.getSpan(bufferState))

    console.log(bufferState)
   // console.log(bufferPost)
    let mintPayloadCopy =  BlogInstructionLayout.decode(bufferState)
    console.log(mintPayloadCopy)
//     let mintPayloadCopy =  movieInstructionLayout.decode(bufferPost)
//    console.log(mintPayloadCopy)

   

    // // blog post
    const [BlogPda] = await web3.PublicKey.findProgramAddressSync(
       [ userPublickey.toBuffer(),Buffer.from(title),],
        programId
    ) // ABCD

      // // blog post
      const [CommentPda] = await web3.PublicKey.findProgramAddressSync(
        [ BlogPda.toBuffer(),Buffer.from("comment"),],
         programId
     ) // ABCD



    console.log("Blogpda is:", BlogPda.toBase58())
    console.log("Commentpda is:", CommentPda.toBase58())



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
               pubkey: BlogPda,
               isSigner: false,
               isWritable: true
           },
           {
            pubkey: CommentPda,
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

//      const [blogAccount] = await web3.PublicKey.findProgramAddressSync(
//         [ Buffer.from("userprofile"),userPublickey.toBuffer(),],
//         movieProgramId
//       );
//    console.log("this is account ", blogAccount)

//let userprofileAccount = await connection.getProgramAccounts(movieProgramId)

const accounts = await connection.getProgramAccounts(movieProgramId).then(accounts => {
    //console.log(accounts)
    const we = accounts.map(({ pubkey, account }) => {
        //console.log('Account:', pubkey.toBase58())
        // console.log('Data buffer:', account.data)
        //return borshAccountSchema.decode(account.data)
        const rr = BlogborshAccountSchema.decode(account.data);
        console.log("this rrrr", rr);
    });
   return we;
});

    
 //console.log("this is Getpost", userprofileAccount)
//    console.log(pdaProgramId.toBase58())

//      const blogAccountInfo = await connection.getAccountInfo(blogAccount);
//    console.log("this is blog ", blogAccountInfo)

//       const blogAccountStateing = BlogborshAccountSchema.decode(
//         blogAccountInfo?.data
//       );

//       let firstname= blogAccountStateing.firstname
//       let lastname= blogAccountStateing.lastname
//       let email= blogAccountStateing.email
//       let image_url= blogAccountStateing.lastname



//    console.log("this is final", firstname, lastname)

// return  blogAccountStateing

    }

     GetSinglePost = async(title)=> {
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
        const movieProgramId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID);
        const pdaProgramId = new web3.PublicKey(title);
        let bd = connection.getProgramAccounts(movieProgramId);
    
        const blogAccountInfo = await connection.getAccountInfo(pdaProgramId);
        const blogAccountState = BlogborshAccountSchema.decode(blogAccountInfo.data);
        console.log(blogAccountState);
        return blogAccountState;
    }



    
 
}
