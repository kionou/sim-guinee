<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="page-title">Collecteurs</h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"
                  ><i class="mdi mdi-home-outline"></i
                ></router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page">
                Collecteurs
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des collecteurs</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
                      <div class="input-group">
                        <input
                          type="search"
                          class="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          v-model="searchQuery"
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
                  <th>Noms & Prénoms</th>
                  <th>Adresses</th>
                  <th>Contacts</th>
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
                  <td>
                    {{ data.nom_collecteur }} {{ data.prenom_collecteur }}
                  </td>
                  <td style="width: 180px">{{ data.adresse }}</td>
                  <td style="width: 150px">{{ data.telephone_collecteur }}</td>

                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="
                          HandleIdUpdate(data.id_collecteur);
                          dataEdit = true;
                        "
                        data-original-title="Update"
                        data-toggle="modal"
                        data-target="#modal-center"
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="
                          HandleIdDelete(
                            data.id_collecteur,
                            data.code_collecteur
                          )
                        "
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
      class="modal center-modal fade custom-modal"
      id="modal-center"
      ref="modal-center"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ dataEdit ? "Modifier collecteur" : "Ajouter collecteur" }}
            </h5>

            <button
              class="btn btn-danger close py-1 px-3"
              data-dismiss="modal"
              @click="fermer()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <!-- Première ligne de deux inputs -->
              <div class="col-md-6">
                <label for="code_collecteur">
                  Code collecteur<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.code_collecteur"
                  color="secondary"
                  name="step1.code_collecteur"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <label for="nom_collecteur">
                  Nom <span class="text-danger">*</span>
                </label>
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
              <!-- Deuxième ligne de deux inputs -->
              <div class="col-md-6 mt-3">
                <label for="prenom_collecteur">
                  Prénom<span class="text-danger">*</span>
                </label>
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
              <div class="col-md-6 mt-3">
                <label for="adresse">
                  Adresse <span class="text-danger">*</span>
                </label>
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
              <!-- Troisième ligne de deux inputs -->
              <div class="col-md-6 mt-3">
                <label for="telephone_collecteur">
                  Contact <span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.telephone_collecteur"
                  color="secondary"
                  name="step1.telephone_collecteur"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
                <small v-if="v$.step1.telephone_collecteur.$error">{{
                  v$.step1.telephone_collecteur.$errors[0].$message
                }}</small>
                <small v-if="resultError['telephone_collecteur']">
                  {{ resultError["telephone_collecteur"] }}
                </small>
              </div>

              <!-- Quatrième ligne de deux inputs -->
              <div class="col-md-6 mt-3">
                <label for="whatsapp_collecteur">
                  Whatsapp<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.whatsapp_collecteur"
                  color="secondary"
                  name="step1.whatsapp_collecteur"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
              <div class="col-md-6 mt-3">
                <label for="commune_collecteur">
                  Commune<span class="text-danger">*</span>
                </label>
                <select
                  v-model="step1.commune_collecteur"
                  class="form-control form-control-sm"
                  id="commune_collecteur"
                  name="commune_collecteur"
                >
                  <option value="" disabled selected>
                    Sélectionnez une commune
                  </option>
                  <option
                    v-for="commune in CommunesOptions"
                    :key="commune.id"
                    :value="commune.id_commune"
                  >
                    {{ commune.nom_commune }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 mt-3">
                <label for="sexe_collecteur">
                  Sexe<span class="text-danger">*</span>
                </label>
                <select
                  v-model="step1.sexe_collecteur"
                  class="form-control form-control-sm"
                  id="sexe_collecteur"
                  name="sexe_collecteur"
                  size="sm"
                  rounded-size="sm"
                >
                  <option value="" disabled selected>
                    Sélectionnez un sexe
                  </option>
                  <option value="FEMININ">FEMININ</option>
                  <option value="MASCULIN">MASCULIN</option>
                </select>
              </div>
              <div class="col-md-6 mt-3">
                <label for="relai">
                  Relai<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.relai"
                  color="secondary"
                  name="step1.relai"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
              <!-- Cinquième ligne avec un seul input -->
              <div class="col-md-6 mt-3">
                <label for="description">
                  Description<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.description"
                  color="secondary"
                  name="step1.description"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="modal-footer modal-footer-uniform text-end">
            <button
              type="button"
              @click="performAction()"
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
export default {
  components: {
    Pag,
    Loading,
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
    // filteredList() {
    //   if (!this.searchQuery) {
    //     return this.paginatedItems();
    //   } else {
    //     return this.paginatedItems().filter((item) =>
    //       item.nom_region_naturelle
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase())
    //     );
    //   }
    // },
  },
  data() {
    return {
      loading: true,
      CollecteursOptions: [],
      CommunesOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      dataEdit: false,
      searchQuery: "",
      totalPageArray: [],
      step1: {
        nom_collecteur: "",
        prenom_collecteur: "",
        adresse: "",
        telephone_collecteur: "",
        code_collecteur: "",
        sexe_collecteur: "",
        whatsapp_collecteur: "",
        commune_collecteur: 0,
        relai: "",
        description: "",
      },
      //   step2: { nom_region_naturelle: "" },
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      nom_collecteur: { require },
      prenom_collecteur: { require },
      adresse: { require },
      telephone_collecteur: { require },
    },
    step2: { nom_region_naturelle: { require } },
  },
  async mounted() {
    await this.fetchCollecteurs();
    await this.fetchCommunes();
  },
  methods: {
    successmsg: successmsg,

    async fetchCollecteurs() {
      try {
        const response = await axios.get("parametrages/collecteurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.CollecteursOptions = this.data;
          this.loading = false;
        }
      } catch (error) {
        if (error.response.data.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
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
    },
    async fetchCommunes() {
      try {
        const response = await axios.get("parametrages/localites/communes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.CommunesOptions = this.data;
          this.loading = false;
        }
      } catch (error) {
        if (error.response.data.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
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
    },
    async SubmitCollecteur(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          nom_collecteur: this.step1.nom_collecteur,
          prenom_collecteur: this.step1.prenom_collecteur,
          adresse: this.step1.adresse,
          telephone_collecteur: this.step1.telephone_collecteur,
          code_collecteur: this.step1.code_collecteur,
          sexe_collecteur: this.step1.sexe_collecteur,
          whatsapp_collecteur: this.step1.whatsapp_collecteur,
          relai: this.step1.relai,
          description: this.step1.description,
          commune_collecteur: this.step1.commune_collecteur,
        };
        console.log("qfs", data);

        try {
          const response = await axios.post("parametrages/collecteurs", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });
          console.log("qfs", response);

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Ajout de collecteurs",
              "Le collecteur a été ajouté avec succès !"
            );
            await this.fetchCollecteurs();
            this.fermer();
          } else {
          }
        } catch (error) {
          console.log("erroor", error);

          this.loading = false;
          //   if (error.response.data.status === "error") {
          //     return (this.error = error.response.data.message);
          //   } else {
          //     this.formatValidationErrors(error.response.data.errors);
          //   }
        }
      } else {
      }
    },

    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(`parametrages/collecteurs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step1.nom_collecteur = data.nom_collecteur),
            (this.step1.prenom_collecteur = data.prenom_collecteur),
            (this.step1.adresse = data.adresse),
            (this.step1.telephone_collecteur = data.telephone_collecteur),
            (this.step1.code_collecteur = data.code_collecteur),
            (this.step1.sexe_collecteur = data.sexe_collecteur),
            (this.step1.whatsapp_collecteur = data.whatsapp_collecteur),
            (this.step1.relai = data.relai),
            (this.step1.description = data.description),
            (this.step1.commune_collecteur = data.commune_collecteur),
            (this.ToId = data.id_collecteur);
          this.loading = false;
        }
      } catch (error) {
        // if (error.response.data.status === "error") {
        //   if (
        //     error.response.data.message === "Vous n'êtes pas autorisé." ||
        //     error.response.status === 401
        //   ) {
        //     await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        //     this.$router.push("/"); //a revoir
        //   }
        // } else {
        //   this.formatValidationErrors(error.response.data.errors);
        //   this.loading = false;
        //   return false;
        // }
      }
    },
    async submitUpdate(modalId) {
      this.v$.step1.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          nom_collecteur: this.step1.nom_collecteur,
          prenom_collecteur: this.step1.prenom_collecteur,
          adresse: this.step1.adresse,
          telephone_collecteur: this.step1.telephone_collecteur,
          code_collecteur: this.step1.code_collecteur,
          sexe_collecteur: this.step1.sexe_collecteur,
          whatsapp_collecteur: this.step1.whatsapp_collecteur,
          relai: this.step1.relai,
          description: this.step1.description,
          commune_collecteur: this.step1.commune_collecteur,
        };

        try {
          const response = await axios.put(
            `parametrages/collecteurs/${this.ToId}`,
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
              "Données du collecteur mises à jour",
              "Les données du collecteur ont été mises à jour avec succès !"
            );
            await this.fetchCollecteurs();
            this.fermer();
          }
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);

          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          } else {
            this.formatValidationErrors(error.response.data.errors);
            this.loading = false;
          }
        }
      } else {
        this.loading = false;
      }
    },
    performAction() {
      if (this.dataEdit) {
        this.submitUpdate("modal-center");
      } else {
        this.SubmitCollecteur("modal-center");
      }
    },
    fermer() {
      this.step1.nom_collecteur = "";
      this.step1.prenom_collecteur = "";
      this.step1.adresse = "";
      this.step1.telephone_collecteur = "";
      this.dataEdit = false;
      this.step1.commune_collecteur = "";
      this.step1.sexe_collecteur = "";
      this.step1.whatsapp_collecteur = "";
      this.step1.relai = "";
      this.step1.description = "";
      this.step1.commune_collecteur = "";
    },
    async HandleIdDelete(id, code) {
      console.log(id);
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
        this.ConfirmeDelete(id, code);
      }
    },
    async ConfirmeDelete(id, code) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(
          `/parametrages/collecteurs/${code}?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Suppression de collecteur",
            "Le collecteur a été supprimés avec succès !"
          );
          await this.fetchCollecteurs();
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);

        //    if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
        //         await this.$store.dispatch('auth/clearMyAuthenticatedUser');
        //       this.$router.push("/");  //a revoir
        //     }
      }
    },
    filterByName() {
      this.currentPage = 1;
      if (this.control.name !== null) {
        const tt = this.control.name;
        const searchValue = tt.toLowerCase();
        this.ClientOptions = this.data.filter((user) => {
          const Nom = user.duty_name || "";
          const Descriptions = user.descriptions || "";

          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.ClientOptions = [...this.data];
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
};
</script>
<style lang="css" scoped>
.custom-modal .modal-dialog {
  max-width: 60%; /* Ajustez la largeur comme nécessaire */
}
</style>
