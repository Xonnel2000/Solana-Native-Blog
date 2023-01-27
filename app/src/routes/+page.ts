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

const fetchUser = async ()=>{

  const user = await MovieCoordinator?.GetAllUserSession(
 connection)

 const returnUser =  user.map((x) => x.authority)
//  console.log("this is jj", jj)
 
 return returnUser

} 





const fetchBlog = async ()=>{
  const bl = await MovieCoordinator?.fetchPage(
    connection, 
    page, 
    pageSize,
        search, 
        search !== ''
  )

  return bl
 }

    return {rows:fetchBlog(), getAlluser:fetchUser()};
  }
