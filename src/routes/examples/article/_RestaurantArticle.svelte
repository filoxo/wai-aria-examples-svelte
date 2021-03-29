<script>
  import Article from '$lib/Article.svelte';
  import { requires } from '$lib/helper-utils';

  export let index;
  export let image;
  export let name;
  export let rating;
  export let type;
  export let street;
  export let citystate;
  export let phone;

  requires(index, 'RestaurantArticle: index is required!');
  requires(name, 'RestaurantArticle: name is required!');

  let describedbyIDs = Object.values({
    rating: !rating ? '' : `restaurant-rating-${index}`,
    type: !type ? '' : `restaurant-type-${index}`,
    location: `restaurant-location-${index}`,
  }).join(' ');
</script>

<Article
  class="restaurant-item"
  aria-posinset={index}
  aria-labelledby={`restaurant-name-${index}`}
  aria-describedby={describedbyIDs}
>
  <div class="restaurant-details">
    {#if image}<div class="restaurant-image">{image}</div>{/if}
    <div class="restaurant-name" id={`restaurant-name-${index}`}>
      {name}
    </div>
    {#if rating}
      <div class="restaurant-rating" id={describedbyIDs.rating}>
        <img
          class="restaurant-star-img"
          alt={`${rating} stars`}
          src={`/images/rating-${rating}.png`}
        />
      </div>
    {/if}
    {#if type}
      <div class="restaurant-type" id={describedbyIDs.type}>{type}</div>
    {/if}
  </div>
  <div id={describedbyIDs.location} class="location-block">
    {#if street}<div class="restaurant-street">{street}</div>{/if}
    {#if citystate}<div class="restaurant-citystate">{citystate}</div>{/if}
    {#if phone}<div class="restaurant-phone">{phone}</div>{/if}
  </div>
  <div class="restaurant-actions">
    <button class="bookmark-button">Bookmark</button>
  </div>
</Article>

<style>
  :global(.restaurant-item) {
    background: white;
    box-shadow: 1px 1px 6px #bbb;
    margin-bottom: 15px;
    padding-top: 15px;
  }

  .restaurant-details {
    display: inline-block;
    margin-bottom: 10px;
    padding-left: 15px;
    vertical-align: top;
    width: 55%;
  }

  .restaurant-name {
    font-size: 18px;
    margin-bottom: 2px;
  }

  .restaurant-star-img {
    width: 90px;
  }

  .restaurant-type {
    color: #777;
    font-size: 13px;
  }

  .location-block {
    color: #777;
    display: inline-block;
    vertical-align: top;
    margin: 0 15px 10px;
    font-size: 14px;
    line-height: 1.3em;
  }

  .restaurant-actions {
    box-sizing: border-box;
    background: #a2afbc;
    padding: 10px;
    width: 100%;
  }
</style>
