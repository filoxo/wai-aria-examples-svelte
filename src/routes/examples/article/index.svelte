<script>
  import { onDestroy, onMount } from 'svelte';
  import Feed from '../../../lib/Feed.svelte';
  import RestaurantArticle from './_RestaurantArticle.svelte';

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
  ];

  let interval;
  $: delay = 4000;
  $: feedItems = [];

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
  function getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  onMount(() => {
    interval = setInterval(() => {
      if (feedItems.length > 50) return;
      const newItemIndex = getRandomIndex(0, RestaurantData.length);
      const newItem = RestaurantData[newItemIndex];
      feedItems = [...feedItems, newItem];
    }, delay);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<h1>Article (Feed)</h1>

<div>
  <h2>Recommended Restaurants</h2>
  <section id="main-content">
    <Feed id="restaurant-feed">
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
        delay = parseInt(e.target.value, 10);
      }}
    >
      <option value="2000">2s</option>
      <option value="4000">4s</option>
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
      This example used <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Element/matches"
        >Element.matches</a
      > which is new to me. The example includes a polyfill but browser support for
      this browser API is practically universal now, so I've omitted it.
    </li>
    <li>
      Rendering of the article elements should leverage a <code>template</code> element
      instead of having everything strewn throughout the JavaScript.
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
    max-width: 100%;
    width: 500px;
  }

  @media screen and (max-width: 560px) {
    #main-content {
      width: 100%;
    }
  }
</style>
