<script setup lang="ts">
let { data } = useAsyncData("info", () =>
	queryContent("/info").find()
) as unknown as {
	data: Ref<
		[
			{
				body: [
					{
						name: string;
						info: [
							{
								name: string;
								head: string;
								description: string;
								points: string[];
							}
						];
					}
				];
			}
		]
	>;
};
let bodyDoc = useAsyncData("home", () =>
	queryContent("/").find()
) as unknown as {
	data: Ref<
		[
			{
				title: string;
				description: string;
				services: string[];
			}
		]
	>;
};
console.log(bodyDoc.data.value);

import usePaletteState from "~/composables/palette";
let palette = usePaletteState();
</script>
<template>
	<div class="w-full h-64 m-0" id="sr-body">
		<UToggle v-model="palette" />
		<br />
		<div class="flex flex-col w-1/2 mx-auto">
			<div>
				<h1 class="text-4xl font-extrabold mx-auto text-center w-1/2">
					{{ bodyDoc.data.value[0].title }}
				</h1>
			</div>
			<p class="text-center flex justify-center mx-auto my-0">
				{{ bodyDoc.data.value[0].description }}
			</p>
			<div>
				<ul id="list">
					<li
						v-for="(el, i) in bodyDoc.data.value[0].services"
						:key="i"
						class="text-center"
					>
						{{ el }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped>
.points {
	list-style-type: none;
}
ul {
	@apply grid grid-cols-3;
}
#sr-body {
	background-color: rgb(30, 30, 30);
}
#list {
	list-style: none;
}
</style>