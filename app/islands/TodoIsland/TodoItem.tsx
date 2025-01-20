import { hc } from "hono/client";

import type { Todo } from "./types";

import type { AppType } from "@/routes/api/RPC";
const client = hc<AppType>("");

type Params = {
	todo: Todo;
	setTodo: (todo: Todo) => void;
};

export default function TodoItem({ todo, setTodo }: Params) {
	const handleCompletedChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;

		const completed = target.checked;

		const res = await client.api.todo[":id"].$patch({
			param: {
				id: todo.id,
			},
			json: {
				completed,
			},
		});

		if (res.status !== 200) {
			console.error("Failed to update todo");
		}

		setTodo({ ...todo, completed });
	};

	return (
		<li>
			<input
				id={todo.id}
				type="checkbox"
				checked={!!todo.completed}
				onChange={(e) => handleCompletedChange(e)}
			/>
			<label for={todo.id}>{todo.title}</label>
		</li>
	);
}
