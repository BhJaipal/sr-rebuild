<template>
	<div>
		<div class="text-center text-5xl font-extrabold my-10">
			<span
				class="underline-offset-8 decoration-2 underline decoration-red-500"
				>Admi</span
			>n Login
		</div>
		<div
			class="z-10 shadow-md w-[40%] mx-auto h-80 shadow-black mb-20"
			v-if="submitted.status == 0"
		>
			<UForm :state="adminInput" @submit="onsubmit" class="space-y-4">
				<UFormGroup
					label="Name"
					name="name"
					class="w-1/2 mx-auto text-lg"
				>
					<UInput v-model="adminInput.name" color="red" :ui="ui" />
				</UFormGroup>
				<UFormGroup
					label="Email"
					name="email"
					class="w-1/2 mx-auto text-lg"
				>
					<UInput v-model="adminInput.email" color="red" :ui="ui" />
				</UFormGroup>
				<UFormGroup
					label="Password"
					name="password"
					class="w-1/2 mx-auto text-lg"
				>
					<UInput
						v-model="adminInput.password"
						color="red"
						:ui="ui"
					/>
				</UFormGroup>
				<UFormGroup name="Submit" class="flex flex-row justify-center">
					<UButton
						type="submit"
						color="red"
						:disabled="
							!(
								adminInput.email &&
								adminInput.password &&
								adminInput.name
							)
						"
						variant="outline"
						class="w-fit text-lg"
						>Submit</UButton
					>
				</UFormGroup>
			</UForm>
		</div>
		<div class="mx-auto flex-col text-center justify-center" v-else>
			<div class="text-3xl text-red-800">{{ submitted.status }}</div>
			<h1 class="text-white">{{ submitted.message }}</h1>
		</div>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	name: "Admin login",
});
let ui = {
	color: {
		red: {
			outline: "focus:ring-red-500 ring-transparent bg-neutral-700",
		},
	},
};
let adminInput = reactive({
	name: "",
	email: "",
	password: "",
});
let submitted = reactive({ status: 0, message: "" });
watch(submitted, (val: any) => console.log(val));
async function onsubmit() {
	console.dir(adminInput);
	if (!(adminInput.email && adminInput.name && adminInput.password)) return;

	let result = await $fetch<{ status: number; message: string }>(
		`/api/admin-login?name=${adminInput.name}&email=${adminInput.email}&password=${adminInput.password}`
	);
	if (!(result.status && result.message)) return;
	submitted.status = result.status;
	submitted.message = result.message;
}
</script>