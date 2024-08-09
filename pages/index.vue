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
console.log(data.value);
</script>
<template>
	<div class="w-full h-64 m-0" id="sr-body"></div>
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
</style>