<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div
          class="box-header with-border d-flex justify-content-between align-items-center p-3"
        >
          <h3 class="box-title mb-0">Liste des magasins</h3>
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
                  @click="
                    stepModal = 'add';
                    step1;
                  "
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
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Capacité</th>
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
                <tr v-for="(data, index) in paginatedItems" :key="data.id_magasin">
                  <td style="width: 50px" class="text-center">
                    {{ index + 1 }}
                  </td>
                  <td>{{ data.code_magasin }}</td>
                  <td>{{ data.nom_magasin }}</td>
                  <td>{{ data.description }}</td>
                  <td>{{ data.longitude }}</td>
                  <td>{{ data.latitude }}</td>
                  <td>{{ data.capacite }}</td>
                  <td>{{ data.collecteur_relation.nom_collecteur }}</td>
                  <td>{{ data.commune_relation.nom_commune }}</td>
                  <td style="width: 100px">
                    <div class="d-flex justify-content-evenly border-0">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-info btn-xs"
                        title=""
                        @click="HandleIdUpdate(data.code_magasin)"
                        data-original-title="Update"
                        data-toggle="modal"
                        data-target="#modal-center"
                        ><i class="ti-marker-alt"></i
                      ></a>
                      <a
                        href="javascript:void(0)"
                        class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.code_magasin)"
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
              {{ stepModal === "add" ? "Ajouter" : "Modifier" }} un magasin
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
                    v-model="step1.code_magasin"
                    color="secondary"
                    name="step1.code_magasin"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.code_magasin.$error">{{
                    v$.step1.code_magasin.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code_magasin']">
                    {{ resultError["code_magasin"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Nom <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.nom_magasin"
                    color="secondary"
                    name="step1.nom_magasin"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.nom_magasin.$error">{{
                    v$.step1.nom_magasin.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['nom_magasin']">
                    {{ resultError["nom_magasin"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
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
                    Capacité <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.capacite"
                    color="secondary"
                    name="step1.capacite"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.capacite.$error">{{
                    v$.step1.capacite.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['capacite']">
                    {{ resultError["capacite"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Longitude <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.longitude"
                    color="secondary"
                    name="step1.longitude"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.longitude.$error">{{
                    v$.step1.longitude.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['longitude']">
                    {{ resultError["longitude"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Latitude <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.latitude"
                    color="secondary"
                    name="step1.latitude"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.latitude.$error">{{
                    v$.step1.latitude.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['latitude']">
                    {{ resultError["latitude"] }}
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
              <!-- <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Collecteur <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step1.collecteur"
                    color="secondary"
                    name="step1.collecteur"
                    size="sm"
                    rounded-size="sm"
                    type="text"
                  />
                  <small v-if="v$.step1.collecteur.$error">{{
                    v$.step1.collecteur.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div> -->
            </div>
            <div class="row justify-content-center mt-10">
              <div class="col-4">
                <button
                  type="button"
                  @click="SubmitMagasins('modal-center')"
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
      MagasinsOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      stepModal: "add",
      dataCommunes: [],
      dataCollecteurs: [],
      totalPageArray: [],
      step1: {
        code_magasin: "",
        nom_magasin: "",
        longitude: "",
        latitude: "",
        capacite: "",
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
      code_magasin: { require },
      nom_magasin: { require },
      longitude: { require },
      latitude: { require },
      capacite: { require },
      description: { require },
      collecteur: { require },
      commune: { require },
    },
  },
  async mounted() {
    await this.fetchMagasins();
    await this.fetchCommunes();
    await this.fetchCollecteurs();
  },
  methods: {
    successmsg: successmsg,
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
    async fetchMagasins() {
      try {
        const response = await axios.get("/magasins", {
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
    async SubmitMagasins() {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
          code_magasin: this.step1.code_magasin,
          nom_magasin: this.step1.nom_magasin,
          latitude: this.step1.latitude,
          longitude: this.step1.longitude,
          capacite: this.step1.capacite,
          description: this.step1.description,
          collecteur: this.step1.collecteur,
          commune: this.step1.commune,
        };
        console.log("qfs", data);
        let url;
        let title = "";
        let message = "";
        if (this.stepModal === "add") {
          url = await axios.post("/magasins", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });
        title = "Création de magasin";
          message = "Votre magasin a été crée avec succès !";
        } else {
          url = await axios.put(`/magasins/${this.ToId}`, data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });
          title = "Mise à jour de magasin";
          message = "Les données du magasin ont été mises à jour avec succès !";
        }
        console.log("url", url);
        try {
          const response = url;
          console.log("qfs", response);

          if (response.status === 200) {
            this.closeModal("modal-center");
            this.successmsg(title, message);
            await this.fetchMagasins();
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
        const response = await axios.get(`/magasins/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step1.code_magasin = data.code_magasin),
            (this.step1.nom_magasin = data.nom_magasin),
            (this.step1.description = data.description),
            (this.step1.longitude = data.longitude),
            (this.step1.latitude = data.latitude),
            (this.step1.capacite = data.capacite),
            (this.step1.commune = data.commune),
            (this.step1.collecteur = data.collecteur),
            (this.ToId = data.code_magasin);
          this.loading = false;
        }
      } catch (error) {}
    },
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          code_magasin: this.step2.code_magasin,
          nom_magasin: this.step2.nom_magasin,
          latitude: this.step2.latitude,
          longitude: this.step2.longitude,
          capacite: this.step2.capacite,
          description: this.step2.description,
          collecteur: this.step2.collecteur,
          commune: this.step2.commune,
        };

        try {
          const response = await axios.put(`/magasins/${this.ToId}`, data, {
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
            await this.fetchMagasins();
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
        const response = await axios.delete(`/magasins/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données du magasin supprimées",
            "Les données du magasin ont été supprimées avec succès !"
          );
          await this.fetchMagasins();
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
      return this.MagasinsOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped></style>
