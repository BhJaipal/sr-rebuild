<script setup lang="ts">
let iconsInfo = [
	{ name: "mdi:github", url: "https://github.com/BhJaipal/sr-rebuild" },
	{
		name: "mdi:linkedin",
		url: "https://www.linkedin.com/company/sr-e-business-solutions",
	},
];
let services = [
	[
		{ name: "SEO" },
		{ name: "PPC" },
		{ name: "Reputation Management" },
		{ name: "Web Development" },
	],
	[
		{ name: "Marketing automation" },
		{ name: "Social Media" },
		{ name: "Industries" },
	],
];
let websiteRoutes = [
	[
		{ name: "Home", url: "/" },
		{ name: "About and Contact us", url: "/about" },
		{ name: "Admin login", url: "/admin-login" },
		{ name: "Admin dashboard", url: "/admin-dashboard" },
		{ name: "User form", url: "/user-form" },
	],
];
let industryServices = [
	{ name: "Luxury Communities" },
	{ name: "Franchise" },
	{ name: "E-Commerce" },
	{ name: "Real Estate" },
	{ name: "Health care" },
];
</script>
<template>
	<footer>
		<section id="sr-pages" class="flex flex-col">
			<div class="grid grid-cols-4">
				<div
					class="flex pt-3 items-center justify-start pl-[20%] col-span-2"
				>
					<h2>
						<span
							class="underline decoration-orange-600 decoration-2 underline-offset-[12px]"
							>Digita</span
						>l Marketing Services
					</h2>
				</div>
				<div class="flex pt-3 items-center justify-start">
					<h2>
						<span
							class="underline decoration-orange-600 decoration-2 underline-offset-[12px]"
							>Webs</span
						>ite Routes
					</h2>
				</div>
				<div class="flex pt-3 items-center justify-start">
					<h2>
						<span
							class="underline decoration-orange-600 decoration-2 underline-offset-[12px]"
							>Indust</span
						>ries
					</h2>
				</div>
			</div>
			<div class="grid grid-cols-4">
				<div
					v-for="(serList, i) in services"
					:key="i"
					class="flex flex-col"
				>
					<div
						v-for="(serv, j) in serList"
						:key="j"
						class="flex items-center justify-start pl-[10%] pt-3 last:pb-3"
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
						class="flex items-center justify-start pt-3 last:pb-3"
					>
						<a :href="rte.url" class="no-underline">{{
							rte.name
						}}</a>
					</div>
				</div>
				<div class="flex flex-col">
					<div
						v-for="(ids, i) in industryServices"
						:key="i"
						class="flex items-center justify-start pt-3 last:pb-3"
					>
						{{ ids.name }}
					</div>
				</div>
			</div>
		</section>
		<section id="footer">
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
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
		sans-serif;
}
#sr-pages {
	@apply bg-neutral-800 h-auto text-white;
}
#footer {
	@apply bg-neutral-800 h-[5rem] text-white;
}
#footer > div {
	@apply flex items-center justify-start pl-10 gap-x-4;
}
a {
	color: white;
}
</style>