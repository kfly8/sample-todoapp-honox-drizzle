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
			<form>
				<input type="text" placeholder="Add a todo" />
				<button type="submit">Add</button>
			</form>
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
