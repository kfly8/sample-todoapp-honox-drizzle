import { hc } from "hono/client";
import { useState } from "hono/jsx";
import type { PostType } from "../routes/api/signup";

const client = hc<PostType>("/api/signup").index;

export default function Signup() {
	const [userName, setUserName] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setUserName(target.value);
	};

	const handleClick = async (e: Event) => {
		e.preventDefault();

		if (userName === "") {
			return;
		}

		const res = await client.$post({ json: { name: userName } });
		if (res.status === 201) {
			const user = await res.json();
			setUserId(user.id);
			return;
		}

		const error = await res.json();
		console.log(error);
	};

	return (
		<div>
			{userId === "" ? (
				<form>
					<input
						type="text"
						name="name"
						placeholder="Input your name"
						value={userName}
						required
						onChange={(e) => handleChange(e)}
					/>
					<button type="button" onClick={(e) => handleClick(e)}>
						Signup
					</button>
				</form>
			) : (
				<p>Hello, {userName}!</p>
			)}
		</div>
	);
}
