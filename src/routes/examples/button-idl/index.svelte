<script>
  import { ariaReflectionSupport } from './browserSupport'
  import ButtonIdlDiv from '$lib/ButtonIdlDiv.svelte'
  import AlertDialog from '$lib/AlertDialog.svelte'

  let alertIsDismissed = false

  $: isMuted = false

  function toggleMute() {
    isMuted = !isMuted
  }

  let hasAriaReflectionSupport

  ariaReflectionSupport.subscribe((value) => {
    hasAriaReflectionSupport = value
  })

  function dismissAlert() {
    alertIsDismissed = true
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
  </ul>
</section>
