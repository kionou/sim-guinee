<template>
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
      <div class="content-header">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="page-title">Chiffres clé</h3>
          <div class="d-inline-block align-items-center">
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/"><i class="mdi mdi-home-outline"></i></router-link>
                </li>
                <li class="breadcrumb-item" aria-current="page">SIM</li>
                <li class="breadcrumb-item active" aria-current="page">Chiffres clé</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des chiffres clé</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchMagasin" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
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
                  @click="openModal('add-magasin')"
                  
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
              
                  <th>Secteur</th>
                  <th>Indicateur</th>
                  <th>Valeur cible</th>
                  <th>Valeur réalisé</th>
                  <th>Taux</th>
                  <th>Période</th>
                  <th>visibilité</th>
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
                <tr v-for="(data) in paginatedItems" :key="data.id_magasin">
                 
                  <td  class="">{{ data.secteur }}</td>
                  <td>{{ data.indicateur }}</td>
                  <td style="width: 110px;" class="text-center">
                    {{ data?.valeur_cible ?? "-"}}
                   </td>
                  <td style="width: 120px;" class="text-center">{{ data?.valeur_realise ?? "-" }}</td>
                  <td style="width: 80px;" class="text-center">{{ data.taux }}</td>
                  <td style="width: 100px; color:red; font-weight:bolder">{{ getYear(data.periode)  }}</td>
                  <td class="text-center"  style="width: 80px;">
                    <div v-if="data?.visible === true"  class="btn btn-circle btn-success btn-xs"><i class="ti-lock "></i></div>
                    <div v-else  class="btn btn-circle btn-danger btn-xs"><i class="ti-unlock "></i></div>
                  </td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.id ,'update-magasin')"
                        data-original-title="Update"
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.id)"
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

      <div
      class="modal center-modal fade"
      id="add-magasin"
      ref="add-magasin"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Ajouter un chiffre clé
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"   @click="closeModal('add-magasin')" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Secteur <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step1.secteur"
                    color="secondary"
                    name="step1.secteur"
                    size="sm"
                    rounded-size="sm"
                     search
                    :options="secteur"
                  />
                  <small v-if="v$.step1.secteur.$error">{{
                    v$.step1.secteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['secteur']">
                    {{ resultError["secteur"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Indicateur <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.indicateur"
                    color="secondary"
                    name="step1.indicateur"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.indicateur.$error">{{
                    v$.step1.indicateur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['indicateur']">
                    {{ resultError["indicateur"] }}
                  </small>
                </div>
              </div>
             
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Période <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.periode"
                    color="secondary"
                    name="step1.periode"
                    size="sm"
                    rounded-size="sm"
                    type="date"
                  />
                  <small v-if="v$.step1.periode.$error">{{
                    v$.step1.periode.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['periode']">
                    {{ resultError["periode"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Valeur Cible <span class="text-danger">*</span>
                  </label>
                  <MazInput
                              v-model="step1.valeur_cible"
                              color="secondary"
                              name="step1.valeur_cible"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              min="0"
                              
                              
                            />
                  <small v-if="v$.step1.valeur_cible.$error">{{
                    v$.step1.valeur_cible.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['valeur_cible']">
                    {{ resultError["valeur_cible"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Valeur Réalisée <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.valeur_realise"
                    color="secondary"
                    name="step1.valeur_realise"
                    size="sm"
                    rounded-size="sm"
                    type="number"
                    min="0"
                  />
                  <small v-if="v$.step1.valeur_realise.$error">{{
                    v$.step1.valeur_realise.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['valeur_realise']">
                    {{ resultError["valeur_realise"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Taux <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.taux"
                    color="secondary"
                    name="step1.taux"
                    size="sm"
                    rounded-size="sm"
                     type="number"
                    min="0"
                  />
                  <small v-if="v$.step1.taux.$error">{{
                    v$.step1.taux.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['taux']">
                    {{ resultError["taux"] }}
                  </small>
                </div>
              </div>

             
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Afficher à l'ecran ? <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step1.visible"
                              color="secondary"
                              name="step1.visible"
                              size="sm"
                              rounded-size="sm"
                              search
							:options="choix"
                              
                              
                            />
                  <small v-if="v$.step1.visible.$error">{{
                    v$.step1.visible.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['visible']">
                    {{ resultError["visible"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-6">
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
              </div> -->
            
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="SubmitMagasins('add-magasin')"
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
      id="update-magasin"
      ref="update-magasin"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier un magasin
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"   @click="closeModal('update-magasin')" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Secteur <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.secteur"
                    color="secondary"
                    name="step2.secteur"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="secteur"
                  />
                  <small v-if="v$.step2.secteur.$error">{{
                    v$.step2.secteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['secteur']">
                    {{ resultError["secteur"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Indicateur <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.indicateur"
                    color="secondary"
                    name="step2.indicateur"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.indicateur.$error">{{
                    v$.step2.indicateur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['indicateur']">
                    {{ resultError["indicateur"] }}
                  </small>
                </div>
              </div>
             
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Période <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.periode"
                    color="secondary"
                    name="step2.periode"
                    size="sm"
                    rounded-size="sm"
                    type="date"
                  />
                  <small v-if="v$.step2.periode.$error">{{
                    v$.step2.periode.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['periode']">
                    {{ resultError["periode"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Valeur Cible <span class="text-danger">*</span>
                  </label>
                  <MazInput
                              v-model="step2.valeur_cible"
                              color="secondary"
                              name="step2.valeur_cible"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              min="0"
                              
                              
                            />
                  <small v-if="v$.step2.valeur_cible.$error">{{
                    v$.step2.valeur_cible.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['valeur_cible']">
                    {{ resultError["valeur_cible"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Valeur Réalisée <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.valeur_realise"
                    color="secondary"
                    name="step2.valeur_realise"
                    size="sm"
                    rounded-size="sm"
                    type="number"
                    min="0"
                  />
                  <small v-if="v$.step2.valeur_realise.$error">{{
                    v$.step2.valeur_realise.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['valeur_realise']">
                    {{ resultError["valeur_realise"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Taux <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.taux"
                    color="secondary"
                    name="step2.taux"
                    size="sm"
                    rounded-size="sm"
                     type="number"
                    min="0"
                  />
                  <small v-if="v$.step2.taux.$error">{{
                    v$.step2.taux.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['taux']">
                    {{ resultError["taux"] }}
                  </small>
                </div>
              </div>

             
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Afficher à l'ecran ? <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step2.visible"
                              color="secondary"
                              name="step2.visible"
                              size="sm"
                              rounded-size="sm"
                              search
							:options="choix"
                              
                              
                            />
                  <small v-if="v$.step2.visible.$error">{{
                    v$.step2.visible.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['visible']">
                    {{ resultError["visible"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-6">
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
              </div> -->
            
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="submitUpdate('update-magasin')"
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
      return Math.ceil(this.MagasinsOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MagasinsOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      searchMagasin:"",
      MagasinsOptions: [],
      CommunesOptions: [],
      CollectionOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      step1: {
        secteur: "",
        indicateur: "",
        periode: "",
        valeur_cible: "",
        valeur_realise: "",
        taux: "",
        visible: "",
      
      },
      step2: {
        secteur: "",
        indicateur: "",
        periode: "",
        valeur_cible: "",
        valeur_realise: "",
        taux: "",
        visible: "",
      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
      choix:[
        {label:'Oui' , value: true},
        {label:'Non' , value: false}
      ],
      secteur:[
      {label:'AGRICOLE' , value: 'AGRICOLE'},
      {label:'ELEVAGE' , value: 'ELEVAGE'},
      {label:'PECHE' , value: 'PECHE'},
      {label:'ENVIRONNEMENT' , value: 'ENVIRONNEMENT'},

      ]
    };
  },
  validations: {
    step1: {
        secteur: { require },
        indicateur: { require },
        periode: { require },
        valeur_cible: { require },
        valeur_realise: { require },
        taux: { require },
        visible: { require },
    },
    step2: {
        secteur: { require },
        indicateur: { require },
        periode: { require },
        valeur_cible: { require },
        valeur_realise: { require },
        taux: { require },
        visible: { require },
    },
  },
  async mounted() {
    await this.fetchMagasins();

  },
  methods: {
    successmsg: successmsg,
  
    getYear(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = String(d.getFullYear())
  
        return `${day}/${month}/${year}`
      },
    async fetchMagasins() {
      try {
        const response = await axios.get(`/statistics-chiffre-cle?statut=${false}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.MagasinsOptions = this.data;
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async SubmitMagasins(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
          secteur: this.step1.secteur,
          indicateur: this.step1.indicateur,
          periode: this.step1.periode,
          valeur_cible: this.step1.valeur_cible,
          valeur_realise: this.step1.valeur_realise,
          taux: this.step1.taux,
          visible: this.step1.visible,
        };
       
        console.log('data',data)
        try {
          const response = await axios.post("/statistics-chiffre-cle",[data], {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 200) {
            this.closeModal(modalId);
            this.step1 = {
                secteur: "",
                indicateur: "",
                periode: "",
                valeur_cible: "",
                valeur_realise: "",
                taux: "",
                visible: "",
        };
        this.v$.step1.$reset();
			this.successmsg(
				"Création du chiffre clé",
				"Votre chiffre clé a été créé avec succès !"
			);


            await this.fetchMagasins();
          } else {
          }
        } catch (error) {
				  this.handleErrors(error);
        }
       
      
      } else {
      }
    },
    async HandleIdUpdate(id , modalId) {
      this.openModal(modalId)
      this.stepModal = "update";
      this.loading = true;

      try {
        const response = await axios.get(`/statistics-chiffre-cle/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step2.secteur = data.secteur),
            (this.step2.indicateur = data.indicateur),
            (this.step2.periode = data.periode),
            (this.step2.valeur_cible = data.valeur_cible),
            (this.step2.valeur_realise = data.valeur_realise),
            (this.step2.taux = data.taux),
            (this.step2.visible = data.visible),
            (this.ToId = data.id);
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          secteur: this.step2.secteur,
          indicateur: this.step2.indicateur,
          periode: this.step2.periode,
          valeur_cible: this.step2.valeur_cible,
          valeur_realise: this.step2.valeur_realise,
          taux: this.step2.taux,
          visible: this.step2.visible,
        };

        try {
          const response = await axios.put(`/statistics-chiffre-cle/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Données du chiffre clé mises à jour",
              "Les données du chiffre clé ont été mises à jour avec succès !"
            );
            await this.fetchMagasins();
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
        const response = await axios.delete(`/statistics-chiffre-cle/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données du chiffre clé supprimées",
            "Les données du chiffre clé ont été supprimées avec succès !"
          );
          await this.fetchMagasins();
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchMagasin !== null) {
        const searchValue = this.searchMagasin;

        this.MagasinsOptions = this.data.filter((item) => {
          const Nom = item.valeur_realise || "";
          const Descriptions = item.valeur_cible || "";
          const Commune = item.taux || "";
          const Collecteur = item.visible|| "";
          const Secteur = item.secteur|| "";
          const Indicateur = item.indicateur|| "";
          console.log('searchValue',searchValue , item)
          console.log('searchValue', Nom === searchValue)

          return (
            Nom ===  parseFloat(searchValue)  ||
            Descriptions === parseFloat(searchValue) ||
            Commune === parseFloat(searchValue) ||
            Secteur.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
            Indicateur.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
            Collecteur === parseFloat(searchValue)
          );
        });
        console.log('dat',this.MagasinsOptions)

      } else {
        this.currentPage = 1;
        this.MagasinsOptions = [...this.data];
        console.log('dat',this.MagasinsOptions)
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
      return this.MagasinsOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped></style>

  