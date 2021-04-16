<script>
  import { requires } from '$lib/helper-utils'

  requires($$props['aria-label'], 'Table: aria-label prop is required!')
  requires(
    $$props['aria-describedby'],
    'Table: aria-describedby prop is required!'
  )
</script>

<div role="table" {...$$props}>
  <slot />
</div>

<style>
  [role='table'] {
    display: table;
  }

  :global([role='table'] [role='row']) {
    display: table-row;
  }

  :global([role='table'] [role='cell'], [role='table'] [role='columnheader']) {
    display: table-cell;
    padding: 0.125em 0.25em;
    width: 8em;
  }

  :global([role='table'] [role='columnheader']) {
    font-weight: bold;
    border-bottom: thin solid #888;
  }

  :global([role='table']
      [role='rowgroup']:last-child
      [role='row']:nth-child(odd)) {
    background-color: #ddd;
  }
</style>
