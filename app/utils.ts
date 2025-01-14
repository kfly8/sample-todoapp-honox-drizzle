import { sign, verify } from "hono/jwt";
import { err, ok } from "neverthrow";

export const generateId = () => {
	return Bun.randomUUIDv7();
};

export const generateToken = async <T>(payload: T) => {
	const secret = "hello";

	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	const payloadWithJwtValidation = { ...payload, iat, exp };

	const token = await sign(payloadWithJwtValidation, secret);
	return token;
};

export const verifyToken = async <T>(token: string) => {
	try {
		const payload = await verify(token, "hello");
		return ok(payload as T);
	} catch (e) {
		return err(e);
	}
};
