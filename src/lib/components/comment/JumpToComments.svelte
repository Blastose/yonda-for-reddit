<script lang="ts">
	let commentsContainer: HTMLDivElement;
	function jumpToComments(e: KeyboardEvent) {
		if (e.key === 'c' && !e.ctrlKey) {
			const nodeName = document.activeElement?.nodeName;
			if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') {
				commentsContainer.scrollIntoView();
			}
		}
	}
</script>

<svelte:window on:keydown={jumpToComments} />
<div bind:this={commentsContainer} class="comments-container"></div>

<style>
	.comments-container {
		scroll-margin-top: var(--header-height);
	}
</style>
