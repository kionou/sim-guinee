<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    
        <div class="content-header">
            <div class="d-flex align-items-center justify-content-between">
    
                <h3 class="page-title"> Disponibilités ou Bésoins </h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/"><i
                                        class="mdi mdi-home-outline"></i></router-link></li>
                            <li class="breadcrumb-item" aria-current="page">SIM</li>
                            <li class="breadcrumb-item active" aria-current="page">Disponibilités ou Bésoins</li>
                        </ol>
                    </nav>
                </div>
    
    
            </div>
        </div>
    
    
        <div class="box mx-2">
            <div class="box-header with-border pb-0 ps-0 p-2"
                style="border-bottom: 1px solid var(--color-primary) !important;">
                <ul class="nav nav-tabs customtab2 ">
                    <li class=" nav-item"> <a href="#navpills-1" class="nav-link active" data-toggle="tab"
                            aria-expanded="false">Disponibilités</a> </li>
                    <li class="nav-item"> <a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true"
                            @click="loadFiche">Bésoins</a> </li>
                </ul>
               
            </div>
    
            <div class="box-body p-2">
    
                <div class="tab-content">
                    <div id="navpills-1" class="tab-pane active">
                        <Disponibilite></Disponibilite>
                    </div>
    
                    <div id="navpills-3" class="tab-pane" v-if="loadFiches">
                        <Besoins></Besoins>

                    </div>
                </div>
    
            </div>
        </div>
    
    </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import Disponibilite from '@/components/autre_parametres/disponibilite.vue';
import Besoins from '@/components/autre_parametres/besoins.vue';

export default {
 
  components: {
    Loading, Pag, Disponibilite , Besoins
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  

  },
  data() {
    return {
      
      loading: false,
    
      loadFiches: false
    }
  },
  watch: {
  
  },
  async mounted() {
   
  },
  methods: {
  
    loadFiche() {
      this.loadFiches = true
    },
 
  
 

  
  },

}
</script>
<style lang="">

</style>