<template>
	<div>
		<div class="flex flex-col gap-y-10 mt-5">
			<div class="mx-auto text-left w-1/3">
				<div class="text-2xl w-fit font-bold">Boss:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in adminList.data.value?.filter(
						(emp) => emp.position === 'boss'
					)"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:is-you="ifIsYou(admin, adminLogin)"
				></AdminCard>
			</div>
			<div class="mx-auto text-left w-1/3">
				<div class="text-2xl w-fit font-bold">Managers:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in adminList.data.value?.filter(
						(emp) => emp.position === 'manager'
					)"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:is-you="ifIsYou(admin, adminLogin)"
				></AdminCard>
			</div>
			<div class="mx-auto text-left w-1/3">
				<div class="text-2xl w-fit font-bold">Employees:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in adminList.data.value?.filter(
						(emp) => emp.position === 'employee'
					)"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:is-you="ifIsYou(admin, adminLogin)"
				></AdminCard>
			</div>
		</div>
		<button
			v-if="
				adminLogin.position == 'boss' ||
				adminLogin.position == 'manager'
			"
			@click="navigateTo('/add-employee')"
			class="fixed bottom-20 right-20 rounded-full w-20 h-20 text-white hover:text-red-800 border-0 bg-neutral-800"
		>
			<UIcon name="i-heroicons-plus-16-solid" size="40" />
		</button>
	</div>
</template>
<script setup lang="ts">
const adminLogin = useCookie<AdminType>("current-admin");
definePageMeta({
	middleware: function (to, from) {
		if (from.fullPath != "/admin-login") return navigateTo("/admin-login");
		if (!useCookie<AdminType>("current-admin"))
			return navigateTo("/admin-login");
	},
});
let adminList = useAsyncData<AdminType[]>(async () =>
	$fetch("/api/all-admins")
);

function ifIsYou(emp: AdminType, you: AdminType) {
	return (
		emp.name.toLowerCase() === you.name.toLowerCase() &&
		emp.email.toLowerCase() === you.email.toLowerCase() &&
		emp.pass == you.pass &&
		emp.position == you.position
	);
}
</script>