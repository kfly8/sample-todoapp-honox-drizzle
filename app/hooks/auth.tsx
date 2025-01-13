import { hc } from "hono/client";
import type { FC } from "hono/jsx";
import { createContext, useContext, useState } from "hono/jsx";

import type { PostType } from "../routes/api/signup";

export type Auth = {
	user: User | null;
	signup: (name: string) => void;
};

type User = {
	id: string;
	name: string;
};

export const AuthContext = createContext<Auth | null>(null);

export const useAuth = () => {
	const auth = useContext(AuthContext);
	if (auth === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return auth;
};

const client = hc<PostType>("/api/signup").index;

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

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

	return <AuthContext value={{ user, signup }}>{children}</AuthContext>;
};
