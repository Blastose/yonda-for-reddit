<script lang="ts">
	export let padding = true;
</script>

<div class="animate-pulse {padding ? 'p-4' : ''}">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="skeleton h-6 w-2/3 rounded" />
			<div class="skeleton h-6 w-1/3 rounded" />
		</div>

		<div class="skeleton h-32 rounded" />
	</div>
</div>
