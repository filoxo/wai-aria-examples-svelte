<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { focusFirstDescendant } from '$lib/focus-utils'
  import { KeyCode } from '$lib/keyboard-utils'

  export let id: string
  export let labelledby: string
  export let describedby: string
  export let onEsc = (_e: KeyboardEvent) => {
    /* noop */
  }

  if (!id) throw new Error('Alert: id is required!')

  let content: HTMLDivElement
  let prevFocusedElement: HTMLElement

  onMount(() => {
    document.body.classList.add('has-dialog')
    prevFocusedElement = document.activeElement as HTMLElement
    focusFirstDescendant(content)
  })

  onDestroy(() => {
    document.body.classList.remove('has-dialog')
    focusPrevFocusedElement()
  })

  function handleEsc(e) {
    if (e.key === KeyCode.ESC) {
      e.stopPropagation()
      onEsc(e)
    }
  }

  function focusPrevFocusedElement() {
    prevFocusedElement?.focus()
  }
  // TODO: Go back and look to see if I missed some requirements, specifically focus trapping
</script>

<svelte:window on:keydown={handleEsc} />
<div class="dialog-backdrop no-scroll">
  <div
    {id}
    role="alertdialog"
    aria-modal="true"
    aria-labelledby={labelledby}
    aria-describedby={describedby}
    bind:this={content}
  >
    <slot />
  </div>
</div>

<style>
  [role='alertdialog'] {
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid #000;
    background-color: #fff;
    min-height: 100vh;
  }

  @media screen and (min-width: 640px) {
    [role='alertdialog'] {
      position: absolute;
      top: 2rem;
      left: 50vw; /* move to the middle of the screen (assumes relative parent is the body/viewport) */
      transform: translateX(
        -50%
      ); /* move backwards 50% of this element's width */
      min-width: calc(
        640px - (15px * 2)
      ); /* == breakpoint - left+right margin */
      min-height: auto;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.12),
        0 15px 12px rgba(0, 0, 0, 0.22);
    }
  }

  /* dialog::backdrop, */
  .dialog-backdrop {
    display: block;
    position: fixed;
    overflow-y: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  @media screen and (min-width: 640px) {
    .dialog-backdrop {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .no-scroll {
    overflow-y: auto !important;
  }

  /* this is added to the body when a dialog is open */
  :global(.has-dialog) {
    overflow: hidden;
  }
</style>
