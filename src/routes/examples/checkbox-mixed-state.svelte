<script>
  import MixedStateCheckbox from '$lib/CheckboxMixedState.svelte'

  let checkValues = {
    cond1: false,
    cond2: true,
    cond3: false,
    cond4: false,
  }

  const controls = Object.keys(checkValues).join(' ')

  function handleMixedStateCheck(e) {
    checkValues = e.detail
  }
</script>

<fieldset>
  <legend>Sandwich Condiments</legend>
  <MixedStateCheckbox
    values={checkValues}
    aria-controls={controls}
    on:check={handleMixedStateCheck}
  >
    All condiments
  </MixedStateCheckbox>
  <ul class="checkboxes">
    <li>
      <label>
        <input type="checkbox" id="cond1" bind:checked={checkValues['cond1']} />
        Lettuce
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" id="cond2" bind:checked={checkValues['cond2']} />
        Tomato
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" id="cond3" bind:checked={checkValues['cond3']} />
        Mustard
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" id="cond4" bind:checked={checkValues['cond4']} />
        Sprouts
      </label>
    </li>
  </ul>
</fieldset>

<section>
  <p>
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      This example used <code>Object.freeze</code> on the keycodes that it binds
      to, which is a good practice so that they can't be reassigned and cause strange
      errors. I added this to my own keyboard-utils.
    </li>
    <li>
      I had initially reached for Svelte's <a
        href="https://svelte.dev/tutorial/group-inputs"
        ><code>bind:group</code></a
      > but found that it accumulates the values of the checkboxes as an array, which
      leads to not knowing how to apply the values on change.
    </li>
    <li>
      In order to guarantee that the updated values can be correlated back to
      the checkbox value, it made sense to pass through an object that can be
      manipulated to derrive the checked state as well as returning an object
      with the same keys but updated values on check.
      <br />
      This moves the logic to monitor the relationship to the other checkboxes from
      the DOM and into the framework.
    </li>
  </ul>
</section>

<style>
  :global(ul.checkboxes) {
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
  }
</style>
