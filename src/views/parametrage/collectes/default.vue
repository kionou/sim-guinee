<template >
    <div>
		<Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Collecteurs </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Collecteurs</li>
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
                          aria-describedby="button-addon2" v-model="searchCollect" @input="filterByName">
                        <div class="input-group-append">
                          <button class="btn border border-1"><i class="ti-search"></i></button>
                        </div>
                      </div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5" data-toggle="modal" data-target="#add-collecteur" ><i class="mdi mdi-plus"></i></button>
			</li>

			
        </ul>
                  </div>        
				</div>
		</div>
<div class="box mx-2">
	<div class="box-header with-border">
		<h3 class="box-title mb-0">Liste des Collecteurs </h3>
	</div>
	
	<div class="box-body">
       <div class="table-responsive">
         <table id="example1" class="table table-bordered table-striped">
           <thead>
               <tr>
                   <th class="text-center">Code</th>
                   <th>Nom & Prenoms</th>
                   <th>Coordonnees</th>
                   <th>Commune</th>
                   <th>Relai</th>
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
                    {{ data?.code_collecteur ?? "-"}}
                   </td>
                   <td>
					<div>
					<span class="text-dark font-weight-600 hover-primary mb-1 font-size-16">{{data.nom_collecteur}} {{data.prenom_collecteur}}</span>
					<span style="font-size:12px !important" class="text-danger  d-block">{{data.sexe_collecteur[0]}} </span>
				  </div>
				   </td>
                   <td >
					<div>
					<span class="text-dark font-weight-600 hover-primary mb-1 font-size-16">{{data.adresse}}</span>
					<span class="text-secondary d-block">{{data.telephone_collecteur}} / <b class="text-primary">{{data.whatsapp_collecteur}}</b> </span>
				  </div>
				   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.commune?.nom_commune ?? "-"}}
                   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.relai ?? "-"}}
                   </td>
				   <td style="width: 100px;" class="text-center">
                    {{ data?.description ?? "-"}}
                   </td>
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.id_collecteur)"  data-original-title="Update" data-toggle="modal" data-target="#update-collecteur"><i class="ti-marker-alt"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.id_collecteur)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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
		

   <div class="modal center-modal fade" id="add-collecteur"  ref="add-collecteur" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter un(e) collecteur(e)</h5>
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
                              v-model="step1.code_collecteur"
                              color="secondary"
                              name="step1.code_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.code_collecteur.$error">{{
                              v$.step1.code_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_collecteur']">
                              {{ resultError["code_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.nom_collecteur"
                              color="secondary"
                              name="step1.nom_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.nom_collecteur.$error">{{
                              v$.step1.nom_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_collecteur']">
                              {{ resultError["nom_collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Prenom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.prenom_collecteur"
                              color="secondary"
                              name="step1.prenom_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.prenom_collecteur.$error">{{
                              v$.step1.prenom_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['prenom_collecteur']">
                              {{ resultError["prenom_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Sexe <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step1.sexe_collecteur"
                              color="secondary"
                              name="step1.sexe_collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="choix"
                              
                              
                            />
                            <small v-if="v$.step1.sexe_collecteur.$error">{{
                              v$.step1.sexe_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['sexe_collecteur']">
                              {{ resultError["sexe_collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
				<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Téléphonique <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step1.telephone_collecteur" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step1.telephone_collecteur.$error">{{
                        v$.step1.telephone_collecteur.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['telephone_collecteur']">
                        {{ resultError["telephone_collecteur"] }}
                      </small>
                    </div>
                  </div>
						<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Whatsapp <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step1.whatsapp_collecteur" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step1.whatsapp_collecteur.$error">{{
                        v$.step1.whatsapp_collecteur.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['whatsapp_collecteur']">
                        {{ resultError["whatsapp_collecteur"] }}
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
                              v-model="step1.commune_collecteur"
                              color="secondary"
                              name="step1.commune_collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CommunesOptions"
                              
                              
                            />
                            <small v-if="v$.step1.commune_collecteur.$error">{{
                              v$.step1.commune_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['commune_collecteur']">
                              {{ resultError["commune_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Adresse <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.adresse"
                              color="secondary"
                              name="step1.adresse"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.adresse.$error">{{
                              v$.step1.adresse.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['adresse']">
                              {{ resultError["adresse"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Relai <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.relai"
                              color="secondary"
                              name="step1.relai"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step1.relai.$error">{{
                              v$.step1.relai.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['relai']">
                              {{ resultError["relai"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Description <span class="text-danger">*</span></label
                            >
							<textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step1.description" rows="1"  ></textarea>

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
		
        <button type="button" @click="SubmitCollecteur('add-collecteur')" class="waves-effect waves-light btn btn-primary ">Valider</button>


		  </div>
		</div>
	  </div>
	        </div>

    
          <div class="modal center-modal fade"  id="update-collecteur"  ref="update-collecteur" tabindex="-1">
          <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier un(e) collcteur(e)</h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
				<div class="modal-body">
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Code <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.code_collecteur"
                              color="secondary"
                              name="step2.code_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.code_collecteur.$error">{{
                              v$.step2.code_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_collecteur']">
                              {{ resultError["code_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nom_collecteur"
                              color="secondary"
                              name="step2.nom_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.nom_collecteur.$error">{{
                              v$.step2.nom_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_collecteur']">
                              {{ resultError["nom_collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Prenom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.prenom_collecteur"
                              color="secondary"
                              name="step2.prenom_collecteur"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.prenom_collecteur.$error">{{
                              v$.step2.prenom_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['prenom_collecteur']">
                              {{ resultError["prenom_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Sexe <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.sexe_collecteur"
                              color="secondary"
                              name="step2.sexe_collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="choix"
                              
                              
                            />
                            <small v-if="v$.step2.sexe_collecteur.$error">{{
                              v$.step2.sexe_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['sexe_collecteur']">
                              {{ resultError["sexe_collecteur"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
				<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Téléphonique <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step2.telephone_collecteur" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step2.telephone_collecteur.$error">{{
                        v$.step2.telephone_collecteur.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['telephone_collecteur']">
                        {{ resultError["telephone_collecteur"] }}
                      </small>
                    </div>
                  </div>
						<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Whatsapp <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step2.whatsapp_collecteur" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step2.whatsapp_collecteur.$error">{{
                        v$.step2.whatsapp_collecteur.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['whatsapp_collecteur']">
                        {{ resultError["whatsapp_collecteur"] }}
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
                              v-model="step2.commune_collecteur"
                              color="secondary"
                              name="step2.commune_collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							  :options="CommunesOptions"
                              
                              
                            />
                            <small v-if="v$.step2.commune_collecteur.$error">{{
                              v$.step2.commune_collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['commune_collecteur']">
                              {{ resultError["commune_collecteur"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Adresse <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.adresse"
                              color="secondary"
                              name="step2.adresse"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.adresse.$error">{{
                              v$.step2.adresse.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['adresse']">
                              {{ resultError["adresse"] }}
                            </small>
                          </div>
                        </div>
                      
            </div>
			<div class="row mt-3 content-group">
                        <div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Relai <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.relai"
                              color="secondary"
                              name="step2.relai"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.relai.$error">{{
                              v$.step2.relai.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['relai']">
                              {{ resultError["relai"] }}
                            </small>
                          </div>
                        </div>
						<div class="col">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Description <span class="text-danger">*</span></label
                            >
							<textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step2.description" rows="1"  ></textarea>

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
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-collecteur')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

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
      return Math.ceil(this.CollecteursOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.CollecteursOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchCollect:"",
            isModalUpdate:"",
            CollecteursOptions: [],
			CommunesOptions:[],
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
				code_collecteur:"",
				nom_collecteur:"",
				prenom_collecteur:"",
				sexe_collecteur:"",
				whatsapp_collecteur:"",
				telephone_collecteur:"",
				commune_collecteur:"",
				adresse:"",
				relai:"",
				description:"",
			},
            step2: {
				code_collecteur:"",
				nom_collecteur:"",
				prenom_collecteur:"",
				sexe_collecteur:"",
				whatsapp_collecteur:"",
				telephone_collecteur:"",
				commune_collecteur:"",
				adresse:"",
				relai:"",
				description:"",

			},
            v$: useVuelidate(),
            error: "",
            resultError: {},

        }
    },
    validations: {
		step1: {
				code_collecteur:{require},
				nom_collecteur:{require},
				prenom_collecteur:{require},
				sexe_collecteur:{require},
				whatsapp_collecteur:{require},
				telephone_collecteur:{require},
				commune_collecteur:{require},
				adresse:{require},
				relai:{require},
				description:{require},
			},
       
         step2: {
			   code_collecteur:{require},
				nom_collecteur:{require},
				prenom_collecteur:{require},
				sexe_collecteur:{require},
				whatsapp_collecteur:{require},
				telephone_collecteur:{require},
				commune_collecteur:{require},
				adresse:{require},
				relai:{require},
				description:{require},
		 },
  },
  async  mounted() {
    await this.fetchCollecteurs()
    await this.fetchCommunes()
        
    },
    methods: {
        successmsg:successmsg,
  
        
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
              this.data  = response.data ;
              this.CollecteursOptions = this.data
              this.loading =  false
        }
      } catch (error) {
		this.handleErrors(error);
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

		this.handleErrors(error);
      }
    },
    async SubmitCollecteur(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       let data = {

            code_collecteur:this.step1.code_collecteur,
            nom_collecteur:this.step1.nom_collecteur,
            prenom_collecteur:this.step1.prenom_collecteur,
            sexe_collecteur:this.step1.sexe_collecteur,
            whatsapp_collecteur:this.step1.whatsapp_collecteur,
            telephone_collecteur:this.step1.telephone_collecteur,
            commune_collecteur:this.step1.commune_collecteur,
            adresse:this.step1.adresse,
            relai:this.step1.relai,
            description:this.step1.description,
       }
       
	   console.log('data',data)
        try {
          const response = await axios.post("/parametrages/collecteurs", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 200) {
            this.closeModal(modalId);
			this.successmsg(
				"Création du collecteur",
				"Votre collecteur a été créé avec succès !"
			);


            await this.fetchCollecteurs();
          } else {
          }
        } catch (error) {
			this.handleErrors(error);
        }
      } else {
      
      }
    },
    async  HandleIdUpdate(id){
    this.loading = true;

      try {
        const response = await axios.get(`/parametrages/collecteurs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            console.log('Slbvlkjbv',response)
        
          let data =  response.data
          this.step2 = {
            code_collecteur: data.code_collecteur,
            nom_collecteur: data.nom_collecteur,
            prenom_collecteur: data.prenom_collecteur,
            sexe_collecteur: data.sexe_collecteur[0],
            whatsapp_collecteur: data.whatsapp_collecteur,
            telephone_collecteur: data.telephone_collecteur,
            commune_collecteur: data.commune_collecteur,
            adresse: data.adresse,
            relai: data.relai,
            description: data.description,
            

          }
       
          this.ToId = data.id_collecteur
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
		code_collecteur:this.step2.code_collecteur,
            nom_collecteur:this.step2.nom_collecteur,
            prenom_collecteur:this.step2.prenom_collecteur,
            sexe_collecteur:this.step2.sexe_collecteur,
            whatsapp_collecteur:this.step2.whatsapp_collecteur,
            telephone_collecteur:this.step2.telephone_collecteur,
            commune_collecteur:this.step2.commune_collecteur,
            adresse:this.step2.adresse,
            relai:this.step2.relai,
            description:this.step2.description,
          
          
            }


 
      try {
        const response = await axios.put(`/parametrages/collecteurs/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
				"Mise à jour du collecteur",
				"Votre collecteur a été mis à jour avec succès !"
			);
            await this.fetchCollecteurs();
         
          
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
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/parametrages/collecteurs/{code}?id=${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
			 this.successmsg(
						"Suppression du collecteur",
						"Votre collecteur a été supprimé avec succès !"
					);
            await this.fetchCollecteurs();
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
            this.handleErrors(error);
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchCollect !== null) {
   const tt = this.searchCollect;
  const  searchValue = tt.toLowerCase()
  this.CollecteursOptions =this.data.filter(user => {
    const Nom = user.nom_collecteur || '';
    const Prenom = user.prenom_collecteur || '';
    const Sexe = user.sexe_collecteur[0] || '';
    const Commune = user.commune?.nom_commune || '';
    const Whatsapp = user.whatsapp_collecteur || '';
    const Telephone = user.code_collecteur || '';
    return Nom.toLowerCase().includes(searchValue) || Prenom.toLowerCase().includes(searchValue) || Sexe.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) || Whatsapp.toLowerCase().includes(searchValue) || Telephone.toLowerCase().includes(searchValue)   ;
  });

} else {
this.CollecteursOptions = [...this.data];
 
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
      if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
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
      return this.CollecteursOptions.slice(startIndex, endIndex);
    },
    },
}
</script>
<style lang="css" scoped>
    
</style>