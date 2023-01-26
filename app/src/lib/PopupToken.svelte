<script>
	//import MarkdownEditor from '$lib/MarkdownEditor.svelte';
    //import { adapter, connected, anchorClient } from '$lib/stores';
	//import frontmatter from '@github-docs/frontmatter';
	//import Bio from '$lib/Bio.svelte';
	//import { onMount, setContext } from 'svelte';
    //import { accountSize } from '@project-serum/anchor/dist/cjs/coder';
	//import ListBlogs from '$lib/ListBlogs.svelte';
	//import BlogDetails from '$lib/BlogDetails.svelte';
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { get,  } from 'svelte/store';
    import {   getNativeClient, getTokenClient} from '$lib/stores';
   import { LENNOX_TokenAccount, DODO_TokenAccount,LENNOX_MINT } from "$lib/helpers/const"




    // export let message = 'Hi';
   
    let toTokenAccount = DODO_TokenAccount;
    let fromTokenAccount = LENNOX_TokenAccount;
    //let frommintAccount = 'FiTue8mBWEw5nYPA4P8g2nafyaLa7rTa7By2TVn7McMC';
//     const myBigInt = BigInt(moni);  // `10n` also works
// const myNumber = Number(myBigInt);
    
    //  let bio;
    // export let img;
    // export let blogId


    let myBlogs

    const handleTransferToken = async () => {
    
		//console.log("reaching", moni,toTokenAccount)

          await $getTokenClient?.transferToken(fromTokenAccount,toTokenAccount);
         // 

	};
  </script>


<div class="container h-2/4 w-full">

  
  <!-- <p>🎉 {message} 🍾</p> -->


  <!-- <input class="new" placeholder="Solana Blog Title" bind:value={username} /> -->
  <!-- <input class="new" placeholder="Online image url" bind:value={img} />
  <h2>New Comment:</h2>
  <div class="view">
      <textarea bind:value={bio} />
  </div>
  <button on:click={handleCreateBlog}
  >Create {myBlogs?.length > 0 ? 'Another' : 'New'} Comment</button
> -->

<div>
    <label for="email" class="block text-sm font-medium text-gray-700">toTokenAccount  </label>
    <div class="mt-1">
      <input bind:value={toTokenAccount} type="text"  placeholder="Enter Sender toTokenAccount" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div>
  </div>

   <div>
    <label for="recipient" class="block text-sm font-medium text-gray-700"> fromTokenAccount  </label>
    <div class="mt-1">
      <input bind:value={fromTokenAccount} type="text"  placeholder="Enter Amount fromTokenAccount" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div>
  </div>
<!--
  <div>
    <label for="amount" class="block text-sm font-medium text-gray-700"> Token Account To Mint </label>
    <div class="mt-1">
      <input id="amount" name="amount" type="text"   placeholder="e.g. 100" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div>
  </div> -->

<button class="red"  on:click={handleTransferToken}> SEnd Token </button>

</div>


<style>
	.status {
		margin: 0.5em;
	}
	button.drop {
		background-color: rgb(5, 163, 202);
	}

	button.green {
		background-color: #4caf50;
	}
	button.yellow {
		background-color: rgb(230, 208, 10);
	}
	button.red {
		background-color: rgb(156, 28, 28);
	}

	button {
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin-left: auto;
		margin-top: 0.5em;
		margin-bottom: 1em;
		border-radius: 2px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
	}
</style>
 


