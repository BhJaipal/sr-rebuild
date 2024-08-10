<template>
	<div>
		<div class="text-center text-5xl font-extrabold my-10">
			<span
				class="underline-offset-8 decoration-2 underline decoration-red-500"
				>Admi</span
			>n Login
		</div>
		<div class="z-10 shadow-md w-[40%] mx-auto h-80 shadow-black mb-20">
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
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	name: "Admin login",
});
let ui = {
	color: {
		red: {
			outline: "focus:ring-red-500 ring-transparent bg-slate-900",
		},
	},
};
let adminInput = reactive({
	name: "",
	email: "",
	password: "",
});
function onsubmit() {
	console.dir(adminInput);
}
</script>