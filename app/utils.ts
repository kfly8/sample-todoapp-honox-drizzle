export const generateId = () => {
	return Bun.randomUUIDv7();
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
