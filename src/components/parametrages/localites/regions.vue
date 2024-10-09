<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
   <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0">Liste des régions </h3>
     <div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex d-none h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchRegion" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"   @click="openModal('add-region')" ><i class="mdi mdi-plus"></i></button>
			</li>

			
        </ul>
                  </div> 
   </div>
   <!-- /.box-header -->
   <div class="box-body">
       <div class="table-responsive">
         <table id="example1" class="table table-bordered table-striped">
           <thead>
               <tr>
                  
                   <th>Code</th>
                   <th>Abréviation</th>
                   <th>Region</th>
                   <th>Region naturelle</th>
                   <th>Action</th>
                  
               </tr>
           </thead>
           <tbody v-if="paginatedItems.length === 0" >
                                                <tr>
                                                  <td colspan="18">
                                                    <div
                                                      class="badge bg-warning"
                                                      style="width: 100%; font-size: 14px"
                                                    >
                                                    Pas de données !!
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
           <tbody v-else>
               <tr v-for="(data )  in paginatedItems" :key="data.id">
                   <td style="width: 50px;" class="text-center">
                        {{ data.code_region }}
                   </td>
                   <td style="width: 120px;">{{ data.abrege_region }}</td>
                   <td>{{ data.nom_region }}</td>
                   <td>{{ data.region_naturelle_relation?.nom_region_naturelle ?? "-" }}</td>
               
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.code_region ,'region-update')"  data-original-title="Update" ><i class="ti-marker-alt"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.code_region)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
                    </div>   
					</td > 
               </tr>
           </tbody>
          
         </table>
       </div>
       <div class="row">
              <div class="col-lg-12">
                <div class="container_pagination">
                  <Pag
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @page-change="updateCurrentPage"
                  />
                </div>
              </div>
             </div>
   </div>
   <!-- /.box-body -->
 </div>
         
            </div>

            <div class="modal center-modal fade" id="add-region"  ref="add-region" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter des régions </h5>
      <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"   @click="closeModal('add-region')"  >
              <span aria-hidden="true">&times;</span>
            </button>
		  </div>
		  <div class="modal-body">
         <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
          <div class="bouttons" style="position: relative ; width: 100%; " > 
        <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000" @click="AddformDataRegions" ><i  class="ti-plus"></i></div>
         </div>
          <!-- </div>  -->
                <div class="row align-items-center p-2  border-bottom " v-for="(region, index) in Regions" :key="region.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                 
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="region.code_region"
                        color="info"
                        name="code_region"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorRegions(index, 'code_region')"

                      />
                      <small v-if="errors.Regions && errors.Regions[index] && errors.Regions[index].code_region">{{ errors.Regions[index].code_region }}</small>
                      <small v-if="resultError['Regions']"> {{ resultError["Regions"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Abréviation <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="region.abrege_region"
                        color="info"
                        name="abrege_region"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorRegions(index, 'abrege_region')"

                      />
                      <small v-if="errors.Regions && errors.Regions[index] && errors.Regions[index].abrege_region">{{ errors.Regions[index].abrege_region }}</small>
                      <small v-if="resultError['Regions']"> {{ resultError["Regions"] }} </small>
                    </div>
                  </div>

                 
 
                        </div>
                        <div class="row  content-group">
                 
                 <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword"
                       >Nom <span class="text-danger">*</span></label
                     >
                     <MazInput
                       v-model="region.nom_region"
                       color="info"
                       name="nom_region"
                       size="sm"
                       rounded-size="sm"
                       type="text"
                       @input="clearErrorRegions(index, 'nom_region')"

                     />
                     <small v-if="errors.Regions && errors.Regions[index] && errors.Regions[index].nom_region">{{ errors.Regions[index].nom_region }}</small>
                     <small v-if="resultError['Regions']"> {{ resultError["Regions"] }} </small>
                   </div>
                 </div>
                 <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword"
                       >Région naturelle <span class="text-danger">*</span></label
                     >
                     <MazSelect
                       v-model="region.region_naturelle"
                       color="info"
                       name="region_naturelle"
                       size="sm"
                       rounded-size="sm"
                       search
                       :options="RegionsNaturelleOptions"
                       @click="clearErrorRegions(index, 'region_naturelle')"

                     />
                     <small v-if="errors.Regions && errors.Regions[index] && errors.Regions[index].region_naturelle">{{ errors.Regions[index].region_naturelle }}</small>
                     <small v-if="resultError['Regions']"> {{ resultError["Regions"] }} </small>
                   </div>
                 </div>

                

                       </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowRegions(index)"  style=" position:absolute !important ; top: 12px !important; background:red;">
                       <i class="ti-trash"></i>
                      </button>
                  </div>

                </div>
                
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
        <button type="button" @click="SubmitRegion('add-region')" class="waves-effect waves-light btn btn-primary ">Valider</button>
		  </div>
		</div>
	  </div>
	</div>

    
    <div class="modal center-modal fade"  id="region-update"  ref="region-update" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Modifier une région</h5>
			<button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('region-update')" >
              <span aria-hidden="true">&times;</span>
            </button>
		  </div>
		  <div class="modal-body">
            <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.code_region"
                        color="secondary"
                        name="step2.code_region"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.code_region.$error">{{
                        v$.step2.code_region.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['code_region']">
                        {{ resultError["code_region"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Abréviation <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.abrege_region"
                        color="secondary"
                        name="step2.abrege_region"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.abrege_region.$error">{{
                        v$.step2.abrege_region.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['abrege_region']">
                        {{ resultError["abrege_region"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Nom <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.nom_region"
                        color="secondary"
                        name="step2.nom_region"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.nom_region.$error">{{
                        v$.step2.nom_region.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['nom_region']">
                        {{ resultError["nom_region"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Région naturelle <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step2.region_naturelle"
                        color="secondary"
                        name="step2.region_naturelle"
                        size="sm"
                        rounded-size="sm"
                        search
                        :options="RegionsNaturelleOptions"
                        
                        
                      />
                      <small v-if="v$.step2.region_naturelle.$error">{{
                        v$.step2.region_naturelle.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['region_naturelle']">
                        {{ resultError["region_naturelle"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
               
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
        <button type="button" @click="submitUpdate('region-update')" class="waves-effect waves-light btn btn-primary ">Valider</button>
		

		  </div>
		</div>
	  </div>
	</div>
    </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import {successmsg} from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import Swal from 'sweetalert2'
  import { useToast } from "vue-toastification";
export default {
  setup() {
   const toast = useToast();
   return { toast }
 },
    components:{
        Pag , Loading
    },
    computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.RegionsOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.RegionsOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchRegion:"",
            isModalUpdate:"",
            RegionsNaturelleOptions: [],
            RegionsOptions: [],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            v$: useVuelidate(),
            error: "",
            resultError: {},
            errors: {Regions: [] , },
            Regions:[{ 
                code_region:"",
                nom_region:"",
                abrege_region:"",
                region_naturelle:"",
            }
            ],
            step2: {
                code_region:"",
                nom_region:"",
                abrege_region:"",
                region_naturelle:"",

            },


        }
    },
    validations: {
       
        step2: {
           
            code_region:{require},
            nom_region:{require},
            abrege_region:{require},
            region_naturelle:{require},
        },
  },
  async  mounted() {
    await this.fetchRegions()
    await this.fetchRegionNaturelle()
        
    },
    methods: {
        successmsg:successmsg,
        AddformDataRegions() {
     this.Regions.push({   code_region:"", nom_region:"", abrege_region:"", region_naturelle:"",});
   },
   deleteRowRegions(index) {
  
   if(index !== 0){
     this.Regions.splice(index, 1);
   }
  },
  clearErrorRegions(index, field) {   
     if (this.errors.Regions[index]) {
       this.errors.Regions[index][field] = null;
     }
   },
   validateRegions() {
    let isValid = true;
    this.errors = { Regions: [] };
    this.Regions.forEach((region, index) => {
        const regionErrors = {};
        
        if (!region.code_region) {
            regionErrors.code_region = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!region.nom_region) {
            regionErrors.nom_region = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!region.abrege_region) {
            regionErrors.abrege_region = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!region.region_naturelle) {
            regionErrors.region_naturelle = 'Ce champs est obligatoire!';
            isValid = false;
        }
       
      
        this.errors.Regions[index] = regionErrors;
    });
    return isValid;
},
        
        async fetchRegionNaturelle() {
      try {
        const response = await axios.get( '/parametrages/localites/region-naturelles',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('responseRegions',response.data)
        if (response.status === 200) {
              response.data.map(item =>  this.RegionsNaturelleOptions.push({
                label:item.nom_region_naturelle,
                value:item.id_region_naturelle
              }))
             
              this.loading =  false
        }
      } catch (error) {
       
        this.handleErrors(error);
      }
    },
    async fetchRegions() {
      try {
        const response = await axios.get( '/parametrages/localites/regions',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('response',response)
        if (response.status === 200) {
              this.data  = response.data ;
              this.RegionsOptions = this.data
              this.$emit('region-count', this.data.length)
              this.loading =  false
        }
      } catch (error) {
       
        this.handleErrors(error);
      }
    },
    async SubmitRegion(modalId) {
     
      if (this.validateRegions()) {
        console.log('regions',this.Regions)
        this.loading = true;
        try {
          const response = await axios.post("/parametrages/localites/regions", this.Regions, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
       console.log('qfs',response)

      
          if (response.status === 200) {
     this.Regions = [{   code_region:"", nom_region:"", abrege_region:"", region_naturelle:"",}];

             this.closeModal(modalId);
             this.successmsg(
                    "Création de régions",
                    "Vos régions ont été créées avec succès !"
                );

            await this.fetchRegions();
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }
      } else {
      
      }
    },
    async  HandleIdUpdate(id , modalId){
      this.openModal(modalId)

    this.loading = true;

      try {
        const response = await axios.get(`/parametrages/localites/regions/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            console.log('Slbvlkjbv',response)
        
          let data =  response.data
          this.step2={
            code_region : data.code_region,
            nom_region : data.nom_region,
            abrege_region :data.abrege_region,
            region_naturelle : data.region_naturelle

          }
        
          this.ToId = data.code_region
          this.loading = false;
        
        }
      } catch (error) {
      
        this.handleErrors(error);
      }

    },
    async  submitUpdate(modalId){
   
   this.v$.step2.$touch();

 
    if (this.v$.$errors.length == 0) {
    
       this.loading = true;
       let data = {
            code_region:this.step2.code_region,
            nom_region:this.step2.nom_region,
            abrege_region:this.step2.abrege_region,
            region_naturelle:this.step2.region_naturelle,
            }
      try {
        const response = await axios.put(`/parametrages/localites/regions/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
            "Mise à jour de la région",
            "Votre région a été mise à jour avec succès !"
        );
            await this.fetchRegions();
         
          
        } 
      } catch (error) {
        this.handleErrors(error);
      }
    } else {
  
      this.loading = false;

    }
   },
    async HandleIdDelete(id) {
     // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });

     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.ConfirmeDelete(id);
     }
         },
         async ConfirmeDelete(id) {
            console.log('delete',id)
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/parametrages/localites/regions/code?code=${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },

           });
       
           if (response.status === 200) {
             this.loading = false
                this.successmsg(
                "Suppression de la région",
                "Votre région a été supprimée avec succès !"
            );
            await this.fetchRegions();
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
          this.handleErrors(error);
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchRegion !== null) {
   const tt = this.searchRegion;
  const  searchValue = tt.toLowerCase()
  this.RegionsOptions =this.data.filter(user => {
    const Nom = user.nom_region || '';
    const Code = user.code_region || '';
    const abre = user.abrege_region || '';
    const region = user.region_naturelle_relation.nom_region_naturelle || '';
    return Nom.toLowerCase().includes(searchValue) ||   Code.toLowerCase().includes(searchValue) ||  abre.toLowerCase().includes(searchValue) ||  region.toLowerCase().includes(searchValue)  ;
  });

} else {
this.RegionsOptions = [...this.data];
 
}

},
triggerToast(errorMessage) {
  this.toast.error(errorMessage, {
    position: "top-right",
    timeout: 8000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: "mdi mdi-alert-circle-outline", // Modifier l'icône pour une icône d'erreur
    rtl: false,
    className: 'toast-error'
  });
    },
    async handleErrors(error) {
      console.log('Error:', error);
      if (error.response?.status === 500) {
        // Logique pour une erreur serveur
        //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
      }
      if (error.response?.data.detail.includes('204')) {
        console.log('bonjour')
        this.loading = false;
        this.data = [];
        // Logique pour une erreur serveur
        //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
      }
      else if
       (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); // Redirection vers la page de connexion
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.data = [];
      } else {
        this.triggerToast(error.response?.data.detail);
        this.loading = false;
        return false;
      }
    },
    addBackdrop() {
      if (!$('.modal-backdrop').length) {
        const backdrop = $('<div class="modal-backdrop fade"></div>');
        $('body').append(backdrop);
        backdrop.fadeIn(100); 
      }
    },

    openModal(modalId) {
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeIn(100, function() {
        $(modalElement).addClass('show');
      });
      $('body').addClass('modal-open');
      this.addBackdrop();
    },
    closeModal(modalId) { 
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeOut(100, function() {
        $(modalElement).removeClass('show');
        $(modalElement).css('display', 'none');
      });
      $('body').removeClass('modal-open');
      $('.modal-backdrop').fadeOut(100, function() {
        $(this).remove(); 
      });
    },
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
  

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

    
    },
        updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.RegionsOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="css" scoped>
    
</style>