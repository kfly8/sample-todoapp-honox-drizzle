import type { User } from "@/domain/user";
import { createContext, useContext } from "hono/jsx";

export const LoginContext = createContext<User | null>(null);

export const useLoginContext = () => {
	const ctx = useContext(LoginContext);
	if (ctx === null) {
		throw new Error("useContext must be used inside a LoginContext");
	}
	return ctx;
};
