<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="page-title">Marchés</h3>
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
                Marchés
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
          <h3 class="box-title mb-0">Liste des marchés</h3>
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
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Superficie</th>
                  <th>Commune</th>
                  <th>Collecteur</th>
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
                  <td>{{ data.nom_marche }}</td>
                  <td style="width: 150px">
                    {{ returnType(data.type_marche) }}
                  </td>
                  <td style="width: 180px">{{ data.superficie }}</td>
                  <td style="width: 150px">
                    {{ searchCommune(data.commune) }}
                  </td>
                  <td style="width: 150px">
                    {{ searchCollecteur(data.id_marche) }}
                  </td>

                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="
                          HandleIdUpdate(data.code_marche);
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
                        @click="HandleIdDelete(data.code_marche)"
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
              {{ dataEdit ? "Modifier marché" : "Ajouter marché" }}
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
                <label for="code_marche">
                  Code marché<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.code_marche"
                  color="secondary"
                  name="step1.code_marche"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <label for="nom_marche">
                  Nom <span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.nom_marche"
                  color="secondary"
                  name="step1.nom_marche"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
                <small v-if="v$.step1.nom_marche.$error">{{
                  v$.step1.nom_marche.$errors[0].$message
                }}</small>
                <small v-if="resultError['nom_marche']">
                  {{ resultError["nom_marche"] }}
                </small>
              </div>
              <!-- Deuxième ligne de deux inputs -->
              <div class="col-md-6 mt-3">
                <label for="type_marche">
                  Type de marché <span class="text-danger">*</span>
                </label>
                <select
                  v-model="step1.type_marche"
                  class="form-control form-control-sm"
                  id="type_marche"
                  name="type_marche"
                  size="sm"
                  rounded-size="sm"
                >
                  <option value="" disabled selected>
                    Sélectionnez un type marché
                  </option>
                  <option value="1">Marché de collecte</option>
                  <option value="2">Marché de consommation</option>
                  <option value="3">Marché de grossiste</option>
                  <option value="4">Marché de détail</option>
                </select>
              </div>
              <div class="col-md-6 mt-3">
                <label for="superficie">
                  Superficie <span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.superficie"
                  color="secondary"
                  name="step1.superficie"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
                <small v-if="v$.step1.superficie.$error">{{
                  v$.step1.superficie.$errors[0].$message
                }}</small>
                <small v-if="resultError['superficie']">
                  {{ resultError["superficie"] }}
                </small>
              </div>
              <!-- Quatrième ligne de deux inputs -->

              <div class="col-md-6 mt-3">
                <label for="longitude">
                  Longitude<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.longitude"
                  color="secondary"
                  name="step1.longitude"
                  size="sm"
                  rounded-size="sm"
                  type="text"
                />
              </div>
              <div class="col-md-6 mt-3">
                <label for="latitude">
                  Latitude<span class="text-danger">*</span>
                </label>
                <MazInput
                  v-model="step1.latitude"
                  color="secondary"
                  name="step1.latitude"
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
                  v-model="step1.commune"
                  class="form-control form-control-sm"
                  id="commune"
                  name="commune"
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
                <label for="commune_collecteur">
                  Collecteur<span class="text-danger">*</span>
                </label>
                <select
                  v-model="step1.collecteur"
                  class="form-control form-control-sm"
                  id="collecteur"
                  name="collecteur"
                >
                  <option value="" disabled selected>
                    Sélectionnez un collecteur
                  </option>
                  <option
                    v-for="collecteur in CollecteursOptions"
                    :key="collecteur.id"
                    :value="collecteur.id_collecteur"
                  >
                    {{ collecteur.nom_collecteur }}
                    {{ collecteur.prenom_collecteur }}
                  </option>
                </select>
              </div>
              <div class="col-md-12 mt-3">
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
      return Math.ceil(this.MarchesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MarchesOptions.slice(startIndex, endIndex);
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
      MarchesOptions: [],
      CommunesOptions: [],
      CollecteursOptions: [],
      data: [],
      dataCo: [],
      dataCol: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      dataEdit: false,
      searchQuery: "",
      totalPageArray: [],
      searchNaturelle: "",
      step1: {
        nom_marche: "",
        type_marche: "",
        superficie: "",
        commune: "",
        code_marche: "",
        description: "",
        longitude: "",
        latitude: "",
        collecteur: "",
      },
      //   step2: { nom_region_naturelle: "" },
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      nom_marche: { require },
      type_marche: { require },
      superficie: { require },
      commune: { require },
    },
    step2: { nom_region_naturelle: { require } },
  },
  async mounted() {
    await this.fecthMarches();
    await this.fetchCommunes();
    await this.fetchCollecteurs();
  },
  methods: {
    successmsg: successmsg,

    async fecthMarches() {
      try {
        const response = await axios.get("parametrages/marches", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.MarchesOptions = this.data;
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
          this.dataCo = response.data;
          this.CommunesOptions = this.dataCo;
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
    async fetchCollecteurs() {
      try {
        const response = await axios.get("parametrages/collecteurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.dataCol = response.data;
          this.CollecteursOptions = this.dataCol;
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
    async SubmitMarche(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          nom_marche: this.step1.nom_marche,
          type_marche: this.step1.type_marche,
          superficie: this.step1.superficie,
          commune: this.step1.commune,
          code_marche: this.step1.code_marche,
          latitude: this.step1.latitude,
          longitude: this.step1.longitude,
          description: this.step1.description,
          collecteur: this.step1.collecteur,
        };
        console.log("qfs", data);

        try {
          const response = await axios.post("parametrages/marches", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });
          console.log("qfs", response);

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Ajout de marché",
              "Le marché a été ajouté avec succès !"
            );
            await this.fecthMarches();
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
        const response = await axios.get(`parametrages/marches/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step1.nom_marche = data.nom_marche),
            (this.step1.type_marche = data.type_marche),
            (this.step1.superficie = data.superficie),
            (this.step1.commune = data.commune),
            (this.step1.code_marche = data.code_marche),
            (this.step1.latitude = data.latitude),
            (this.step1.longitude = data.longitude),
            (this.step1.description = data.description),
            (this.step1.collecteur = data.collecteur),
            (this.ToId = data.code_marche);
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
          nom_marche: this.step1.nom_marche,
          type_marche: this.step1.type_marche,
          superficie: this.step1.superficie,
          commune: this.step1.commune,
          code_marche: this.step1.code_marche,
          latitude: this.step1.latitude,
          longitude: this.step1.longitude,
          description: this.step1.description,
          collecteur: this.step1.collecteur,
        };

        try {
          const response = await axios.put(
            `parametrages/marches/${this.ToId}`,
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
              "Données du marché mises à jour",
              "Les données du marché ont été mises à jour avec succès !"
            );
            await this.fecthMarches();
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
        this.SubmitMarche("modal-center");
      }
    },
    fermer() {
      this.step1.nom_marche = "";
      this.step1.type_marche = "";
      this.step1.superficie = "";
      this.step1.commune = "";
      this.dataEdit = false;
      this.step1.code_marche = "";
      this.step1.latitude = "";
      this.step1.longitude = "";
      this.step1.description = "";
      this.step1.collecteur = "";
    },
    searchCommune(id) {
      for (let commune of this.CommunesOptions) {
        if (commune.id_commune === id) {
          return commune.nom_commune;
        }
      }
      return "-";
    },
    searchCollecteur(id) {
      const marche = this.MarchesOptions.find((item) => item.id_marche === id);

      if (marche && marche.collecteur_relation) {
        return marche.collecteur_relation.nom_collecteur;
      }
      return "-";
    },
    returnType(num) {
      if (num == 1) {
        return "Marché de collecte";
      } else if (num == 2) {
        return "Marché de consommation";
      } else if (num == 3) {
        return "Marché de grossiste";
      } else if (num == 4) {
        return "Marché de détail";
      }
    },
    async HandleIdDelete(id) {
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
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`parametrages/marches/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Suppression de marché",
            "Le marché a été supprimés avec succès !"
          );
          await this.fecthMarches();
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
      console.log(this.MarchesOptions);
      if (this.searchNaturelle && this.searchNaturelle.trim() !== "") {
        const searchValue = this.searchNaturelle.toLowerCase();
        this.MarchesOptions = this.data.filter((user) => {
          const nom = user.nom_marche || "";
          return nom.toLowerCase().includes(searchValue);
        });
      } else {
        // Réinitialiser la liste si la recherche est vide ou null
        this.MarchesOptions = [...this.data];
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
      return this.MarchesOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped>
.custom-modal .modal-dialog {
  max-width: 60%; /* Ajustez la largeur comme nécessaire */
}
</style>
