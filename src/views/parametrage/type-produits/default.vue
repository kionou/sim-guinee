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
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#produit" role="tab"><span class="hidden-xs-down">Produits</span></a> </li>
						<li class="nav-item"> <a class="nav-link " data-toggle="tab" href="#categorie" role="tab"><span class="hidden-xs-down">Catégories</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#famille" role="tab"><span class="hidden-xs-down">Familles</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#origine" role="tab"> <span class="hidden-xs-down">Origines</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#forme" role="tab"> <span class="hidden-xs-down">Formes</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#unite" role="tab"> <span class="hidden-xs-down">Unités</span></a> </li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active" id="produit" role="tabpanel">
							<div class="p-15">
								<Produits></Produits>
							</div>
						</div>
						<div class="tab-pane" id="categorie" role="tabpanel">
							<div class="p-15">
								<Categories></Categories>

							</div>
						</div>
						<div class="tab-pane" id="famille" role="tabpanel">
							<div class="p-15">
								<Familles></Familles>
							</div>
						</div>
						<div class="tab-pane" id="origine" role="tabpanel">
							<div class="p-15">
								<Origines></Origines>
							
							</div>
						</div>
                        <div class="tab-pane" id="forme" role="tabpanel">
							<div class="p-15">
								<Formes></Formes>
							
							</div>
						</div>
                        <div class="tab-pane" id="unite" role="tabpanel">
							<div class="p-15">
								<Unite></Unite>
							
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
import Unite from "@/components/parametrages/produits/unites.vue"
import Formes from "@/components/parametrages/produits/formes.vue"
import Origines from "@/components/parametrages/produits/origines.vue"
import Familles from "@/components/parametrages/produits/familles.vue"
import Categories from "@/components/parametrages/produits/categorie.vue"
import Produits from "@/components/parametrages/produits/produits.vue"
export default {
    components:{
        Unite ,Formes , Origines , Familles , Categories , Produits
    },
    data() {
        return {
            
        }
    },
    
}
</script>
<style lang="css" scoped>
    
</style>