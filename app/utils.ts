import { sign, verify } from "hono/jwt";
import { err, ok } from "neverthrow";

export const generateId = () => {
	return Bun.randomUUIDv7();
};

type Payload = {
	user: {
		id: string;
		name: string;
	};
};

export const generateUserToken = async (payload: Payload) => {
	const secret = "hello";

	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	const payloadWithJwtValidation = { ...payload, iat, exp };

	const token = await sign(payloadWithJwtValidation, secret);
	return token;
};

export const verifyUserToken = async (token: string) => {
	try {
		const payload = await verify(token, "hello");
		return ok(payload as Payload);
	} catch (e) {
		return err(e);
	}
};
