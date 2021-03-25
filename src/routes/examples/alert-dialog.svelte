<script>
  import { onMount } from 'svelte';
  import AlertDialog from '../../lib/AlertDialog.svelte';
  import Toast from '../../lib/Toast.svelte';

  const localStorageKey = 'alertdialog-notes';

  let value = '';
  let currentSavedValue;

  $: count = value.split(/\s/).length;
  $: changesPending = false;
  $: openAlert = false;
  $: showToast = false;

  function openAlertDialog() {
    openAlert = true;
  }

  function closeDialog() {
    openAlert = false;
  }

  function discardInput() {
    value = '';
    save();
    closeDialog();
  }

  function save() {
    currentSavedValue = value;
    localStorage.setItem(localStorageKey, currentSavedValue);
    changesPending = false;
    toast();
  }

  function detectChanges() {
    changesPending = currentSavedValue !== value;
  }

  function keydownHandler(e) {
    var mod = navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey;
    if ((e.key === 's') & mod) {
      e.preventDefault();
      save();
    }
  }

  function toast() {
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 4000);
  }

  onMount(() => {
    currentSavedValue = localStorage.getItem(localStorageKey);
    value =
      currentSavedValue ??
      'This is an example text box, which unsurprisingly contains text. The user is given the option to save this text - which triggers a basic alert - or to discard the text - which triggers an alert dialog that prompts the user for confirmation.';

    detectChanges();
    if (changesPending) save();
  });
</script>

<label for="notes"> Notes </label>
<textarea
  class="notes"
  name="notes"
  id="notes"
  rows="7"
  bind:value
  on:input={detectChanges}
  on:keydown={keydownHandler}
/>
<button
  type="button"
  aria-controls="notes"
  id="notes_save"
  disabled={!changesPending}
  on:click={save}
>
  Save
</button>
<button
  type="button"
  aria-controls="notes"
  id="notes_discard"
  disabled={!value}
  on:click={openAlertDialog}
>
  Discard
</button>

{#if showToast}
  <Toast id="alert_toast">Saved</Toast>
{/if}

{#if openAlert}
  <AlertDialog
    id="alert_dialog"
    labelledby="dialog_label"
    describedby="dialog_desc"
    onEsc={closeDialog}
  >
    <h2 id="dialog_label" class="dialog_label">Confirmation</h2>
    <div id="dialog_desc" class="dialog_desc">
      <p>Are you sure you want to discard all of your notes?</p>
      <p>{count} word{count > 1 ? 's' : ''} will be deleted.</p>
    </div>
    <div class="dialog_form_actions">
      <button type="button" on:click={closeDialog}> No </button>
      <button
        type="button"
        aria-controls="notes"
        id="notes_confirm"
        on:click={discardInput}
      >
        Yes
      </button>
    </div>
  </AlertDialog>
{/if}

<section>
  <p>
    <a
      href="https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/alertdialog.html"
      >Go to original example.</a
    >
  </p>
  <h2>Lessons learned:</h2>
  <ul>
    <li>
      The original example has state strewn throughout the code. Using a
      framework helps organize these.
    </li>
    <li>
      I was surprised to find that once the AlertDialog is closed it returns
      focus to the textarea, not to the element that triggered it. This might
      seem like a better UX but goes against my initial inclination of returning
      focus to the button that triggered it to follow the same path that got the
      user there.
    </li>
    <li>
      The keyboard-related Utils use <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode"
        ><code>keyCode</code></a
      >
      which is deprecated. I used
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key"
        ><code>key</code></a
      > instead.
    </li>
  </ul>
</section>

<style>
  .dialog_label {
    text-align: center;
  }

  .dialog_form_actions {
    text-align: right;
    padding: 0 20px 20px;
  }

  .dialog_desc {
    padding: 10px 20px;
  }

  .notes {
    display: block;
    font-size: 1rem;
    line-height: 1.3;
    min-width: 400px;
    max-width: 100%;
    width: 33%;
  }
</style>
