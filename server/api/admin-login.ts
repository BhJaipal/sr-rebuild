import { useNuxtApp } from "nuxt/app";

export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	console.log(query);

	const name = query["name"];
	const email = query["email"];
	const password = query["password"];

	console.log(name, email, password);

	let out = await useNuxtApp().$useGQLFetch<{
		Admins: {
			name: string;
			email: string;
			pass: string;
		}[];
	}>(
		"http://localhost:3300/",
		`#graphql
		query {
			Admins {
				name
				pass
				email
			}
		}
		`
	);
	console.log(out.data ? out.data.Admins : out.error);
	if (out.data) {
		for (let ad of out.data.Admins) {
			if (
				typeof name == "string" &&
				typeof email == "string" &&
				ad.name.toLowerCase() == name?.toLowerCase() &&
				ad.email.toLowerCase() == email?.toLowerCase() &&
				ad.pass == password
			) {
				return {
					status: 200,
					message: "Success",
				};
			}
		}
		return {
			status: 400,
			message: "Login failed",
		};
	} else {
		return {
			status: 401,
			message: "No admin database",
		};
	}
});
