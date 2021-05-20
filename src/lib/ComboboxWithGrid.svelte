<script>
  import { requires, prevIndex, nextIndex } from '$lib/helper-utils'
  import { KeyCode } from '$lib/keyboard-utils'
  import { afterUpdate, createEventDispatcher } from 'svelte'

  export let id
  export let value

  requires(id, 'ComboboxWithGrid: requires a unique id prop!')
  requires(
    $$props['aria-labelledby'],
    'ComboboxWithGrid: requires an aria-labelledby prop that matches an existing label!'
  )
  requires(value, 'ComboboxWithGrid: requires a value prop!')

  let focused = false
  let inputRef
  let gridRef
  let gridItems = null
  let activeDescendant = null

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

    const gridRowsAndCells = [...gridRef.querySelectorAll('[role="row"]')].map(
      (row) => [...row.querySelectorAll('[role="gridcell"]')]
    )

    console.log('gridRowsAndCells', gridRowsAndCells)
  })

  function handleInputKeys(e) {
    switch (e.key) {
      case KeyCode.DOWN: {
        // If the grid is displayed, moves focus to the first suggested value.
        const activeDescendantIndex = nextIndex(
          gridItems.findIndex((item) => item.id === activeDescendant),
          gridItems.length
        )
        activeDescendant = gridItems[activeDescendantIndex].id
        break
      }
      case KeyCode.UP: {
        // If the grid is displayed, moves focus to the last suggested value.
        let activeDescendantIndex = prevIndex(
          gridItems.findIndex((item) => item.id === activeDescendant),
          gridItems.length
        )
        activeDescendant = gridItems[activeDescendantIndex].id
        break
      }
      case KeyCode.ENTER: {
        // Sets the textbox value to the content of the first cell in the row containing focus.
        const x = gridItems.find((item) => item.id === activeDescendant)
        value = x.textContent
        // Closes the grid popup.
        expanded = false
        // Sets focus on the textbox.
        inputRef.focus()
        break
      }
      case KeyCode.ESC: {
        // Closes the grid popup.
        expanded = false
        // Sets focus on the textbox.
        inputRef.focus()
        // Clears the textbox.
        value = ''
        break
      }
    }
  }

  function handleGridClick(e) {
    activeDescendant = e.target.id
    // Sets the textbox value to the content of the first cell in the row containing focus.
    value = e.target.textContent
    // Closes the grid popup.
    expanded = false
    // Sets focus on the textbox.
    inputRef.focus()
  }

  function handleGridKeys(e) {
    switch (e.key) {
      case KeyCode.DOWN: {
        /*
          Moves focus to the next row.
          If focus is in the last row, moves focus to the first row.
          Note: This wrapping behavior is useful when Home and End move the editing cursor as described below.
        */
        break
      }
      case KeyCode.UP: {
        /*
        Moves focus to the previous row.
        If focus is in the first row, moves focus to the last row.
        Note: This wrapping behavior is useful when Home and End move the editing cursor as described below.
        */
        break
      }
      case KeyCode.RIGHT: {
        /*
        Moves focus to the next cell.
        If focus is in the last cell in a row, moves focus to the first cell in the next row.
        If focus is in the last cell in the last row, moves focus to the first cell in the first row.
        */
        break
      }
      case KeyCode.LEFT: {
        /*
        Moves focus to the previous cell.
        If focus is in the first cell in a row, moves focus to the last cell in the previous row.
        If focus is in the first cell in the first row, moves focus to the last cell in the last row.
        */
        break
      }
      case KeyCode.HOME: {
        /*
        Moves focus to the textbox and places the editing cursor at the beginning of the field.
        */
        break
      }
      case KeyCode.END: {
        /*
        Moves focus to the textbox and places the editing cursor at the end of the field.
        */
        break
      }
      default: // Types the character in the textbox.
    }
  }
  function onFocus() {
    focused = true
  }
  function onBlur() {
    // focused = false
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
      aria-activedescendant={activeDescendant}
      bind:this={inputRef}
      bind:value
      on:keydown={handleInputKeys}
      on:input={onChange}
      on:focus={onFocus}
      on:blur={onBlur}
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
    <slot {activeDescendant} />
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
