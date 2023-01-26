// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
//import { createPost, getPosts,getTotal_repo,getLastupdate_repo } from "$lib/services";


// let myBlogs
// const showAllBlog = async () => {
// myBlogs = await getAllBloging?.GetPost();
// };

import  {MovieCoordinator} from '$lib/helpers/moviecod';
import * as web3 from '@solana/web3.js'


let rows =[]
let getAlluser 

let page=0;
; //first page
	let pageIndex = 0; //first row
  let pageSize = 10; //optional, 10 by default

  let loading = true;
  let rowsCount = 0;
  let search = '';


const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
   // const en = require("javascript-time-ago/locale/en.json");


/** @type {import('./$types').PageLoad} */
export async function load() {

  const data = await MovieCoordinator?.fetchPage(
  connection, 
  page, 
  pageSize,
      search, 
      search !== ''
  ).then((url) => {
  // I forgot to return this
  rows = url;
  //console.log(url)
  rowsCount = url.length;
  loading = false;
});
//     const {data, error} = await getPosts()
// const {count, newerror} = await getTotal_repo()
// const {lastupdate} = await getLastupdate_repo()
// let ctreatedAt
// lastupdate?.forEach((newname)=>{
//  ctreatedAt = newname.created_at
// })



const allUser = await MovieCoordinator?.GetAllUserSession(
  connection
  ).then((user) => {
  // I forgot to return this
  getAlluser = user.map((x) => x.authority)
  //console.log(user)
  rowsCount = user.length;
  loading = false;
});

//console.log("thsi is user new", getAlluser)


    return {getAlluser , rows
    };
  }
