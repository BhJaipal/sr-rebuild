<template>
	<div>
		<Title>Add New Admin</Title>
		<div v-if="out.status == 0">
			<div class="text-center text-5xl font-extrabold my-10">
				<span
					class="underline-offset-8 decoration-2 underline decoration-red-500"
					>Enter</span
				>
				Admin Details
			</div>
			<div
				class="z-10 shadow-md w-[40%] mx-auto h-80 shadow-black mb-20 py-5"
			>
				<UForm :state="adminData" @submit="onsubmit" class="space-y-4">
					<UFormGroup
						label="Name"
						name="name"
						class="w-1/2 mx-auto text-lg"
					>
						<UInput v-model="adminData.name" color="red" :ui="ui" />
					</UFormGroup>
					<UFormGroup
						label="Email"
						name="email"
						class="w-1/2 mx-auto text-lg"
					>
						<UInput
							v-model="adminData.email"
							type="email"
							color="red"
							:ui="ui"
						/>
					</UFormGroup>
					<UFormGroup
						label="Password"
						name="password"
						class="w-1/2 mx-auto text-lg"
					>
						<UInput
							v-model="adminData.pass"
							color="red"
							type="password"
							:ui="ui"
						/>
					</UFormGroup>
					<UFormGroup
						label="Position"
						name="position"
						class="w-1/2 mx-auto text-lg"
					>
						<USelect
							:options="options"
							v-model="adminData.position"
							:ui="ui"
							color="red"
						/>
					</UFormGroup>
					<UFormGroup
						name="Submit"
						class="flex flex-row justify-center"
					>
						<UButton
							type="submit"
							color="red"
							:disabled="
								!(
									adminData.email &&
									adminData.pass &&
									adminData.name &&
									adminData.position
								)
							"
							variant="outline"
							class="w-fit text-lg"
							>Submit</UButton
						>
					</UFormGroup>
				</UForm>
			</div>
		</div>
		<div
			class="text-center text-5xl font-extrabold my-10"
			v-else-if="out.status == 400"
		>
			<span
				class="underline-offset-8 decoration-2 underline decoration-red-500"
				>Adding Employee failed</span
			>
		</div>
		<div v-else class="text-center text-green-500 text-5xl font-bold mt-5">
			Employee Added
		</div>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	middleware: function (to, from) {
		let adminLoggedIn = useCookie<AdminType>("current-admin");
		console.log(adminLoggedIn);
		if (
			!adminLoggedIn.value ||
			adminLoggedIn.value.position == "employee"
		) {
			console.log(adminLoggedIn.value);
			return navigateTo(from.fullPath);
		}
	},
});
let adminLoggedIn = useCookie<AdminType>("current-admin");
let options =
	adminLoggedIn.value.position == "boss"
		? ["manager", "employee"]
		: ["employee"];
console.log(options);

let adminData = reactive<AdminType>({
	name: "",
	email: "",
	pass: "",
	position: "employee",
});
let ui = {
	color: {
		red: {
			outline: "focus:ring-red-500 ring-transparent bg-neutral-700",
		},
	},
};
let out = reactive({ status: 0 });
watch(out, (val) => {
	if (val.status == 200) {
		// setTimeout(() => {
		// 	navigateTo("/admin-dashboard");
		// }, 1500);
	}
});
async function onsubmit() {
	if (
		!(
			adminData.email &&
			adminData.pass &&
			adminData.name &&
			adminData.position
		)
	)
		return;
	let result = await $fetch<{
		status: number;
	}>(
		`/api/add-emp?name=${adminData.name}&email=${adminData.email}&pass=${adminData.pass}&position=${adminData.position}`
	);

	out.status = result.status;
}
</script>