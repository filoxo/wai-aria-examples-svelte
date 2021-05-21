<script>
  import { requires } from '../helper-utils'
  import { goToLink } from './goToLink'

  export let href

  requires(href, 'LinkSpan: an href prop is required!')

  const handleClick = goToLink(href)
</script>

<span
  tabindex="0"
  role="link"
  {...$$props}
  on:click={handleClick}
  on:keydown={handleClick}
>
  <slot />
</span>

<style>
  [role='link'] {
    color: #009;
    background: transparent;
    text-decoration: underline;
  }

  [role='link']:hover,
  [role='link']:focus,
  [role='link']:hover::before,
  [role='link']:focus::before {
    color: #000;
    cursor: pointer;
    outline: 0.2em solid hsl(219, 63%, 44%);
    outline-offset: 0.2em;
  }
</style>
