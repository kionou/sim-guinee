<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0">Liste des rôles</h3>
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
              <li class="h-40">
                <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
                  @click="openModal('add-roles')">
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
                  <th>Libellé</th>
                  <th>Description</th>
                  <th>Accèss</th>
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
                <tr v-for="(data , index) in paginatedItems" :key="data.id">
  
                  <td style="width: 50px;" class="text-center">{{ index + 1 }}</td>
                  <td>{{ data.name }}</td>
                  <td>{{ data.description }}</td>
                  <td style="width: 170px;">
                    <a href="#"
                      style="color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1)) !important;  text-decoration: underline !important;"
                      @click="getDetailRoles(data.id ,'create-permissions-roles')">Gérer les accès</a>
  
                  </td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs"
                        @click="HandleIdUpdate(data?.id, 'update-roles')" data-original-title="Update">
  
                        <span v-if="loadingItems[data?.id]">
                          <i class="mdi mdi-loading mdi-spin"></i>
                        </span>
                        <span v-else>
                          <i class="ti-marker-alt"></i>
                        </span>
                      </a>
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
                <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
  
    <div class="modal center-modal fade" id="add-roles" ref="add-roles" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Ajouter un rôle
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('add-roles')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
  
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    rôle <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.name" color="secondary" name="step1.name" size="sm" rounded-size="sm"
                    type="text" />
                  <small v-if="v$.step1.name.$error">{{
                    v$.step1.name.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['name']">
                    {{ resultError["name"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee 
                      !important" id="text-area" v-model="step1.description" rows="2"></textarea>
  
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
            <button type="button" @click="SubmitRoles('add-roles')" class="waves-effect waves-light btn btn-primary">
              <span v-if="loadingItems['add-roles']">
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
  
    <div class="modal center-modal fade" id="update-roles" ref="update-roles" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier un rôle
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
                    rôle <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.name" color="secondary" name="step2.name" size="sm" rounded-size="sm"
                    type="text" />
                  <small v-if="v$.step2.name.$error">{{
                    v$.step2.name.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['name']">
                    {{ resultError["name"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee 
                      !important" id="text-area" v-model="step2.description" rows="2"></textarea>
  
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
            <button type="button" @click="submitUpdate('update-roles')" class="waves-effect waves-light btn btn-primary">
  
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
  
    <!-- create permissions and role -->
    <div class="modal center-modal fade" id="create-permissions-roles" ref="create-permissions-roles" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Assigner les permissions et menus
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('create-permissions-roles')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row  content-group">
              <div class="col-xl-5">
                <div class="input-groupe">
                  <label for="userpassword">
                    rôle <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.name" color="secondary" name="step2.name" size="sm" rounded-size="sm" search
                    :options="OptionsRoles" />
                  <small v-if="v$.step2.name.$error">{{
                    v$.step2.name.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['name']">
                    {{ resultError["name"] }}
                  </small>
                </div>
              </div>
              <div class="col-xl-5">
                <div class="input-groupe">
                  <label for="userpassword">
                    permissions <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.name" color="secondary" name="step2.name" size="sm" rounded-size="sm" search
                    :options="PermissiosnOptions" />
                  <small v-if="v$.step2.name.$error">{{
                    v$.step2.name.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['name']">
                    {{ resultError["name"] }}
                  </small>
                </div>
              </div>
              <div class="col-xl-2 d-flex justify-content-center align-items-end">
                <button type="button" @click="submitUpdate('create-permissions-roles')"
                  class="waves-effect waves-light btn btn-primary">
  
                  <span v-if="loadingItems['create-permissions-roles']">
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
      return Math.ceil(this.RolesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.RolesOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      loadingItems: {},
      searchRoles: "",
      RolesOptions: [],
      OptionsRoles: [],
      PermissionsOptions: [],

      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      step1: {
        name: "",
        description: "",
      },
      step2: {
        name: "",
        description: "",

      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      name: { require },
      description: { require },

    },
    step2: {
      name: { require },
      description: { require },


    },
  },
  async mounted() {
    await this.getRoles();

  },
  methods: {
    successmsg: successmsg,

    async getRoles() {
      try {
        const response = await axios.get("/roles", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

       
        if (response.status === 200) {
          this.data = response.data;
          this.RolesOptions = this.data;
          this.OptionsRoles = [],
          response?.data?.map(r => this.OptionsRoles.push({
            label: r.name,
            value: r.id
          }))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
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
            label: p.name,
            value: p.id
          }))

          this.loading = false;
        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
    async SubmitRoles(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loadingItems[modalId] = true;

        let data = {
          name: this.step1.name,
          description: this.step1.description,

        };

        console.log('data', data)
        try {
          const response = await axios.post("/roles", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            }
          });
      
          if (response.status === 200) {
            this.closeModal(modalId);
            this.loadingItems[modalId] = false;
            this.step1 = {
              name: "",
              description: "",

            };
            this.v$.step1.$reset();
            this.successmsg(
              "Création du rôle",
              "Votre rôle a été créé avec succès !"
            );


            await this.getRoles();
          } else {
          }
        } catch (error) {
          this.loadingItems[modalId] = false
          this.handleErrors(error);
        }


      } else {
      }
    },
    async HandleIdUpdate(id, modalId) {
      this.loadingItems[id] = true;

      try {
        const response = await axios.get(`/roles/{id}?role_id=${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          

          let data = response.data;
          (this.step2.name = data.name),
            (this.step2.description = data.description),
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
          description: this.step2.description,

        };

        try {
          const response = await axios.put(`/roles/{id}?role_id=${this.ToId}`, data, {
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
        allowOutsideClick: false,
        preConfirm: async () => {
          Swal.showLoading();
          await this.ConfirmeDelete(id);

        }
      });


    },
    async ConfirmeDelete(id) {
      // this.loading = true;

      try {

        const response = await axios.delete(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données du rôle supprimées",
            "Les données du rôle ont été supprimées avec succès !"
          );
          await this.getRoles();
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchRoles !== null) {
        const tt = this.searchRoles;
        const searchValue = tt.toLowerCase();
        this.RolesOptions = this.data.filter((user) => {
          const Nom = user.name || "";
          return (
            Nom.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.RolesOptions = [...this.data];
      }
    },

    getDetailRoles(id, modalId) {
      this.openModal(modalId)

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
      return this.RolesOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped>
.mdi-loading {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
