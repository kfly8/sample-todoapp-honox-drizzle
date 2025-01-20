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

	return (
		<>
			<AddTodo user={user} todos={todos} setTodos={setTodos} />
			<TodoList todos={todos} setTodos={setTodos} />
		</>
	);
}
