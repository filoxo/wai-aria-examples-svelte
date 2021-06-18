<div id="container">
  <nav>
    <a href="/" id="home-link">Home</a>
    <a href="/examples/alert">Alert</a>
    <a href="/examples/article">Article</a>
    <a href="/examples/alert-dialog">Alert Dialog</a>
    <a href="/examples/button">Button</a>
    <a href="/examples/button-idl">Button (IDL)</a>
    <a href="/examples/checkbox-two-state">Checkbox (two state)</a>
    <a href="/examples/checkbox-mixed-state">Checkbox (mixed state)</a>
    <a href="/examples/table">Table</a>
    <a href="/examples/combobox-with-grid">Combobox with Grid Popup</a>
    <a href="/examples/link">Link</a>
  </nav>
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
    background: #fafafa;
    font-family: Helvetica, Arial, sans-serif;
  }
  #container {
    display: flex;
  }

  #container > * {
    padding: 0.5rem;
  }

  #container nav {
    display: flex;
    flex-direction: column;
    max-width: 10rem;
    min-width: 10rem;
  }

  #home-link {
    margin-bottom: 1rem;
  }

  #container main {
    flex-grow: 1;
  }
</style>
