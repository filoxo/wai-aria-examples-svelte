<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { handleSpaceAsClick } from './keyboard-utils'
  type ObjectWithBooleanValues = { [key: string]: boolean }

  export let values: ObjectWithBooleanValues = {}

  if (!Object.keys(values).length)
    throw new Error(
      'CheckboxMixedState: values must be an object with key-value pairs that represent all of the current checked states.'
    )
  if (!$$props['aria-controls'])
    throw new Error(
      'CheckboxMixedState: the IDs of the checkboxes whose state are factored as values must be provided.'
    )

  const originalValues = { ...values }
  const eventDispatcher = createEventDispatcher()
  const dispatch = (detail: ObjectWithBooleanValues) =>
    eventDispatcher('check', detail)

  let checked: svelte.JSX.AriaAttributes['aria-checked']

  $: valuesRaw = Object.values(values)
  $: allTrue = valuesRaw.every(Boolean)
  $: allFalse = !valuesRaw.some(Boolean)
  $: checked = allTrue ? 'true' : allFalse ? 'false' : 'mixed'

  function setCheckValuesTo(newVal: boolean) {
    const valuesCopy = { ...values }
    Object.keys(valuesCopy).forEach((v) => (valuesCopy[v] = newVal))
    return valuesCopy
  }

  function handleClick(_e) {
    switch (checked) {
      case 'true': {
        dispatch(setCheckValuesTo(false))
        break
      }
      case 'false': {
        dispatch({ ...originalValues })
        break
      }
      case 'mixed': {
        dispatch(setCheckValuesTo(true))
      }
    }
  }

  const handleKeydown = handleSpaceAsClick(handleClick)
</script>

<div
  role="checkbox"
  tabindex="0"
  aria-checked={checked}
  aria-controls={$$props['aria-controls']}
  on:click={handleClick}
  on:keydown={handleKeydown}
>
  <slot />
</div>

<style>
  [role='checkbox'] {
    display: inline-block;
    position: relative;
    padding-left: 1.4em;
    cursor: default;
  }

  [role='checkbox']::before,
  [role='checkbox']::after {
    position: absolute;
    top: 50%;
    left: 7px;
    transform: translate(-50%, -50%);
    content: '';
  }

  [role='checkbox']::before {
    width: 14px;
    height: 14px;
    border: 1px solid hsl(0, 0%, 66%);
    border-radius: 0.2em;
    background-image: linear-gradient(to bottom, hsl(300, 3%, 93%), #fff 30%);
  }

  [role='checkbox']:active::before {
    background-image: linear-gradient(
      to bottom,
      hsl(300, 3%, 73%),
      hsl(300, 3%, 93%) 30%
    );
  }

  [role='checkbox'][aria-checked='mixed']::before,
  [role='checkbox'][aria-checked='true']::before {
    border-color: hsl(216, 80%, 50%);
    background: hsl(217, 95%, 68%);
    background-image: linear-gradient(
      to bottom,
      hsl(217, 95%, 68%),
      hsl(216, 80%, 57%)
    );
  }

  [role='checkbox'][aria-checked='mixed']::after {
    display: block;
    width: 8px;
    border-bottom: 0.125em solid #fff;
    transform: translate(-50%, -50%) rotateZ(45deg);
    transform-origin: center center;
  }

  [role='checkbox'][aria-checked='mixed']:active::after,
  [role='checkbox'][aria-checked='true']::after {
    display: block;
    width: 0.25em;
    height: 0.4em;
    border: solid #fff;
    border-width: 0 0.125em 0.125em 0;
    transform: translateY(-65%) translateX(-50%) rotate(45deg);
  }

  [role='checkbox'][aria-checked='mixed']:active::before,
  [role='checkbox'][aria-checked='true']:active::before {
    background-image: linear-gradient(
      to bottom,
      hsl(216, 80%, 57%),
      hsl(217, 95%, 68%)
    );
  }

  [role='checkbox']:focus {
    outline: none;
  }

  [role='checkbox']:focus::before {
    width: 16px;
    height: 16px;
    box-sizing: content-box;
    border-color: hsl(216, 94%, 73%);
    border-width: 3px;
    border-radius: calc(0.2em + 3px);
    box-shadow: inset 0 0 0 1px hsl(216, 80%, 50%);
  }
</style>
