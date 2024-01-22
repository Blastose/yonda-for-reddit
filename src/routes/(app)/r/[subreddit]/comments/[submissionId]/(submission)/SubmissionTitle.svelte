<script lang="ts">
	export let title: string;
	export let subreddit: string;
	export let commenter: string | undefined = undefined;
</script>

<svelte:head
	><title>{commenter ? `${commenter} comments on ` : ''}{title} : {subreddit}</title></svelte:head
>
