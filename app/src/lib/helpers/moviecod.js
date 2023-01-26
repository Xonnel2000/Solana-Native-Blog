import bs58 from 'bs58';
import alasql from 'alasql';
import * as web3 from '@solana/web3.js';
import * as borsh from '@project-serum/borsh';
const MOVIE_REVIEW_PROGRAM_ID_new  = '9Tki1a4U4ELHpLEyFSrsERKuMcyizETUhaA69csNXNGe';
// const MOVIE_REVIEW_PROGRAM_ID = '4gcxocArGEAonypNxaHwE77RhNGjdYnjCEiVrePNoUs4';
const MOVIE_REVIEW_PROGRAM_ID = '8MxcBdiiHDKUD8qMSWVNMnbK2eEXSZUnERn5PNbsiCMs'
import { Buffer } from 'buffer';

const USERPROFILE_REVIEW_PROGRAM_ID = '6G1cAAbXP7A8nuXqC3r8gGrBwPFkcCx8A85kX1kG65Cf'




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




const borshCommentAccountSchema = borsh.struct([

    borsh.str('discriminator'),
    borsh.bool('initialized'),
    borsh.publicKey('blog_pda'),
    borsh.i64('comment_time'),
    borsh.publicKey('commenter'),
    borsh.str('comment'),
    borsh.u64('count'),
]);


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
export class MovieCoordinator {
    static accounts = [];
    static Commentaccounts = [];
    static newuseraccounts = [];

    static async prefetchCommentAccounts(connection, search) {
        const offset = 4 + 6 + + 1 + 8

        const accounts = await connection.getProgramAccounts(new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID), {
            dataSlice: { offset: 0, length: offset + 50 },
        
            filters: 
            search === ""
            ? [
                  {
                      memcmp: {
                          offset: 4,
                          bytes: bs58.encode(Buffer.from("comment")),
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
            return dataA.compare(dataB);
        });
        this.Commentaccounts = accounts.map(account => account.pubkey);
    }
    static async fetchCommentPage(connection, page, perPage, search, reload = false, slug) {
        console.log(perPage, search, page);
        //page = 0
        console.log("this account tt ", this.Commentaccounts.toString());
        if (this.accounts.length === 0 || reload) {
            await this.prefetchCommentAccounts(connection, search);
        }

        const paginatedCommentPublicKeys = this.Commentaccounts.slice(page, perPage);
        console.log("this account ff", paginatedCommentPublicKeys.toString());
        if (paginatedCommentPublicKeys.length === 0) {
            return [];
        }

        const commentingaccounts = await connection.getMultipleAccountsInfo(paginatedCommentPublicKeys);
        const allComment = commentingaccounts.reduce((accum, account) => {
      // console.log("jhhhh", account?.data)

            const comment = borshCommentAccountSchema.decode(account?.data);
            if (!comment) {
                return accum; 
            }
            return [...accum, comment];
        }, []);

        await this.GetAllUser(connection);
        const olduser = this.newuseraccounts
      // console.log("olduser", olduser)
      // console.log("this is nomove",  allComment)

    // // //    console.log(alasql('SELECT movies.*, olduser.* FROM movies JOIN olduser ON olduser.authority.PublicKey=moviesuser_id.PublicKey'))


    let Newcomment = allComment.filter((el) => el.blog_pda.toString().includes(slug.toString()))

    const res = alasql('SELECT * FROM ? Newcomment Inner JOIN ? olduser ON Newcomment.commenter.toString() = olduser.authority.toString()',[Newcomment, olduser]);
     //console.log("this is res", res)
     // console.log("this is nomove",  Newcomment)

      return res;
        
    }

















    static async prefetchAccounts(connection, search) {
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
            return dataA.compare(dataB);
        });
        this.accounts = accounts.map(account => account.pubkey);
    }
    static async fetchPage(connection, page, perPage, search, reload = false) {
        console.log(perPage, search, page);
        //page = 0
        console.log("this account tt ", this.accounts.toString());
        if (this.accounts.length === 0 || reload) {
            await this.prefetchAccounts(connection, search);
        }

        const paginatedPublicKeys = this.accounts.slice(page, perPage);
        console.log("this account ff", paginatedPublicKeys.toString());
        if (paginatedPublicKeys.length === 0) {
            return [];
        }

        const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys);
        const movies = accounts.reduce((accum, account) => {
       console.log("jhhhh", account?.data)

            const movie = borshAccountSchema.decode(account?.data);
            if (!movie) {
                return accum; 
            }
            return [...accum, movie];
        }, []);

        await this.GetAllUser(connection);
        const olduser = this.newuseraccounts
      // console.log("olduser", olduser)
       console.log("this is nomove",  movies)



        const res = alasql('SELECT * FROM ? movies Inner JOIN ? olduser ON movies.user_pda.toString() = olduser.authority.toString()',[movies, olduser]);
      // console.log("this is res", res)

    // //    console.log(alasql('SELECT movies.*, olduser.* FROM movies JOIN olduser ON olduser.authority.PublicKey=moviesuser_id.PublicKey'))

      return res;
        
    }





    

    static async GetAllUser(connection){
        const accounts = await connection.getProgramAccounts(new web3.PublicKey
            (USERPROFILE_REVIEW_PROGRAM_ID))


            const we = accounts.map(({ pubkey, account }) => {
                //console.log('Account:', pubkey.toBase58())
                // console.log('Data buffer:', account.data)
                //return borshAccountSchema.decode(account.data)
                const rr = UserprofileborshAccountSchema.decode(account.data);
              //  console.log("this rrrr1", rr);
                return rr
            });

         
           // console.log("this rrrr12", we);

           return this.newuseraccounts =  we;
    }

    static async GetAllUserSession(connection){
        const accounts = await connection.getProgramAccounts(new web3.PublicKey
            (USERPROFILE_REVIEW_PROGRAM_ID))


            const we = accounts.map(({ pubkey, account }) => {
                //console.log('Account:', pubkey.toBase58())
                // console.log('Data buffer:', account.data)
                //return borshAccountSchema.decode(account.data)
                const rr = UserprofileborshAccountSchema.decode(account.data);
              //  console.log("this rrrr1", rr);
                return rr
            });

         
           // console.log("this rrrr12", we);

           return  we;
    }
    static async GetPost(title) {
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
        const movieProgramId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID);
        const pdaProgramId = new web3.PublicKey(title);
        let bd = connection.getProgramAccounts(movieProgramId);
        //      const [blogAccount] = await web3.PublicKey.findProgramAddress(
        //         [pdaProgramId.toBuffer()],
        //         movieProgramId
        //       );
        //    console.log(blogAccount.toBase58())
        //    console.log(pdaProgramId.toBase58())
        const blogAccountInfo = await connection.getAccountInfo(pdaProgramId);
        const blogAccountState = borshAccountSchema.decode(blogAccountInfo.data);
        console.log(blogAccountState);
        return blogAccountState;
    }
}
