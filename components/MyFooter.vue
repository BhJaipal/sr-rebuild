<script setup lang="ts">
let iconsInfo = [
	{ name: "mdi:github", url: "https://github.com/BhJaipal/sr-rebuild" },
	{
		name: "mdi:linkedin",
		url: "https://www.linkedin.com/company/sr-e-business-solutions",
	},
];
let services = [
	[{ name: "SEO" }, { name: "PPC" }],
	[
		{ name: "Reputation Management" },
		{ name: "Web Development" },
		{ name: "Social Media" },
	],
	[{ name: "Marketing automation" }, { name: "Industries" }],
];
let websiteRoutes = [
	[
		{ name: "Home", url: "/" },
		{ name: "About and Contact us", url: "/about" },
	],
	[
		{ name: "Admin login", url: "/admin-login" },
		{ name: "Admin dashboard", url: "/admin-dashboard" },
		{ name: "User form", url: "/user-form" },
	],
];
</script>
<template>
	<footer>
		<section id="sr-pages" class="flex flex-col">
			<div class="grid grid-cols-2">
				<div class="flex pt-3 items-center justify-center">
					<h2>Services</h2>
				</div>
				<div class="flex pt-3 items-center justify-center">
					<h2>Website</h2>
				</div>
			</div>
			<div class="grid grid-cols-5">
				<div
					v-for="(serList, i) in services"
					:key="i"
					class="flex flex-col"
				>
					<div
						v-for="(serv, j) in serList"
						:key="j"
						class="flex items-center justify-center pt-3 last:pb-3"
					>
						{{ serv.name }}
					</div>
				</div>
				<div
					v-for="(webList, i) in websiteRoutes"
					:key="i"
					class="flex flex-col"
				>
					<div
						v-for="(rte, j) in webList"
						:key="j"
						class="flex items-center justify-center pt-3 last:pb-3"
					>
						<a :href="rte.url" class="no-underline">{{
							rte.name
						}}</a>
					</div>
				</div>
			</div>
		</section>
		<section id="footer">
			<div id="copyright">
				<p>Copyright © 2024 - SR E-Business Solutions</p>
			</div>
			<div>
				<div v-for="(ico, i) in iconsInfo" :key="i">
					<a :href="ico.url" target="_blank">
						<Icon :name="ico.name" size="2rem"
					/></a>
				</div>
			</div>
		</section>
	</footer>
</template>
<style scoped>
* {
	@apply font-mono;
}
#sr-pages {
	@apply bg-emerald-950 border-emerald-900 h-auto text-white;
	border-width: 0px;
	border-top-width: 1px;
	border-top-style: solid;
}
#footer {
	@apply bg-emerald-950 border-emerald-900 h-[5rem] grid grid-cols-2 text-white;
	border-width: 0px;
	border-top-width: 1px;
	border-top-style: solid;
}
#footer > div {
	@apply flex items-center justify-end pr-20 gap-x-4;
}
a {
	color: white;
}
</style>