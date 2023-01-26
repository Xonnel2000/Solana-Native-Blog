import bs58 from 'bs58'
import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh';



// const MOVIE_REVIEW_PROGRAM_ID = '4gcxocArGEAonypNxaHwE77RhNGjdYnjCEiVrePNoUs4'
const MOVIE_REVIEW_PROGRAM_ID = 'GChgB5YZ4ZhvqvvSYDX2jkvmU3p31Q6AZFWf4jv4u4AJ'

  
const borshAccountSchema = borsh.struct([
    borsh.bool('initialized'),
    borsh.publicKey('authority'),
    borsh.publicKey('blog'),
    borsh.u8('bump'),
    borsh.str('title'),
    borsh.str('text'),
    borsh.str('poster_name'),
    borsh.str('poster_url'),
    borsh.u64('comment_count'),
    borsh.i64('post_time'),
]) 

export class MovieCoordinator {
    static accounts: web3.PublicKey[] = []

    static async prefetchAccounts(connection: web3.Connection, search: string) {
        const accounts = await connection.getProgramAccounts(
            new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
            {
                dataSlice: { offset: 2, length: 18 },
                filters: search === '' ? [] : [
                    { 
                        memcmp: 
                            { 
                                offset: 6, 
                                bytes: bs58.encode(Buffer.from(search))
                            }
                    }
                ]
            }
        )

        accounts.sort( (a, b) => {
            const lengthA = a.account.data.readUInt32LE(0)
            const lengthB = b.account.data.readUInt32LE(0)
            const dataA = a.account.data.slice(4, 4 + lengthA)
            const dataB = b.account.data.slice(4, 4 + lengthB)
            return dataA.compare(dataB)
        })

        this.accounts = accounts.map(account => account.pubkey)
    }

    static async fetchPage(connection: web3.Connection, page: number, perPage: number, search: string, reload: boolean = false): Promise<Movie[]> {
        console.log(perPage,search,page)
        //page = 0
        console.log("this account ", this.accounts)
        if (this.accounts.length === 0 || reload) {
            await this.prefetchAccounts(connection, search)
        }

        const paginatedPublicKeys = this.accounts.slice(
            page,perPage,
        )
        console.log("this account ", paginatedPublicKeys)


        if (paginatedPublicKeys.length === 0) {
            return []
        }

        const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys)

        const movies = accounts.reduce((accum: Movie[], account) => {
            const movie = borshAccountSchema.decode(account?.data)
            if (!movie) {
                return accum
            }

            return [...accum, movie]
        }, [])

        return movies
    }


        static async GetPost(title){
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
        const movieProgramId = new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        const pdaProgramId = new web3.PublicKey(title)
        let bd = connection.getProgramAccounts(movieProgramId)

    //      const [blogAccount] = await web3.PublicKey.findProgramAddress(
    //         [pdaProgramId.toBuffer()],
    //         movieProgramId
    //       );
        
    //    console.log(blogAccount.toBase58())
    //    console.log(pdaProgramId.toBase58())

          const blogAccountInfo = await connection.getAccountInfo(pdaProgramId);
          const blogAccountState = borshAccountSchema.decode(
            blogAccountInfo.data
          );
    
    
 
       console.log(blogAccountState)
       
        return blogAccountState
        }
}