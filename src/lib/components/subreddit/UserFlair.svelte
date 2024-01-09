<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	type AuthorFlair = Pick<
		SubmissionData,
		| 'author_flair_background_color'
		| 'author'
		| 'author_flair_css_class'
		| 'author_flair_richtext'
		| 'author_flair_type'
		| 'author_flair_text'
		| 'author_flair_text_color'
		| 'author_flair_template_id'
	>;

	export let author: AuthorFlair;
</script>

{#if (author.author_flair_richtext && author.author_flair_richtext.length > 0) || author.author_flair_text}
	<div class="flex items-center">
		{#if author.author_flair_type === 'text' && author.author_flair_text}
			<p class="text-xs">{author.author_flair_text}</p>
		{:else if author.author_flair_type === 'richtext' && author.author_flair_richtext}
			{#each author.author_flair_richtext as richtext}
				{#if richtext.e === 'text' && richtext.t}
					<span class="text-xs">{richtext.t}</span>
				{:else if richtext.e === 'emoji'}
					<img width="16" height="16" src={richtext.u} alt="emoji{richtext.a}" />
				{/if}
			{/each}
		{/if}
	</div>
{/if}
