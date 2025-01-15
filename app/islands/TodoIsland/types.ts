// TODO: Pick from domain/user, domai/todo ?
export type User = {
	id: string;
	name: string;
};

export type Todo = {
	id: string;
	title: string;
	authorId: string;
	// TODO: messy code
	completed?: boolean | undefined | null;
};
