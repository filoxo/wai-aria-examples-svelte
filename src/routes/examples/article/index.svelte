<script>
  import Feed from '../../../lib/Feed.svelte'
  import RestaurantArticle from './_RestaurantArticle.svelte'
  import { onMount } from 'svelte'

  const RestaurantData = [
    {
      name: "Tito's Tacos",
      rating: 5,
      type: 'Mexican, Tacos',
      street: '123 Blueberry Ln',
      citystate: 'San Dimas, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'Sakura Sushi',
      rating: 4,
      type: 'Japanese, Fish, Sushi',
      street: '123 Blueberry Ln',
      citystate: 'Pomona, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'Prime Steakhouse',
      rating: 4,
      type: 'Steakhouses',
      street: '123 Blueberry Ln',
      citystate: 'Claremont, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'The Pizza Factory',
      rating: 4,
      type: 'Pizza',
      street: '123 Blueberry Ln',
      citystate: 'Pomona, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: "Emperor's Mongolian",
      rating: 5,
      type: 'Mongolian, Barbequeue, Buffets',
      street: '123 Blueberry Ln',
      citystate: 'La Verne, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'Backyard Grill',
      rating: 3,
      type: 'American, Burgers',
      street: '123 Blueberry Ln',
      citystate: 'San Dimas, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'Taste Kitchen',
      rating: 4,
      type: 'American',
      street: '123 Blueberry Ln',
      citystate: 'Claremont, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'Bon Appetit',
      rating: 4,
      type: 'French',
      street: '123 Blueberry Ln',
      citystate: 'La Verne, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: "Sally's Sandwiches",
      rating: 3,
      type: 'Sandwiches, American',
      street: '123 Blueberry Ln',
      citystate: 'San Dimas, CA',
      phone: '(111) 111-1111',
      image: '',
    },
    {
      name: 'The HotPot Spot',
      rating: 5,
      type: 'Hot Pot, Japanese',
      street: '123 Blueberry Ln',
      citystate: 'Pomona, CA',
      phone: '(111) 111-1111',
      image: '',
    },
  ]

  const getRandomRestaurantData = () =>
    RestaurantData
      // clone objects
      .map((d) => ({ ...d }))
      // pseudo randomize
      .sort(() => Math.random() - 0.5)

  let lastChecked = Date.now()
  let timeout

  $: delay = 200
  $: feedItems = []
  $: loading = false

  onMount(() => {
    feedItems = getRandomRestaurantData()
  })

  function loadMore() {
    if (loading || !feedItems || !feedItems.length) return
    loading = true
    clearTimeout(timeout)
    console.log('delayinng for', delay)
    timeout = setTimeout(() => {
      loading = false
      feedItems = feedItems.concat(getRandomRestaurantData())
    }, delay)
  }

  function checkLoadMore() {
    const now = Date.now()
    if (lastChecked + 100 - now < 0) {
      loadMore()
      lastChecked = now
    }
  }
</script>

<h1>Article (Feed)</h1>

<div>
  <h2>Recommended Restaurants</h2>
  <section id="main-content">
    <Feed
      id="restaurant-feed"
      on:scroll-bottom={checkLoadMore}
      aria-busy={loading ? 'true' : null}
    >
      {#each feedItems as item, i}
        <RestaurantArticle
          {...item}
          aria-posinset={i + 1}
          aria-setsize={feedItems.length}
        />
      {/each}
    </Feed>
  </section>
  <section id="sidepanel">
    <label for="delay-time-select">Select article loading delay</label>
    <select
      id="delay-time-select"
      name="delay_time"
      bind:value={delay}
      on:input={(e) => {
        delay = parseInt(e.target.value, 10)
      }}
    >
      <option value="200">200 ms</option>
      <option value="400">400 ms</option>
    </select>
  </section>
</div>

<section>
  <p>
    Go to
    <a href="https://www.w3.org/TR/wai-aria-practices/examples/feed/feed.html"
      >original documentation</a
    >
    or
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/feed/feedDisplay.html"
      >feed display page</a
    >.
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      The original example was implemented as an 'infinite feed' which does not
      lend itself well to highlighting
    </li>
    <li>
      This example used <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Element/matches"
        >Element.matches</a
      > which is new to me. The example includes a polyfill but browser support for
      this browser API is practically universal now, so I've omitted it.
    </li>
    <li>
      Rendering of the article elements should leverage a <code>template</code> element
      instead of having everything embedded as strings in JS.
    </li>
    <li>
      Coming from React experience, I expected there to be a way to get a ref to
      the rendered children but that seems to be an edge case that isn't fully
      supported at the moment. See also <a
        href="https://github.com/sveltejs/svelte/issues/4869"
        >sveltejs/svelte#4869</a
      >.
    </li>
    <li>
      I learned that styles passed down to a component are not preserved (since
      the component may or may not use them?). So they must be made <code
        >:global</code
      >
      which I'm not a fan of, but there is a corresponding proposal at
      <a href="https://github.com/sveltejs/rfcs/pull/13">sveltejs/rfcs#13</a> that
      is interesting.
    </li>
    <li>
      The example maintained an index cursor of the currently selected article.
      I instead opted for using document.activeElement and other DOM APIs for
      managing the focus.
    </li>
    <li>
      The requirements state:
      <blockquote>
        <kbd>Control</kbd> + <kbd>Home</kbd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move
        focus to the first focusable element before the feed.
      </blockquote>
      but instead<a
        href="https://github.com/w3c/aria-practices/blob/main/examples/feed/js/feed.js#L74"
        >focus is being manually set to the<em>first item in the feed</em></a
      >, presumably because there are no focusable elements before the feed.
      Even so, focusing on the first item seems incorrect and should instead
      simply not move focus at all.
    </li>
  </ul>
</section>

<style>
  #sidepanel {
    box-sizing: border-box;
    display: inline-block;
    padding-left: 1.5em;
    vertical-align: top;
    width: 29%;
  }

  #delay-time-select {
    display: block;
    margin-top: 5px;
    width: 10em;
  }

  #main-content {
    display: inline-block;
    vertical-align: top;
    min-width: 250px;
    width: 70%;
  }

  :global(#restaurant-feed) {
    max-height: 50vh;
    max-width: 100%;
    overflow-y: auto;
    padding: 1rem;
    width: 500px;
  }

  @media screen and (max-width: 560px) {
    #main-content {
      width: 100%;
    }
  }
</style>
