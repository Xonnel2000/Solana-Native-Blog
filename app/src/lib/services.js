// import { supabase } from "$lib/supabaseClient";

// // import en from "javascript-time-ago/locale/en" assert { type: "json" };

// export async function getPosts() {
//     let {data, error} = await supabase
//       .from('typename')
//       .select('*')
//       .order('created_at', {ascending: false})
//     //   console.log(data)
//       //.limit(5)
//     return {data, error}


// }

// export async function getCat(id) {
//   // console.log("this is ",id)

//   let {data, error} =   await supabase
//   .from('typename')
//   .select('id,name')
//   .eq('id', id)
//      //console.log(data)
//     //.limit(5)
//   return {data, error}


// }

// // export async function getRepo(id) {
// //   // console.log("this is ",id)

// //   let {data, error} =   await supabase
// //   .from('repo')
// //   .select('*')
// //   .eq('repo_id', id)
// //      //console.log(data)
// //     //.limit(5)
// //   return {data, error}


// // }

// export async function getLastupdate_repo() {

//   const { data, error } = await supabase
// .from('repo')
// .select('*')
// .order('created_at', {ascending: false})
// .limit(1)




//   let lastupdate = data

// return {lastupdate}

// }


// export async function getTotal_repo() {

//   const { count, error } = await supabase
// .from('repo')
// .select('*', { count: 'exact', head: true })



//   let newerror = error

// return {count, newerror}

// }


// export async function getypename_count(id) {

    
//       const { count, error } = await supabase
//   .from('repo_count')
//   .select('*', { count: 'exact', head: true })
//   .eq('repo_count_id',id)


//       let newerror = error

//     return {count, newerror}

// }


// export async function getRepo(id) {

//   let {data, error} =   await supabase
//   .from('repo')
//   .select('*')
//   .eq('repo_id', id)
// .order('created_at', {ascending: false})

// if (error) return {data, error}

// data = await Promise.all(data.map(async (post) => {
// const [{count: likes,}] = await Promise.all([
//   await supabase
//     .from('visit_count')
//     .select('id', { count: 'estimated', head: true })
//     .eq('repository_id', post.id)
//   // await supabase
//   //   .from('comments')
//   //   .select('*')
//   //   .eq('post', post.id),
//   // post.image ? await supabase.storage.from('images').getPublicUrl(post.image.split('/').slice(1).join('/')) : Promise.resolve({})
// ])
// // ERROR HANDLE!!!
// return {
//   ...post, likes, 
// }
// }))
// return {data, error}
// }

  
// export async function createPost({name, typename_url}) { // user is user's email
// 	console.log(name, typename_url)

//     const {data, error} = await supabase
//       .from('typename')
//       .insert({name:name, typename_url:typename_url})
//       .select()

//     return {data, error}

    
  
// }

// export async function createVisitCount({repo_id}) { // user is user's email
//   const {data, error} = await supabase
//     .from('visit_count')
//     .insert({repository_id:repo_id})
//     .select()

//     console.log(error)
//     console.log(data)

//   return {data, error}

// }

// export async function createRepoCount({repo_id}) { // user is user's email
//     const {data, error} = await supabase
//       .from('repo_count')
//       .insert({repo_count_id:repo_id})
//       .select()

//     return {data, error}
  
// }


// export async function createRepo({repo_name, repo_id, repo_url, repo_address}) { // user is user's email

//       const {data, error}  = await 
//         await supabase
//         .from('repo')
//         .insert({repo_name, repo_url, repo_address, repo_id})
//         .select()
//       // ERROR HANDLE!!!
//       return {data, error}
    
// }

// // export async function createRepo({repo_name, repo_id, repo_url, repo_address}) { // user is user's email
// // 	console.log(name, repo_url, repo_address)




// //       const [{data}, {error} ] = await Promise.all([
// //         await supabase
// //         .from('repo')
// //         .insert({repo_name, repo_url, repo_address, repo_id})
// //         .select(),
// //         await supabase
// //         .from('repo_count')
// //         .insert({repo_count_id:repo_id})
// //         .select()
// //       ])
// //       // ERROR HANDLE!!!
// //       return {data, error}
    
// // }