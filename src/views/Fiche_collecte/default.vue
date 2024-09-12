<template >
    <div>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Fiches d'enquêtes </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Fiches d'enquêtes</li>
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
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" @click="handleTabClick('#collecte')" href="#collecte" role="tab"><span class="hidden-xs-down">Enquêtes Collectes</span></a> </li>
						<li class="nav-item"> <a class="nav-link " data-toggle="tab" @click="handleTabClick('#grossiste')" href="#grossiste" role="tab"><span class="hidden-xs-down">Enquêtes Grossistes</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" @click="handleTabClick('#consommation')" href="#consommation" role="tab"><span class="hidden-xs-down">Enquêtes Consommations</span></a> </li>
			
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active" id="collecte" role="tabpanel">
							<div class="p-15">
								<Collectes></Collectes>
							</div>
						</div>
						<div class="tab-pane" id="grossiste" role="tabpanel">
							<div class="p-15">
								<Grossistes></Grossistes>

							</div>
						</div>
						<div class="tab-pane" id="consommation" role="tabpanel">
							<div class="p-15">
								<Consommations></Consommations>
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
import Collectes from "@/components/collectes/collectes.vue"
import Grossistes from "@/components/collectes/grossistes.vue"
import Consommations from "@/components/collectes/consommations.vue"

export default {
    components:{
        Collectes ,Grossistes , Consommations 
    },
    data() {
        return {
            
        }
    },

	mounted() {
        const activeTab = localStorage.getItem('activeTabFiche');
  if (activeTab) {
    const tabElement = document.querySelector(`[href="${activeTab}"]`);
    if (tabElement) {
      tabElement.click();
    }
  }
		
	},
	methods: {
		handleTabClick(tabId) {
    localStorage.setItem('activeTabFiche', tabId);
  },
  
	},
    beforeRouteLeave(to, from, next) {
    console.log('kiter');
    
    // Supprimer l'onglet actif du localStorage si on quitte cette page
    localStorage.removeItem('activeTabFiche');
    next();
  },
    
}
</script>
<style lang="css" scoped>
    
</style>