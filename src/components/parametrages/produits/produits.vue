<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des produits</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchProduit" @input="filterByName">
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
               
                  @click="openModal('add-produit')" 
                  
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
                 
                  <th>Nom & Code</th>
                  <th>Catégorie</th>
                  <th>Famille</th>
                  <!-- <th>Origine</th> -->
                  <th>Forme</th>

                  <th>Filière</th>
                  <th>Status</th>
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
                  <td>
                    <div class="widget-user-image" >
                        <div  style="cursor: pointer;"  data-original-title="picture"     @click="handleImageClick(data , 'update-picture')">
                          <img v-if="data?.image === '' || data?.image === null" class="rounded-circle " width="45"  src="@/assets/img/logo_mobile.png"
                        alt="User Avatar" style="float: left; margin-right: 10px ;  height:45px !important"/>

                        <img v-else class="rounded-circle " width="45"  :src="data?.image"
                        alt="User Avatar" style="float: left; margin-right: 10px ; height:45px !important"/>
                        </div>
              

                      <div style="display: inline-block">
                        <span style="font-weight: 600; font-size: 1.1em; display: block"
                          >{{ data.nom_produit }} </span
                        >
                        <span class="text-danger" style="display: block;">{{ data.code_produit }}</span>
                      </div>
                    </div>
                  </td>

                  <td>{{ data?.categorie?.nom_categorie_produit ?? "-" }}</td>
                  <td>{{ data?.famille?.nom_famille_produit ?? "-" }}</td>
                  <!-- <td style="width: 50px;">{{ data?.origine?.nom_origine_produit ?? "-" }}</td> -->
                  <td style="width: 100px;" class="text-center">
                    {{ data?.forme?.nom_forme_produit ?? "-"}} 
                   </td>

                  <td>{{ data?.filiere }}</td>
                  <td>{{ data?.affichage_ecran }}</td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.id_produit ,'update-produit')"
                        data-original-title="Update"
                       
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.code_produit)"
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
      id="add-produit"
      ref="add-produit"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Ajouter un produit
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('add-produit')" >
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
                    v-model="step1.code_produit"
                    color="secondary"
                    name="step1.code_produit"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.code_produit.$error">{{
                    v$.step1.code_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code_produit']">
                    {{ resultError["code_produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.nom_produit"
                    color="secondary"
                    name="step1.nom_produit"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.nom_produit.$error">{{
                    v$.step1.nom_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_produit']">
                    {{ resultError["nom_produit"] }}
                  </small>
                </div>
              </div>
             
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Catégorie <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step1.categorie_produit"
                    color="secondary"
                    name="step1.categorie_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="CategoriesOptions"
                  />
                  <small v-if="v$.step1.categorie_produit.$error">{{
                    v$.step1.categorie_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['categorie_produit']">
                    {{ resultError["categorie_produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Famille <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step1.famille_produit"
                    color="secondary"
                    name="step1.famille_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="FamillesOptions"
                  />
                  <small v-if="v$.step1.famille_produit.$error">{{
                    v$.step1.famille_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['famille_produit']">
                    {{ resultError["famille_produit"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Origine <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step1.origine_produit"
                    color="secondary"
                    name="step1.origine_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="OriginesOptions"
                  />
                  <small v-if="v$.step1.origine_produit.$error">{{
                    v$.step1.origine_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['origine_produit']">
                    {{ resultError["origine_produit"] }}
                  </small>
                </div>
              </div> -->
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Forme <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step1.forme_produit"
                    color="secondary"
                    name="step1.forme_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="FormesOptions"
                  />
                  <small v-if="v$.step1.forme_produit.$error">{{
                    v$.step1.forme_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['forme_produit']">
                    {{ resultError["forme_produit"] }}
                  </small>
                </div>
              </div>

              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Filière <span class="text-danger">*</span>
                  </label>
                  <MazInput
                              v-model="step1.filiere"
                              color="secondary"
                              name="step1.filiere"
                              size="sm"
                              rounded-size="sm"
                             type="text"
                              
                              
                            />
                  <small v-if="v$.step1.filiere.$error">{{
                    v$.step1.filiere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['filiere']">
                    {{ resultError["filiere"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Visibilité <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step1.affichage_ecran"
                              color="secondary"
                              name="step1.affichage_ecran"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="choix"
                              
                              
                            />
                  <small v-if="v$.step1.affichage_ecran.$error">{{
                    v$.step1.affichage_ecran.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['affichage_ecran']">
                    {{ resultError["affichage_ecran"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Image </label >
              
                  <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo($event,'add')"  accept="image/*" >
                  <small v-if="v$.step1.image.$error">{{
                    v$.step1.image.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['image']">
                    {{ resultError["image"] }}
                  </small>
                </div>
              </div>
            
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="SubmitProduit('add-produit')"
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
      id="update-produit"
      ref="update-produit"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier un produit
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-produit')" >
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
                    v-model="step2.code_produit"
                    color="secondary"
                    name="step2.code_produit"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.code_produit.$error">{{
                    v$.step2.code_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code_produit']">
                    {{ resultError["code_produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.nom_produit"
                    color="secondary"
                    name="step2.nom_produit"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.nom_produit.$error">{{
                    v$.step2.nom_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_produit']">
                    {{ resultError["nom_produit"] }}
                  </small>
                </div>
              </div>
             
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Catégorie <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.categorie_produit"
                    color="secondary"
                    name="step2.categorie_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="CategoriesOptions"
                  />
                  <small v-if="v$.step2.categorie_produit.$error">{{
                    v$.step2.categorie_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['categorie_produit']">
                    {{ resultError["categorie_produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Famille <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.famille_produit"
                    color="secondary"
                    name="step2.famille_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="FamillesOptions"
                  />
                  <small v-if="v$.step2.famille_produit.$error">{{
                    v$.step2.famille_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['famille_produit']">
                    {{ resultError["famille_produit"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Origine <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.origine_produit"
                    color="secondary"
                    name="step2.origine_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="OriginesOptions"
                  />
                  <small v-if="v$.step2.origine_produit.$error">{{
                    v$.step2.origine_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['origine_produit']">
                    {{ resultError["origine_produit"] }}
                  </small>
                </div>
              </div> -->
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Forme <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.forme_produit"
                    color="secondary"
                    name="step2.forme_produit"
                    size="sm"
                    rounded-size="sm"
                    search
                    :options="FormesOptions"
                  />
                  <small v-if="v$.step2.forme_produit.$error">{{
                    v$.step2.forme_produit.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['forme_produit']">
                    {{ resultError["forme_produit"] }}
                  </small>
                </div>
              </div>

              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Filière <span class="text-danger">*</span>
                  </label>
                  <MazInput
                              v-model="step2.filiere"
                              color="secondary"
                              name="step2.filiere"
                              size="sm"
                              rounded-size="sm"
                             type="text"
                              
                              
                            />
                  <small v-if="v$.step2.filiere.$error">{{
                    v$.step2.filiere.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['filiere']">
                    {{ resultError["filiere"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Visibilité <span class="text-danger">*</span>
                  </label>
                  <MazSelect
                              v-model="step2.affichage_ecran"
                              color="secondary"
                              name="step2.affichage_ecran"
                              size="sm"
                              rounded-size="sm"
                              search
							               :options="choix"
                              
                              
                            />
                  <small v-if="v$.step2.affichage_ecran.$error">{{
                    v$.step2.affichage_ecran.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['affichage_ecran']">
                    {{ resultError["affichage_ecran"] }}
                  </small>
                </div>
              </div>
              
            
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="submitUpdate('update-produit')"
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
      id="update-picture"
      ref="update-picture"
      tabindex="-1"
    >
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier l'image du produit
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-picture')" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
    <div class="row mt-3 content-group">
      <div class="col-xl-12 col-md-12 col-sm-12">
        <div class="image-container">
          <div class="image-wrapper">
            <img
              :src="selectedImage"
              alt="Image"
              class="img-thumbnail mb-2"
              @click="triggerFileInput"
            >
            <div class="overlay">
              <span class="change-text">Changer</span>
            </div>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              @change="handleFileUploadImagesUpdate"
              class="file-input"
              ref="fileInput"
            >
          </div>
        </div>
      </div>
    </div>
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
      return Math.ceil(this.ProduitsOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ProduitsOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      searchProduit:"",
      ProduitsOptions: [],
      CategoriesOptions: [],
      FamillesOptions: [],
      OriginesOptions: [],
      FormesOptions: [],
      selectedImage:"",
      dataFile:"",
      dataImage:"",
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      step1: {
        code_produit: "",
        nom_produit: "",
        categorie_produit: "",
        forme_produit: "",
        famille_produit: "",
        // origine_produit: "",
        affichage_ecran: "",
        filiere:"",
        image: "",
      },
      step2: {
        code_produit: "",
        nom_produit: "",
        categorie_produit: "",
        forme_produit: "",
        famille_produit: "",
        // origine_produit: "",
        affichage_ecran: "",
        filiere:"",

      },
      choix:[
        {label: 'Oui' , value:true},
        {label: 'Non' , value:false},
      ],
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      
       code_produit: { require },
        nom_produit: { require },
        categorie_produit: { require },
        forme_produit: { require },
        famille_produit: { require },
        // origine_produit: { require },
        affichage_ecran: { require },
        filiere:{ require },
        image: {  },
    },
    step2: {
      code_produit: { require },
        nom_produit: { require },
        categorie_produit: { require },
        forme_produit: { require },
        famille_produit: { require },
        // origine_produit: { require },
        affichage_ecran: { require },
        filiere:{ require },
    },
  },
  async mounted() {
    await this.fetchProduits();
    await this.fetchCategorie();
    await this.fetchFamille();
    await this.fetchOrigines();
    await this.fetchFormes();
  },
  methods: {
    successmsg: successmsg,
    async fetchCategorie() {
      try {
        const response = await axios.get("/parametrages/categories", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.CategoriesOptions.push({
				label: item.nom_categorie_produit,
				value: item.id_categorie_produit
				}))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchFamille() {
      try {
        const response = await axios.get("/parametrages/familles", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.FamillesOptions.push({
            label: item.nom_famille_produit,
            value: item.id_famille_produit
				}))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchOrigines() {
      try {
        const response = await axios.get("/parametrages/origines", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.OriginesOptions.push({
            label: item.nom_origine_produit,
            value: item.id_origine_produit
				}))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchFormes() {
      try {
        const response = await axios.get("/parametrages/formes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.FormesOptions.push({
            label: item.nom_forme_produit,
            value: item.id_forme_produit
				}))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchProduits() {
      try {
        const response = await axios.get("/parametrages/produits", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.ProduitsOptions = this.data;
          this.$emit('produit-count', this.data.length)
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async SubmitProduit(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
          code_produit: this.step1.code_produit,
          nom_produit: this.step1.nom_produit,
          categorie_produit: this.step1.categorie_produit,
          forme_produit: this.step1.forme_produit,
          famille_produit: this.step1.famille_produit,
          // origine_produit: this.step1.origine_produit,
          affichage_ecran: this.step1.affichage_ecran,
          filiere: this.step1.filiere,
          image: this.step1.image,
        };
       
        console.log('data',data)
        try {
          const response = await axios.post("/parametrages/produits", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 200) {
            this.closeModal(modalId);
            this.step1 = {
          code_produit: "",
          nom_produit: "",
          categorie_produit: "",
          forme_produit: "",
          famille_produit: "",
          affichage_ecran: "",
          filiere: "",
        };
        this.v$.step1.$reset();
            this.successmsg(
                  "Création du produit",
                  "Votre produit a été créé avec succès !"
              );


            await this.fetchProduits();
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
        const response = await axios.get(`/parametrages/produits/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step2.code_produit = data.code_produit),
            (this.step2.nom_produit = data.nom_produit),
            (this.step2.categorie_produit = data.categorie?.id_categorie_produit),
            (this.step2.forme_produit = data.forme?.id_forme_produit),
            (this.step2.famille_produit = data.famille?.id_famille_produit),
            this.dataImage = data?.image,
            // (this.step2.origine_produit = data.origine?.id_origine_produit),
            (this.step2.affichage_ecran = data.affichage_ecran),
            (this.step2.filiere = data.filiere),
            (this.ToId = data.id_produit);
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
          code_produit: this.step2.code_produit,
          nom_produit: this.step2.nom_produit,
          categorie_produit: this.step2.categorie_produit,
          forme_produit: this.step2.forme_produit,
          famille_produit: this.step2.famille_produit,
          // origine_produit: this.step2.origine_produit,
          collecteur: this.step2.collecteur,
          affichage_ecran: this.step2.affichage_ecran,
          filiere: this.step2.filiere,
          image: this.dataImage,
        };
        console.log('data',data)

        try {
          const response = await axios.put(`/parametrages/produits/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
                      "Mise à jour du produit",
                      "Votre produit a été mis à jour avec succès !"
                  )
             await this.fetchProduits();
             this.step2.image = ""
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
        const response = await axios.delete(`/parametrages/produits/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
              "Suppression du produit",
              "Votre produit a été supprimé avec succès !"
          );
          await this.fetchProduits();
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    handleFileUploadLogo(event , operationType) {
    console.log("File input change");
    const file = event.target.files[0];
    console.log("handleFileUploadLogo Selected file:", file);
    console.log('test ima',operationType)
     this.submitFile(file , operationType)
    

  },
  async submitFile(file , operationType ){
  const formData = new FormData();
    formData.append('image',file);


try {
const response = await axios.post('/parametrages/produits/upload/image-produit' , formData, {
     headers: { 
            Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
    }});
  console.log('Réponse du téléversement :', response);
  if (response.status === 200) { 
    if (operationType === 'add') {
      this.step1.image =  response.data

        } else if (operationType === 'update') {
         
          await this.submitUpdateFile(response.data , 'update-picture')

        }
      
       
       

       } else {

       }
 } catch (error) {
  this.handleErrors(error);

  } 


},
handleImageClick(data , modalId) {
  this.openModal(modalId)
      this.selectedImage = data.image || '@/assets/img/logo_mobile.png';
      this.dataFile = data
      console.log('Image sélectionnée:', this.dataFile);
      // Vous pouvez ajouter ici d'autres actions à effectuer lors du clic sur l'image
    },
triggerFileInput() {
      console.log('Triggering file input');
      this.$refs.fileInput.click();
    },
    handleFileUploadImagesUpdate(event) {
      console.log("File input change");
      const file = event.target.files[0]; // Prendre le premier fichier sélectionné
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        this.selectedImage = imageUrl;
     this.submitFile(file , 'update')
      
      }
    },
    async submitUpdateFile(url , modalId) {
     
        this.loading = true;
        let data = {
          code_produit: this.dataFile.code_produit,
          nom_produit: this.dataFile.nom_produit,
          categorie_produit: this.dataFile.categorie_produit,
          forme_produit: this.dataFile.forme_produit,
          famille_produit: this.dataFile.famille_produit,
          // origine_produit: this.dataFile.origine_produit,
          collecteur: this.dataFile.collecteur,
          affichage_ecran: this.dataFile.affichage_ecran,
          filiere: this.dataFile.filiere,
          image: url,
        };
        console.log('data',data)

        try {
          const response = await axios.put(`/parametrages/produits/${this.dataFile.id_produit}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
                      "Mise à jour du produit",
                      "Votre produit a été mis à jour avec succès !"
                  )
             await this.fetchProduits();
             
          }
        } catch (error) {
          this.handleErrors(error);
        }
     
    },

    filterByName() {
      this.currentPage = 1;
      if (this.searchProduit !== null) {
        const tt = this.searchProduit;
        const searchValue = tt.toLowerCase();
        this.ProduitsOptions = this.data.filter((user) => {
          const Nom = user.code_produit || "";
          const Descriptions = user.nom_produit || "";
          const Commune = user.categorie?.nom_categorie_produit  || "";
          const Forme = user.forme?.nom_forme_produit || "";
          const Famille = user.famille?.nom_famille_produit || "";
          const Unite = user.filiere || "";
         

          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) ||
            Commune.toLowerCase().includes(searchValue) ||
            Forme.toLowerCase().includes(searchValue) ||
            Famille.toLowerCase().includes(searchValue) ||
            Unite.toLowerCase().includes(searchValue) 
          );
        });
      } else {
        this.ProduitsOptions = [...this.data];
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
      return this.ProduitsOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped>

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  margin: 10px;
  width: 150px;
  height: 150px;
  overflow: hidden;
  /* border-radius: 50%; */
  border: 3px solid ;
  display: inline-block;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  /* border-radius: 50%; */
  border: 1px solid var(--primary-color);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.change-text {
  color: white;
  font-weight: bold;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* .add-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  cursor: pointer;
}

.plus-icon {
  font-size: 40px;
  color: #666;
}

.add-image:hover .plus-icon {
  color: #333;
}

.add-image .file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
} */




/* .image-wrapper {
  position: relative;
  display: inline-block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
} */

.image-wrapper:hover .overlay {
  opacity: 1;
}

.change-text {
  color: white;
  font-weight: bold;
}

/* .file-input {
  display: none;
} */

</style>
