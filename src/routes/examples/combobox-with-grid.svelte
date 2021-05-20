<script lang="typescript">
  import Combobox from '$lib/ComboboxWithGrid.svelte'
  import ComboboxRow from '$lib/ComboboxRow.svelte'
  import ComboboxCell from '$lib/ComboboxCell.svelte'

  const FRUITS_AND_VEGGIES = Object.freeze([
    ['Apple', 'Fruit'],
    ['Artichoke', 'Vegetable'],
    ['Asparagus', 'Vegetable'],
    ['Banana', 'Fruit'],
    ['Beets', 'Vegetable'],
    ['Bell pepper', 'Vegetable'],
    ['Broccoli', 'Vegetable'],
    ['Brussels sprout', 'Vegetable'],
    ['Cabbage', 'Vegetable'],
    ['Carrot', 'Vegetable'],
    ['Cauliflower', 'Vegetable'],
    ['Celery', 'Vegetable'],
    ['Chard', 'Vegetable'],
    ['Chicory', 'Vegetable'],
    ['Corn', 'Vegetable'],
    ['Cucumber', 'Vegetable'],
    ['Daikon', 'Vegetable'],
    ['Date', 'Fruit'],
    ['Edamame', 'Vegetable'],
    ['Eggplant', 'Vegetable'],
    ['Elderberry', 'Fruit'],
    ['Fennel', 'Vegetable'],
    ['Fig', 'Fruit'],
    ['Garlic', 'Vegetable'],
    ['Grape', 'Fruit'],
    ['Honeydew melon', 'Fruit'],
    ['Iceberg lettuce', 'Vegetable'],
    ['Jerusalem artichoke', 'Vegetable'],
    ['Kale', 'Vegetable'],
    ['Kiwi', 'Fruit'],
    ['Leek', 'Vegetable'],
    ['Lemon', 'Fruit'],
    ['Mango', 'Fruit'],
    ['Mangosteen', 'Fruit'],
    ['Melon', 'Fruit'],
    ['Mushroom', 'Fungus'],
    ['Nectarine', 'Fruit'],
    ['Okra', 'Vegetable'],
    ['Olive', 'Vegetable'],
    ['Onion', 'Vegetable'],
    ['Orange', 'Fruit'],
    ['Parship', 'Vegetable'],
    ['Pea', 'Vegetable'],
    ['Pear', 'Fruit'],
    ['Pineapple', 'Fruit'],
    ['Potato', 'Vegetable'],
    ['Pumpkin', 'Fruit'],
    ['Quince', 'Fruit'],
    ['Radish', 'Vegetable'],
    ['Rhubarb', 'Vegetable'],
    ['Shallot', 'Vegetable'],
    ['Spinach', 'Vegetable'],
    ['Squash', 'Vegetable'],
    ['Strawberry', 'Fruit'],
    ['Sweet potato', 'Vegetable'],
    ['Tomato', 'Fruit'],
    ['Turnip', 'Vegetable'],
    ['Ugli fruit', 'Fruit'],
    ['Victoria plum', 'Fruit'],
    ['Watercress', 'Vegetable'],
    ['Watermelon', 'Fruit'],
    ['Yam', 'Vegetable'],
    ['Zucchini', 'Vegetable'],
  ])

  let searchValue = ''

  function setSearchValue(e) {
    searchValue = e.detail
  }

  $: results = !searchValue
    ? null
    : FRUITS_AND_VEGGIES.filter(([name, _category]) =>
        name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
</script>

<label for="ex1-input" id="ex1-label" class="combobox-label">
  Fruits and vegetables
</label>
<Combobox
  id="ex1-combobox"
  aria-labelledby="ex1-label"
  value={searchValue}
  on:filter={setSearchValue}
>
  {#if results && results.length}
    {#each results as result, index}
      <ComboboxRow id={`result-row-${index}`}>
        <ComboboxCell id={`result-row-${index}x0`}>{result[0]}</ComboboxCell>
        <ComboboxCell id={`result-row-${index}x1`}>{result[1]}</ComboboxCell>
      </ComboboxRow>
    {/each}
  {/if}
</Combobox>

<section>
  <p>
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/grid-combo.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      The 'plugin' contained in the example includes a lot of focus management
      logic that would have been so much better to externalize into its own
      module. In fact, the focus management code and <code
        >aria-activedescendant</code
      > code really should be its own example module.
    </li>
    <li>
      I favor creating reusable components that implement all the right behavior
      but doesn't "gatekeep" if there are additional requirements that are
      needed to be added. By putting the rendering of the
      ComboxboxRows/ComboboxCells into the user's control, it can serve both the
      aria requirements as well as any user requirements such as groupings,
      horizontal lines, or different search behaviors.
    </li>
    <li>
      I found it pretty difficult to follow the logic that binds the various
      behaviors to the multiple elements.
    </li>
    <li>
      I had always been taught to avoid <code>line-height</code> units (eg.
      <code>line-height: 24px;</code>
      so I converted the styles over to
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#values"
        >unitless line-height</a
      >.
    </li>
    <li>
      The <code>active-descendent</code> code has been the hardest to write so far.
    </li>
    <li>
      This example doesn't tackle the issue of changing modality: what should
      the behavior be if the user switches from keyboard input to mouse?
    </li>
    <li>
      I had initially used <a href="https://svelte.dev/tutorial/slot-props"
        >slot props</a
      >
      to surface the activeDescendant to the consumer. This could have worked but
      I learned about
      <a href="https://svelte.dev/tutorial/context-api">svelte context</a>
      to pass a
      <a href="https://svelte.dev/tutorial/writable-stores">writable store</a> to
      share the parent component state in a reactive wayt to the children (ComboboxRow)
      components.
    </li>
  </ul>
</section>
