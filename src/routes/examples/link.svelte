<script>
  import LinkSpan from '$lib/Link/LinkSpan.svelte'
  import LinkImg from '$lib/Link/LinkImg.svelte'
  import LinkSpanBefore from '$lib/Link/LinkSpanBefore.svelte'
</script>

<LinkSpan href="https://www.w3.org/">Span as link</LinkSpan>

<div>
  <LinkImg
    src="https://www.w3.org/TR/wai-aria-practices/examples/link/images/w3c-logo.png"
    href="https://www.w3.org/"
    alt="W3C Website"
  />
</div>

<div>
  <LinkSpanBefore id="link3" href="https://www.w3.org/" label="W3C Website" />
</div>

<section>
  <p>
    <a href="https://www.w3.org/TR/wai-aria-practices/examples/link/link.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      <p>
        While this is a useful example, I feel the need to stress the warning of
        the original example:
      </p>
      <blockquote>
        Note: Use the HTML <code>&lt;a&gt;</code> element to create links whenever
        possible. Browsers provide valuable functionality for native HTML links,
        e.g., open the target in a new window and copy the target URL to the system
        clipboard.
      </blockquote>
      <p>
        The way I read this, there is <em>almost no reason ever</em> to use this
        specific pattern. The native anchor element already has so many features
        built into it that the cons outweigh any pros of this pattern. The only
        case I can think of for this reasoning is to specifically
        <strong>prevent</strong> those features/behaviors.
      </p>
    </li>
  </ul>
</section>

<style>
  :global(#link3)::before {
    content: url('https://www.w3.org/TR/wai-aria-practices/examples/link/images/w3c-logo.png');
    width: 153px;
    height: 104px;
  }
</style>
