<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <div class="col-12">
        <div class="box">
          <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
            <h3 class="box-title mb-0">Liste des permissions</h3>
            <div class="navbar-custom-menu r-side  float-right">
              <ul class="nav navbar-nav justify-content-end">
                <li class="btn-group d-lg-inline-flex h-40">
                  <div class="app-menu">
                    <div class="search-bx mx-5">
                      <form>
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                            aria-describedby="button-addon2" v-model="searchRoles" @input="filterByName">
                          <div class="input-group-append">
                            <button class="btn border border-1"><i class="ti-search"></i></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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
                    <th>Nom</th>
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
                  <tr v-for="(data , index) in paginatedItems" :key="data.id_magasin">
    
                    <td style="width: 50px;" class="text-center">{{ index + 1 }}</td>
                    <td>{{ data.nom_magasin }}</td>
                   
                    <td style="width: 100px">
                      <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs"
                    @click="HandleIdUpdate(data?.code_magasin, 'update-roles')"
                    data-original-title="Update">
                    
                    <span v-if="loadingItems[data?.code_magasin]">
                      <i class="mdi mdi-loading mdi-spin"></i> 
                    </span>
                    <span v-else>
                      <i class="ti-marker-alt"></i> 
                    </span>
                  </a>
                      
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="container_pagination">
                  <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    
   
    
      <div class="modal center-modal fade" id="update-roles" ref="update-roles" tabindex="-1">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Modifier une permissions
              </h5>
              <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                @click="closeModal('update-roles')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row mt-3 content-group">
                <div class="col-12">
                  <div class="input-groupe">
                    <label for="userpassword">
                      nom <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.name" color="secondary" name="step2.name" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step2.name.$error">{{
                      v$.step2.name.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['name']">
                      {{ resultError["name"] }}
                    </small>
                  </div>
                </div>
              </div>
    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
              <button type="button" @click="submitUpdate('update-roles')"
                class="waves-effect waves-light btn btn-primary">
               
                <span v-if="loadingItems['update-roles']">
                      <i class="mdi mdi-loading mdi-spin"></i> chargement...
                    </span>
                    <span v-else>
                      Valider 
                    </span>
              </button>
            </div>
          </div>
        </div>
      </div>
  
   
    </div>
  </template>
  <script>
  import Pag from "@/components/others/pagination.vue";
  import Loading from "@/components/others/loading2.vue";
  import axios from "@/lib/axiosConfig";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
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
        return Math.ceil(this.PermissionsOptions.length / this.itemsPerPage);
      },
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.PermissionsOptions.slice(startIndex, endIndex);
      },
    },
    data() {
      return {
        loading: true,
        loadingItems: {},
        searchRoles: "",
        PermissionsOptions:[], 
        data: [],
        currentPage: 1,
        itemsPerPage: 10,
        ToId: "",
        totalPageArray: [],
        step1: {
         name:""
        },
        step2: {
         name:""
        },
        v$: useVuelidate(),
        error: "",
        resultError: {},
      };
    },
    validations: {
      step1: {
        name: { require },
     
      },
      step2: {
        name: { require },
  
      },
    },
    async mounted() {
      await this.getPermissions();
      
    },
    methods: {
      successmsg: successmsg,
    
   
      async getPermissions() {
        try {
          const response = await axios.get("/parametrages/magasins", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          console.log("response", response);
          if (response.status === 200) {
         response?.data?.map(p => this.PermissionsOptions.push({
          label:p.name,
          value:p.id
         }))
        
            this.loading = false;
          }
        } catch (error) {
          this.handleErrorsGet(error);
        }
      },
    
      async HandleIdUpdate(id, modalId) {
        this.loadingItems[id] = true;
  
        try {
          const response = await axios.get(`/parametrages/magasins/${id}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          if (response.status === 200) {
            console.log("Slbvlkjbv", response);
  
            let data = response.data;
            (this.step2.name = data.name), 
              (this.ToId = data.id);
              this.openModal(modalId)
              this.loadingItems[id] = false;
  
          }
        } catch (error) {
          this.handleErrorsGet(error);
        }
      },
      async submitUpdate(modalId) {
        this.v$.step2.$touch();
  
        if (this.v$.$errors.length == 0) {
          this.loadingItems[modalId] = true;
          
          let data = {
            name: this.step2.name,
           
          };
  
          try {
            const response = await axios.put(`/parametrages/magasins/${this.ToId}`, data, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            });
  
            if (response.status === 200) {
              this.closeModal(modalId);
              this.loadingItems[modalId] = false;
              this.successmsg(
                "Données du rôle mises à jour",
                "Les données du rôle ont été mises à jour avec succès !"
              );
              await this.getRoles();
            }
          } catch (error) {
            this.openModal(modalId)
            this.handleErrors(error);
          }
        } else {
          this.loading = false;
        }
      },
     
      filterByName() {
        this.currentPage = 1;
        if (this.searchRoles !== null) {
          const tt = this.searchRoles;
          const searchValue = tt.toLowerCase();
          this.PermissionsOptions = this.data.filter((user) => {
            const Nom = user.name || "";
            return (
              Nom.toLowerCase().includes(searchValue) 
            );
          });
        } else {
          this.PermissionsOptions = [...this.data];
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
        return this.PermissionsOptions.slice(startIndex, endIndex);
      },
    },
  };
  </script>
  <style lang="css" scoped>
  .mdi-loading {
    animation: spin 1s infinite linear;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  