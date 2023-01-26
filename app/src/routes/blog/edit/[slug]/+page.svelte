<script lang="ts">

export let data;
const blog = data.allBlog
console.log("kkkk", data.slug)

import { getBlogClient } from '$lib/stores';
import { textChangeRangeIsUnchanged } from 'typescript';


let errors = {};

function isNameValid( value:string ) {
    return /^[a-zA-Z]$/.test( value )
}

function isEmailValid( value ) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test( value )
}


// this is the Edit submit form
const editForm = async (event) => {
errors = {}
const formData = new FormData(event.target)
console.log(formData)

let error_flag = false;
let title;
let text;
let poster_url;
let blog_pda = data.slug

for ( let field of formData ) {
        const [key, value] = field;

        // Validate First name and Last_name
        if ( key === 'title' || key === 'text' || key === 'image_url' ) {
            if (value ==="" ) {
                errors[key] = key + ' can only have alphabets'
                error_flag = true
            }
        }

        // Valid Email
        // if ( key === 'email' ) {
        //     if ( !isEmailValid( value ) ) {
        //         errors[key] = 'Invalid Email Id'
        //         error_flag = true
        //     }
        // }

}

if ( !error_flag ) {
    for ( let field of formData ) {
    const [key, value] = field;

    // Valid Email
    if ( key === 'title'  ) {
       title = value
    }
    if ( key === 'text' ) {
       // console.log("fn", value)
       text = value

    }
    if ( key === 'image_url' ) {
        //console.log("ln", value)
       poster_url = value

    }

 

}
// console.log("ln", firstname,lastname,email)
    await $getBlogClient?.EditUser(
     title,
    text,
    poster_url,
    blog_pda
);
    alert('You submit the form.')
}

}
</script>




<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<div class="overflow-hidden bg-white">
    <div class="relative  w-auto max-w-7xl py-16 px-6 lg:px-8">
  
      <h1 class="text-center uppercase font-medium  mb-6">
        Edit This Blog Post !
      </h1>
      <form
      on:submit|preventDefault={editForm}
      >
      <!-- <center><h1>Edit your user account </h1></center> -->
      
              <label class="input-group input-group-vertical mb-5">
              <div class="form-control">
              <label class="input-group input-group-vertical">
                  <span>Title </span>
                  <input
                  placeholder="Title"
                  class="input input-bordered"
                  id="title" name="title" type="text" value="{blog.title}"
                  />
              </label>
              {#if errors.title}
              <p><small style="color: red"> { errors.title } </small></p>
              {/if}
              </div>
      
      
              <label class="input-group input-group-vertical mb-5">
              <div class="form-control">
                  <label class="input-group input-group-vertical">
                  <span>Image Url</span>
                  <input
                      placeholder="Image Url"
                      class="input input-bordered"
                  id="image_url" name="image_url" type="text"  value="{blog.poster_url}" 
                  />
                  </label>
                  {#if errors.image_url}
                      <p><small style="color: red"> { errors.image_url } </small></p>
                  {/if}
              </div>
      
      
              <label
              for="comment"
              class="block text-sm font-medium text-gray-700 mt-10 "
              >Blog Description
              </label>
              
              <div class="form-control mt-2">
              <label class="input-group input-group-vertical">
                  <span>Blog Description</span>
                  <textarea
                  rows="4"
                  name="text"
                  id="text"
                  placeholder="Blog Description"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value="{blog.text}"
                  />
              </label>
              {#if errors.text}
              <p><small style="color: red"> { errors.text } </small></p>
              {/if}
              </div>
      
              <button
              type="submit"
              class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
              >
              Submit</button>
              </label>
      
      </form>

    </div>
  </div>