<div id="container">
  <nav>
    <a href="/">Home</a>
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
    width: 10rem;
    min-width: 5rem;
  }

  #container main {
    flex-grow: 1;
  }
</style>
