import { error } from '@sveltejs/kit';
//import { createPost, getPosts,getCat,getRepo, getypename_count } from "$lib/services";
import { page } from "$app/stores";
// const { slug } = $page.params;


import  {MovieCoordinator} from '$lib/helpers/moviecod';
import * as web3 from '@solana/web3.js'
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

let Blogfunction = await import('$lib/helpers/blogfunction');
  const getAlldata = await new Blogfunction.default()

  let getAlluser
  let rows = []
  let loading = true;
  let rowsCount = 0;

  let pagecomment=0;
  let pageIndex = 0; //first row
  let pageSize = 10; //optional, 10 by default


  let search = '';
 
/** @type {import('./$types').PageLoad} */
export async function load({params:{slug} }) {
//  console.log("thisshh", slug)


/* this function call single post  */
  const data = await getAlldata.GetSinglePost(slug)
 let allBlog = data

/* this function call all user  */
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

/* this function call all Comment  */
  const commentdata = await MovieCoordinator?.fetchCommentPage(
    connection, 
    pagecomment, 
    pageSize,
        search, 
        search !== '',
        slug
    ).then((url) => {
    // I forgot to return this
    rows = url;
    //console.log(url)
    rowsCount = url.length;
    loading = false;
  });
  
     
  // console.log(q)
   return { slug, allBlog,getAlluser,rows };
}

// export async function load({ params }) {
  
// //   let [id, name] = data;

//    // console.log(params.id)
//    // console.log(params.name)
  
// //   const {data, error} = await getCat(params.slug)

// //   let [id, name] = data;
// //  // console.log(id, name)


//   return {
//     post:
// params
//   };
 
// }




