import type { PropsWithChildren } from "hono/jsx";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div class="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
			{children}
		</div>
	);
}
