<script lang="ts">
	import { relativeTime } from '$lib/reddit/relativeTime';
	import { nowStore } from '$lib/stores/nowStore';

	export let postedTimeSeconds: number;
	export let editedTimeSeconds: number | boolean = false;

	$: currentTime = $nowStore;
	$: postedTime = postedTimeSeconds * 1000;
	$: editedTime = typeof editedTimeSeconds === 'number' ? editedTimeSeconds * 1000 : false;
	$: postedTimeDateString = new Date(postedTime).toString();
	$: editedTimeDateString = typeof editedTime === 'number' ? new Date(editedTime).toString() : null;
</script>

<time datetime={postedTimeDateString} title={postedTimeDateString}>
	{relativeTime(currentTime, postedTimeSeconds)}
</time>

{#if typeof editedTimeSeconds === 'number'}
	<time datetime={editedTimeDateString} title={editedTimeDateString}>
		* (edited {relativeTime(currentTime, editedTimeSeconds)})
	</time>
{/if}
