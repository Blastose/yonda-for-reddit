<script lang="ts">
	export let name: string;
	export let href: string;
	export let active: boolean;
</script>

<!-- TODO refactor colors -->
<a
	class="thin-scrollbar flex whitespace-nowrap rounded-3xl
  px-4 py-2 font-semibold duration-150
  {active ? 'bg-[#4e4e86]' : 'hover:bg-[#303031]'} "
	{href}>{name}</a
>
