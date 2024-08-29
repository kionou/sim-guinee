<template >
    <div>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Produits </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Produits</li>
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
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#naturelle" role="tab"><span class="hidden-xs-down">Produits</span></a> </li>
						<li class="nav-item"> <a class="nav-link " data-toggle="tab" href="#naturelle" role="tab"><span class="hidden-xs-down">Catégories</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#region" role="tab"><span class="hidden-xs-down">Familles</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#prefecture" role="tab"> <span class="hidden-xs-down">Origines</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#commune" role="tab"> <span class="hidden-xs-down">Formes</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#unites" role="tab"> <span class="hidden-xs-down">Unités</span></a> </li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active" id="naturelle" role="tabpanel">
							<div class="p-15">
								<Naturelle></Naturelle>
							</div>
						</div>
						<div class="tab-pane" id="region" role="tabpanel">
							<div class="p-15">
								<Region></Region>

							</div>
						</div>
						<div class="tab-pane" id="prefecture" role="tabpanel">
							<div class="p-15">
								<Prefecture></Prefecture>
							</div>
						</div>
						<div class="tab-pane" id="commune" role="tabpanel">
							<div class="p-15">
								<Commune></Commune>
							
							</div>
						</div>
						<div class="tab-pane" id="unites" role="tabpanel">
							<div class="p-15">
								<Unites></Unites>
							
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
import Naturelle from "@/components/parametrages/localites/naturelle.vue"
import Region from "@/components/parametrages/localites/regions.vue"
import Prefecture from "@/components/parametrages/localites/prefectures.vue"
import Unites from "@/components/parametrages/unites.vue"
import Commune from "@/components/parametrages/localites/communes.vue"
export default {
    components:{
        Naturelle , Region , Prefecture , Commune, Unites
    },
    data() {
        return {
            
        }
    },
    
}
</script>
<style lang="css" scoped>
    
</style>