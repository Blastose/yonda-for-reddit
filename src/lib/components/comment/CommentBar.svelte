<script lang="ts">
	export let toggleCommentVisibility: () => void;
	export let commentHidden: boolean;
</script>

<button
	class="bar-button"
	on:click={toggleCommentVisibility}
	aria-label={commentHidden ? 'expand comment' : 'hide comment'}
>
	<span class="line" />
</button>

<style>
	.bar-button {
		display: flex;
		justify-content: center;
		height: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	.line {
		display: block;
		transition-duration: 400ms;
		background-color: #454649;
		height: 100%;
		width: 0.125rem;
	}

	.bar-button:hover .line {
		background-color: #ffffffb2;
	}
</style>
