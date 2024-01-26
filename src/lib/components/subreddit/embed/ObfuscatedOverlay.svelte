<script lang="ts">
	export let obsfucatedImageUrl: string | undefined = undefined;
	export let type: 'nsfw' | 'spoiler' | 'none';

	let show = true;
	$: displayText = type === 'nsfw' ? 'View NSFW content' : 'View spoiler';
</script>

{#if type !== 'none'}
	<div class="relative {show ? 'overflow-hidden rounded-2xl' : ''}">
		<slot />

		{#if show}
			<button
				class="absolute top-0 h-full w-full"
				style:background-image={obsfucatedImageUrl ? `url('${obsfucatedImageUrl}')` : undefined}
				on:click={() => {
					show = false;
				}}
			>
				<span
					class="absolute top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-3xl"
				>
					<span class="rounded-3xl bg-black/50 px-4 py-2 text-sm font-semibold">{displayText}</span>
				</span>
			</button>
		{/if}
	</div>
{:else}
	<slot />
{/if}
