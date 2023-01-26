<script>
	import RepoModal from "$lib/modal/RepoModal.svelte";
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
  import { getBlogClient } from '$lib/stores';
  import * as yup from "yup";
	import { Form, Message, isInvalid } from "svelte-yup";




export let data;
const blog = data.allBlog
const allComment = data.rows
console.log("kkkk", allComment)

  let text = '';
  let blog_pda = data.slug
 

  let schema = yup.object().shape({
    // title: yup.string().required().max(30).label(" Title"),
    text: yup.string().required().label("Description"),
    // poster_url: yup.string().required().label("Image url"),
    // email: yup.string().required().email().label("Email address"),
    // age: yup
    //   .number()
    //   .required()
    //   .min(18)
    //   .label("Age")
    //   .nullable(true)
    //   .transform((v, o) => (o === "" ? null : v)),
    // answer: yup
    //   .number()
    //   .required()
    //   .positive()
    //   .oneOf([6], "Answer is wrong")
    //   .label("Answer")
    //   .nullable(true)
    //   .transform((v, o) => (o === "" ? null : v)),
    // gender: yup.string().required().label("Gender"),
  });
  let fields = {   text: text};
  let submitted = false;
  let isValid;
  async function formSubmit() {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (isValid) {
      alert("Everything is validated!");
        await $getBlogClient.CreateBlogComment(
         fields.text,
         blog_pda
      );
    }
  }
  $: invalid = (title) => {
    if (submitted) {
      return isInvalid(schema, title, fields);
    }
    return false;
  };



let showModal = false;
  function showingModal() {
    showModal = true;
  }

const walletAdd = $walletStore?.publicKey 

let newSession = data.getAlluser.filter((el) => el.toString().includes(walletAdd.toString()))
 console.log("kkk", newSession)

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
    <div class="relative mx-auto max-w-7xl py-16 px-6 lg:px-8">
      <div class="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block"></div>
      <div class="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 class="text-lg font-semibold text-indigo-600">by {blog.authority}</h2>
          <h3 class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{blog.title}</h3>
          {#if newSession !=""}
          <button class="btn btn-xl" on:click={showingModal}>Add Comment</button>
          {/if}
        </div>
      </div>
      <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative lg:col-start-2 lg:row-start-1">
          <svg class="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
            <defs>
              <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
          </svg>
          <div class="relative mx-auto max-w-prose text-base lg:max-w-none">
            <figure>
              <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                <img class="rounded-lg object-cover object-center shadow-lg" src="{blog.poster_url}" alt="Whitney leaning against a railing on a downtown street" width="1184" height="1376">
              </div>
             
            </figure>



            <div class="bg-white">
                <div>

                 {#if allComment.length }
                 <h2 class="font-medium text-gray-900 mt-2 mb-2 text-center">Read Comment </h2>
                 <hr>


                  {#each allComment as comment }

                    
              
                  <div class="-my-2  mt-1 border-2">
                    <div class="flex space-x-4 justify-items-center mx-2 text-sm text-gray-500">
                      <div class="flex-none py-10">
                        <img src="{comment.image_url}" alt="" class="h-10 w-10 rounded-full bg-gray-100">
                      </div>
                      <div class="flex-1 py-10">
                        <h3 class="font-medium text-gray-900">{comment.firstname}</h3>
                        <p><time datetime="2021-07-16">July 16, 2021</time></p>
              
                        <p class="sr-only">5 out of 5 stars</p>
              
                        <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    </div>

                    <!-- More reviews... -->
                  </div>
                  {/each}
                  {/if}

                </div>
              </div>
          </div>
        </div>
        <div class="mt-8 lg:mt-0">
          <!-- <div class="mx-auto max-w-prose text-base lg:max-w-none">
            <p class="text-lg text-gray-500">Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
          </div> -->
          <div class="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
            <p>{blog.text}</p>
          </div>
        </div>
      </div>
    </div>
  </div>






  <!-- this is modal div -->

{#if showModal}
<RepoModal
  on:click={() => {
    showModal = false;
  }}
>
  <span slot="body">
    <h1 class="text-center uppercase font-medium  mb-6">
     Comment on this blog
    </h1>

    <Form
      class="form"
      {schema}
      {fields}
      submitHandler={formSubmit}
      {submitted}
    >
   

        <label
          for="comment"
          class="block text-sm font-medium text-gray-700 mt-10 "
          >Blog Comment
        </label>
        

        <div class="form-control mt-2">
          <label class="input-group input-group-vertical">
            <span>Blog Comment</span>

            <textarea
              rows="4"
              name="text"
              id="text"
              placeholder="Add Comment"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              class:invalid={invalid("text")}
              bind:value={fields.text}
            />
          </label>
          <Message name="text" />
        </div>


        <button
          type="submit"
          class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
        >
          Submit</button
        >
    </Form>
  </span>
  <!-- <span slot="button" let:hover={hovering}>
  <button
    on:click={() => {
      showModal = false;
    }}
    class="bg-pink-500 text-white uppercase font-medium text-white p-2 rounded-md"
  >
    Close</button
  >
</span> -->
</RepoModal>
{/if}