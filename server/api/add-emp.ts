export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	const name = query["name"];
	const email = query["email"];
	const position = query["position"];
	const pass = query["pass"];
	if (!(name && email && position && pass)) return { status: 400 };
	let res = await fetch("http://localhost:3300/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: `#graphql
				mutation AddEmployee($empInfo: EmpInfo!) {
					AddEmployee(empInfo: $empInfo) {
						status
					}
				}`,
			variables: {
				empInfo: {
					position: position,
					pass: pass,
					name: name,
					email: email,
				},
			},
		}),
	});
	let output: {
		data: {
			AddEmployee: {
				status: 200 | 500;
			};
		};
	} = await res.json();
	return output.data.AddEmployee;
});
