<script>
  import ButtonDiv from '../../lib/ButtonDiv.svelte';
  import ButtonAnchor from '../../lib/ButtonAnchor.svelte';

  $: isMuted = false;

  function toggleMute() {
    isMuted = !isMuted;
  }
</script>

<p>
  This <q>Print</q> action button uses a <code>div</code> element.
</p>
<ButtonDiv id="action" on:click={(e) => window.print()}>Print</ButtonDiv>

<p>
  This <q>Mute</q> toggle button uses an <code>a</code> element.
</p>
<ButtonAnchor id="toggle" aria-pressed={isMuted} on:click={toggleMute}>
  Mute
  <svelte:fragment slot="pressed-false">
    <svg>
      <use xlink:href="/static/mute.svg#icon-sound" />
    </svg>
  </svelte:fragment>
  <svelte:fragment slot="pressed-true">
    <svg>
      <use xlink:href="/static/mute.svg#icon-mute" />
    </svg>
  </svelte:fragment>
</ButtonAnchor>

<section>
  <p>
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/button/button.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      Original example has handlers for both keyup and keydown events on the
      action button. They both trigger the same function using the same methods,
      and I wasn't able to identify why it was done this way. I opted to handle
      the events in the same keydown listener.
    </li>
    <li>
      Coming from React experience, I found it interesting that I could not
      access the parent's on:click handler like normal props. I instead create a <a
        href="https://svelte.dev/tutorial/component-events">Component event</a
      >that handles both click and keyboard click, and the parent handles a
      single click event.
    </li>
  </ul>
</section>
