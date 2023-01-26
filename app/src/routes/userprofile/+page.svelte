
  <script lang="ts">
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
  import { getUserProfileClient } from '$lib/stores';



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
    let email;
    let firstname;
    let lastname;
    let image_url;

    for ( let field of formData ) {
            const [key, value] = field;

            // Validate First name and Last_name
            if ( key === 'first_name' || key === 'last_name' || key === 'image_url' ) {
                if (value ==="" ) {
                    errors[key] = key + ' can only have alphabets'
                    error_flag = true
                }
            }

            // Valid Email
            if ( key === 'email' ) {
                if ( !isEmailValid( value ) ) {
                    errors[key] = 'Invalid Email Id'
                    error_flag = true
                }
            }

    }

    if ( !error_flag ) {
        for ( let field of formData ) {
        const [key, value] = field;

        // Valid Email
        if ( key === 'email'  ) {
           email = value
        }
        if ( key === 'first_name' ) {
            console.log("fn", value)
           firstname = value

        }
        if ( key === 'last_name' ) {
            console.log("ln", value)
           lastname = value

        }

        if ( key === 'image_url' ) {
            console.log("ln", value)
           image_url = value

        }

    }
    console.log("ln", firstname,lastname,email)
        await $getUserProfileClient?.EditUser(
         firstname,
        lastname,
        email,
        image_url,
    );

        alert('You submit the form.')
    }

}

// this is the create submit form
const submitForm = async (event) => {
    errors = {}
    const formData = new FormData(event.target)
    console.log(formData)

    let error_flag = false;
    let email;
    let firstname;
    let lastname;
    let image_url;

    for ( let field of formData ) {
            const [key, value] = field;

            // Validate First name and Last_name
            if ( key === 'first_name' || key === 'last_name' || key === 'image_url' ) {
                if (value ==="" ) {
                    errors[key] = key + ' can only have alphabets'
                    error_flag = true
                }
            }

            // Valid Email
            if ( key === 'email' ) {
                if ( !isEmailValid( value ) ) {
                    errors[key] = 'Invalid Email Id'
                    error_flag = true
                }
            }

        }

    if ( !error_flag ) {
        for ( let field of formData ) {
        const [key, value] = field;

        // Valid Email
        if ( key === 'email'  ) {
           email = value
        }
        if ( key === 'first_name' ) {
            console.log("fn", value)
           firstname = value

        }
        if ( key === 'last_name' ) {
            console.log("ln", value)
           lastname = value

        }

        if ( key === 'image_url' ) {
            console.log("ln", value)
           image_url = value

        }

    }
    console.log("ln", firstname,lastname,email)
        await $getUserProfileClient?.CreateUser(
         firstname,
        lastname,
        email,
        image_url,
    );

        alert('You submit the form.')
    }

};

  let myBlogs:any
    const showAccountBal = async () => {
myBlogs= await $getUserProfileClient?.GetPost();
            
};

$:showAccountBal()

  </script>


<!-- this is modal div -->
<div
class="bg-black/60 p-8 flex w-auto  justify-center items-start h-screen "
>


{#if myBlogs}

<form
on:submit|preventDefault={editForm}
>
<center><h1>Edit your user account </h1></center>

        <label class="input-group input-group-vertical mb-5">
        <div class="form-control">
        <label class="input-group input-group-vertical">
            <span>Firstname </span>
            <input
            placeholder="Firstname"
            class="input input-bordered"
            id="first_name" name="first_name" type="text" value="{myBlogs.firstname}"
            />
        </label>
        {#if errors.first_name}
        <p><small style="color: red"> { errors.first_name } </small></p>
        {/if}
        </div>


        <label class="input-group input-group-vertical mb-5">
        <div class="form-control">
            <label class="input-group input-group-vertical">
            <span>LastName</span>
            <input
                placeholder="lastname"
                class="input input-bordered"
            id="last_name" name="last_name" type="text"  value="{myBlogs.lastname}" 
            />
            </label>
            {#if errors.last_name}
                <p><small style="color: red"> { errors.last_name } </small></p>
            {/if}
        </div>

        <label class="input-group input-group-vertical mb-5">
            <div class="form-control">
                <label class="input-group input-group-vertical">
                <span>Email</span>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    class="input input-bordered"
            name="email"
            value="{myBlogs.email}"
                />
                </label>
                {#if errors.email}
                <p><small style="color: red"> { errors.email } </small></p>
            {/if}
            </div>



        <label
        for="comment"
        class="block text-sm font-medium text-gray-700 mt-10 "
        >Repository URLs *
        </label>
        <label for="comment" class="block text-sm font-medium text-gray-700">
        Your image URLS (e.g.
        https://github.com/bitcoin/bitcoin)</label
        >
        <div class="form-control mt-2">
        <label class="input-group input-group-vertical">
            <span>Image URLs *</span>
            <textarea
            rows="4"
            name="image_url"
            id="image_url"
            placeholder="https://github.com/Xonnel2000/Solana_pda_clientside/tree/master"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value="{myBlogs.image_url}"
            />
        </label>
        {#if errors.image_url}
        <p><small style="color: red"> { errors.image_url } </small></p>
        {/if}
        </div>

        <button
        type="submit"
        class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
        >
        Submit</button>
        </label>

</form>

  {:else}


  <form  on:submit|preventDefault={submitForm} >
<center> <h1>Create new user Account </h1></center>
  
    <label class="input-group input-group-vertical mb-5">
    <div class="form-control">
        <label class="input-group input-group-vertical">
        <span>Firstname </span>
        <input
            placeholder="Firstname"
            class="input input-bordered"
            id="first_name" name="first_name" type="text" 
        />
        </label>
        {#if errors.first_name}
        <p><small style="color: red"> { errors.first_name } </small></p>
    {/if}
    </div>
    
    
    <label class="input-group input-group-vertical mb-5">
        <div class="form-control">
        <label class="input-group input-group-vertical">
            <span>LastName</span>
            <input
            placeholder="lastname"
            class="input input-bordered"
            id="last_name" name="last_name" type="text" 
            />
        </label>
        {#if errors.last_name}
            <p><small style="color: red"> { errors.last_name } </small></p>
        {/if}
        </div>
    
        <label class="input-group input-group-vertical mb-5">
            <div class="form-control">
            <label class="input-group input-group-vertical">
                <span>Email</span>
                <input
                type="text"
                id="email"
                placeholder="Email"
                class="input input-bordered"
            name="email"
                />
            </label>
            {#if errors.email}
            <p><small style="color: red"> { errors.email } </small></p>
        {/if}
            </div>
    
    
    
    <label
        for="comment"
        class="block text-sm font-medium text-gray-700 mt-10 "
        >Repository URLs *
    </label>
    <label for="comment" class="block text-sm font-medium text-gray-700">
        Your image URLS (e.g.
        https://github.com/bitcoin/bitcoin)</label
    >
    <div class="form-control mt-2">
        <label class="input-group input-group-vertical">
        <span>Image URLs *</span>
        <textarea
            rows="4"
            name="image_url"
            id="image_url"
            placeholder="https://github.com/Xonnel2000/Solana_pda_clientside/tree/master"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        </label>
        {#if errors.image_url}
        <p><small style="color: red"> { errors.image_url } </small></p>
    {/if}
    </div>
    
    <button
        type="submit"
        class="bg-gray-500 text-white uppercase font-medium text-white p-2 rounded-md mt-5"
    >
        Submit</button>
    </label>
  
  </form>

  {/if}


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
