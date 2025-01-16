import type { Todo } from "./types";

type Params = {
	todos: Todo[];
};

export default function TodoList({ todos }: Params) {
	return (
		<ul>
			{todos.map((todo) => (
				<li key={todo.id}>
					<input type="checkbox" checked={!!todo.completed} />
					{todo.title}
				</li>
			))}
		</ul>
	);
}
