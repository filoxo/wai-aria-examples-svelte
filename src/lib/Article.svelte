<script>
  import { requires } from '$lib/helper-utils';
  requires($$props['aria-posinset'], 'Article: aria-posinset is required!');
  requires($$props['aria-setsize'], 'Article: aria-setsize is required!');
</script>

<div role="article" tabindex="0" {...$$props}>
  <slot />
</div>
