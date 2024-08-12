export default defineEventHandler(async (event) => {
	let query = getQuery(event);
	const name = query["name"];
	const email = query["email"];
	const position = query["position"];
	const pass = query["pass"];
	console.log(name, email, position, pass);
	if (name && email && position && pass) {
		return { status: 200 };
	} else {
		return { status: 400 };
	}
});
