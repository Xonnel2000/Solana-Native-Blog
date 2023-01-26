import { error } from '@sveltejs/kit';
//import { createPost, getPosts,getCat,getRepo, getypename_count } from "$lib/services";
import { page } from "$app/stores";
// const { slug } = $page.params;



let Blogfunction = await import('$lib/helpers/blogfunction');
  const getAlldata = await new Blogfunction.default()

 
/** @type {import('./$types').PageLoad} */
export async function load({params:{slug} }) {
// console.log("thisshh", slug)

/* this function call single post  */
  const data = await getAlldata.GetSinglePost(slug)
 let allBlog = data

   return { slug, allBlog };
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




