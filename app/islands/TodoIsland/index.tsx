import { useState } from "hono/jsx";

import type { Todo, User } from "./types";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

type Params = {
	user: User;
	todos: Todo[];
};

export default function TodoIsland({ user, todos: initialTodos }: Params) {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	// TODO: use Context?
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
