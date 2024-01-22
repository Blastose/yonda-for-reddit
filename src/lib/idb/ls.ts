type LSSchema = {
	videoVolume: string;
	state: string;
};

type Keys = keyof LSSchema;

export const lsdb = {
	get<T extends Keys>(key: T): LSSchema[T] | null {
		const data = localStorage.getItem(key);

		if (data === null) {
			return null;
		}

		return data;
	},

	set<T extends Keys>(key: T, value: LSSchema[T]) {
		localStorage.setItem(key, value.toString());
	},

	remove(key: Keys) {
		localStorage.removeItem(key);
	}
};
