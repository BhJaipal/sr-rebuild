<template>
	<div class="my-10 overflow-y-scroll">
		<div class="flex flex-col gap-y-10">
			<div class="w-1/3 mx-auto my-2">
				<UInput
					v-model="searchEmployee"
					variant="outline"
					icon="i-heroicons-magnifying-glass-20-solid"
					placeholder="Search Employee"
					color="rose"
				></UInput>
			</div>
			<div
				class="mx-auto text-left w-1/3"
				v-if="bossList && bossList.length > 0"
			>
				<div class="text-2xl w-fit font-bold">Boss:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in bossList"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:id="admin._id.id"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:is-you="ifIsYou(admin, adminLogin)"
				></AdminCard>
			</div>
			<div
				class="mx-auto text-left w-1/3"
				v-if="managerList && managerList.length > 0"
			>
				<div class="text-2xl w-fit font-bold">Managers:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in managerList"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:id="admin._id.id"
					:is-you="ifIsYou(admin, adminLogin)"
				></AdminCard>
			</div>
			<div
				class="mx-auto text-left w-1/3"
				v-if="employeeList && employeeList.length > 0"
			>
				<div class="text-2xl w-fit font-bold">Employees:</div>
				<br />
				<AdminCard
					v-for="(admin, i) in employeeList"
					:key="i"
					:name="admin.name"
					:email="admin.email"
					:your-position="adminLogin.position"
					:emp-position="admin.position"
					:is-you="ifIsYou(admin, adminLogin)"
					:id="admin._id.id"
				></AdminCard>
			</div>
		</div>
		<button
			v-if="
				adminLogin.position == 'boss' ||
				adminLogin.position == 'manager'
			"
			@click="addEmpFunc"
			class="fixed z-10 bottom-20 right-20 rounded-full w-20 h-20 text-white hover:text-red-800 border-0 bg-neutral-800"
		>
			<UIcon name="i-heroicons-plus-16-solid" size="40" />
		</button>
	</div>
</template>
<script setup lang="ts">
const adminLogin = useCookie<AdminType>("current-admin");
definePageMeta({
	middleware: function (to, from) {
		if (!useCookie<AdminType>("current-admin"))
			return navigateTo("/admin-login");
		if (from.fullPath != "/admin-login") return navigateTo("/admin-login");
	},
});
let searchEmployee = ref("");
const addEmpFunc = () => {
	return navigateTo("/add-employee");
};
let adminList = useAsyncData<AdminType[]>(async () => {
	return $fetch("/api/all-admins");
});
let employeeList = computed(() =>
	adminList.data.value?.filter((emp: AdminType) =>
		searchEmployee.value
			? emp.position == "employee" &&
			  emp.name
					.toLowerCase()
					.includes(searchEmployee.value.toLowerCase())
			: emp.position == "employee"
	)
);
let bossList = computed(() =>
	adminList.data.value?.filter((emp: AdminType) =>
		!searchEmployee.value
			? emp.position == "boss"
			: emp.position == "boss" &&
			  emp.name
					.toLowerCase()
					.includes(searchEmployee.value.toLowerCase())
	)
);
let managerList = computed(() =>
	adminList.data.value?.filter((emp: AdminType) =>
		!searchEmployee.value
			? emp.position == "manager"
			: emp.position == "manager" &&
			  emp.name
					.toLowerCase()
					.includes(searchEmployee.value.toLowerCase())
	)
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