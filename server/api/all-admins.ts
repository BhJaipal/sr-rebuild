export default defineEventHandler(async function () {
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
	return out.data.Admins;
});
