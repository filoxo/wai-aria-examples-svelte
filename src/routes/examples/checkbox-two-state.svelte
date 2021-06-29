<script>
  import CheckboxTwoState from '$lib/CheckboxTwoState.svelte'
</script>

<h3 id="id-group-label">Sandwich Condiments</h3>

<div role="group" aria-labelledby="id-group-label">
  <ul class="checkboxes">
    <li>
      <CheckboxTwoState checked={true}>Lettuce</CheckboxTwoState>
    </li>
    <li>
      <CheckboxTwoState>Tomato</CheckboxTwoState>
    </li>
    <li>
      <CheckboxTwoState>Mustard</CheckboxTwoState>
    </li>
    <li>
      <CheckboxTwoState>Lettuce</CheckboxTwoState>
    </li>
  </ul>
</div>

<section>
  <p>
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      Original example adds a <code>focus</code> class to the checkbox but it is
      unused from what I could tell; so I have chosen to omit it.
    </li>
    <li>
      <code>aria-controls</code> feels like it makes it <em>harder</em> to get
      it right, since relying on the DOM to be able to find/derive state is more
      work than simply passing the state down through a framework. I decided to
      bypass this by using
      <a href="https://svelte.dev/docs#bind_element"
        >Svelte <code>bind:this</code></a
      > to give the Checkbox a reference to the rendered DOM node. This gives me
      access to the element's ID.
    </li>
  </ul>
</section>

<style>
  ul.checkboxes {
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
  }
</style>
