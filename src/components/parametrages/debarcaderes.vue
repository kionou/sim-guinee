<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des debarcadères</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
							<div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchDebarcadere" @input="filterByName">
                        <div class="input-group-append">
                          <button class="btn border border-1"><i class="ti-search"></i></button>
                        </div>
                      </div>
					       	</form>
                  </div>
                </div>
              </li>
              <li class="h-40">
                <button
                  type="button"
                  class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
                  data-toggle="modal"
                  data-target="#add-debarcadere"
                 
                >
                  <i class="mdi mdi-plus"></i>
                </button>
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
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Commune</th>
                  <th>Collecteur(e)</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="paginatedItems.length === 0">
                <tr>
                  <td colspan="18">
                    <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                      Pas de données !!
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-for="(data) in paginatedItems" :key="data.id_debarcadere">
                
                  <td>{{ data?.code_debarcadere ?? "-"}}</td>
                  <td>{{ data.nom_debarcadere ?? "-" }}</td>
                  <td>{{ (data.type === true) ? 'Debarcadère' : 'Port' }}</td>
                  <td>{{ data?.commune_relation?.nom_commune ?? "-" }}</td>
                  <td style="width: 120px;" class="text-center">
                      <span class="text-dark font-weight-600 hover-primary mb-1 font-size-14">{{data?.collecteur_relation?.nom_collecteur ?? "-"}} {{data?.collecteur_relation?.prenom_collecteur ?? "-"}}</span>
                      <span style="font-size:12px !important" class="text-danger  d-block">{{data?.collecteur_relation?.whatsapp_collecteur ?? "-"}} </span>
                   </td>
                  <td>{{ data.description }}</td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.code_debarcadere)"
                        data-original-title="Update"
                        data-toggle="modal"
                        data-target="#update-debarcadere"
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.code_debarcadere)"
                        title=""
                        data-toggle="tooltip"
                        data-original-title="Delete"
                        ><i class="ti-trash"></i
                      ></a>
                    </div>
                  </td>
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

    <div
      class="modal center-modal fade"
      id="add-debarcadere"
      ref="add-debarcadere"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Ajouter un debarcadère
            </h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Code <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.code_debarcadere"
                    color="secondary"
                    name="step1.code_debarcadere"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.code_debarcadere.$error">{{
                    v$.step1.code_debarcadere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code_debarcadere']">
                    {{ resultError["code_debarcadere"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.nom_debarcadere"
                    color="secondary"
                    name="step1.nom_debarcadere"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.nom_debarcadere.$error">{{
                    v$.step1.nom_debarcadere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_debarcadere']">
                    {{ resultError["nom_debarcadere"] }}
                  </small>
                </div>
              </div>
             

              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Commune <span class="text-danger">*</span>
                  </label>
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
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Collecteur(e) <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step1.collecteur"
                              color="secondary"
                              name="step1.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="CollectionOptions"
                              
                              
                            />
                  <small v-if="v$.step1.collecteur.$error">{{
                    v$.step1.collecteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Type <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step1.type"
                              color="secondary"
                              name="step1.type"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="type"
                              
                              
                            />
                  <small v-if="v$.step1.type.$error">{{
                    v$.step1.type.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['type']">
                    {{ resultError["type"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Description <span class="text-danger">*</span></label
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
            <button
                  type="button"
                  @click="SubmitDebarcaderes('add-debarcadere')"
                  class="waves-effect waves-light btn btn-primary"
                >
                  Valider
                </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal center-modal fade"
      id="update-debarcadere"
      ref="update-debarcadere"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier un debarcadère
            </h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Code <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.code_debarcadere"
                    color="secondary"
                    name="step2.code_debarcadere"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.code_debarcadere.$error">{{
                    v$.step2.code_debarcadere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code_debarcadere']">
                    {{ resultError["code_debarcadere"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.nom_debarcadere"
                    color="secondary"
                    name="step2.nom_debarcadere"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.nom_debarcadere.$error">{{
                    v$.step2.nom_debarcadere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_debarcadere']">
                    {{ resultError["nom_debarcadere"] }}
                  </small>
                </div>
              </div>
             

              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Commune <span class="text-danger">*</span>
                  </label>
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
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Collecteur(e) <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step2.collecteur"
                              color="secondary"
                              name="step2.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="CollectionOptions"
                              
                              
                            />
                  <small v-if="v$.step2.collecteur.$error">{{
                    v$.step2.collecteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Type <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step2.type"
                              color="secondary"
                              name="step2.type"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="type"
                              
                              
                            />
                  <small v-if="v$.step2.type.$error">{{
                    v$.step2.type.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['type']">
                    {{ resultError["type"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Description <span class="text-danger">*</span></label
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
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="submitUpdate('update-debarcadere')"
                  class="waves-effect waves-light btn btn-primary"
                >
                  Valider
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from "@/lib/axiosConfig";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
export default {
  setup() {
   const toast = useToast();
   return { toast }
 },
  components: {
    Pag,
    Loading,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.DebarcaderesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.DebarcaderesOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      DebarcaderesOptions: [],
      searchDebarcadere:"",
      CommunesOptions: [],
      CollectionOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      stepModal: "add",
      totalPageArray: [],
      step1: {
        code_debarcadere: "",
        nom_debarcadere: "",
        description: "",
        collecteur: "",
        commune: "",
        type:"",
      },
      step2: {
        code_debarcadere: "",
        nom_debarcadere: "",
        description: "",
        collecteur: "",
        commune: "",
        type:"",
      },
      type:[
        {label:"Debarcadère" , value:1 },
        {label:"Port" , value:0 },

      ],
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      code_debarcadere: { require },
      nom_debarcadere: { require },
      description: { require },
      collecteur: { require },
      commune: { require },
      type: { require },
    },
    step2: {
      code_debarcadere: { require },
      nom_debarcadere: { require },
      description: { require },
      collecteur: { require },
      commune: { require },
      type: { require },
    },
  },
  async mounted() {
    await this.fetchDebarcaderes();
    await this.fetchCommunes();
    await this.fetchCollecteurs();
  },
  methods: {
    successmsg: successmsg,

    async fetchDebarcaderes() {
      try {
        const response = await axios.get("/parametrages/debarcaderes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.DebarcaderesOptions = this.data;
          this.loading = false;
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
        const response = await axios.get("/parametrages/localites/communes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.CommunesOptions.push({
				label: item.nom_commune,
				value: item.id_commune
				}))
          this.loading = false;
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
    async fetchCollecteurs() {
      try {
        const response = await axios.get("/parametrages/collecteurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.CollectionOptions.push({
            label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
            value: item.id_collecteur 
				}))
          this.loading = false;
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
    async SubmitDebarcaderes(modalId) {
      console.log('decere')
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
          code_debarcadere: this.step1.code_debarcadere,
          nom_debarcadere: this.step1.nom_debarcadere,
          description: this.step1.description,
          collecteur: this.step1.collecteur,
          commune: this.step1.commune,
          type:this.step1.type
        };
       
        console.log('data',data)
        try {
          const response = await axios.post("/parametrages/debarcaderes", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
                  "Création du débarcadère",
                  "Votre débarcadère a été créé avec succès !"
              );

            await this.fetchDebarcaderes();
          } else {
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
      
      } else {
      }
    },
    async HandleIdUpdate(id) {
     
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/debarcaderes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step2.code_debarcadere = data.code_debarcadere),
            (this.step2.nom_debarcadere = data.nom_debarcadere),
            (this.step2.description = data.description),
            (this.step2.commune = data.commune),
            (this.step2.collecteur = data.collecteur),
            (this.step2.type = (data.type === true) ? 1 :0),
            (this.ToId = data.code_debarcadere);
          this.loading = false;
        }
      } catch (error) {}
    },
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          code_debarcadere: this.step2.code_debarcadere,
          nom_debarcadere: this.step2.nom_debarcadere,
          description: this.step2.description,
          collecteur: this.step2.collecteur,
          commune: this.step2.commune,
          type:this.step2.type,
        };

        try {
          const response = await axios.put(`/parametrages/debarcaderes/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
                  "Mise à jour du débarcadère",
                  "Votre débarcadère a été mis à jour avec succès !"
              );
            this.step1 = {}
            await this.fetchDebarcaderes();
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
      } else {
        this.loading = false;
      }
    },
    async HandleIdDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas annuler cette action !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      this.loading = true;
        
      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/parametrages/debarcaderes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
                    this.successmsg(
              "Suppression du débarcadère",
              "Votre débarcadère a été supprimé avec succès !"
          );
          await this.fetchDebarcaderes();
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchDebarcadere !== null) {
        const tt = this.searchDebarcadere;
        const searchValue = tt.toLowerCase();
        this.DebarcaderesOptions = this.data.filter((user) => {
          const Nom = user.code_debarcadere || "";
          const Descriptions = user.nom_debarcadere || "";
          const Commune = user.commune_relation?.nom_commune || "";

          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) ||
            Commune.toLowerCase().includes(searchValue) 
          );
        });
      } else {
        this.DebarcaderesOptions = [...this.data];
      }
    },
    closeModal(modalId) {
      let modalElement = this.$refs[modalId];
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
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
      return this.DebarcaderesOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped></style>
