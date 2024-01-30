<script lang="ts">
	import type { SubredditData } from 'jsrwrap/types';

	export let about: SubredditData | null;
	export let fallbackSubreddit: string | null = null;

	$: bannerUrl = about?.banner_background_image || about?.banner_img;
	$: icon = about?.community_icon || about?.icon_img;
</script>

{#key bannerUrl}
	<section class="banner">
		<div
			class="{bannerUrl ? '' : 'bg-[#434b7c]'}
       h-[64px] w-full rounded-md bg-cover bg-center bg-no-repeat sm:h-[128px]"
			style:background-image={bannerUrl ? `url(${bannerUrl})` : undefined}
		/>
		<div class="relative bottom-[30px] mb-[-30px] flex gap-2 px-2">
			{#if icon}
				<img
					height="80"
					width="80"
					class="h-[80px] w-[80px] rounded-full border-4 border-[#292b2f] bg-[#292b2f]"
					src={icon}
					alt="{about?.display_name} icon"
				/>
			{:else}
				<div
					class="flex h-[80px] w-[80px] items-center justify-center rounded-full border-4 border-[#292b2f] bg-[#292b2f] text-4xl"
				>
					r/
				</div>
			{/if}
			{#if about?.display_name_prefixed || fallbackSubreddit}
				<a
					href="/{about?.display_name_prefixed.toLowerCase() ?? fallbackSubreddit}"
					class="flex self-end pb-2 text-3xl font-bold"
					>{about?.display_name_prefixed ?? fallbackSubreddit}</a
				>
			{:else}
				<p class="flex self-end pb-2 text-3xl font-bold">Home</p>
			{/if}
		</div>
	</section>
{/key}

<style>
	.banner {
		view-transition-name: banner;
	}
</style>
