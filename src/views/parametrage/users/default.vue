<template>
	<div>
	  <div class="content-header">
		<div class="d-flex align-items-center justify-content-between">
		  <h3 class="page-title">Utilisateurs</h3>
		  <div class="d-inline-block align-items-center">
			<nav>
			  <ol class="breadcrumb">
				<li class="breadcrumb-item">
				  <router-link to="/"><i class="mdi mdi-home-outline"></i></router-link>
				</li>
				<li class="breadcrumb-item" aria-current="page">SIM</li>
				<li class="breadcrumb-item active" aria-current="page">Utilisateurs</li>
			  </ol>
			</nav>
		  </div>
		</div>
	  </div>
	  <div class="box">
		<div class="box-header with-border p-2">
		  <div class="p-15">
			<User></User>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  <script>
  import User from "@/components/parametrages/users.vue";
  export default {
	components: {
		User,
	},
  };
  </script>
  <style lang="css" scoped></style>