import type { User } from "./types";

type Params = {
	user: User;
};

export default function TodoIsland({ user }: Params) {
	return (
		<>
			<header>Hello, {user.name}</header>
		</>
	);
}
