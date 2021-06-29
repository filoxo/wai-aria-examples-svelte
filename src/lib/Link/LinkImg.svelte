<script lang="ts">
  import { requires } from '../helper-utils'
  import { goToLink } from './goToLink'

  export let src: string
  export let href: string
  export let alt: string

  requires(src, 'LinkImg: a src prop is required!')
  requires(href, 'LinkImg: an href prop is required!')

  const handleClick = goToLink(href)
</script>

<img
  tabindex="0"
  role="link"
  {...$$props}
  on:click={handleClick}
  on:keydown={handleClick}
  {src}
  {alt}
/>

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
