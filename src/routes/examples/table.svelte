<script>
  import Table from '$lib/Table/Table.svelte'
  import Tablecaption from '$lib/Table/Tablecaption.svelte'
  import Rowgroup from '$lib/Table/Rowgroup.svelte'
  import Row from '$lib/Table/Row.svelte'
  import Columnheader from '$lib/Table/Columnheader.svelte'
  import Cell from '$lib/Table/Cell.svelte'
</script>

<Table aria-label="Students" aria-describedby="students_table_desc">
  <Tablecaption id="students_table_desc">
    Students currently enrolled in WAI-ARIA 101 for the coming semester
  </Tablecaption>
  <Rowgroup>
    <Row>
      <Columnheader>First Name</Columnheader>
      <Columnheader>Last Name</Columnheader>
      <Columnheader>Company</Columnheader>
      <Columnheader>Address</Columnheader>
    </Row>
  </Rowgroup>
  <Rowgroup>
    <Row>
      <Cell>Fred</Cell>
      <Cell>Jackson</Cell>
      <Cell>Acme, Inc.</Cell>
      <Cell>123 Broad St.</Cell>
    </Row>
    <Row>
      <Cell>Sara</Cell>
      <Cell>James</Cell>
      <Cell>Acme, Inc.</Cell>
      <Cell>123 Broad St.</Cell>
    </Row>
    <Row>
      <Cell>Ralph</Cell>
      <Cell>Jefferson</Cell>
      <Cell>XYZ, Inc.</Cell>
      <Cell>456 Main St.</Cell>
    </Row>
    <Row>
      <Cell>Nancy</Cell>
      <Cell>Jensen</Cell>
      <Cell>XYZ, Inc.</Cell>
      <Cell>456 Main St.</Cell>
    </Row>
  </Rowgroup>
</Table>

<section>
  <p>
    <a href="https://www.w3.org/TR/wai-aria-practices/examples/table/table.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      While these component is fairly straightforward, I felt the desire to
      somehow else validate that all the relevant parts of the table were
      provided. Eg. ensure that the table had the right descendants. That sort
      of approach could lead to an interesting API... in order to omit key parts
      of accessible tables could require an "opt out" type of flag. This way the
      default is more accessible than not and its clear that it wasn't a
      developer's mistake if something is missing but rather an intentional
      decision.
    </li>
    <li>
      I found it intesting that you cannot export multiple components from a
      file. It feels both neater/more organized, as well as annoying as it would
      require an additional file to re-export them (though not a big deal).
    </li>
    <li>
      This exercise made me wish that instead of using <code>div</code>s and
      <code>span</code>s, we had these available as elements within the HTML
      spec. Div and span are intentionally without symantic meaning, so let's
      introduce elements with semantic meaning to the web platform.
    </li>
  </ul>
</section>
