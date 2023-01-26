<script>
  export let repos;
  export let counting;
  console.log(counting);
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { createVisitCount } from "$lib/services";

  let searchterm = "";
  $: searchrepo = repos.filter((repo) => {
    return repo.repo_address.includes(searchterm);
  });
  let items = repos;
  let currentPage = 1;
  let pageSize = 5;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  function handleVisitCount(repo_id) {
    console.log("this is new repo_id", repo_id);
    createVisitCount({ repo_id });
  }
</script>

<div class="flex items-center justify-center ">
  <!-- this is total download -->
  <div
    class="relative overflow-hidden  rounded-lg bg-gray-800 text-slate-50 px-4 pt-5 pb-3 shadow sm:px-6 sm:pt-6"
  >
    <dt>
      <div class="absolute rounded-md bg-indigo-500 p-3">
        <svg
          class="h-6 w-6 text-white"
          x-description="Heroicon name: outline/users"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </div>
      <p class="ml-16 truncate text-sm font-medium text-slate-50">
        Total Visitors
      </p>
    </dt>
    <dd class="ml-16 flex items-baseline pb-6 sm:pb-7 ">
      <p class="text-2xl font-semibold text-slate-50">{counting}</p>
    </dd>
  </div>
</div>

<!-- this is the search form -->
<div class="flex items-center justify-center">
  <div class="form-control p-5   ">
    <div class="input-group">
      <input
        type="text"
        placeholder="Search…"
        class="input input-bordered"
        bind:value={searchterm}
      />
    </div>
  </div>
</div>

<!-- this is repo  -->

<div
  class="flex flex-row h-auto card bg-gray-800 rounded-box place-content-start "
>
  <!-- <div class="w-1/2 p-4"> -->
  <ul
    role="list"
    class="divide-y divide-gray-200 border-b border-gray-200 w-full"
  >
    {#if searchterm === ""}
      {#each paginatedItems || [] as item}
        <li
          class="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 text-slate-50"
        >
          <div
            class="flex items-center justify-between space-x-4 text-slate-50"
          >
            <!-- Repo name and link -->
            <div class="min-w-0 space-y-3">
              <!-- svelte-ignore security-anchor-rel-noreferrer -->
              <a
                on:click={() => {
                  handleVisitCount(item.id);
                }}
                href={item.repo_address}
                target="_blank"
                class="group relative flex items-center space-x-2.5"
              >
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                    fill="currentcolor"
                  />
                </svg>
                <span
                  class="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900"
                >
                  {item.repo_address}
                </span>
              </a>
            </div>
            <div class="sm:hidden">
              <svg
                class="h-5 w-5 text-gray-400"
                x-description="Heroicon name: mini/chevron-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <!-- Repo meta info -->
            <div
              class="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex"
            >
              <p class="flex space-x-2 text-sm text-gray-500">
                <span>
                  <dd class="ml-16 flex items-baseline pb-0 sm:pb-0">
                    <p class="text-1sm  font-semibold">
                      {item.likes}
                    </p>
                    <svg
                      class="h-4 w-5 flex-shrink-0 self-center text-red-500"
                      x-description="Heroicon name: mini/arrow-down"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </dd>
                </span>

                <span aria-hidden="true">·</span>
                <span> Deploy on : {item.created_at}</span>
                <span aria-hidden="true">·</span>
                <span>
                  <!-- <div class="absolute rounded-md bg-indigo-500 p-2">
                    <svg
                      class="h-3 w-3 text-white"
                      x-description="Heroicon name: outline/cursor-arrow-rays"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>
                  </div> -->
                </span>
              </p>
            </div>
          </div>
        </li>
      {/each}
    {:else if searchrepo.length}
      {#each searchrepo || [] as item}
        <li
          class="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 text-slate-50"
        >
          <div
            class="flex items-center justify-between space-x-4 text-slate-50"
          >
            <!-- Repo name and link -->
            <div class="min-w-0 space-y-3">
              <!-- svelte-ignore security-anchor-rel-noreferrer -->
              <a
                on:click={() => {
                  handleVisitCount(item.id);
                }}
                href={item.repo_address}
                target="_blank"
                class="group relative flex items-center space-x-2.5"
              >
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                    fill="currentcolor"
                  />
                </svg>
                <span
                  class="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900"
                >
                  {item.repo_address}
                </span>
              </a>
            </div>
            <div class="sm:hidden">
              <svg
                class="h-5 w-5 text-gray-400"
                x-description="Heroicon name: mini/chevron-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <!-- Repo meta info -->
            <div
              class="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex"
            >
              <p class="flex space-x-2 text-sm text-gray-500">
                <span>
                  <dd class="ml-16 flex items-baseline pb-0 sm:pb-0">
                    <p class="text-1sm  font-semibold">
                      {item.likes}
                    </p>
                    <svg
                      class="h-4 w-5 flex-shrink-0 self-center text-red-500"
                      x-description="Heroicon name: mini/arrow-down"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </dd>
                </span>

                <span aria-hidden="true">·</span>
                <span> Deploy on : {item.created_at}</span>
                <span aria-hidden="true">·</span>
                <span>
                  <!-- <div class="absolute rounded-md bg-indigo-500 p-2">
                <svg
                  class="h-3 w-3 text-white"
                  x-description="Heroicon name: outline/cursor-arrow-rays"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                  />
                </svg>
              </div> -->
                </span>
              </p>
            </div>
          </div>
        </li>
      {/each}
    {:else}
      <h1>NO SEARCH FOUND {searchterm}</h1>
    {/if}
  </ul>
</div>

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

<!-- <div class=" w-1/2 p-4 overflow-hidden">
    <h1>D2</h1>
  </div> -->
<!-- </div> -->
