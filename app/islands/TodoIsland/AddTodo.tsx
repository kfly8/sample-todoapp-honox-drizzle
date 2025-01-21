import { hc } from "hono/client";
import { useState } from "hono/jsx";

import type { Todo, User } from "./types";

import type { AppType } from "@/routes/api/RPC";
const client = hc<AppType>("");

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

		const result = await client.api.todo.$post({
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
		<form class="flex items-center mb-4">
			<input
				type="text"
				placeholder="Add a todo"
				onChange={(e) => handleTitleChange(e)}
				value={title}
				required
				class="flex-grow border border-gray-100 rounded-l-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-100"
			/>
			<button
				type="submit"
				onClick={(e) => handleSubmit(e)}
				class="bg-gray-100 text-gray-600 px-4 py-2 rounded-r-md hover:bg-gray-200 transition"
			>
				Add
			</button>
		</form>
	);
}
