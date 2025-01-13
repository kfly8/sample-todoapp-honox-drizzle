import { useAuth } from "@/hooks/auth";
import { useState } from "hono/jsx";

export default function Signup() {
	const { user, signup } = useAuth();
	const [name, setName] = useState<string>("");

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
