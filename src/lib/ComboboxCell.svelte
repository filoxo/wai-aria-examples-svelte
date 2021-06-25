<script lang="ts">
  import { requires } from '$lib/helper-utils'

  export let id: string

  requires(id, 'ComboboxCell: a unique id prop is required!')
</script>

<div {id} class="result-cell" role="gridcell">
  <slot />
</div>

<style>
  .result-cell {
    padding: 0 5px;
  }
  .result-cell:last-child {
    font-size: 12px;
    font-weight: 200;
    color: #333;
  }
</style>
