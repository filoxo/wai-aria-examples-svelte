<script>
  import Alert from '../../lib/Alert.svelte';

  let content = '';

  function addAlert() {
    content = `<p><span lang="da">Hej</span>, hello, <span lang="it">ciao</span>, <span lang="ja">こんにちは</span>, <span lang="ko">안녕</span></p>`;
  }
</script>

<button id="alert-trigger" on:click={addAlert}>Add Alert</button>

<Alert id="example">{@html content}</Alert>

<p>
  <a href="https://www.w3.org/TR/wai-aria-practices/examples/alert/alert.html"
    >Go to original example.</a
  >
</p>
