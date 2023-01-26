<script>
  let hover = false;
</script>

<div
  on:click|self
  class="bg-black/60 p-8 flex w-auto  justify-center items-start z-50 w-full h-screen absolute inset-0"
>
  <div class="modal-box w-full relative">
    <label
      for="my-modal-3"
      class="btn btn-sm btn-circle absolute right-2 top-2"
      on:click>✕</label
    >
    {#if $$slots.header}
      <div class="p-2 bg-purple-100 mb-6 pt-6 w-full">
        <slot name="header" />
      </div>
    {/if}
    <div class="w-full">
      <slot name="body">
        <p class="text-center mb-6">Sorry, something must have gone wrong.</p>
      </slot>
    </div>
    <div
      on:mouseenter={() => {
        hover = true;
      }}
      on:mouseleave={() => {
        hover = false;
      }}
    >
      <slot name="button" {hover}>
        <!-- <button
          on:click
          class="bg-black text-white uppercase font-medium text-white p-2 rounded-md"
          >Close</button
        > -->
      </slot>
    </div>
  </div>
</div>
