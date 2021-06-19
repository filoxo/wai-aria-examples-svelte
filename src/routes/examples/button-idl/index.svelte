<script>
  import { ariaReflectionSupport } from './browserSupport'
  import ButtonIdlDiv from '$lib/ButtonIdlDiv.svelte'
  import ButtonIdlAnchor from '$lib/ButtonIdlAnchor.svelte'
  import AlertDialog from '$lib/AlertDialog.svelte'

  let alertIsDismissed = false

  let isMuted = false

  let hasAriaReflectionSupport

  ariaReflectionSupport.subscribe((value) => {
    hasAriaReflectionSupport = value
  })

  function dismissAlert() {
    alertIsDismissed = true
  }

  function toggleButtonState({ detail: button }) {
    if (button.ariaPressed === 'false') isMuted = true
    if (button.ariaPressed === 'true') isMuted = false
    button.ariaPressed = isMuted.toString()
  }
</script>

<p>
  The JavaScript for the example buttons on this page uses the <a
    href="https://www.w3.org/TR/wai-aria-1.2/#idl-interface"
    >IDL Interface defined in ARIA 1.2</a
  >. The purpose of these examples is to illustrate how to use ARIA Attribute
  Reflection and provide a test case for browser and assistive technology
  interoperability. Specifically, the <code>role</code> and
  <code>ariaPressed</code>
  attributes are accessed using dot notation instead of
  <code>setAttribute()</code>
  and <code>getAttribute()</code>. In all other respects, these examples are
  identical to the <a href="/examples/button">Button Examples</a>.
</p>

<p>
  This <q>Print</q> action button uses a <code>div</code> element.
</p>

<ButtonIdlDiv id="action" on:click={() => window.print()}
  >Print Page</ButtonIdlDiv
>

<p>
  This <q>Mute</q> toggle button uses an <code>a</code> element.
</p>

<ButtonIdlAnchor id="toggle" on:click={toggleButtonState}>
  Mute
  <svg>
    <use
      xlink:href={`/images/mute.svg${isMuted ? '#icon-mute' : '#icon-sound'}`}
    />
  </svg>
</ButtonIdlAnchor>

{#if !alertIsDismissed && !hasAriaReflectionSupport}
  <AlertDialog
    id="ariaReflectionSupportAlert"
    aria-labelledby="ariaReflectionSupportAlertHeading"
    onEsc={dismissAlert}
  >
    <h2 id="ariaReflectionSupportAlertHeading">⚠️ IMPORTANT:</h2>
    <p>
      This example is coded using syntax that was not introduced until version
      1.2 of the ARIA specification. Because this
      <a
        href="https://github.com/w3c/aria-practices/issues/1692"
        target="_blank"
      >
        browser does not yet provide support for ARIA attribute reflection</a
      >, the buttons will not be styled correctly.
    </p>
    <div>
      <button type="button" on:click={dismissAlert}
        >I understand, dismiss</button
      >
    </div>
  </AlertDialog>
{/if}

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
      This example page has a link to <a href="https://github.com/w3c/aria-at/"
        >aria-at</a
      >, a repo that contains a test suite and harness for assessing assistive
      technology (AT) support of ARIA. Seems very useful so I'll be learning
      more about this effort.
    </li>
    <li>
      Reflected properties aren't there yet, but I believe you could achieve the
      same with the <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"
        >MutationObserver API</a
      >
    </li>
    <!-- <li>
      An interesting conundrum ocurred to me while working on this: given that
      the DOM attribute needs to be the source of truth, should the component
      allow an initial value? What if that attribute changes
    </li> -->
    <li>
      The original example used a callout to denote that the example requires
      certain browser APIs. I instead reused the AlertDialog component from the
      other example instead if users' browser doesn't support the required APIs.
    </li>
  </ul>
</section>
