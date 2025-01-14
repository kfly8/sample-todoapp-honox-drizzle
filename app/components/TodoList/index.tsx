import { useLoginContext } from "@/components/LoginContext";
import type { FC } from "hono/jsx";

export const TodoList: FC = () => {
	const user = useLoginContext();
	console.log(user);

	return (
		<>
			<li>Buy milk</li>
		</>
	);
};
