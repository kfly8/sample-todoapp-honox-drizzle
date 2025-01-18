import { TOKEN_SECRET } from "@/token";
import { jwt } from "hono/jwt";
import { createRoute } from "honox/factory";

export default createRoute(jwt({ secret: TOKEN_SECRET, cookie: "token" }));
