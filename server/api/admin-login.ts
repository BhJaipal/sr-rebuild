export default defineEventHandler(async (event) => {
	let query = getQuery(event);

	const name = query["name"];
	const email = query["email"];
	const password = query["password"];

	let res = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: `#graphql
		query {
			Admins {
				name
				pass
				email
			}
		}
		`,
		}),
	});
	let out = await res.json();
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
