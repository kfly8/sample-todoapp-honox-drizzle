import { sign, verify } from "hono/jwt";
import { err, ok } from "neverthrow";

import type { User } from "@/domain/user";

type Payload = {
	user: User;
};

export const TOKEN_SECRET = "Hello, honox!";

export const generateToken = async (payload: Payload) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	const payloadWithJwtValidation = { ...payload, iat, exp };

	const token = await sign(payloadWithJwtValidation, TOKEN_SECRET);
	return token;
};

export const verifyToken = async (token: string) => {
	try {
		const payload = await verify(token, TOKEN_SECRET);
		return ok(payload as Payload);
	} catch (e) {
		return err(e);
	}
};
