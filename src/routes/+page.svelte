<script lang="ts">
  export let data;
</script>


{#each data.submissions as d}
  <p>{d.title}</p>
{/each}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
