import type { User } from "./types";

type Params = {
	user: User;
};

export default function TodoIsland({ user }: Params) {
	return (
		<>
			<header>
				<span class="text-3xl font-bold">Hello!</span> {user.name}
			</header>
		</>
	);
}
