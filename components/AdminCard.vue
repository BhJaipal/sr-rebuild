<script setup lang="ts">
let props = defineProps<{
	name: string;
	email: string;
	yourPosition: string;
	empPosition: string;
	isYou: boolean;
}>();
let ui = {
	color: {
		transparent: {
			solid: "bg-transparent text-white hover:text-red-500 border-0 text-xl",
		},
	},
};
let popoverModel = ref(false);
let removePosition = computed(() => {
	if (
		props.yourPosition == "boss" &&
		(props.empPosition == "manager" || props.empPosition == "employee")
	)
		return true;
	else if (props.yourPosition == "manager" && props.empPosition == "employee")
		return true;
	else return false;
});
</script>
<template>
	<div class="bg-neutral-800 shadow w-full mx-auto px-5 py-3 flex flex-row">
		<div>
			<img
				src="~/assets/unknown.jpg"
				class="w-24 h-24 rounded-full mr-5"
			/>
		</div>
		<div class="w-full">
			<div class="text-4xl my-2 font-bold text-red-500">
				{{ name }}
			</div>
			<div class="text-md font-bold">
				<a :href="`mailto:${email}`" class="text-inherit">{{
					email
				}}</a>
			</div>
		</div>
		<div
			class="h-full"
			v-if="
				yourPosition == 'boss' ||
				(yourPosition == 'manager' && !isYou && removePosition)
			"
		>
			<UPopover v-model="popoverModel">
				<UButton
					class="w-12 h-12 my-5"
					:ui="ui"
					color="transparent"
					@click="popoverModel = !popoverModel"
				>
					<UIcon name="i-heroicons-bars-3-16-solid" size="40" />
				</UButton>
				<template #panel>
					<div class="flex flex-col">
						<UButton
							:ui="ui"
							color="transparent"
							v-if="removePosition"
							>Remove Admin</UButton
						>
						<UButton
							v-if="empPosition == 'employee'"
							:ui="ui"
							color="transparent"
							>Promote to Manager</UButton
						>
						<UButton
							v-else-if="empPosition == 'manager'"
							:ui="ui"
							color="transparent"
							>Promote to Boss</UButton
						>
						<UButton
							v-if="
								yourPosition == 'boss' &&
								empPosition == 'manager'
							"
							:ui="ui"
							color="transparent"
							>Demote to Employee</UButton
						>
					</div>
				</template>
			</UPopover>
		</div>
	</div>
</template>