<script lang="ts">
	import { page } from '$app/stores';
	import Missing404Template from '$lib/components/error/Missing404Template.svelte';
	import GenericError from '$lib/components/error/GenericError.svelte';
</script>

<div class="container-doku mt-4">
	{#if $page.error?.code === 404}
		<Missing404Template text="Page not found" subtext="The page you requested does not exist." />
	{:else}
		<GenericError />
	{/if}
</div>
