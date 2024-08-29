<template >
    <div>
		<Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Marchés </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Marchés</li>
							</ol>
						</nav>
					</div>
				
				
			</div>
		</div>
		<div class="box">
				<div class="box-header with-border p-2">
				  	
					<div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex d-none h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchMarche" @input="filterByName">
                        <div class="input-group-append">
                          <button class="btn border border-1"><i class="ti-search"></i></button>
                        </div>
                      </div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5" data-toggle="modal" data-target="#add-marche" ><i class="mdi mdi-plus"></i></button>
			</li>

			
        </ul>
                  </div>        
				</div>
		</div>
<div class="box mx-2">
	<div class="box-header with-border">
		<h3 class="box-title mb-0">Liste des Marchés </h3>
	</div>
	
	<div class="box-body">
       <div class="table-responsive">
         <table id="example1" class="table table-bordered table-striped">
           <thead>
               <tr>
                   <th class="text-center">Code</th>
                   <th>Nom </th>
                   <th>Type</th>
                   <th>Superficie</th>
                   <th>Geo local.</th>
                   <th>Commune</th>
                   <th>Collecteur(e)</th>
                   <th>Description</th>
                   <th>Actions</th>
                  
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
               <tr v-for="data   in paginatedItems" :key="data.id">
                   <td style="width: 50px;" class="text-center">
                    {{ data?.code_marche ?? "-"}}
                   </td>
                   <td>
					<div>
						{{ data?.nom_marche ?? "-"}}
					
				  </div>
				   </td>
                   <td style="width: 50px;" class="text-center">
					<div>
						{{ data?.type_marche ?? "-"}}
					
				  </div>
				   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.superficie ?? "0"}} ha
                   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.longitude ?? "-"}} , {{ data?.latitude ?? "-"}}
                   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.commune_relation?.nom_commune ?? "-"}}
                   </td>
				   <td style="width: 120px;" class="text-center">
					<span class="text-dark font-weight-600 hover-primary mb-1 font-size-14">{{data?.collecteur_relation?.nom_collecteur ?? "-"}} {{data?.collecteur_relation?.prenom_collecteur ?? "-"}}</span>
					<span style="font-size:12px !important" class="text-danger  d-block">{{data?.collecteur_relation?.whatsapp_collecteur ?? "-"}} </span>
                   </td>
				   <td  class="text-center">
                    {{ data?.description ?? "-"}}
                   </td>
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.code_marche)"  data-original-title="Update" data-toggle="modal" data-target="#update-marche"><i class="ti-marker-alt"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.code_marche)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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
</div>
		

   <div class="modal center-modal fade" id="add-marche"  ref="add-marche" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter un marché</h5>
			<button  class=" btn btn-danger close py-1 px-3" data-dismiss="modal">
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
                              v-model="step1.code_marche"
                              color="secondary"
                              name="step1.code_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.code_marche.$error">{{
                              v$.step1.code_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_marche']">
                              {{ resultError["code_marche"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.nom_marche"
                              color="secondary"
                              name="step1.nom_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.nom_marche.$error">{{
                              v$.step1.nom_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_marche']">
                              {{ resultError["nom_marche"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Type <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.type_marche"
                              color="secondary"
                              name="step1.type_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.type_marche.$error">{{
                              v$.step1.type_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type_marche']">
                              {{ resultError["type_marche"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Superficie <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.superficie"
                              color="secondary"
                              name="step1.superficie"
                              size="sm"
                              rounded-size="sm"
                             type="number"
							 :min="0"
                              
                              
                            />
                            <small v-if="v$.step1.superficie.$error">{{
                              v$.step1.superficie.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['superficie']">
                              {{ resultError["superficie"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
				<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Longitude <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.longitude"
                              color="secondary"
                              name="step1.longitude"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              
                              
                            />
                            <small v-if="v$.step1.longitude.$error">{{
                              v$.step1.longitude.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['longitude']">
                              {{ resultError["longitude"] }}
                            </small>
                          </div>
                        </div>
						
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Latitude <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.latitude"
                              color="secondary"
                              name="step1.latitude"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              
                              
                            />
                            <small v-if="v$.step1.latitude.$error">{{
                              v$.step1.latitude.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['latitude']">
                              {{ resultError["latitude"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Commune <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step1.commune"
                              color="secondary"
                              name="step1.commune"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CommunesOptions"
                              
                              
                            />
                            <small v-if="v$.step1.commune.$error">{{
                              v$.step1.commune.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['commune']">
                              {{ resultError["commune"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Collecteur(e) <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step1.collecteur"
                              color="secondary"
                              name="step1.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CollecteursOptions"
                              
                              
                            />
                            <small v-if="v$.step1.collecteur.$error">{{
                              v$.step1.collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['collecteur']">
                              {{ resultError["collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Description <span class="text-danger">*</span></label
                            >
							<textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step1.description" rows="2"  ></textarea>

                            <small v-if="v$.step1.description.$error">{{
                              v$.step1.description.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['description']">
                              {{ resultError["description"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
             
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
		
        <button type="button" @click="SubmitCollecteur('add-marche')" class="waves-effect waves-light btn btn-primary ">Valider</button>


		  </div>
		</div>
	  </div>
	        </div>

    
          <div class="modal center-modal fade"  id="update-marche"  ref="update-marche" tabindex="-1">
          <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier un marché</h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
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
                              v-model="step2.code_marche"
                              color="secondary"
                              name="step2.code_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.code_marche.$error">{{
                              v$.step2.code_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_marche']">
                              {{ resultError["code_marche"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nom_marche"
                              color="secondary"
                              name="step2.nom_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.nom_marche.$error">{{
                              v$.step2.nom_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_marche']">
                              {{ resultError["nom_marche"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Type <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.type_marche"
                              color="secondary"
                              name="step2.type_marche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.type_marche.$error">{{
                              v$.step2.type_marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type_marche']">
                              {{ resultError["type_marche"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Superficie <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.superficie"
                              color="secondary"
                              name="step2.superficie"
                              size="sm"
                              rounded-size="sm"
                             type="number"
							 :min="0"
                              
                              
                            />
                            <small v-if="v$.step2.superficie.$error">{{
                              v$.step2.superficie.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['superficie']">
                              {{ resultError["superficie"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
				<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Longitude <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.longitude"
                              color="secondary"
                              name="step2.longitude"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              
                              
                            />
                            <small v-if="v$.step2.longitude.$error">{{
                              v$.step2.longitude.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['longitude']">
                              {{ resultError["longitude"] }}
                            </small>
                          </div>
                        </div>
						
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Latitude <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.latitude"
                              color="secondary"
                              name="step2.latitude"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              
                              
                            />
                            <small v-if="v$.step2.latitude.$error">{{
                              v$.step2.latitude.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['latitude']">
                              {{ resultError["latitude"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Commune <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.commune"
                              color="secondary"
                              name="step2.commune"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CommunesOptions"
                              
                              
                            />
                            <small v-if="v$.step2.commune.$error">{{
                              v$.step2.commune.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['commune']">
                              {{ resultError["commune"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Collecteur(e) <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.collecteur"
                              color="secondary"
                              name="step2.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CollecteursOptions"
                              
                              
                            />
                            <small v-if="v$.step2.collecteur.$error">{{
                              v$.step2.collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['collecteur']">
                              {{ resultError["collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Description <span class="text-danger">*</span></label
                            >
							<textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step2.description" rows="2"  ></textarea>

                            <small v-if="v$.step2.description.$error">{{
                              v$.step2.description.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['description']">
                              {{ resultError["description"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
             
		  </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-marche')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

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
        Pag , Loading , MazPhoneNumberInput
    },
    computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.MarchesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MarchesOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchMarche:"",
            isModalUpdate:"",
            MarchesOptions: [],
			CommunesOptions:[],
			CollecteursOptions:[],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
			choix: [
				{ label: "MASCULIN", value: 'MASCULIN' },
				{ label: "FEMININ", value: 'FEMININ' },
        		],
			step1: {
				code_marche:"",
				nom_marche:"",
				type_marche:"",
				superficie:"",
				longitude:"",
				latitude:"",
				commune:"",
				collecteur:"",
				description:"",
				
			},
            step2: {
				code_marche:"",
				nom_marche:"",
				type_marche:"",
				superficie:"",
				longitude:"",
				latitude:"",
				commune:"",
				collecteur:"",
				description:"",

			},
            v$: useVuelidate(),
            error: "",
            resultError: {},

        }
    },
    validations: {
		step1: {
				code_marche:{require},
				nom_marche:{require},
				type_marche:{require},
				superficie:{require},
				longitude:{require},
				latitude:{require},
				commune:{require},
				collecteur:{require},
				description:{require},
				
			},
       
         step2: {
			   code_marche:{require},
				nom_marche:{require},
				type_marche:{require},
				superficie:{require},
				longitude:{require},
				latitude:{require},
				commune:{require},
				collecteur:{require},
				description:{require},
		 },
  },
  async  mounted() {
    await this.fetchMarches()
    await this.fetchCommunes()
    await this.fetchCollecteurs()
        
    },
    methods: {
        successmsg:successmsg,
  
        
        async fetchMarches() {
      try {
        const response = await axios.get( '/parametrages/marches',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('responsecolecteurs',response)
        if (response.status === 200) {
              this.data  = response.data ;
              this.MarchesOptions = this.data
              this.loading =  false
        }
      } catch (error) {
		if(error.response?.status === 500){
			this.loading = false
			// this.push vers maintenance 
		}
        
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
      }
    },
	async fetchCommunes() {
      try {
        const response = await axios.get('/parametrages/localites/communes',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        console.log('response', response)
        if (response.status === 200) {
			response.data.map(item => this.CommunesOptions.push({
				label: item.nom_commune,
				value: item.id_commune
				}))
          
        }
      } catch (error) {

        console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
      }
    },
	async fetchCollecteurs() {
      try {
        const response = await axios.get( '/parametrages/collecteurs',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('responsecolecteurs',response)
        if (response.status === 200) {
			response.data.map(item => {
				this.CollecteursOptions.push({
					label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
					value: item.id_collecteur 
				});
});
        }
      } catch (error) {
		console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
      }
    },
    async SubmitCollecteur(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       let data = {

            code_marche:this.step1.code_marche,
            nom_marche:this.step1.nom_marche,
            type_marche:this.step1.type_marche,
            superficie:this.step1.superficie,
            longitude:this.step1.longitude,
            latitude:this.step1.latitude,
            commune:this.step1.commune,
            collecteur:this.step1.collecteur,
            description:this.step1.description,
       }
       
	   console.log('data',data)
        try {
          const response = await axios.post("/parametrages/marches", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 200) {
            this.closeModal(modalId);
			this.successmsg(
				"Création du marché",
				"Votre marché a été créé avec succès !"
			);

            await this.fetchMarches();
          } else {
          }
        } catch (error) {
			console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
        }
      } else {
      
      }
    },
    async  HandleIdUpdate(id){
    this.loading = true;

      try {
        const response = await axios.get(`/parametrages/marches/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            console.log('Slbvlkjbv',response)
        
          let data =  response.data
          this.step2 = {
            code_marche: data.code_marche,
            nom_marche: data.nom_marche,
            type_marche: data.type_marche,
            superficie: data.superficie,
            longitude: data.longitude,
            latitude: data.latitude,
            commune: data.commune,
            collecteur: data.collecteur,
            description: data.description,
            

          }
       
          this.ToId = data.code_marche
          this.loading = false;
        
        }
      } catch (error) {
      
		console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
      }

    },
    async  submitUpdate(modalId){
   
   this.v$.step2.$touch();

 
    if (this.v$.$errors.length == 0) {
    
       this.loading = true;
       let data = {
		   code_marche:this.step2.code_marche,
            nom_marche:this.step2.nom_marche,
            type_marche:this.step2.type_marche,
            superficie:this.step2.superficie,
            longitude:this.step2.longitude,
            latitude:this.step2.latitude,
            commune:this.step2.commune,
            collecteur:this.step2.collecteur,
            description:this.step2.description,
          
          
            }


 
      try {
        const response = await axios.put(`/parametrages/marches/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
				"Mise à jour du marché",
				"Votre marché a été mis à jour avec succès !"
			);
            await this.fetchMarches();
         
          
        } 
      } catch (error) {
		console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
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
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/parametrages/marches/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
			 this.successmsg(
						"Suppression du marché",
						"Votre marché a été supprimé avec succès !"
					);
            await this.fetchMarches();
   
           } else {
        
            if (error) {
          if (  error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
           }
         } catch (error) {
			console.error("Erreur lors de la suppression:", error);
        if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401 || error.response.data.detail.includes(401)) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }else if(error.response.data.detail.includes(404)) {
              this.loading = false;
            return  this.data = []
			   
          }else{
            console.log('error',error.response.data.detail)

            this.triggerToast(error.response.data.detail);
            this.loading = false;
            return false;
          }
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchMarche !== null) {
   const tt = this.searchMarche;
   console.log('ee',tt)
  const  searchValue = tt.toLowerCase()
  console.log('searchValue',searchValue)
  console.log('searchValue',this.data)

  this.MarchesOptions =this.data.filter(user => {
	console.log('searchValueUser',user)

    const Code = user.code_marche || '';
    const nom = user.nom_marche || '';
    const Commune = user?.commune_relation?.nom_commune || '';
    
    
    return Code.toLowerCase().includes(searchValue) || nom.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) 
	  
  });

} else {
this.MarchesOptions = [...this.data];
 
}

},
closeModal(modalId) {
      let modalElement = this.$refs[modalId];
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      modalElement.style.opacity = "";
       document.body.classList.remove("modal-open");
      let modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.parentNode.removeChild(modalBackdrop);
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
      return this.MarchesOptions.slice(startIndex, endIndex);
    },
    },
}
</script>
<style lang="css" scoped>
    
</style>