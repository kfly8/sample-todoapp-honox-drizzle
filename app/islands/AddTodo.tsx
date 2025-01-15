import { hc } from "hono/client";
import { useState } from "hono/jsx";

import type { AppType } from "@/routes/api/todo";
const client = hc<AppType>("/api/todo");

export const AddTodo = () => {
	const [title, setTitle] = useState("");

	const handleTitleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setTitle(target.value);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const result = await client.index.$post({ json: { title } });

		if (result.status === 401) {
			console.error("Unauthorized");
		} else if (result.status === 500) {
			console.error("Failed to add todo");
		} else {
			const todo = await result.json();
			console.log(todo);
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
};
