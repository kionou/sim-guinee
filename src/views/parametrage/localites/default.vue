<template >
    <div>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Localités </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Localités</li>
							</ol>
						</nav>
					</div>
				
				
			</div>
		</div>
        <div class="col-12">
			  <div class="box box-default">
			
				<div class="box-body">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs justify-content-center" role="tablist">
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#naturelle" role="tab"><span class="hidden-xs-down">Régions naturelles <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{naturelleCount}}</span></span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#region" role="tab"><span class="hidden-xs-down">Régions</span> <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{regionCount}}</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#prefecture" role="tab"> <span class="hidden-xs-down">Préfectures <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{prefectureCount}}</span></span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#commune" role="tab"> <span class="hidden-xs-down">Communes <span class="badge ms-2 bg-warning  fw-bolder font-size-16">{{communeCount}}</span></span></a> </li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active" id="naturelle" role="tabpanel">
							<div class="p-15">
								<Naturelle @naturelle-count="CountNaturelle"></Naturelle>
							</div>
						</div>
						<div class="tab-pane" id="region" role="tabpanel">
							<div class="p-15">
								<Region @region-count="CountRegion"></Region>

							</div>
						</div>
						<div class="tab-pane" id="prefecture" role="tabpanel">
							<div class="p-15">
								<Prefecture @prefecture-count="CountPrefecture"></Prefecture>
							</div>
						</div>
						<div class="tab-pane" id="commune" role="tabpanel">
							<div class="p-15">
								<Commune @commune-count="CountCommune"></Commune>
							
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
import Commune from "@/components/parametrages/localites/communes.vue"
export default {
    components:{
        Naturelle , Region , Prefecture , Commune
    },
    data() {
        return {
            naturelleCount: 0,
			regionCount: 0,
			prefectureCount: 0,
			communeCount: 0,
			
        }
    },

	mounted() {
		
	},
	methods: {
		CountNaturelle(count){
			this.naturelleCount = count

		},
		CountRegion(count){
			this.regionCount = count

		},
		CountPrefecture(count){
			this.prefectureCount = count

		},
		CountCommune(count){
			this.communeCount = count

		},
	},
    
}
</script>
<style lang="css" scoped>
    
</style>