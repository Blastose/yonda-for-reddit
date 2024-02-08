<script lang="ts">
	export let defaultImageUrl: string;
	export let bgImageUrl: string;
	export let aspectRatio: number;
	export let altText: string;
	export let srcset: string | undefined;
	export let sizes: string | undefined;
</script>

<div
	class="item background-stuff relative z-0 flex max-h-[512px] flex-col overflow-hidden rounded-2xl border border-[#303030]"
	style="background-image: linear-gradient(rgba(27, 27, 27, 0.9), rgba(27, 27, 27, 0.9)), url({bgImageUrl});"
>
	<div class="background-filter"></div>
	<img
		style:aspect-ratio={aspectRatio}
		class="h-full max-h-[512px] w-full object-contain"
		src={defaultImageUrl}
		{srcset}
		{sizes}
		alt={altText}
		loading="lazy"
	/>
</div>

<style>
	.background-filter {
		backdrop-filter: blur(16px);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: -1;
	}

	.background-stuff {
		position: relative;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.item {
		display: flex;
		flex: 0 0 100%;
	}
</style>
