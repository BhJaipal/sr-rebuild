import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
const config: Config = {
	darkMode: "class",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.{vue,js,ts}",
		"./pages/**/*.{vue,js,ts}",
		"./plugins/**/*.{js,ts}",
		"./*.css",
		"./error.{vue,js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {},
	},
	plugins: [tailwindTypography],
};
export default config;
