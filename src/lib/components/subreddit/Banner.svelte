<script lang="ts">
	import type { SubredditData } from 'jsrwrap/types';

	export let about: SubredditData;

	$: bannerUrl = about.banner_background_image || about.banner_img;
	$: icon = about.community_icon || about.icon_img;
</script>

{#key bannerUrl}
	<section class="banner">
		<div
			class="{bannerUrl ? '' : 'bg-[#434b7c]'}
       h-[64px] w-full rounded-md bg-cover bg-center bg-no-repeat sm:h-[128px]"
			style:background-image="url({bannerUrl})"
		/>
		<div class="relative bottom-[30px] mb-[-30px] flex gap-2 px-2">
			{#if icon}
				<img
					class="h-[80px] w-[80px] rounded-full border-4 border-[#292b2f] bg-[#292b2f]"
					src={icon}
					alt="{about.display_name} icon"
				/>
			{:else}
				<div
					class="flex h-[80px] w-[80px] items-center justify-center rounded-full border-4 border-[#292b2f] bg-[#292b2f] text-4xl"
				>
					r/
				</div>
			{/if}
			<a
				href="/{about.display_name_prefixed.toLowerCase()}"
				class="flex self-end pb-2 text-3xl font-bold">{about.display_name_prefixed}</a
			>
		</div>
	</section>
{/key}

<style>
	.banner {
		view-transition-name: banner;
	}
</style>
