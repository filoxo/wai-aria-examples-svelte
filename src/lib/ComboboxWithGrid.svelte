<script>
  import { requires, prevIndex, nextIndex } from '$lib/helper-utils'
  import { KeyCode } from '$lib/keyboard-utils'
  import { afterUpdate, createEventDispatcher, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let id
  export let value

  requires(id, 'ComboboxWithGrid: requires a unique id prop!')
  requires(
    $$props['aria-labelledby'],
    'ComboboxWithGrid: requires an aria-labelledby prop that matches an existing label!'
  )
  requires(value, 'ComboboxWithGrid: requires a value prop!')

  let inputRef
  let gridRef
  let gridItems = null
  let activeDescendant = writable(null)

  setContext('combobox-active-descendant', activeDescendant)

  $: gridId = `${id}-grid`
  $: inputId = `${id}-input`
  $: expanded = focused

  const dispatch = createEventDispatcher()
  const onChange = (e) => dispatch('filter', e.target.value)

  afterUpdate(() => {
    gridItems =
      !!gridRef && expanded
        ? [...gridRef.querySelectorAll('[role="row"]')]
        : null
  })

  function handleInputKeys(e) {
    switch (e.key) {
      case KeyCode.DOWN: {
        // prevent cursor from moving in the input
        if (expanded) {
          e.preventDefault()
          // If the grid is displayed, moves focus to the first suggested value.
          const activeDescendantIndex = nextIndex(
            gridItems.findIndex((item) => item.id === $activeDescendant),
            gridItems.length
          )
          $activeDescendant = gridItems[activeDescendantIndex].id
        }
        break
      }
      case KeyCode.UP: {
        if (expanded) {
          // prevent cursor from moving in the input
          e.preventDefault()
          // If the grid is displayed, moves focus to the last suggested value.
          let activeDescendantIndex = prevIndex(
            gridItems.findIndex((item) => item.id === $activeDescendant),
            gridItems.length
          )
          $activeDescendant = gridItems[activeDescendantIndex].id
        }
        break
      }
      case KeyCode.ENTER: {
        if (!expanded) return
        // Sets the textbox value to the content of the first cell in the row containing focus.
        const x = gridItems.find((item) => item.id === $activeDescendant)
        // value = x.querySelector('[role="gridcell"]').textContent
        x.click()
        // Closes the grid popup.
        expanded = false
        // Sets focus on the textbox.
        inputRef.focus()
        break
      }
      case KeyCode.ESC: {
        // Sets focus on the textbox.
        inputRef.focus()
        // Clears the textbox.
        value = ''
        // Closes the grid popup.
        expanded = false
        break
      }
    }
  }

  function handleGridClick(e) {
    if (e.target.matches('[role="row"]')) {
      const row = e.target
      $activeDescendant = row.id
      // Sets the textbox value to the content of the first cell in the row containing focus.
      value = row.querySelector('[role="gridcell"]').textContent
      // Sets focus on the textbox.
      inputRef.focus()
      // Closes the grid popup.
      expanded = false
    }
  }
</script>

<div class="combobox-wrapper">
  <div
    role="combobox"
    aria-expanded={expanded}
    aria-owns={gridId}
    aria-haspopup="grid"
    {id}
  >
    <input
      type="text"
      autocomplete="off"
      aria-autocomplete="list"
      aria-controls={gridId}
      id={inputId}
      aria-activedescendant={$activeDescendant}
      bind:this={inputRef}
      bind:value
      on:keydown={handleInputKeys}
      on:input={onChange}
    />
  </div>
  <div
    id={gridId}
    aria-labelledby={$$props['aria-labelledby']}
    role="grid"
    class="grid"
    bind:this={gridRef}
    class:hidden={!expanded}
    on:click={handleGridClick}
  >
    <slot />
  </div>
</div>

<style>
  .combobox-wrapper {
    display: inline-block;
    position: relative;
    font-size: 16px;
  }

  .hidden {
    display: none;
  }

  [role='grid']:not(:empty) {
    min-width: 230px;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 1.7em;
    z-index: 1;
  }

  .grid :global(.focused) {
    background: rgb(139, 189, 225);
  }

  .grid :global(.focused-cell) {
    outline-style: dotted;
    outline-color: green;
  }

  input[aria-autocomplete='list'] {
    font-size: inherit;
    border: 1px solid #aaa;
    border-radius: 2px;
    line-height: 1.5;
    padding-right: 30px;
    width: 200px;
  }
</style>
