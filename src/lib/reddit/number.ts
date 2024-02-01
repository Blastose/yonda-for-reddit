export const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatDate(date: Date) {
	const month = date.toLocaleString('default', { month: 'short' });
	return `${month} ${date.getDate()} ${date.getFullYear()}`;
}
