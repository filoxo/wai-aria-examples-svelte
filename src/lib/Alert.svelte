<script lang="ts">
  export let id: string

  if (!id) throw new Error('Alert: id is required!')
</script>

<div {id} role="alert">
  <slot />
</div>

<style>
  [role='alert'] {
    padding: 10px;
    border: 2px solid hsl(206, 74%, 54%);
    border-radius: 4px;
    background: hsl(206, 74%, 90%);
  }

  [role='alert']:empty {
    display: none;
  }
</style>
