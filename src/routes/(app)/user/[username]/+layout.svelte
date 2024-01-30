<script lang="ts">
	import Hr from '$lib/components/layout/Hr.svelte';
	import CreationsSort from '$lib/components/reddituser/CreationsSort.svelte';
	import RedditUser from '$lib/components/reddituser/RedditUser.svelte';

	export let data;
</script>

<div class="flex flex-col gap-4 pt-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_320px]">
		<div class="flex flex-col gap-6">
			<div class="user-profile flex flex-col gap-6">
				<div class="flex items-center gap-4">
					<img
						class="rounded-full"
						height="72"
						width="72"
						src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png"
						alt=""
					/>
					<div>
						<h1 class="text-2xl font-bold">{data.about.name}</h1>
						<p class="text-sm font-semibold text-[var(--visited-link-color)]">
							u/{data.about.name}
						</p>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<CreationsSort username={data.username} />
					<Hr />
				</div>
			</div>

			<slot />
		</div>
		<div
			class="user-sidebar thin-scrollbar sticky top-16 hidden h-[calc(100dvh-100px)] overflow-y-auto md:block"
		>
			<RedditUser redditUser={data.about} />
		</div>
	</div>
</div>

<style>
	.user-profile {
		view-transition-name: user-profile;
	}

	.user-sidebar {
		view-transition-name: user-sidebar;
	}
</style>
