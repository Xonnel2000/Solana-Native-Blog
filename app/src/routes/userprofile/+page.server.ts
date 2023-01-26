import { get, derived } from 'svelte/store';


/** @type {import('./$types').PageServerLoad} */
import { fail } from '@sveltejs/kit';
// import { invalid } from '@sveltejs/kit';
import { getUserProfileClient } from '$lib/stores';
import  UserPro   from '$lib/helpers/userPro';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { UserProfileClient } from '$lib/helpers/utils';


let walletNewKey




const userprofiling = new UserPro()

//export const store = getUserProfileClient

 let UserProfile = await import('$lib/helpers/userprofile');
 //let UserPro = await import('$lib/helpers/userPro');

// //we update the store with the detail return
// let goyy = getUserProfileClient.update((_) => new UserProfile.default());

// console.log(goyy)


import { z } from 'zod';

const talentSchema = z.object({
	email: z.string().trim().email().min(1),
	password: z.string().trim().min(1, { message: "Must be 5 or more characters long" })

});

export async function load({ cookies }) {
   // const user = await db.getUserFromSession(cookies.get('sessionid'));
    const user = "lennox"
    return { user };
  }
   
  /** @type {import('./$types').Actions} */
  export const actions = {
    login: async ({ cookies, request }) => {
      // const data = await request.formData();
      // const email = data.get('email');
      // const password = data.get('password');
      // console.log(...data); 

      const formDataa = Object.fromEntries(await request.formData());
		const talentData = talentSchema.safeParse(formDataa);
		console.log(talentData);

        if (!talentData.success) {
            // Loop through the errors array and create a custom errors array
            const errors = talentData.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                };
            });
            
            return fail(400, { error: true, errors });

        }
    


     const bbn = get(getUserProfileClient)

    // console.log(bbn)
    let countValue
    getUserProfileClient.update((_) => new UserProfile.default());
    await getUserProfileClient.subscribe(value => {
      countValue = value;
      console.log("tthhh", value);

    });
    await countValue.GetAllWallet()


//     let userCallFun 
// getUserProfileClient.subscribe($b => userCallFun = $b)
        console.log("tthhh", countValue);
        console.log(talentData.data.email);

 return {success:talentData.data}


   
    },
    register: async (event) => {
      // TODO register the user
    }
  };



// /** @type {import('./$types').Actions} */
// export const actions = {
// 	login: async (request) => {
//     // TODO log the user in
//     const data = await request.formData();
//           const email = data.get('email');
//           const password = data.get('password');
    
//           console.log(email, password )
//   },
// 	register: async (event) => {
// 		// TODO register the user
// 	}
// };