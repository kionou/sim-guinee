<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <div class="col-12">
        <div class="box">
          <div
            class="box-header with-border d-flex justify-content-between align-items-center p-3"
          >
          <div class="col-4">
            <h3 class="box-title mb-0 mt-10">Liste des unités d'un type </h3>

          </div>
          <div class="col-4">
            <div class="content-group">
                               
                               <div class="input-groupe">
                                   <label for="">Selection un type de marché</label>
                                   <MazSelect v-model="TypeMarches" color="secondary" secondary :options="TypesMarchesOptions" search
                                       v-slot="{ option }" size="sm" rounded-size="sm">
                                       <div class="flex items-center"
                                           style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem"
                                           @click="handleOptionClickTypeMarche(option)">

                                           {{ option.label }}

                                       </div>

                                   </MazSelect>

                               </div>
                         

                        


        </div>
          </div>

          <div class="col-4">
            <div class="navbar-custom-menu r-side mt-4">
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
                 
                    @click="openModal('add-type-unite')" 
                    
                  >
                    <i class="mdi mdi-plus"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          

           
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="table-responsive">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                   
                    <th  class="fw-semibold">Nom </th>
                    <th>Unités concernées</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <!-- <thead v-if="paginatedItems.length === 0">
                  <tr>
                    <td colspan="18">
                      <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                        Pas de données !!
                      </div>
                    </td>
                  </tr>
                </thead> -->
                <thead v-for="(marche , index) in paginatedItems" :key="index">
                  <tr >
                   

                    <td   :rowspan="marche.unites.length + 1">
                        <div style="display: inline-block">
                       <span style="font-weight: 600; font-size: 1.1em; display: block">  {{ marche?.nom_type_marche }}</span>
                                    
                         </div>
                      
                    </td>
                </tr>
                <!-- <tr v-if="marche.unites.length === 0">
                    <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                        Pas de données !!
                      </div>
                </tr> -->
                        <tr   v-for="(unite , dex) in marche.unites" :key="dex">
                      <td>{{ unite?.unite_relation?.nom_unite }}</td>
                      <td style="width: 100px">
                      <div class="d-flex justify-content-evenly border-0">
                     
                        <a
                          href="javascript:void(0)"
                          class="btn btn-circle btn-danger btn-xs"
                          @click="HandleIdDelete(unite.id)"
                          title=""
                          data-toggle="tooltip"
                          data-original-title="Delete"
                          ><i class="ti-trash"></i
                        ></a>
                      </div>
                    </td> 
                            
                        </tr>

                      
                   
                  
  
                   
  

                    
               
                </thead>
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
        id="add-type-unite"
        ref="add-type-unite"
        tabindex="-1"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Attribuer des unités à un type de marché
              </h5>
              <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('add-type-unite')" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row mt-3 content-group">
               
               
               
                <div class="col-12">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Type de marché <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="step1.type_marche"
                      color="secondary"
                      name="step1.type_marche"
                      size="sm"
                      rounded-size="sm"
                      search
                      :options="TypesMarchesOptions"
                    />
                    <small v-if="v$.step1.type_marche.$error">{{
                      v$.step1.type_marche.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['type_marche']">
                      {{ resultError["type_marche"] }}
                    </small>
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-groupe">
                    <label for="userpassword">
                      liste des unités de mesure <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="step1.unite_mesure"
                      color="secondary"
                      name="step1.unite_mesure"
                      size="sm"
                      rounded-size="sm"
                      search
                      :options="UnitesOptions"
                      multiple
                    />
                    <small v-if="v$.step1.unite_mesure.$error">{{
                      v$.step1.unite_mesure.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['unite_mesure']">
                      {{ resultError["unite_mesure"] }}
                    </small>
                  </div>
                </div>


               
                
              
              </div>
             
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
              <button
                    type="button"
                    @click="SubmitTypesUnites('add-type-unite')"
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
        id="update-type-unite"
        ref="update-type-unite"
        tabindex="-1"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Modifier une attribution
              </h5>
              <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-type-unite')" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row mt-3 content-group">
               
               
                <div class="col-12">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Type de marché <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="step2.type_marche"
                      color="secondary"
                      name="step2.type_marche"
                      size="sm"
                      rounded-size="sm"
                      search
                      :options="TypesMarchesOptions"
                    />
                    <small v-if="v$.step2.type_marche.$error">{{
                      v$.step2.type_marche.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['type_marche']">
                      {{ resultError["type_marche"] }}
                    </small>
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Lieste des unités de mesure <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="step2.unite_mesure"
                      color="secondary"
                      name="step2.unite_mesure"
                      size="sm"
                      rounded-size="sm"
                      search
                      :options="UnitesOptions"
                      multiple
                    />
                    <small v-if="v$.step2.unite_mesure.$error">{{
                      v$.step2.unite_mesure.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['unite_mesure']">
                      {{ resultError["unite_mesure"] }}
                    </small>
                  </div>
                </div>

               
               
              
              </div>
             
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
              <button
                    type="button"
                    @click="submitUpdate('update-type-unite')"
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
        TypesMarchesOptions: [],
        UnitesOptions: [],
        TypeMarches:"",
        data: [],
        currentPage: 1,
        itemsPerPage: 10,
        ToId: "",
        totalPageArray: [],
        step1: {
         
          type_marche: "",
          unite_mesure: [],
        
        },
        step2: {
         
          type_marche: "",
          unite_mesure: [],
         
  
        },
       
        v$: useVuelidate(),
        error: "",
        resultError: {},
      };
    },
    validations: {
      step1: {
          type_marche: { require },
          unite_mesure: { require },
         
      },
      step2: {
       
          type_marche: { require },
          unite_mesure: { require },
        
      },
    },
    async mounted() {
      await this.fetchTypesUnites(null);
      await this.fetchTypesMarches();
      await this.fetchUnites();
    },
    methods: {
      successmsg: successmsg,
      async fetchTypesMarches() {
        try {
          const response = await axios.get("/parametrages/type-marches", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          console.log("response", response);
          if (response.status === 200) {
            response.data.map(item => this.TypesMarchesOptions.push({
                  label: item.nom_type_marche,
                  value: item.id_type_marche
                  }))
            this.loading = false;
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
      async fetchUnites() {
        try {
          const response = await axios.get("/parametrages/unites", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          console.log("response", response);
          if (response.status === 200) {
            response.data.map(item => this.UnitesOptions.push({
              label: item.nom_unite,
              value: item.id_unite
                  }))
            this.loading = false;
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },

    
      async fetchTypesUnites(id) {
        this.loading = true
        let url = id === null ?  `/parametrages/unites/associated-unites/type-marche`  :  `/parametrages/unites/associated-unites/type-marche?id_of_type_market=${id}`

        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          console.log("responseaze", response);
          if (response.status === 200) {
            this.data = response.data;
            this.ProduitsOptions = this.data;
            this.$emit('uniteType-count', this.data.length)
            this.loading = false;
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
      async SubmitTypesUnites(modalId) {
        this.v$.step1.$touch();
        if (this.v$.$errors.length == 0) {
          this.loading = true;
  
          let data = {
            type_marche: this.step1.type_marche,
            unite_mesure: this.step1.unite_mesure,
           
          };
         
          console.log('data',data)
          try {
            const response = await axios.post("/parametrages/unites/associate-type-marche/to-units", data, {
              headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
            }
            });
            console.log('qfs', response)
            if (response.status === 200) {
              this.closeModal(modalId);
              this.step1 = {
          
            categorie_produit: "",
            famille_produit: "",
           
          };
          this.v$.step1.$reset();
              this.successmsg(
                    "Création du produit",
                    "Votre produit a été créé avec succès !"
                );
  
  
              await this.fetchTypesUnites(null);
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
           
              (this.step2.categorie_produit = data.categorie?.id_categorie_produit),
              (this.step2.famille_produit = data.famille?.id_famille_produit),
             
            
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
        
            categorie_produit: this.step2.categorie_produit,
            famille_produit: this.step2.famille_produit,
          
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
               await this.fetchTypesUnites();
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
        console.log('id',id)
        this.loading = true;
  
        try {
          // Faites une requête pour supprimer l'élément avec l'ID itemId
          const response = await axios.delete(`/parametrages/unites/delete-associate-unite/type-marche?id=${id}`, {
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
            await this.fetchTypesUnites(null);
          } else {
            this.loading = false;
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
      handleOptionClickTypeMarche(value){
        console.log('value',value)

        this.fetchTypesUnites(value.value)



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
  .table > thead > tr > td, .table > thead > tr > th {
  border-top: 1px solid #d5dfea;
  padding: 0 !important;
  vertical-align: middle; }
  </style>
  