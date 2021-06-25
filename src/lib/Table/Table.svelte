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

  [role='table'] :global([role='row']) {
    display: table-row;
  }

  [role='table'] :global([role='cell']),
  [role='table'] :global([role='columnheader']) {
    display: table-cell;
    padding: 0.125em 0.25em;
    width: 8em;
  }

  [role='table'] :global([role='columnheader']) {
    font-weight: bold;
    border-bottom: thin solid #888;
  }

  [role='table']
    :global
    [role='rowgroup']:last-child
    [role='row']:nth-child(odd) {
    background-color: #ddd;
  }
</style>
