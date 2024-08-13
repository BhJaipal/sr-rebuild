<script setup lang="ts">
let props = defineProps<{
	name: string;
	email: string;
	yourPosition: string;
	empPosition: string;
	isYou: boolean;
	id: number[];
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
let showAlert = ref(false);
let delOut = reactive({ status: 0 });
let updateStatus = reactive({ status: 0 });
let updateAlert = ref(false);
async function delEmp() {
	let ask = confirm("Are you sure?");
	if (ask) {
		let joined = (props.id as number[]).join("-");
		let res = await $fetch<{ status: 200 | 400 | 500 }>(
			`/api/remove-admin?id=${joined}`
		);
		updateStatus.status = res.status;
	}
}
async function updatePos(pos: string) {
	let ask = confirm("Are you sure?");
	if (ask) {
		let joined = (props.id as number[]).join("-");
		let res = await $fetch<{ status: 200 | 400 | 500 }>(
			`/api/change-pos?id=${joined}&position=${pos}`
		);
		updateStatus.status = res.status;
	}
}
watch(delOut, (val) => {
	if (val.status != 0 && val && val.status != undefined)
		showAlert.value = true;
});
watch(updateStatus, (val) => {
	if (val.status != 0 && val && val.status != undefined)
		updateAlert.value = true;
});
</script>
<template>
	<div>
		<Title>Admin Dashboard</Title>
		<div
			v-if="delOut.status != 200 && updateStatus.status != 200"
			class="bg-neutral-800 shadow w-full mx-auto px-5 py-3 flex flex-row"
		>
			<div>
				<img
					src="~/assets/unknown.jpg"
					class="w-24 h-24 rounded-full mr-5"
				/>
			</div>
			<div class="w-full">
				<div class="text-4xl my-1 font-bold text-red-500">
					{{ name }}
				</div>
				<div class="text-md font-bold">
					<a :href="`mailto:${email}`" class="text-inherit">{{
						email
					}}</a>
				</div>
				<div class="text-small" v-if="isYou">You</div>
			</div>
			<div
				class="h-full"
				v-if="
					(yourPosition != empPosition &&
						((yourPosition == 'manager' &&
							empPosition == 'employee') ||
							(yourPosition == 'boss' &&
								(empPosition == 'employee' ||
									empPosition == 'manager')))) ||
					isYou
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
								@click="delEmp"
								>Remove Admin</UButton
							>
							<UButton
								v-if="empPosition == 'employee'"
								:ui="ui"
								@click="updatePos('manager')"
								color="transparent"
								>Promote to Manager</UButton
							>
							<UButton
								v-else-if="empPosition == 'manager'"
								:ui="ui"
								@click="updatePos('boss')"
								color="transparent"
								>Promote to Boss</UButton
							>
							<UButton
								v-if="
									yourPosition == 'boss' &&
									empPosition == 'manager'
								"
								:ui="ui"
								@click="updatePos('employee')"
								color="transparent"
								>Demote to Employee</UButton
							>
							<UButton
								v-if="isYou"
								:ui="ui"
								@click="navigateTo('your-profile')"
								color="transparent"
								>Go to Your Profile</UButton
							>
						</div>
					</template>
				</UPopover>
			</div>
		</div>
		<UAlert
			v-if="delOut.status == 500 && showAlert"
			color="red"
			@close="showAlert = false"
			title="Server Error"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'link',
				padded: false,
			}"
		/>
		<UAlert
			v-if="delOut.status == 200 && showAlert"
			color="primary"
			@close="showAlert = false"
			title="Admin Removed, Please refresh page"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'link',
				padded: false,
			}"
		/>
		<UAlert
			v-if="delOut.status == 400 && showAlert"
			color="red"
			title="Invalid ID"
			@close="showAlert = false"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'solid',
				color: 'red',
				padded: true,
			}"
		/>
		<UAlert
			v-if="updateStatus.status == 500 && showAlert"
			color="red"
			@close="showAlert = false"
			title="Server Error"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'link',
				padded: false,
			}"
		/>
		<UAlert
			v-if="updateStatus.status == 200 && updateAlert"
			color="primary"
			@close="updateAlert = false"
			title="Admin position updated, Please refresh page"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'link',
				padded: false,
			}"
		/>
		<UAlert
			v-if="updateStatus.status == 400 && updateAlert"
			color="red"
			title="Invalid ID"
			@close="updateAlert = false"
			:close-button="{
				icon: 'i-heroicons-x-mark-20-solid',
				variant: 'solid',
				color: 'red',
				padded: true,
			}"
		/>
	</div>
</template>