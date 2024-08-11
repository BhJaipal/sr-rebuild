<template>
	<div>
		<div class="flex flex-col gap-y-10 mt-5">
			<AdminCard
				v-for="(admin, i) in adminList.data.value"
				:key="i"
				:name="admin.name"
				:email="admin.email"
				:position="admin.position"
			></AdminCard>
		</div>
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
</script>