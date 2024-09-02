<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des régions naturelles</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search"
                          aria-label="Recherchez..."
                          aria-describedby="button-addon2"
                          v-model="searchNaturelle"
                          @input="filterByName"
                        />
                        <div class="input-group-append">
                          <button class="btn border border-1">
                            <i class="ti-search"></i>
                          </button>
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
                  data-target="#modal-center"
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
                  <th class="text-center">N°</th>
                  <th>Intitulé</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="paginatedItems.length === 0">
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
                <tr v-for="(data, index) in paginatedItems" :key="data.id">
                  <td style="width: 50px" class="text-center">
                    {{ index + 1 }}
                  </td>
                  <td>{{ data.nom_region_naturelle }}</td>

                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.id_region_naturelle)"
                        data-original-title="Update"
                        data-toggle="modal"
                        data-target="#naturelle-update"
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.id_region_naturelle)"
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
      id="modal-center"
      ref="modal-center"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter des régions naturelles</h5>
            <button class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
            <div class="bouttons" style="position: relative; width: 100%">
              <div
                class="btn btn-secondary py-1 px-2"
                style="position: absolute; right: 0; top: 13px; z-index: 1000"
                @click="AddformDataRegionNaturelles"
              >
                <i class="ti-plus"></i>
              </div>
            </div>
            <!-- </div>  -->
            <div
              class="row align-items-center p-2 border-bottom"
              v-for="(regionNaturelle, index) in RegionNaturelles"
              :key="regionNaturelle.id"
            >
              <div class="col-11">
                <span class="nombre">
                  {{ index + 1 }}
                </span>
                <div class="row content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="regionNaturelle.nom_region_naturelle"
                        color="info"
                        name="nom_region_naturelle"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="
                          clearErrorRegionNaturelles(
                            index,
                            'nom_region_naturelle'
                          )
                        "
                      />
                      <small
                        v-if="
                          errors.RegionNaturelles &&
                          errors.RegionNaturelles[index] &&
                          errors.RegionNaturelles[index].nom_region_naturelle
                        "
                        >{{
                          errors.RegionNaturelles[index].nom_region_naturelle
                        }}</small
                      >
                      <small v-if="resultError['RegionNaturelles']">
                        {{ resultError["RegionNaturelles"] }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1" style="position: relative">
                <button
                  class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2"
                  @click="deleteRowRegionNaturelles(index)"
                  style="
                    position: absolute !important ;
                    top: 12px !important;
                    background: red;
                  "
                >
                  <i class="ti-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
              type="button"
              @click="SubmitNaturelle('modal-center')"
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
      id="naturelle-update"
      ref="naturelle-update"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier une région naturelle</h5>
            <button
              type="button"
              class="btn btn-danger close py-1 px-3"
              data-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.nom_region_naturelle"
                    color="secondary"
                    name="step2.nom_region_naturelle"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step2.nom_region_naturelle.$error">{{
                    v$.step2.nom_region_naturelle.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_region_naturelle']">
                    {{ resultError["nom_region_naturelle"] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
              type="button"
              @click="submitUpdate('naturelle-update')"
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
<<<<<<< HEAD
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
export default {
  components: {
    Pag,
    Loading,
  },
  computed: {
=======
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
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.RegionsNaturelleOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.RegionsNaturelleOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      searchNaturelle: "",
      isModalUpdate: "",
      RegionsNaturelleOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      step2: { nom_region_naturelle: "" },
      v$: useVuelidate(),
      error: "",
      resultError: {},
      errors: { RegionNaturelles: [] },
      RegionNaturelles: [{ nom_region_naturelle: "" }],
    };
  },
  validations: {
    step2: { nom_region_naturelle: { require } },
  },
  async mounted() {
    await this.fetchRegionNaturelle();
  },
  methods: {
    successmsg: successmsg,
    AddformDataRegionNaturelles() {
      this.RegionNaturelles.push({ nom_region_naturelle: "" });
    },
    deleteRowRegionNaturelles(index) {
      if (index !== 0) {
        this.RegionNaturelles.splice(index, 1);
      }
    },
    clearErrorRegionNaturelles(index, field) {
      if (this.errors.RegionNaturelles[index]) {
        this.errors.RegionNaturelles[index][field] = null;
      }
    },
    validateRegionNaturelles() {
      let isValid = true;
      this.errors = { RegionNaturelles: [] };
      this.RegionNaturelles.forEach((regionNaturelle, index) => {
        const regionNaturelleErrors = {};

        if (!regionNaturelle.nom_region_naturelle) {
          regionNaturelleErrors.nom_region_naturelle =
            "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.RegionNaturelles[index] = regionNaturelleErrors;
      });
      return isValid;
    },

    async fetchRegionNaturelle() {
      try {
        const response = await axios.get(
          "/parametrages/localites/region-naturelles",
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.RegionsNaturelleOptions = this.data;
          this.loading = false;
        }
      } catch (error) {
<<<<<<< HEAD
        console.log("errornaturelle", error.response);

        if (error) {
          if (
            error.response.data.detail === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
=======
        this.handleErrors(error);
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
      }
    },
    async SubmitNaturelle(modalId) {
      if (this.validateRegionNaturelles()) {
        console.log("regions", this.RegionNaturelles);
        this.loading = true;
        try {
          const response = await axios.post(
            "/parametrages/localites/region-naturelles",
            this.RegionNaturelles,
            {
              headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
            }
          );
          console.log("qfs", response);

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Création de régions naturelles",
              "Vos régions naturelles ont été créées avec succès !"
            );
            await this.fetchRegionNaturelle();
          } else {
          }
        } catch (error) {
<<<<<<< HEAD
          console.log("erroor", error);

          this.loading = false;
          //   if (error.response.data.status === "error") {
          //     return (this.error = error.response.data.message);
          //   } else {
          //     this.formatValidationErrors(error.response.data.errors);
          //   }
=======
          this.handleErrors(error);
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
        }
      } else {
      }
    },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(
          `/parametrages/localites/region-naturelles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step2.nom_region_naturelle = data.nom_region_naturelle),
            (this.ToId = data.id_region_naturelle);
          this.loading = false;
        }
      } catch (error) {
<<<<<<< HEAD
        if (error) {
          if (
            error.response.data.detail === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
=======
      
        this.handleErrors(error);
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
      }
    },
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          nom_region_naturelle: this.step2.nom_region_naturelle,
        };

        try {
          const response = await axios.put(
            `/parametrages/localites/region-naturelles/${this.ToId}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            }
          );

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Mise à jour de la région naturelle",
              "Votre région naturelle a été mise à jour avec succès !"
            );
            await this.fetchRegionNaturelle();
<<<<<<< HEAD
          }
        } catch (error) {
          if (error) {
            if (
              error.response.data.detail === "Vous n'êtes pas autorisé." ||
              error.response.status === 401
            ) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }
          } else {
            this.formatValidationErrors(error.response.data.errors);
            this.loading = false;
            return false;
          }
        }
      } else {
        this.loading = false;
=======
         
          
        } 
      } catch (error) {
        this.handleErrors(error);
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
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
        const response = await axios.delete(
          `/parametrages/localites/region-naturelles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Suppression de la région naturelle",
            "Votre région naturelle a été supprimée avec succès !"
          );
          await this.fetchRegionNaturelle();
        } else {
          if (error) {
            if (
              error.response.data.detail === "Vous n'êtes pas autorisé." ||
              error.response.status === 401
            ) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/"); //a revoir
            }
          } else {
            this.formatValidationErrors(error.response.data.errors);
            this.loading = false;
            return false;
          }
        }
<<<<<<< HEAD
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);

        //    if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
        //         await this.$store.dispatch('auth/clearMyAuthenticatedUser');
        //       this.$router.push("/");  //a revoir
        //     }
      }
    },
=======
           }
         } catch (error) {
          this.handleErrors(error);
           
         }
   
       },
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
    filterByName() {
      this.currentPage = 1;
      // Vérifier si searchNaturelle est null, vide ou contient uniquement des espaces
      if (this.searchNaturelle && this.searchNaturelle.trim() !== "") {
        const searchValue = this.searchNaturelle.toLowerCase();
        this.CollecteursOptions = this.data.filter((user) => {
          const nom = user.nom_collecteur || "";
          const prenom = user.prenom_collecteur || "";
          return (
            nom.toLowerCase().includes(searchValue) ||
            prenom.toLowerCase().includes(searchValue)
          );
        });
      } else {
        // Réinitialiser la liste si la recherche est vide ou null
        this.CollecteursOptions = [...this.data];
      }
    },

<<<<<<< HEAD
    closeModal(modalId) {
=======
} else {
this.RegionsNaturelleOptions = [...this.data];
 
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
>>>>>>> 58984713d0f775fddc6780afe6364aa18412a3ca
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
      return this.RegionsNaturelleOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped></style>
