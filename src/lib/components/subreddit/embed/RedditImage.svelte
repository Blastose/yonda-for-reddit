<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getSrcsetAndSizes } from '../images/image';

	export let submission: SubmissionData;

	$: defaultImage = submission.preview.images.at(0)?.resolutions.at(0);
	$: defaultImageUrl = defaultImage?.url ?? '';
	$: srcsetAndSizes = getSrcsetAndSizes(submission);
	$: aspectRatio = (defaultImage?.width ?? 0) / (defaultImage?.height ?? 1);

	$: spoiler = submission.spoiler;
	$: nsfw = submission.over_18;
</script>

{defaultImage?.width}
<div
	class="background-stuff relative z-0 max-h-[512px] overflow-hidden rounded-2xl border border-[#303030]"
	style="background-image: linear-gradient(rgba(27, 27, 27, 0.8), rgba(27, 27, 27, 0.8)), url({defaultImageUrl});"
>
	<div class="background-filter"></div>
	<img
		style:aspect-ratio={aspectRatio}
		class="h-full max-h-[512px] w-full object-contain"
		src={defaultImageUrl}
		srcset={srcsetAndSizes?.srcset}
		sizes={srcsetAndSizes?.sizes}
		alt="{submission.subreddit_name_prefixed} - {submission.title}"
	/>
</div>

<style>
	.background-filter {
		backdrop-filter: blur(16px);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: -1;
	}

	.background-stuff {
		position: relative;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
