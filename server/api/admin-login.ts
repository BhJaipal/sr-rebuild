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
				position
				_id {
					id
				}
			}
		}
		`,
		}),
	});
	let out: {
		data: {
			Admins: AdminType[];
		};
	} = await res.json();
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
					admin: {
						name: ad.name,
						email: ad.email,
						pass: ad.pass,
						position: ad.position,
						_id: ad._id,
					},
				};
			}
		}
		return {
			status: 403,
			message: "Invalid name, email or password",
		};
	} else {
		return {
			status: 503,
			message: "Service unavailable",
		};
	}
});
