<script>
  import { requires } from '$lib/helper-utils'

  export let id

  requires(
    id,
    `Tablecaption: id prop is required! It should also be used by aria-describedby of the closest parent Table component.`
  )
</script>

<div {...$$props}>
  <slot />
</div>

<style>
  div {
    display: table-caption;
    font-style: italic;
  }
</style>
