<script>
  import { requires } from '$lib/helper-utils'

  export let id

  requires(id, 'ComboboxRow: a unique id prop is required!')
  requires(
    $$props['aria-selected'],
    'ComboxboxRow: defining aria-selected as a prop is required!'
  )
</script>

<div
  {id}
  class="result-row"
  {...$$props}
  aria-selected={`${$$props['aria-selected']}`}
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
