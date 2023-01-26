// // since there's no dynamic data here, we can prerender
// // it so that it gets served as a static asset in production
// export const prerender = true;
// //import { createPost, getPosts,getTotal_repo,getLastupdate_repo } from "$lib/services";

// import { get } from 'svelte/store';


// import  {MovieCoordinator} from '$lib/helpers/moviecod';
// import { getUserProfileClient } from '$lib/stores';







// import * as web3 from '@solana/web3.js'



// let userpro


// const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
//    // const en = require("javascript-time-ago/locale/en.json");


// /** @type {import('./$types').PageLoad} */
// export async function load() {
// 	//let UserProfile = await import('$lib/helpers/userprofile');
//   let gatAll = get(getUserProfileClient)
//   console.log("this is gatAll", gatAll)

//   const data =await gatAll?.GetPost().then((url) => {
//   // I forgot to return this
//   userpro = url;
// });
// //     const {data, error} = await getPosts()
// // const {count, newerror} = await getTotal_repo()
// // const {lastupdate} = await getLastupdate_repo()
// // let ctreatedAt
// // lastupdate?.forEach((newname)=>{
// //  ctreatedAt = newname.created_at
// // })

// //console.log(rows)
// console.log("this is url", userpro)


//     return {userpro};
//   }
