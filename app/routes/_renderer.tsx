import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
				{import.meta.env.PROD ? (
					<script type="module" src="/assets/client.js" />
				) : (
					<Script src="/app/client.ts" async />
				)}
				{import.meta.env.PROD ? (
					<link href="/assets/style.css" rel="stylesheet" />
				) : (
					<link href="/app/style.css" rel="stylesheet" />
				)}
			</head>
			<body class="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
				{children}
			</body>
		</html>
	);
});
