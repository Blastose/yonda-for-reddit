import { converter } from 'reddit-md-to-html';
// Importing type Options from reddit-md-to-html doesn't work for some reason
type Options = NonNullable<Parameters<typeof converter>['1']>;

export function markdownToHtml(text: string, options?: Options) {
	return converter(text, { ...options, addTargetBlank: true });
}
