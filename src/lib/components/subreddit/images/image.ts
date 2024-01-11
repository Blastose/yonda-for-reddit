import type { SubmissionData } from 'jsrwrap/types';

export function getSrcsetAndSizes(submission: SubmissionData) {
	const image = submission.preview.images.at(0);
	if (!image) return null;
	const resolutions = image.resolutions;
	const srcsetWidths = [320, 640, 1080];
	if (!srcsetWidths.includes(image.source.width)) {
		resolutions.push(image.source);
		srcsetWidths.push(image.source.width);
		srcsetWidths.sort((a, b) => a - b);
	}

	let srcset = '';
	resolutions.forEach((r, index) => {
		const indexOfWidth = srcsetWidths.findIndex((s) => s === r.width);
		if (indexOfWidth !== -1) {
			srcset += r.url;
			srcset += ' ';
			srcset += `${r.width}w`;

			// Remove the used width since sometimes the width is repeated in the resolutions array
			srcsetWidths.splice(indexOfWidth, 1);

			// Add a comma if we're not at the end of the array
			if (index !== resolutions.length - 1) {
				srcset += ', ';
			}
		}
	});

	const sizes = '(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw';
	return { srcset, sizes };
}
