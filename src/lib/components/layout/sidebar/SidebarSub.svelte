<script lang="ts">
	export let sub: string;
</script>

<a class="grid grid-cols-[32px_1fr] items-center gap-2" href="/r/{sub}">
	<span>
		<img
			class="rounded-full"
			src="https://styles.redditmedia.com/t5_3ptom/styles/communityIcon_ozhi2qzq64v71.png"
			alt=""
		/>
	</span>
	<span>r/{sub}</span>
</a>

<style>
	a {
		padding: 0.25rem 1rem;
		border-radius: 0.5rem;
	}

	a:hover {
		background: #252525;
	}
</style>
