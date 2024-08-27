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
				<!-- <div class="box-header with-border">
				  <h4 class="box-title">Horizontal alignment</h4>
				  <h6 class="box-subtitle">Use default tab with class <code>nav-tabs &amp; justify-content-center </code></h6>
				</div> -->
				<!-- /.box-header -->
				<div class="box-body">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs justify-content-center" role="tablist">
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#naturelle" role="tab"><span class="hidden-xs-down">Régions naturelles</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#region" role="tab"><span class="hidden-xs-down">Régions</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#prefecture" role="tab"> <span class="hidden-xs-down">Préfectures</span></a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#commune" role="tab"> <span class="hidden-xs-down">Communes</span></a> </li>
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
								<h4>Fusce porta eros a nisl varius, non molestie metus mollis. Pellentesque tincidunt ante sit amet ornare lacinia.</h4>
								<p>Duis cursus eros lorem, pretium ornare purus tincidunt eleifend. Etiam quis justo vitae erat faucibus pharetra. Morbi in ullamcorper diam. Morbi lacinia, sem vitae dignissim cursus, massa nibh semper magna, nec pellentesque lorem nisl quis ex.</p>
								<h3>Simple text.</h3>
							</div>
						</div>
						<div class="tab-pane" id="prefecture" role="tabpanel">
							<div class="p-15">
								<h3>Simple text.</h3>
								<p>Duis cursus eros lorem, pretium ornare purus tincidunt eleifend. Etiam quis justo vitae erat faucibus pharetra. Morbi in ullamcorper diam. Morbi lacinia, sem vitae dignissim cursus, massa nibh semper magna, nec pellentesque lorem nisl quis ex.</p>
								<h4>Fusce porta eros a nisl varius, non molestie metus mollis. Pellentesque tincidunt ante sit amet ornare lacinia.</h4>
							</div>
						</div>
						<div class="tab-pane" id="commune" role="tabpanel">
							<div class="p-15">
								<h4>Fusce porta eros a nisl varius, non molestie metus mollis. Pellentesque tincidunt ante sit amet ornare lacinia.</h4>
								<h3>Simple text.</h3>
								<p>Duis cursus eros lorem, pretium ornare purus tincidunt eleifend. Etiam quis justo vitae erat faucibus pharetra. Morbi in ullamcorper diam. Morbi lacinia, sem vitae dignissim cursus, massa nibh semper magna, nec pellentesque lorem nisl quis ex.</p>
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
export default {
    components:{
        Naturelle
    },
    data() {
        return {
            
        }
    },
    
}
</script>
<style lang="css" scoped>
    
</style>