declare global {
	type GQLFetch<T extends Record<string, any> = Record<string, any>> =
		Promise<{
			data: T | null;
			error: { status: number; message: string } | null;
		}>;

	interface AdminType {
		name: string;
		email: string;
		pass: string;
		position: "manager" | "boss" | "employee";
	}
}
export {};
