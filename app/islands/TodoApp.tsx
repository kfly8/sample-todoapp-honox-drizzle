import { hc } from "hono/client";
import type { FC } from "hono/jsx";
import { useState } from "hono/jsx";

import type { AppType } from "@/routes/api/todo";
const client = hc<AppType>("/api/todo");

// TODO: Pick from domain/user, domai/todo
type User = {
	id: string;
	name: string;
};

type Todo = {
	id: string;
	title: string;
	authorId: string;
	// TODO: messy code
	completed?: boolean | undefined | null;
};

type Params = {
	user: User;
	todos: Todo[];
};

export default function TodoApp({ user, todos: initialTodos }: Params) {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	const addTodo = (todo: Todo) => {
		setTodos([todo, ...todos]);
	};

	return (
		<>
			<AddTodo user={user} addTodo={addTodo} />
			<TodoList todos={todos} />
		</>
	);
}

// TODO: Move to AddTodo.tsx
const AddTodo: FC<{ user: User; addTodo: (todo: Todo) => void }> = ({
	user,
	addTodo,
}) => {
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
};

// TODO: Move to TodoList.tsx
const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
	return (
		<>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input type="checkbox" checked={!!todo.completed} />
						{todo.title}
					</li>
				))}
			</ul>
		</>
	);
};
