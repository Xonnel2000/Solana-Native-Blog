<script>
  export let success;
</script>

{#if success}
  <strong class="text-red-600">{success.message}</strong>
{/if}
