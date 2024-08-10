<script setup lang="ts">
const props = defineProps<{
	prependIcon?: string;
	label?: string;
	bgColor?: string;
	onclick?: () => any;
	color?: string;
	class?: string;
	trailingClass?: string;
}>();
let btnColor = computed(() => {
	if (!!(props.bgColor && props.color))
		return "bg-" + props.bgColor + " text-" + props.color;
	else if (!!props.bgColor) return "bg-" + props.bgColor;
	else if (!!props.color) return "text-" + props.color;
	else return "";
});
</script>
<template>
	<button
		:class="
			$props.class + ' flex flex-row rounded-md w-fit gap-x-2 ' + btnColor
		"
		@click="onclick"
	>
		<UIcon v-if="prependIcon" :name="prependIcon" size="20" />
		<div v-if="label" class="text-md">{{ label }}</div>
		<div :class="trailingClass">
			<slot name="trailing" />
		</div>
	</button>
</template>