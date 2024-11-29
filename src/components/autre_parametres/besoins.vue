<template>
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
                    <h3 class="box-title mb-0"> Liste des produits demandés</h3>
                    <div class="navbar-custom-menu r-side  float-right">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="btn-group d-lg-inline-flex  h-40">
                                <div class="app-menu">
                                    <div class="search-bx mx-5">
                                        <form>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Search"
                                                    aria-label="Recherchez..." aria-describedby="button-addon2"
                                                    v-model="searchMagasin" @input="filterByName">
                                                <div class="input-group-append">
                                                    <button class="btn border border-1"><i class="ti-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li class="h-40">
                                <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
                                    @click="openModal('add-magasin')">
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
    
                                    <th>N°</th>
                                    <th>Nom & Prenoms</th>
                                    <th>Adresse</th>
                                    <th>visibilité</th>
                                    <th>Produits</th>
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
                                <tr v-for="(data , index) in paginatedItems" :key="index">
    
                                    <td style="width: 50px;" class="text-center">{{ index + 1 }}</td>
                                    <td style="width: 170px;" class="text-center">
                                        <span class="text-dark font-weight-600 hover-primary mb-1 font-size-14">{{data?.nom
                                            ?? "-"}} {{data?.prenoms ?? "-"}}</span>
                                        <span style="font-size:12px !important" class="text-danger  d-block">{{data?.contact
                                            ?? "-"}} </span>
                                    </td>
                                    <td style="width: 100px;" class="text-center">
                                        {{ data?.geolocalisation ?? "-"}}
                                    </td>
                                    <td class="text-center"  style="width: 30px;">
                                            <div v-if="data?.visible === true"  class="btn btn-circle btn-success btn-xs"><i class="ti-lock "></i></div>
                                            <div v-else  class="btn btn-circle btn-danger btn-xs"><i class="ti-unlock "></i></div>
                                        </td>
    
                                    <td style="width: 120px" class="text-center">
                                        <a href="javascript:void(0)"
                                            @click="HandleIdUpdate(data.produits ,'update-magasin')"
                                            data-original-title="Update" class="text-white btn btn-primary btn-sm"> <i
                                                class="ti-eye"></i> produits </a>
                                    </td>
                                    <td style="width: 50px">
                                        <div class="d-flex justify-content-evenly border-0">
    
                                            <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                                                @click="HandleIdDelete(data.id)" title="" data-toggle="tooltip"
                                                data-original-title="Delete"><i class="ti-trash"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="container_pagination">
                                <Pag :current-page="currentPage" :total-pages="totalPages"
                                    @page-change="updateCurrentPage" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
    
        <div class="modal center-modal fade" id="add-magasin" ref="add-magasin" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Ajouter une demande 
                        </h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('add-magasin')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="generastep">
                            <div class="stepper">
                                <div class="stepper-progress">
                                    <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
                                </div>
    
                                <div class="stepper-item"
                                    :class="{ current: currentStep == item, success: currentStep > item }" v-for="item in 2"
                                    :key="item" @click="goToStep(item)">
                                    <div class="stepper-item-counter">
                                        <img class="icon-success"
                                            src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
                                            alt="" />
                                        <span class="number">
                                            {{ item }}
                                        </span>
                                    </div>
                                    <!-- <span class="stepper-item-title"> Step {{ item }} </span> -->
                                </div>
                            </div>
                        </div>
                       
                        <!-- Étape 1 -->
                      <div v-if="currentStep === 1"> 
                        <div class="form-container"> 
                            <div class="row mt-3 content-group">
                            <div class="col-xl-6 col-sm-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Nom <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.nom" color="secondary" name="step1.nom"
                                        size="sm" rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.nom.$error">{{
                                        v$.step1.nom.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['nom']">
                                        {{ resultError["nom"] }}
                                    </small>
                                </div>
                            </div>
                            <div class="col-xl-6 col-sm-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Prenoms <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.prenoms" color="secondary" name="step1.prenoms"
                                        size="sm" rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.prenoms.$error">{{
                                        v$.step1.prenoms.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['prenoms']">
                                        {{ resultError["prenoms"] }}
                                    </small>
                                </div>
                            </div>
    
                            <div class="col-xl-6 col-sm-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Contact <span class="text-danger">*</span></label>
                                        <MazPhoneNumberInput v-model="step1.contact" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                                        :success="results?.isValid" />
                                    <small v-if="v$.step1.contact.$error">{{
                                        v$.step1.contact.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['contact']">
                                        {{ resultError["contact"] }}
                                    </small>
                                </div>
                            </div>
                            <div class="col-xl-6 col-sm-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Adresse <span class="text-danger">*</span>
                                    </label>
                                    <MazInput v-model="step1.geolocalisation" color="secondary" name="step1.geolocalisation" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.geolocalisation.$error">{{
                                        v$.step1.geolocalisation.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['geolocalisation']">
                                        {{ resultError["geolocalisation"] }}
                                    </small>
                                </div>
                            </div>
                         
                            <div class="col-xl-12 col-sm-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Afficher à l'ecran ?? <span class="text-danger">*</span></label>
                                    <MazSelect v-model="step1.visible" color="secondary" name="step1.visible" size="sm"
                                        rounded-size="sm" search :options="choix" />
                                    <small v-if="v$.step1.visible.$error">{{
                                        v$.step1.visible.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['visible']">
                                        {{ resultError["visible"] }}
                                    </small>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="btnForm py-3 d-flex items-center justify-content-end">
                          <button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStep('add-magasin')">
                              Suivant
                          </button>
                          </div>
                      </div>

                            <!-- Étape 4 -->
                            <div v-if="currentStep === 2">
                <div class="bouttons" style="position: relative ; width: 100%; " > 
                <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000" @click="AddformDataProduits" ><i  class="ti-plus"></i></div>
                </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(produit, index) in Produits" :key="produit.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                 
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Produit <span class="text-danger">*</span></label
                      >
                   
                      <MazSelect label="" v-model="produit.produit" :options="ProduitsOptions" v-slot="{ option  }" search
                    size="sm" rounded-size="sm" color="secondary"  @input="clearErrorProduits(index, 'produit')">
                    <div class="d-flex align-items-center" style="
                          padding-top: 0.5rem;
                          padding-bottom: 0.5rem;
                          width: 100%;
                          gap: 1rem;
                        ">
                      <MazAvatar size="0.8rem" :src="option.picture" />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                      <small v-if="errors.Produits && errors.Produits[index] && errors.Produits[index].produit">{{ errors.Produits[index].produit }}</small>
                      <small v-if="resultError['Produits']"> {{ resultError["Produits"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Quantité demandé <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="produit.quantite_disponible"
                        color="info"
                        name="quantite_disponible"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorProduits(index, 'quantite_disponible')"

                      />
                      <small v-if="errors.Produits && errors.Produits[index] && errors.Produits[index].quantite_disponible">{{ errors.Produits[index].quantite_disponible }}</small>
                      <small v-if="resultError['Produits']"> {{ resultError["Produits"] }} </small>
                    </div>
                  </div>

                
                </div>
                <div class="row  content-group">
                 
                    <!-- <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Disponibilité <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="produit.disponibilite"
                        color="info"
                        name="disponibilite"
                        size="sm"
                        rounded-size="sm"
                        type="number"
                        @input="clearErrorProduits(index, 'disponibilite')"

                      />
                      <small v-if="errors.Produits && errors.Produits[index] && errors.Produits[index].disponibilite">{{ errors.Produits[index].disponibilite }}</small>
                      <small v-if="resultError['Produits']"> {{ resultError["Produits"] }} </small>
                    </div>
                  </div> -->
                 <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword"
                       >Date de la demande <span class="text-danger">*</span></label
                     >
                     <MazInput
                       v-model="produit.date_disponiblite"
                       color="info"
                       name="date_disponiblite"
                       size="sm"
                       rounded-size="sm"
                       type="date"
                       @input="clearErrorProduits(index, 'date_disponiblite')"

                     />
                     <small v-if="errors.Produits && errors.Produits[index] && errors.Produits[index].date_disponiblite">{{ errors.Produits[index].date_disponiblite }}</small>
                     <small v-if="resultError['Produits']"> {{ resultError["Produits"] }} </small>
                   </div>
                 </div>
                
               </div>
               <div class="row  content-group">
                <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword" >Photo <span class="text-danger">*</span></label >
                        <input type="file" class="form-control" id="file" @change="handleFileUploadLogo($event,'add')"  accept="image/*" >
                    
                     <small v-if="errors.Produits && errors.Produits[index] && errors.Produits[index].photo">{{ errors.Produits[index].photo }}</small>
                     <small v-if="resultError['Produits']"> {{ resultError["Produits"] }} </small>
                   </div>
                 </div>
               </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowProduits(index)"  style=" position:absolute !important ; top: 12px !important; background:red;">
                       <i class="ti-trash"></i>
                      </button>
                  </div>

                </div>
                            <div class="btnForm py-3 d-flex items-center justify-content-between">
                            <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                            <button class="btnLogin" @click.prevent="nextStep('add-magasin')">Valider</button>
                          </div>
                          </div>
                    </div>
                  
                </div>
            </div>
        </div>
    
        <div class="modal center-modal fade" id="update-magasin" ref="update-magasin" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                           Détail sur les produits
                        </h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('update-magasin')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                 
                  <th>Nom & Code</th>
                  <th>Quantité demandé</th>
                  <th>Date de la demande </th>
                  <th>Famille</th>
                  <th>Forme</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody v-if="details.length === 0">
                <tr>
                  <td colspan="18">
                    <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                      Pas de données !!
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-for="(data) in details" :key="data.id_magasin">
                  <td>
                    <div class="widget-user-image" >
                        <div  style="cursor: pointer;"  data-original-title="picture" >
                          <img v-if="data?.produit_relation?.image === '' || data?.image === null" class="rounded-circle " width="45"  src="@/assets/img/logo_mobile.png"
                        alt="User Avatar" style="float: left; margin-right: 10px ;  height:45px !important"/>

                        <img v-else class="rounded-circle " width="45"  :src="data?.produit_relation?.image"
                        alt="User Avatar" style="float: left; margin-right: 10px ; height:45px !important"/>
                        </div>
              

                      <div style="display: inline-block">
                        <span style="font-weight: 600; font-size: 1.1em; display: block"
                          >{{ data.produit_relation?.nom_produit }} / {{ data.produit_relation?.nom_produit_en }} </span
                        >
                        <span class="text-danger" style="display: block;">{{ data.produit_relation?.code_produit }}</span>
                      </div>
                    </div>
                  </td>

                  <td style="" class="text-center">{{ data?.quantite_disponible ?? "-" }}</td>
                  <td class="text-center" style="width: 160px; color:red;font-weight:bolder">{{ data?.date_disponiblite  ?? "-" }}</td>
                  <td style="width: auto;" class="text-center">
                    {{ data?.produit_relation?.famille?.nom_famille_produit ?? "-" }}
                   </td>

                  <td>{{ data?.produit_relation?.forme?.nom_forme_produit ?? "-"}} </td>
                  <td>{{ data?.affichage_ecran }}</td>
                 
                </tr>
              </tbody>
            </table>
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
    Loading, MazPhoneNumberInput
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
      searchMagasin: "",
      MagasinsOptions: [],
      ProduitsOptions: [],
      currentStep: 1,
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      v$: useVuelidate(),
      error: "",
      resultError: {},
      errors: {Produits: [] , },
      choix:[
        {label:'Oui' , value:true},
        {label:'Non' , value:false},

      ],
        Produits:[{  quantite_disponible:"",  produit:"",  date_disponiblite:"", photo:"", }],

        details:[],
      step1: {
        nom: "",
        prenoms: "",
        contact: "",
        geolocalisation: "",
        visible: "",
      },
    };
  },
  validations: {
    step1: {
        nom:  { require },
        prenoms:  { require },
        contact:  { require },
        geolocalisation:  { require },
        visible:  { require },
    },
   
  },
  async mounted() {
    await this.fetchMagasins();
    await this.fetchProduits();
  },
  methods: {
    successmsg: successmsg,
    AddformDataProduits() {
     this.Produits.push({ quantite_disponible:"",  produit:"",  date_disponiblite:"", photo:"", });
   },
   deleteRowProduits(index) {
  
   if(index !== 0){
     this.Produits.splice(index, 1);
   }
  },
  clearErrorProduits(index, field) {   
     if (this.errors.Produits[index]) {
       this.errors.Produits[index][field] = null;
     }
   },
   validateProduits() {
    let isValid = true;
    this.errors = { Produits: [] };
    this.Produits.forEach((produit, index) => {
        const produitErrors = {};
        
        if (!produit.produit) {
            produitErrors.produit = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!produit.quantite_disponible) {
            produitErrors.quantite_disponible = 'Ce champs est obligatoire!';
            isValid = false;
        }
        
        if (!produit.date_disponiblite) {
            produitErrors.date_disponiblite = 'Ce champs est obligatoire!';
            isValid = false;
        }

        this.errors.Produits[index] = produitErrors;
    });
    return isValid;
},
    stepperProgress() {
      return (100 / 1) * (this.currentStep - 1) + "%";
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    async nextStep(modalId) {
      try {
        if (this.currentStep === 1) {
          this.v$.step1.$touch();
          if (this.v$.$errors.length == 0) {
            this.currentStep++;

          } else {
            console.log("errroor1", this.v$.$errors);
          }

        }
        else if (this.currentStep === 2) {
          if(this.validateProduits()){
          this.SubmitDispo(modalId)

          }

        }


      } catch (error) { console.error("Une erreur s'est produite :", error); }
    },
    goToStep(step) {
      this.currentStep = step;
    },
    getYear(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = String(d.getFullYear())
  
        return `${day}/${month}/${year}`
      },
   
    async fetchProduits() {
      try {
        const response = await axios.get(`/parametrages/produits`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.ProduitsOptions.push({
            label: `${item.nom_produit} ( ${item.code_produit})`,
            picture: item.image,
            value: item.code_produit
          }))
          this.loading = false;
        }
      } catch (error) {
        return
         this.handleErrorsGet(error);
      }
    },

    async fetchMagasins() {
      try {
        const response = await axios.get(`/disponibilites-besoins/${false}`, {
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
         this.handleErrorsGet(error);
        return

      }
    },
    async SubmitDispo(modalId) {
     
        this.loading = true;

        let data = {
          nom: this.step1.nom,
          prenoms: this.step1.prenoms,
          contact: this.step1.contact,
          geolocalisation: this.step1.geolocalisation,
          visible:this.step1.visible,
          disponibilite_besoins:false,
          produits: this.Produits,
        };

        console.log('data', data)
        try {
          const response = await axios.post("/disponibilites-besoins", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            }
          });
          console.log('qfs', response)
          if (response.status === 200) {
            this.closeModal(modalId);
            this.step1 = {
              nom: "",
              prenoms: "",
              contact: "",
              geolocalisation: "",
              disponibilite_besoins: "",
              visible: "",

            };
            this.v$.step1.$reset();
            this.Produits = [{  quantite_disponible:"",  produit:"",  date_disponiblite:"", photo:"", }],
            this.currentStep = 1
            this.successmsg(
              "Création d'une demande ",
              "Votre demande a été créé avec succès !"
            );


            await this.fetchMagasins();
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }


     
    },
    async HandleIdUpdate(id, modalId) {
      this.openModal(modalId)
      console.log('id',id)
      this.details = id
   
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
      console.log('id',id)

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/disponibilites-besoins/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données  de la demande  supprimées",
            "Les données de la demande ont été supprimées avec succès !"
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
        const tt = this.searchMagasin;
        const searchValue = tt.toLowerCase();
        this.MagasinsOptions = this.data.filter((user) => {
          const Nom = user.nom || "";
          const Descriptions = user.prenoms || "";
          const Commune = user.contact || "";
          const Collecteur = user.collecteur_relation?.nom_collecteur || "";


          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) ||
            Commune.toLowerCase().includes(searchValue) ||
            Collecteur.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.MagasinsOptions = [...this.data];
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
    async handleErrorsGet(error) {
      console.log('Error:', error);
      if (error.response?.status === 500) {
        
      }
      if (error.response?.data.detail.includes('204')) {
        this.loading = false;
        this.data = [];

     
      }
      else if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); 
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.data = [];
      } else {
     
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

      $(modalElement).fadeIn(100, function () {
        $(modalElement).addClass('show');
      });
      $('body').addClass('modal-open');
      this.addBackdrop();
    },
    closeModal(modalId) {
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeOut(100, function () {
        $(modalElement).removeClass('show');
        $(modalElement).css('display', 'none');
      });
      $('body').removeClass('modal-open');
      $('.modal-backdrop').fadeOut(100, function () {
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
  <style lang="css" scoped>
.tx-green-1 {
    color: #75cc65;
    font-weight: 600;
}

.wrapper-stepper {
    background-color: #fff;
    padding: 60px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 660px; */
    position: relative;
    z-index: 0;
    /* margin-bottom: 24px; */
}

.stepper-progress {
    position: absolute;
    background-color: #c5c5c5;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;
}

.stepper-progress-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: #47c00b;
    transition: all 500ms ease;
}

.stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #c5c5c5;
    transition: all 500ms ease;
    cursor: pointer;
}

.stepper-item-counter {
    height: 35px;
    width: 35px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid #c5c5c5;
    position: relative;
}

.stepper-item-counter .icon-success {
    position: absolute;
    opacity: 0;
    transform: scale(0);
    width: 18px;
    transition: all 500ms ease;
}

.stepper-item-counter .number {
    font-size: 15px;
    transition: all 500ms ease;
}

.stepper-item-title {
    position: absolute;
    font-size: 15px;
    bottom: -39px;
    width: 71px;
    display: flex;
    justify-content: center;
}

.stepper-item.success .stepper-item-counter {
    border-color: #75cc65;
    background-color: #c8ebc1;
    color: #fff;
    font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
    opacity: 1;
    transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
    opacity: 0;
    transform: scale(0);
}

.stepper-item.success .stepper-item-title {
    color: #75cc65;
}

.stepper-item.current .stepper-item-counter {
    border-color: #75cc65;
    background-color: #75cc65;
    color: #fff;
    font-weight: 600;
}

.stepper-item.current .stepper-item-title {
    color: #818181;
}

.signup a:hover {
    text-decoration: underline var(--color-primary);
}

.sign {
    display: block;
    width: 100%;
    background-color: var(--color-primary);
    padding: 0.75rem;
    text-align: center;
    color: black;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 50px;
}

.signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
}


.btnForm {
    max-width: 1140px;
    background-color: white;
    padding: 1rem;
    color: black;
    /* border: 1px solid var(--color-primary) */
}

.btnLogin {
    padding: 1em 3em;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color: var(--color-primary);
    border: none;
    border-radius: 45px;

    cursor: pointer;
    outline: none;
}

.btnLogin:hover {
    background-color: #fff;
    border: 1px solid var(--color-primary);
    color: #000;
}
</style>
  