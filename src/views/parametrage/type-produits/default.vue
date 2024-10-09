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
					<ul class="nav nav-tabs " role="tablist"   style=" overflow-x: scroll;  overflow-y: hidden; flex-wrap: nowrap !important;">
						<li class="nav-item" style="width: auto;text-wrap: nowrap;"> <a class="nav-link " data-toggle="tab" :class="{ active: activeTab === '#produit' }" @click="handleTabClick('#produit')" href="#produit" role="tab"><span class="hidden-xs-down">Produits <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{produitsCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"  > <a class="nav-link " data-toggle="tab" :class="{ active: activeTab === '#categorie' }" @click="handleTabClick('#categorie')" href="#categorie" role="tab"><span class="hidden-xs-down">Groupe aliments <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{CategoriesCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#famille' }" @click="handleTabClick('#famille')" href="#famille" role="tab"><span class="hidden-xs-down">Familles <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{FamillesCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#origine' }" @click="handleTabClick('#origine')" href="#origine" role="tab"> <span class="hidden-xs-down">Provenances <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{OriginesCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#forme' }" @click="handleTabClick('#forme')" href="#forme" role="tab"> <span class="hidden-xs-down">Formes <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{FormesCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#filiere' }" @click="handleTabClick('#filiere')" href="#filiere" role="tab"> <span class="hidden-xs-down">Filières <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{FilieresCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#unite' }" @click="handleTabClick('#unite')" href="#unite" role="tab"> <span class="hidden-xs-down">Unités <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{UnitesCount}}</span></span></a> </li>
						<li class="nav-item"  style="width: auto;text-wrap: nowrap;"> <a class="nav-link" data-toggle="tab" :class="{ active: activeTab === '#uniteType' }" @click="handleTabClick('#uniteType')" href="#uniteType" role="tab"> <span class="hidden-xs-down">Type d'unités <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{UnitesTypeCount}}</span></span></a> </li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div  class="tab-pane " :class="{ active: activeTab === '#produit' }" id="produit" role="tabpanel">
							<div class="p-15">
								<Produits @produit-count="CountProduits"></Produits>
							</div>
						</div>
						<div v-if="loadCategories" class="tab-pane" :class="{ active: activeTab === '#categorie' }" id="categorie" role="tabpanel">
							<div class="p-15">
								<Categories @categorie-count="CountCategorie"></Categories>

							</div>
						</div>
						<div v-if="loadOrigines" class="tab-pane" :class="{ active: activeTab === '#famille' }" id="famille" role="tabpanel">
							<div class="p-15">
								<Familles @famille-count="CountFamille"></Familles>
							</div>
						</div>
						<div v-if="loadFamilles" class="tab-pane" :class="{ active: activeTab === '#origine' }" id="origine" role="tabpanel">
							<div class="p-15">
								<Origines @origine-count="CountOrigine"></Origines>
							
							</div>
						</div>
                        <div v-if="loadFormes" class="tab-pane" :class="{ active: activeTab === '#forme' }" id="forme" role="tabpanel">
							<div class="p-15">
								<Formes @forme-count="CountFormes"></Formes>
							
							</div>
						</div>
						<div v-if="loadFilieres" class="tab-pane" :class="{ active: activeTab === '#filiere' }" id="filiere" role="tabpanel">
							<div class="p-15">
								<Filieres @filiere-count="CountFilieres"></Filieres>
							
							</div>
						</div>
                        <div v-if="loadUnites" class="tab-pane" :class="{ active: activeTab === '#unite' }" id="unite" role="tabpanel">
							<div class="p-15">
								<Unite @unite-count="CountUnites"></Unite>
							
							</div>	
						</div>

						<div v-if="loadUnitesType" class="tab-pane" :class="{ active: activeTab === '#uniteType' }" id="uniteType" role="tabpanel">
							<div class="p-15">
								<TypesUnite @uniteType-count="CountUnitesType"></TypesUnite>
							
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
import TypesUnite from "@/components/parametrages/produits/typesunites.vue"
import Formes from "@/components/parametrages/produits/formes.vue"
import Filieres from "@/components/parametrages/produits/filieres.vue"
import Origines from "@/components/parametrages/produits/origines.vue"
import Familles from "@/components/parametrages/produits/familles.vue"
import Categories from "@/components/parametrages/produits/categorie.vue"
import Produits from "@/components/parametrages/produits/produits.vue"
export default {
    components:{
        Unite ,Formes , Origines , Familles , Categories , Produits , TypesUnite , Filieres
    },
    data() {
        return {
			activeTab: '#produit',
			produitsCount: 0,
			CategoriesCount: 0,
			OriginesCount: 0,
			FamillesCount: 0,
			FormesCount: 0,
			FilieresCount: 0,
			UnitesCount: 0,
			UnitesTypeCount: 0,

			loadCategories:true,
			loadOrigines:true,
			loadFamilles:true,
			loadFormes:true,
			loadFilieres:true,
			loadUnites:true,
			loadUnitesType:true,
        }
    },

	mounted() {
		this.restoreActiveTab();
	},
	methods: {
		CountProduits(count){
			this.produitsCount = count

		},
		CountCategorie(count){
			this.CategoriesCount = count

		},
		CountOrigine(count){
			this.OriginesCount = count

		},
		CountFamille(count){
			this.FamillesCount = count

		},
		CountFormes(count){
			this.FormesCount = count

		},
		CountFilieres(count){
			this.FilieresCount = count

		},
		CountUnites(count){
			this.UnitesCount = count

		},
		CountUnitesType(count){
			this.UnitesTypeCount = count

		},
		handleTabClick(tabId) {
      this.activeTab = tabId;
      localStorage.setItem('activeTabProduit', tabId);
    },
    restoreActiveTab() {
      const savedTab = localStorage.getItem('activeTabProduit');
      if (savedTab) {
        this.activeTab = savedTab;
      }
    },
	},
	beforeRouteLeave(to, from, next) {
    
    // Supprimer l'onglet actif du localStorage si on quitte cette page
    localStorage.removeItem('activeTabProduit');
    next();
  },
    
}
</script>
<style lang="css" scoped>
    
</style>