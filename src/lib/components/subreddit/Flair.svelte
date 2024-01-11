<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	type LinkFlair = Pick<
		SubmissionData,
		| 'link_flair_background_color'
		| 'link_flair_text_color'
		| 'link_flair_type'
		| 'link_flair_richtext'
		| 'link_flair_text'
	>;

	export let linkFlair: LinkFlair;
	console.log(linkFlair);

	$: styleTag = `background-color: ${
		linkFlair.link_flair_background_color || 'rgb(168, 220, 232);color: black'
	};`;
</script>

{#if linkFlair.link_flair_text}
	<div
		class="flair text-sm"
		class:text-black={linkFlair.link_flair_text_color === 'dark'}
		class:text-white={linkFlair.link_flair_text_color === 'light'}
		style={styleTag}
		style:color={linkFlair.link_flair_text_color ? '' : 'black'}
	>
		{#if linkFlair.link_flair_type === 'richtext'}
			{#each linkFlair.link_flair_richtext as richtext}
				{#if richtext.e === 'text'}
					<span class="rich-text">{richtext.t}</span>
				{:else if richtext.e === 'emoji'}
					<img class="flair-image h-4" src={richtext.u} alt="" />
				{/if}
			{/each}
		{:else if linkFlair.link_flair_type === 'text'}
			<span class="flair-text">{linkFlair.link_flair_text}</span>
		{/if}
	</div>
{/if}

<style>
	.flair {
		display: inline-flex;
		align-items: center;
		padding: 0rem 0.375rem;
		border-radius: 1rem;
		font-weight: 600;
	}

	.flair-text {
		overflow-wrap: anywhere;
	}

	img {
		display: inline-block;
	}

	:global(.flair-image + .rich-text) {
		margin-left: 0.375rem;
	}
</style>
