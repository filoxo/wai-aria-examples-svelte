<script lang="ts">
  import { getContext } from 'svelte'
  import { requires } from '$lib/helper-utils'

  export let id: string

  requires(id, 'ComboboxRow: a unique id prop is required!')
  let activeDescendant: SvelteStore<string> = getContext(
    'combobox-active-descendant'
  )
</script>

<div
  {id}
  class="result-row"
  {...$$props}
  aria-selected={$activeDescendant === id}
  role="row"
>
  <slot />
</div>

<style>
  .result-row {
    align-items: baseline;
    cursor: default;
    display: flex;
    justify-content: space-between;
    line-height: 1.5;
    padding: 2px;
  }
  .result-row:hover,
  .result-row[aria-selected='true'] {
    background: rgb(139, 189, 225);
  }
</style>
