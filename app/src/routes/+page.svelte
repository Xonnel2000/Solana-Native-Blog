<!-- <script>
  import { page } from "$app/stores";
  import Account from "./Account.svelte";
  import Auth from "./Auth.svelte";
</script>

<svelte:head>
  <title>Supabase + SvelteKit</title>
  <meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
  <Auth />
{:else}
  <Account session={$page.data.session} />
{/if} -->
<script lang="ts">
	import Error from "$lib/Error.svelte";
	import Success from "$lib/Success.svelte";
	// import { goto } from "$app/navigation";
	// import { page } from "$app/stores";
	import RepoModal from "$lib/modal/RepoModal.svelte";
	import * as yup from "yup";
	import { Form, Message, isInvalid } from "svelte-yup";
  import { getBlogClient } from '$lib/stores';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import * as web3 from '@solana/web3.js'
  import { paginate, LightPaginationNav } from "svelte-paginate";



	export let data;
  let GeTAllBlog = data.rows
    console.log("blog", GeTAllBlog)
   console.log("user", data.getAlluser)


	import TimeAgo from 'javascript-time-ago'

	/** @type {import('./$types').PageData} */

	import en from "javascript-time-ago/locale/en.json";
	import { BlogGetClient } from "$lib/helpers/blogutili";
	import { onMount, setContext } from 'svelte';


  
	TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')
  
  
	function handlechangeData() {
	  console.log("urls");
	  //goto("/category/" + urls);
	}
  
  
  
	// let typename = "";
	// function closeModal() {
	//   showModal = false;
	// }
  
	let showModal = false;
  function showingModal() {
    showModal = true;
  }
  

  let title = '';
  let text = '';
  let poster_url = '';
 let myBlogs
 let page=0;
	let pageIndex = 0; //first row
  let pageSizeer = 10; //optional, 10 by default

  let loading = true;
  let rowsCount = 0;
  let search = '';




  let schema = yup.object().shape({
    title: yup.string().required().max(30).label(" Title"),
    text: yup.string().required().label("Description"),
    poster_url: yup.string().required().label("Image url"),
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
  let fields = { title: title,  text: text, poster_url: poster_url };
  let submitted = false;
  let isValid;
  let createPostPromise = Promise.resolve({});
  async function formSubmit() {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (isValid) {
      alert("Everything is validated!");
      createPostPromise =  await $getBlogClient.CreateBlog(
         fields.title,
         fields.text,
        fields.poster_url,
      );
    showModal = false;
    }

  }
  $: invalid = (title) => {
    if (submitted) {
      return isInvalid(schema, title, fields);
    }
    return false;
  };

const walletAdd = $walletStore?.publicKey 

async function handleClickDelete(blog_account) {
  //alert(blog_account)
  await $getBlogClient.DeleteBlog(blog_account)
	}



//   $: $getBlogClient && showAllBlog && showAllBlog();
//  const showAllBlog = async () => {
// myBlogs= await $getBlogClient?.fetchPage(
//   page, 
//   pageSizeer,
//       search, 
//       search !== ''
// );

// //console.log("this is myBlogs", myBlogs )
            
// };

  let newSession = data.getAlluser.filter((el) => el.toString().includes(walletAdd.toString()))
 console.log("kkk", newSession)

   let items = GeTAllBlog;
  let currentPage = 1;
  let pageSize = 4;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  </script>


   
           <!-- This example requires Tailwind CSS v2.0+ -->
           <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div class="absolute inset-0">
              <div class="bg-white h-1/3 sm:h-2/3"></div>
            </div>
            <div class="relative max-w-7xl mx-auto">
              <div class="text-center">
                <h2 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">Solana Native blog</h2>
                <!-- { data.getAlluser.publicKey.toString()} -->
                {#if newSession !=""}
                <button class="btn btn-xl" on:click={showingModal}>Add Blog</button>
                {:else}
                <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">Please Update your UserProfile Details</p>

                {/if}
              </div>
<div class="mt-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">


{#if GeTAllBlog.length }
<!-- <h1 class=" overflow-hidden">Your count {rowsCount}</h1> -->
{#each paginatedItems || [] as blog}



      <div class="mt-12 flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-shrink-0">
          <img class="h-48 w-full object-cover" src="{blog.poster_url}" alt="">
        </div>
        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-indigo-600">
              <a href="/blog/{blog.blog}"  class="hover:underline btn btn-sm "> Read</a>

            
              {#if walletAdd?.toString() === blog.user_pda.toString()  }
              <button on:click={() => handleClickDelete(blog.blog)}   class="hover:underline bg-red-600 btn btn-sm"> Delete</button>
              <a href="/blog/edit/{blog.blog}"   class="hover:underline bg-blue-600 btn btn-sm"> Edit</a>
              {/if}
            </p>
            <a href="/blog/{blog.blog}" class="block mt-2">
              <p class="text-xl font-semibold text-gray-900">{blog.title}</p>
              <p class="mt-3 text-base text-gray-500">{blog.text.substring(0, 200)}...</p>
            </a>
          </div>
          <div class="mt-6 flex items-center">
            <div class="flex-shrink-0">
              <a href="#">
                <span class="sr-only">Roel Aufderehar</span>
                <img class="h-10 w-10 rounded-full" src="{blog.image_url}" alt="">
              </a>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                <a href="#" class="hover:underline"> {blog.firstname} </a>
              </p>
            
              <div class="flex space-x-1 text-sm text-gray-500">
                <time datetime="2020-03-16">  {timeAgo.format(
                  new Date(blog.post_time.toNumber() * 1000),
                  'twitter-now',
                )}</time>
                <span aria-hidden="true"> &middot; </span>
                <span> 6 min read </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  

{/each}

{:else}
<h1>No internet</h1>

{/if}
</div>


<!-- start of LightPaginationNav -->
    <div class=" p-5">
  <LightPaginationNav
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  />
</div>
<!-- end of LightPaginationNav -->
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
        Add Blog !
      </h1>

      <Form
        class="form"
        {schema}
        {fields}
        submitHandler={formSubmit}
        {submitted}
      >
        <label class="input-group input-group-vertical mb-5">
          <div class="form-control">
            <label class="input-group input-group-vertical">
              <span>Title </span>
              <input
                type="text"
                id="title"
                placeholder="Title Name"
                class="input input-bordered"
                class:invalid={invalid("title")}
                bind:value={fields.title}
              />
            </label>
            <Message name="title" />
          </div>

		  <!-- <label class="input-group input-group-vertical mb-5">
			<div class="form-control">
			  <label class="input-group input-group-vertical">
				<span>Poster Name</span>
				<input
				  type="text"
				  id="poster_name"
				  placeholder="Type Name"
				  class="input input-bordered"
				  class:invalid={invalid("poster_name")}
				  bind:value={fields.poster_name}
				/>
			  </label>
			  <Message name="poster_name" />
			</div> -->

			<label class="input-group input-group-vertical mb-5">
				<div class="form-control">
				  <label class="input-group input-group-vertical">
					<span>Image Url </span>
					<input
					  type="text"
					  id="poster_url"
					  placeholder="Image Url"
					  class="input input-bordered"
					  class:invalid={invalid("poster_url")}
					  bind:value={fields.poster_url}
					/>
				  </label>
				  <Message name="poster_url" />
				</div>

          <label
            for="comment"
            class="block text-sm font-medium text-white mt-10 "
            >Blog Description *
          </label>
          <!-- <label for="comment" class="block text-sm font-medium text-white ">
            Comma separated list of github/gitlab URLS (e.g.
            https://github.com/bitcoin/bitcoin)</label
          > -->

          <div class="form-control mt-2">
            <label class="input-group input-group-vertical">
              <span>Blog Description *</span>

              <textarea
                rows="12"
                name="text"
                id="text"
                placeholder="blog description"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                class:invalid={invalid("text")}
                bind:value={fields.text}
              />
            </label>
            <Message name="text" />
          </div>

          {#await createPostPromise}
            <button disabled type="button" class="btn">Sending Data!</button>
          {:then { data, error }}
            <!-- <button class="btn">Write and press enter to send data!</button> -->
            {#if data}
              <strong class="text-green-600">Successfully create post!</strong>
            {/if}
            <Error {error} />
          {/await}

          <button
            type="submit"
            class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
          >
            Submit</button
          >
        </label>
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


<style>
	.submit {
		margin: 1em auto;
	}
	.blog {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.new {
		margin: 0 0 0.5rem 0;
	}

	input {
		border: 1px solid transparent;
	}

	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(51, 161, 0, 0.658) !important;
		outline: none;
	}

	input.new {
		font-size: 1.5em;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
		border: 1px solid #b0b9ac !important;
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 100%;
		height: 100%;
		margin: auto;
		text-align: end;
	}


    #avatar {
        border-radius: 99999px;
        height: 128px;
        width: 128px;
        margin-bottom: 10px;
    }

    .hidden {
        display: none;
    }

    .upload-btn {
        width: 128px;
        height: 32px;
        background-color: black;
        font-family: sans-serif;
        color: white;
        font-weight: bold;
        border: none;
    }

    .upload-btn:hover {
        background-color: white;
        color: black;
        outline: black solid 2px;
    }
</style>




  