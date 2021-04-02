<script>
  import CheckboxTwoState from '../../lib/CheckboxTwoState.svelte';
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
  </ul>
</section>

<style>
  ul.checkboxes {
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
  }
</style>
