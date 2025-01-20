import TodoItem from "./TodoItem";
import type { Todo } from "./types";

type Params = {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
};

export default function TodoList({ todos, setTodos }: Params) {
	return (
		<ul>
			{todos.map((todo, index) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					setTodo={(todo: Todo) =>
						setTodos(todos.map((t, i) => (i === index ? todo : t)))
					}
				/>
			))}
		</ul>
	);
}
