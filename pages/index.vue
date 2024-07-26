<script setup lang="ts">
let { data } = useAsyncData("info", () =>
	queryContent("/info").find()
) as unknown as {
	data: [
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
	];
};
</script>
<template>
	<div>
		<div v-for="(part, i) in data[0].body" :key="i">
			<h1>{{ part.name }}</h1>
			<div v-for="(info, j) in part.info" :key="j">
				<h2>{{ info.name }}</h2>
				<h3>{{ info.head }}</h3>
				<p>{{ info.description }}</p>
				<ul class="points">
					<li v-for="point in info.points" :key="point">
						{{ point }}
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
</style>