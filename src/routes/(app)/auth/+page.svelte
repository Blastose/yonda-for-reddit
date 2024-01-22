<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head><title>OAuth</title></svelte:head>

{#if $page.url.searchParams.get('code')}
	<div class="container-doku">
		<p>
			Firefox (or your current browser) cannot receive an access token from Reddit after redirecting
			back.
		</p>
		<p>This can be fixed by refreshing the page.</p>
		<p>Please refresh the page manually to log in.</p>
	</div>
{/if}
