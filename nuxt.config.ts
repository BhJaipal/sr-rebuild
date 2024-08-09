// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	tailwindcss: {
		cssPath: "./app.css",
		configPath: "./tailwind.config.js",
	},
	app: {
		head: {
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
	modules: [
		"@nuxt/ui",
		"@nuxt/content",
		"@nuxt/image",
		"tailwindcss",
		"@pinia/nuxt",
		"nuxt-icon",
	],
});
