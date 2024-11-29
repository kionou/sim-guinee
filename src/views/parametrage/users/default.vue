<template >
    <div>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Gestion Utilisateurs </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Gestion Utilisateurs</li>
							</ol>
						</nav>
					</div>
				
				
			</div>
		</div>
        <div class="col-12">
			  <div class="box box-default">
				<!-- <div class="box-header with-border">
				  <h4 class="box-title">Horizontal alignment</h4>
				  <h6 class="box-subtitle">Use default tab with class <code>nav-tabs &amp; justify-content-center </code></h6>
				</div> -->
				<!-- /.box-header -->
				<div class="box-body">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs justify-content-center" role="tablist">
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" @click="handleTabClick('#user')" href="#user" role="tab"><span class="hidden-xs-down">Utilisateurs</span></a> </li>
						<li class="nav-item"> <a class="nav-link " data-toggle="tab" @click="handleTabClick('#role')" href="#role" role="tab"><span class="hidden-xs-down">Rôles</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" @click="handleTabClick('#permission')" href="#permission" role="tab"><span class="hidden-xs-down">Permissions</span></a> </li>
			
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active" id="user" role="tabpanel">
							<div class="p-15">
								<Utilisateurs></Utilisateurs>
							</div>
						</div>
						<div class="tab-pane" id="role" role="tabpanel">
							<div class="p-15">
								<Roles></Roles>

							</div>
						</div>
						<div class="tab-pane" id="permission" role="tabpanel">
							<div class="p-15">
								<Permissions></Permissions>
							</div>
						</div>
						
						
					</div>
				</div>
				<!-- /.box-body -->
			  </div>
			  <!-- /.box -->
			</div>
    </div>
</template>
<script>
import Utilisateurs from "@/components/parametrages/users/utilisateurs.vue"
import Roles from "@/components/parametrages/users/roles.vue"
import Permissions from "@/components/parametrages/users/permissions.vue"


export default {
    components:{
        Utilisateurs ,Roles , Permissions 
    },
    data() {
        return {
            
        }
    },

	mounted() {
// 		if (activeTab) {
//     const tabElement = document.querySelector(`[href="${activeTab}"]`);
//     if (tabElement) {
//       tabElement.click();
//     }
//   }
		
	},
	methods: {
		handleTabClick(tabId) {
    localStorage.setItem('activeTab', tabId);
  },
	},
    
}
</script>
<style lang="css" scoped>
    
</style>