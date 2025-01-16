import { hc } from "hono/client";
import { useState } from "hono/jsx";

import type { Todo, User } from "./types";

import type { AppType } from "@/routes/api/todo";
const client = hc<AppType>("/api/todo");

type Params = {
	user: User;
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
};

export default function AddTodo({ user, todos, setTodos }: Params) {
	const [title, setTitle] = useState("");

	const handleTitleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setTitle(target.value);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!title) {
			// Don't add empty todos
			return;
		}

		const result = await client.index.$post({
			json: { title, authorId: user.id },
		});

		if (result.status !== 201) {
			console.error("Failed to add todo");
		} else {
			const todo = await result.json();
			setTodos([todo, ...todos]); // Add the new todo to the list
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
				required
			/>
			<button type="submit" onClick={(e) => handleSubmit(e)}>
				Add
			</button>
		</form>
	);
}
