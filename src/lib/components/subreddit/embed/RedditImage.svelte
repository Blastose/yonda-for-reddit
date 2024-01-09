<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getSrcsetAndSizes } from '../images/image';

	export let submission: SubmissionData;

	$: defaultImage = submission.preview.images.at(0)?.source;
	$: defaultImageUrl = submission.preview.images.at(0)?.source.url ?? '';
	$: srcsetAndSizes = getSrcsetAndSizes(submission);
	$: aspectRatio = (defaultImage?.height ?? 0) / (defaultImage?.width ?? 1);

	$: spoiler = submission.spoiler;
	$: nsfw = submission.over_18;
</script>

<div class="relative max-h-[512px] overflow-hidden rounded-2xl border border-[#303030]">
	<img
		class="absolute left-0 top-1/2 h-full w-full -translate-y-1/2 scale-[1.2] object-cover opacity-30 blur-xl"
		src={defaultImageUrl}
		srcset={srcsetAndSizes?.srcset}
		sizes={srcsetAndSizes?.sizes}
		alt="{submission.subreddit_name_prefixed} - {submission.title}"
	/>
	<img
		style:aspect-ratio={aspectRatio}
		class="h-full max-h-[512px] w-full object-contain"
		src={defaultImageUrl}
		srcset={srcsetAndSizes?.srcset}
		sizes={srcsetAndSizes?.sizes}
		alt="{submission.subreddit_name_prefixed} - {submission.title}"
	/>
</div>
