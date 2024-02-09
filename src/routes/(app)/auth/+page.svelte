<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head><title>Reddit OAuth</title></svelte:head>

{#if $page.url.searchParams.get('code')}
	<div class="container-doku mt-4">
		<h1 class="text-lg font-bold">Refresh this page to log in.</h1>
		<p>
			For some reason, Firefox (or your current browser) cannot receive an access token from Reddit
			after redirecting back from Reddit's login page.
		</p>
		<p>This can be fixed by refreshing the page.</p>
		<p>Please refresh the page manually to log in.</p>
	</div>
{/if}
