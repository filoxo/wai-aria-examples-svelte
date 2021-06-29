<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { requires } from './helper-utils'
  import { KeyCode } from './keyboard-utils'
  import {
    focusPreviousSibling,
    focusNextSibling,
    focusPreviousElement,
    focusNextElement,
  } from './focus-utils'
  export let id: string

  requires(id, 'Feed: id is required!')

  let feed: HTMLDivElement

  const dispatch = createEventDispatcher()

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

  function handleScroll() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
    const isScrolledToBottom =
      feed.scrollHeight - Math.abs(feed.scrollTop) === feed.clientHeight
    if (isScrolledToBottom) {
      dispatch('scroll-bottom')
    }
  }
</script>

<div
  {...$$props}
  role="feed"
  bind:this={feed}
  on:keydown={mapKeyShortcut}
  on:scroll={handleScroll}
>
  <slot />
</div>
