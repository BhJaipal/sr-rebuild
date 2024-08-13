<template>
	<div class="my-10">
		<div class="mx-auto text-center text-5xl font-extrabold">
			<span class="text-red-600">Your</span> Profile
		</div>
		<div
			class="w-fit mx-auto mt-10 bg-neutral-800 gap-x-10 py-5 pl-5 pr-10"
		>
			<UAlert
				v-if="updateRes.status != 0 && updateAlert"
				:title="
					updateRes.status == 200
						? 'Profile Updated'
						: updateRes.status == 400
						? 'Invalid Details'
						: 'Could not update profile, Server Error'
				"
				@close="updateAlert = false"
				:close-button="{
					icon: 'i-heroicons-x-mark-20-solid',
					variant: 'solid',
					padded: false,
				}"
				:color="updateRes.status == 200 ? 'primary' : 'red'"
			/>
			<UForm
				class="gap-y-3 grid grid-cols-2"
				:state="data"
				@submit="onsubmit"
			>
				<div class="flex justify-center items-center flex-col gap-y-5">
					<img src="~/assets/unknown.jpg" class="w-36 h-36 rounded" />
					<UButton
						type="submit"
						variant="outline"
						color="red"
						:ui="btnUI"
						:disabled="!changable"
						label="Save Changes"
					/>
				</div>
				<div class="gap-y-3 flex flex-col">
					<UFormGroup
						label="Name"
						name="name"
						class="w-full mx-auto text-lg"
					>
						<UInput
							name="name"
							v-model="data.name"
							color="red"
							:ui="ui"
						/>
					</UFormGroup>
					<UFormGroup
						label="Email"
						name="email"
						class="w-fit mx-auto text-lg"
					>
						<UInput
							name="email"
							v-model="data.email"
							color="red"
							:ui="ui"
							type="email"
						/>
					</UFormGroup>
					<UFormGroup
						label="Password"
						name="pass"
						class="w-full mx-auto text-lg"
					>
						<UInput
							name="pass"
							v-model="data.pass"
							color="red"
							type="password"
							:ui="ui"
						/>
					</UFormGroup>
					<UFormGroup
						label="Position"
						name="position"
						class="w-full mx-auto text-lg"
					>
						<USelect
							name="position"
							v-model="originalVal.position"
							color="red"
							disabled
							:options="[originalVal.position]"
							type="password"
							:ui="ui"
						/>
					</UFormGroup>
				</div>
			</UForm>
		</div>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	middleware: function (to, from) {
		if (!useCookie<AdminType>("current-admin").value)
			return navigateTo("/admin-login");
	},
});
let btnUI = {
	color: {
		red: {
			outline: "bg-transparent text-red-500 border-red-500 border-solid",
		},
	},
};
let adminLogin = useCookie<AdminType>("current-admin");
let data = reactive({
	name: adminLogin.value.name,
	pass: adminLogin.value.pass,
	email: adminLogin.value.email,
});
let updateAlert = ref(false);
let originalVal = {
	name: adminLogin.value.name,
	pass: adminLogin.value.pass,
	email: adminLogin.value.email,
	position: adminLogin.value.position,
};
let ui = {
	color: {
		red: {
			outline: "focus:ring-red-500 ring-transparent bg-neutral-700",
		},
	},
};
let changable = computed(() => {
	return (
		data.name != originalVal.name ||
		data.email != originalVal.email ||
		data.pass != originalVal.pass
	);
});
let updateRes = reactive({ status: 0 });
watch(updateRes, (val: { status: number }) => {
	if (val && val.status != 0) {
		updateAlert.value = true;
		if (val.status == 200) navigateTo("/admin-dashboard");
	}
});

async function onsubmit() {
	if (!(data.name && data.email && data.pass)) return;
	if (!changable.value) return;

	let joined = (adminLogin.value._id.id as number[]).join("-");
	console.log("Here", joined);
	let res = await $fetch<{ status: 200 | 400 | 500 }>(
		`/api/update-profile?id=${joined}&name=${data.name}&email=${data.email}&pass=${data.pass}`
	);
	console.log(res);

	updateRes.status = res.status;
}
</script>