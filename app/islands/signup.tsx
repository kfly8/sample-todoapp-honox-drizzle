import { hc } from "hono/client";
import { useState } from "hono/jsx";
import type { PostType } from "../routes/api/signup";

type User = {
	id: string;
	name: string;
};

const client = hc<PostType>("/api/signup").index;

export default function Signup() {
	const [user, setUser] = useState<User | null>(null);
	const [name, setName] = useState<string>("");

	const signup = async (name: string) => {
		const res = await client.$post({ json: { name } });
		if (res.status === 201) {
			const user = await res.json();
			setUser(user);
			return;
		}
		const error = await res.json();
		console.log(error);
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setName(target.value);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		signup(name);
	};

	return (
		<>
			{user === null ? (
				<form>
					<input
						type="text"
						name="name"
						placeholder="Input your name"
						required
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit" onClick={(e) => handleSubmit(e)}>
						Signup
					</button>
				</form>
			) : (
				<p>Hello, {user.name}!</p>
			)}
		</>
	);
}
