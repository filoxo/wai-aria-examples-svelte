<script lang="ts">
  import { requires } from '../helper-utils'
  import { goToLink } from './goToLink'

  export let href: string
  export let label: string

  requires(href, 'LinkSpanBefore: an href prop is required!')
  requires(label, 'LinkSpanBefore: a label prop is required!')

  const handleClick = goToLink(href)
</script>

<span
  tabindex="0"
  role="link"
  {...$$props}
  on:click={handleClick}
  on:keydown={handleClick}
  aria-label={label}
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
  }

  [role='link']::before {
    display: block;
  }
</style>
