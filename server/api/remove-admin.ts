export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	let id = query["id"];
	if (!id) return { status: 400 };
	let _id = id
		.toString()
		.split("-", (id as string).length)
		.map((el) => Number(el));
	let res = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: `#graphql
				mutation RemoveAdmin($employee: _RemoveEmployee!) {
					RemoveAdmin(employee: $employee) {
						status
					}
				}`,
			variables: {
				employee: {
					_id: {
						id: _id,
					},
				},
			},
		}),
	});
	let output: {
		data: {
			RemoveAdmin: {
				status: 200 | 500;
			};
		};
	} = await res.json();
	console.log(output);

	return output.data.RemoveAdmin;
});
