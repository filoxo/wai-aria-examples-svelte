<script>
  import { requires } from '$lib/helper-utils'
  requires($$props['aria-posinset'], 'Article: aria-posinset is required!')
  requires($$props['aria-setsize'], 'Article: aria-setsize is required!')

  if ($$props['aria-posinset'] < 1)
    console.warn(
      'aria-posinset should be a positive integer value that indicates the position of the article in the feed.'
    )
</script>

<div role="article" tabindex="0" {...$$props}>
  <slot />
</div>
