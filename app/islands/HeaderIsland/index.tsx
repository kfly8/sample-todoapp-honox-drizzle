import type { User } from "./types";

type Params = {
	user: User;
};

export default function TodoIsland({ user }: Params) {
	return (
		<>
			<header class="pb-4">
				<span class="text-xl font-bold text-gray-800 mb-4">Hello!</span>{" "}
				{user.name}
			</header>
		</>
	);
}
