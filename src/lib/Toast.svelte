<script>
  import { fly } from 'svelte/transition';

  export let id;
  if (!id) throw new Error('Toast: requires an id!');
</script>

<div
  {id}
  role="alert"
  class="toast"
  transition:fly={{ y: -150, duration: 225 }}
>
  <slot />
</div>

<style>
  .toast {
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 0.25rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
</style>
