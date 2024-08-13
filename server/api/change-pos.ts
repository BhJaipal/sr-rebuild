export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	let id = query["id"];
	let position = query["position"];
	if (!(id && position)) return { status: 400 };
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
				mutation changePosition($employee: EmployeeWithIdAndPos!) {
					changePosition(employee: $employee) {
						status
					}
				}`,
			variables: {
				employee: {
					position: position,
					_id: {
						id: oid,
					},
				},
			},
		}),
	});
	let output: {
		data: {
			changePosition: {
				status: 200 | 500;
			};
		};
	} = await res.json();
	console.log(output);

	return output.data.changePosition;
});
