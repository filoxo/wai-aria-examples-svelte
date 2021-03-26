<div id="container">
  <nav>
    <a href="/" id="home-link">Home</a>
    <a href="/examples/alert">Alert</a>
    <a href="/examples/alert-dialog">Alert Dialog</a>
    <a href="/examples/button">Button</a>
  </nav>
  <main>
    <slot />
  </main>
</div>

<style>
  #container {
    display: flex;
  }

  #container > * {
    padding: 0.5rem;
  }

  #container nav {
    display: flex;
    flex-direction: column;
    min-width: 5rem;
    width: 10rem;
  }

  #home-link {
    margin-bottom: 1rem;
  }

  #container main {
    flex-grow: 1;
  }
</style>
