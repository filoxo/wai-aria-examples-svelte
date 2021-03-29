<script>
  import { requires } from './helper-utils';
  import { KeyCode } from './keyboard-utils';
  import { onDestroy, onMount } from 'svelte';
  export let id;

  requires(id, 'Feed: id is required!');

  let feed;
  let observer;
  let articles = [];

  onMount(() => {
    observer = new MutationObserver(function (mutationsList, _observer) {
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case 'childList':
          case 'attributes': {
            console.log('a mutation', mutation);
          }
        }
      }
    });

    observer.observe(feed, { childList: true });
  });

  onDestroy(() => {
    observer && observer.disconnect();
  });

  function mapKeyShortcut(event) {
    if (!event.target.matches('[role="article"]')) return;
    const focusedIndex = event.target.getAttribute('aria-posinset');

    switch (event.key) {
      case KeyCode.PAGE_UP:
        event.preventDefault();

        // Move up focus
        if (focusedIndex > 1) {
          // Need to increment by 2 because focusIndex is 1-indexed
          this.focusItem(this.feedItems[focusedIndex - 2]);
        }
        break;
      case KeyCode.PAGE_DOWN:
        event.preventDefault();
        // Move down focus
        if (this.feedItems.length >= focusedIndex) {
          // Do not need to increment focusIndex because it is 1-indexed
          this.focusItem(this.feedItems[focusedIndex]);
        }
        break;
      case KeyCode.HOME:
        if (event.ctrlKey && this.feedItems.length > 0) {
          event.preventDefault();
          this.focusItem(this.feedItems[0]);
        }
        break;
      case KeyCode.END:
        if (event.ctrlKey) {
          event.preventDefault();
          this.anchorItem.focus();
        }
        break;
    }
  }
</script>

<div {id} role="feed" bind:this={feed} on:keydown={mapKeyShortcut}>
  <slot />
</div>
