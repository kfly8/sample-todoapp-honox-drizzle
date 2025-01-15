import { hc } from "hono/client";
import { useState } from "hono/jsx";

import type { Todo, User } from "./types";

import type { AppType } from "@/routes/api/todo";
const client = hc<AppType>("/api/todo");

type Params = {
	user: User;
	addTodo: (todo: Todo) => void; // Function to add a todo to the list / TODO: use Context?
};

export default function AddTodo({ user, addTodo }: Params) {
	const [title, setTitle] = useState("");

	const handleTitleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setTitle(target.value);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const result = await client.index.$post({
			json: { title, authorId: user.id },
		});

		if (result.status === 500) {
			console.error("Failed to add todo");
		} else {
			const todo = await result.json();
			addTodo(todo);
			setTitle(""); // Clear the input field
		}
	};

	return (
		<form>
			<input
				type="text"
				placeholder="Add a todo"
				onChange={(e) => handleTitleChange(e)}
				value={title}
			/>
			<button type="submit" onClick={(e) => handleSubmit(e)}>
				Add
			</button>
		</form>
	);
}
