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
                        <input
                          type="search"
                          class="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
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
                  class="waves-effect waves-circle btn btn-circle btn-secondary mb-5"
                  data-toggle="modal"
                  data-target="#modal-center"
                  @click="stepModal = 'add'"
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
                  <th>Code</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Collecteur</th>
                  <th>Commune</th>
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
                <tr v-for="(data, index) in paginatedItems" :key="data.id_debarcadere">
                  <td style="width: 50px" class="text-center">
                    {{ index + 1 }}
                  </td>
                  <td>{{ data.code_debarcadere }}</td>
                  <td>{{ data.nom_debarcadere }}</td>
                  <td>{{ data.description }}</td>
                  <td>{{ data.collecteur_relation.nom_collecteur }}</td>
                  <td>{{ data.commune_relation.nom_commune }}</td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.code_debarcadere)"
                        data-original-title="Update"
                        data-toggle="modal"
                        data-target="#modal-center"
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
      id="modal-center"
      ref="modal-center"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ stepModal === "add" ? "Ajouter" : "Modifier" }} un debarcadère
            </h5>
            <button type="button" class="close" data-dismiss="modal">
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
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Description <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.description"
                    color="secondary"
                    name="step1.description"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.description.$error">{{
                    v$.step1.description.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['description']">
                    {{ resultError["description"] }}
                  </small>
                </div>
              </div>

              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Commune <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="step1.commune"
                    class="form-select"
                    name="step1.commune"
                  >
                    <option value="" disabled>Sélectionnez une commune</option>
                    <option
                      v-for="commune in dataCommunes"
                      :key="commune.id_commune"
                      :value="commune.id_commune"
                    >
                      {{ commune.nom_commune }}
                    </option>
                  </select>
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
                    Collecteur <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="step1.collecteur"
                    class="form-select"
                    name="step1.collecteur"
                  >
                    <option value="" disabled>Sélectionnez un collecteur</option>
                    <option
                      v-for="collecteur in dataCollecteurs"
                      :key="collecteur.id_collecteur"
                      :value="collecteur.id_collecteur"
                    >
                      {{ collecteur.nom_collecteur }}
                    </option>
                  </select>
                  <small v-if="v$.step1.collecteur.$error">{{
                    v$.step1.collecteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="row justify-content-center mt-10">
              <div class="col-4">
                <button
                  type="button"
                  @click="SubmitDebarcaderes('modal-center')"
                  class="waves-effect waves-light btn btn-secondary"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Fermer
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
      dataCommunes: [],
      dataCollecteurs: [],
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
      },
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
        const response = await axios.get("/debarcaderes", {
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
        const response = await axios.get("/localites/communes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.dataCommunes = response.data;
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
        const response = await axios.get("/collecteurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.dataCollecteurs = response.data;
          console.log("data_coll", this.dataCollecteurs);
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
    async SubmitDebarcaderes() {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
          code_debarcadere: this.step1.code_debarcadere,
          nom_debarcadere: this.step1.nom_debarcadere,
          description: this.step1.description,
          collecteur: this.step1.collecteur,
          commune: this.step1.commune,
          type:true
        };
        let url;
        let title = "";   
        let message = "";
        if (this.stepModal === "add") {
          url = await axios.post("/debarcaderes", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
            });
            title = "Création de debarcadère";  
          message = "Votre debarcadère a été crée avec succès !";
        } else {
          url = await axios.put(`/debarcaderes/${this.ToId}`, data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });
          title = "Mise à jour de debarcadère";     
          message = "Les données du debarcadère ont été mises à jour avec succès !";
        }

        try {
          const response = url;
          console.log("qfs", response);

          if (response.status === 200) {
            this.closeModal("modal-center");
            this.successmsg(
              title,
              message
            );
            await this.fetchDebarcaderes();
          } else {
            this.loading = false;
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
      this.stepModal = "update";
      this.loading = true;

      try {
        const response = await axios.get(`/debarcaderes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step1.code_debarcadere = data.code_debarcadere),
            (this.step1.nom_debarcadere = data.nom_debarcadere),
            (this.step1.description = data.description),
            (this.step1.commune = data.commune),
            (this.step1.collecteur = data.collecteur),
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
        };

        try {
          const response = await axios.put(`/debarcaderes/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Données du financement mises à jour",
              "Les données du financement ont été mises à jour avec succès !"
            );
            await this.fetchDebarcaderes();
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
        const response = await axios.delete(`/debarcaderes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données du debarcadère supprimées",
            "Les données du debarcadère ont été supprimées avec succès !"
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
      return this.DebarcaderesOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped></style>
