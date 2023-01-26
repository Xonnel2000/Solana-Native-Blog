<script>
    //import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { adapter, connected, selectedNetwork, nativeClient } from '$lib/stores';
    import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
    //export let getBall;

    import { writable } from 'svelte/store';
          import Modal, { bind } from 'svelte-simple-modal';
        import PopupSol from './PopupSol.svelte';
        const modal = writable(null);
        const showModal = () => modal.set(bind(PopupSol, { }));

    //     const showMyBlogAccounts = async () => {
	// 	// todo: check if valid
	// 	//get the adapter from the store which is writable 
	// 	//and get it from the helpers/type interface
	// 	myComment = await $anchorClient.getCommentsOnPost(blod_index.index);
	// };

    
    // $: $connected && $adapter?.publicKey && showMyBlogAccounts();

    
    let PubWalletKey 
    let walletKey
    // const drop = async () => {
    //     PubWalletKey= $walletStore?.publicKey
    //         walletKey = new PublicKey(PubWalletKey)
    //         await $nativeClient.airDrop(walletKey);
    //         getBall()
    //         //getConnectedBalance(); // refresh balance
    //     };
    
    </script>
    
    
    {#if $walletStore?.publicKey}
    <!-- <button class="green" data-toggle="modal" data-target="#addTeacher" id="addTeacherModelBtn" role="document"> Transfer Money </button> -->
    <Modal show={$modal}>
        <button class="green btn btn-md md:btn-md lg:btn-md" on:click={showModal}>Send Sol</button>
      </Modal>
    {/if}

    


    
    
    
    <style>
        .status {
            margin: 0.5em;
        }
        button.drop {
            background-color: rgb(5, 163, 202);
        }
    
        button.green {
            background-color: #4caf50;
            color: white;
            margin-top: 0.5em;


        }
        button.yellow {
            background-color: rgb(230, 208, 10);
        }
        button.red {
            background-color: rgb(156, 28, 28);
        }
    
        /* button {
            border: none;
            color: white;
		    height: 2.8em;
            padding: 10px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin-left: auto;
            margin-top: 0.5em;
            margin-bottom: 1em;
            border-radius: 2px;
            filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
        } */
    </style>
    