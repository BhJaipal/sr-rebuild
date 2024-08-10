<script setup lang="ts">
import usePaletteState from "~/composables/palette";

let ui = {
	color: {
		transparent: {
			solid: "bg-transparent text-white hover:text-red-500 border-0 text-xl",
		},
	},
};
let servicesNav = [
	{ name: "SEO" },
	{ name: "PPC" },
	{ name: "Reputation Management" },
	{ name: "Web Development" },
	{ name: "Marketing automation" },
	{ name: "Social Media" },
	{ name: "Industries" },
];
let websiteRoutes = [
	{ id: "Home", label: "Home", href: "/" },
	{ id: "About-us", label: "About us", href: "/about" },
	{ id: "contact-us", label: "contact us", href: "/contact" },
	{ id: "Admin-login", label: "Admin login", href: "/admin-login" },
	{
		id: "Admin-dashboard",
		label: "Admin dashboard",
		href: "/admin-dashboard",
	},
	{ id: "User-form", label: "User form", href: "/user-form" },
];
const groups = ref([
	{
		key: "routes",
		label: "website routes",
		commands: websiteRoutes,
	},
]);
let palleteToggle = usePaletteState();
let isCommandPaletteOpen = ref(false);
</script>
<template>
	<header class="bg-neutral-800 py-3">
		<div class="w-full flex flex-row">
			<div class="basis-[36%] text-nowrap">
				<div class="grid grid-cols-2">
					<div class="flex flex-row justify-end">
						<img
							src="~/assets/sr-logo.png"
							width="40"
							height="40"
						/>
					</div>
					<div
						class="flex flex-row justify-start text-3xl font-bold"
						aria-label="SR E-business solutions"
					>
						SR E-Business Solutions
					</div>
				</div>
			</div>
			<div class="flex flex-row basis-[64%]">
				<div class="flex flex-row justify-center basis-1/2">
					<UPopover mode="hover">
						<UButton
							color="transparent"
							label="Services"
							:ui="ui"
							trailing-icon="i-heroicons-chevron-down-20-solid"
						/>
						<template #panel>
							<div class="flex flex-col bg-neutral-800">
								<UButton
									v-for="(serv, i) in servicesNav"
									:label="serv.name"
									:key="i"
									color="transparent"
									:ui="ui"
									:aria-label="serv.name"
								/>
							</div>
						</template>
					</UPopover>

					<UButton
						class="hover:text-red-500 no-underline"
						color="transparent"
						:ui="ui"
						aria-label="About us"
						to="/about"
						>About Us</UButton
					>
					<UButton
						class="hover:text-red-500 no-underline"
						color="transparent"
						:ui="ui"
						aria-label="contact us"
						to="/contact"
						>Contact Us</UButton
					>
				</div>
				<div class="basis-1/2 flex justify-center">
					<UButton
						icon="i-heroicons-magnifying-glass"
						:ui="ui"
						aria-label="command palette search"
						color="transparent"
						@click="isCommandPaletteOpen = true"
						v-if="palleteToggle"
					/>
					<VButton
						v-else
						:onclick="() => (isCommandPaletteOpen = true)"
						bg-color="blue-800"
						label="Search..."
						class="h-fit my-auto"
						prepend-icon="i-heroicons-magnifying-glass"
					>
						<template #trailing>
							<UKbd :ui="{ background: 'bg-blue-900' }"
								>Ctrl</UKbd
							>
							<UKbd :ui="{ background: 'bg-blue-900' }">K</UKbd>
						</template>
					</VButton>
				</div>
			</div>
			<UModal v-model="isCommandPaletteOpen">
				<UCommandPalette nullable :groups="groups" />
			</UModal>
		</div>
	</header>
</template>
<style scoped>
</style>