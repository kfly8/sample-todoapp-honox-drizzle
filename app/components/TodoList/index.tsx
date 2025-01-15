type Todo = {
	id: string;
	completed: boolean | null;
	title: string;
};

type Params = {
	todos: Todo[];
};

export const TodoList = ({ todos }: Params) => {
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
