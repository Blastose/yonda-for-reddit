<script lang="ts">
	export let data;
</script>

<div class="flex flex-col gap-4 pt-6">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_256px]">
		<div class="flex flex-col gap-6">
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
					<p class="text-sm font-semibold text-[var(--visited-link-color)]">u/{data.about.name}</p>
				</div>
			</div>

			<slot />
		</div>
		<div class="hidden sm:block">Profile info</div>
	</div>
</div>
