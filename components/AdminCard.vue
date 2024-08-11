<script setup lang="ts">
defineProps<{
	name: string;
	email: string;
	position: string;
}>();
</script>
<template>
	<div class="bg-neutral-800 shadow w-1/3 mx-auto px-5 py-3">
		<div class="text-3xl font-bold hover:text-red-700">
			{{ name }}
		</div>
		<div class="text-xl font-bold hover:text-red-700">
			{{ email }}
		</div>
		<div class="text-md hover:text-red-700">Position: {{ position }}</div>
	</div>
</template>