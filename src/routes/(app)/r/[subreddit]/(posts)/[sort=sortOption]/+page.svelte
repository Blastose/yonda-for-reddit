<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

<svelte:head
	><title>{$page.params.sort} : {data.about?.title ?? $page.params.subreddit}</title></svelte:head
>
