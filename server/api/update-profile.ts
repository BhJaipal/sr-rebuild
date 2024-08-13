export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	let id = query["id"];
	const name = query["name"];
	const email = query["email"];
	const password = query["pass"];

	if (!id) return { status: 400 };
	let oid = id
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
				mutation updateProfile($employee: EmployeeWithAll!) {
					updateProfile(employee: $employee) {
						status
					}
				}`,
			variables: {
				employee: {
					_id: {
						id: oid,
					},
					name: name,
					email: email,
					pass: password,
				},
			},
		}),
	});
	let output: {
		data: {
			updateProfile: {
				status: 200 | 500;
			};
		};
	} = await res.json();
	console.log(output);

	return output.data.updateProfile;
});
