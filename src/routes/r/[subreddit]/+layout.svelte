<script lang="ts">
	export let data;
</script>

<div>
	{data.about.display_name_prefixed}
	{data.sidebar.at(0)?.id}
</div>

<slot />
