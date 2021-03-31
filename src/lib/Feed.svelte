<script>
  import { requires } from './helper-utils'
  import { KeyCode } from './keyboard-utils'
  import {
    focusPreviousSibling,
    focusNextSibling,
    focusPreviousElement,
    focusNextElement,
  } from './focus-utils'
  export let id

  requires(id, 'Feed: id is required!')

  let feed

  function mapKeyShortcut(event) {
    if (!event.target.matches('[role="article"]')) return

    switch (event.key) {
      case KeyCode.PAGE_UP:
        event.preventDefault()
        focusPreviousSibling(event.target)
        break
      case KeyCode.PAGE_DOWN:
        event.preventDefault()
        focusNextSibling(event.target)
        break
      case KeyCode.HOME: {
        if (event.ctrlKey) {
          event.preventDefault()
          focusPreviousElement(feed)
        }
        break
      }
      case KeyCode.END: {
        if (event.ctrlKey) {
          event.preventDefault()
          focusNextElement(feed)
        }
        break
      }
    }
  }
</script>

<div {id} role="feed" bind:this={feed} on:keydown={mapKeyShortcut}>
  <slot />
</div>
