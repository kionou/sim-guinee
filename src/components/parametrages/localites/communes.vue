<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0">Liste des Communes </h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
  
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchCommune" @input="filterByName">
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
                  data-toggle="modal" data-target="#add-commune"><i class="mdi mdi-plus"></i></button>
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
  
                  <th>Code</th>
                  <th>Abréviation</th>
                  <th>Commune</th>
                  <th>Préfecture</th>
                  <th>Région</th>
                  <th>Région naturelle</th>
                  <th>Action</th>
  
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
                <tr v-for="(data )  in paginatedItems" :key="data.id">
                  <td style="width: 50px;" class="text-center">
                    {{ data.code_commune }}
                  </td>
                  <td style="width: 120px;">{{ data.abrege_commune }}</td>
                  <td>{{ data.nom_commune }}</td>
                  <td>{{ data.prefecture_?.nom_prefecture ?? "-" }}</td>
                  <td>{{ data.prefecture_?.region_relation?.nom_region ?? "-" }}</td>
                  <td>{{ data.prefecture_?.region_relation?.region_naturelle_relation?.nom_region_naturelle ?? "-" }}</td>
  
                  <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                      <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title=""
                        @click="HandleIdUpdate(data.code_commune)" data-original-title="Update" data-toggle="modal"
                        data-target="#update-commune"><i class="ti-marker-alt"></i></a>
                      <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.code_commune)" title="" data-toggle="tooltip"
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
  
    <div class="modal center-modal fade" id="add-commune" ref="add-commune" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter des communes </h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
            <div class="bouttons" style="position: relative ; width: 100%; ">
              <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000"
                @click="AddformDataCommunes"><i class="ti-plus"></i></div>
            </div>
            <!-- </div>  -->
            <div class="row align-items-center p-2  border-bottom " v-for="(commune, index) in Communes"
              :key="commune.id">
              <div class="col-11">
                <span class="nombre">
                  {{index + 1}}
                </span>
                <div class="row  content-group">
  
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Code <span class="text-danger">*</span></label>
                      <MazInput v-model="commune.code_commune" color="info" name="code_commune" size="sm"
                        rounded-size="sm" type="text" @input="clearErrorCommunes(index, 'code_commune')" />
                      <small v-if="errors.Communes && errors.Communes[index] && errors.Communes[index].code_commune">{{
                        errors.Communes[index].code_commune }}</small>
                      <small v-if="resultError['Communes']"> {{ resultError["Communes"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Abréviation <span class="text-danger">*</span></label>
                      <MazInput v-model="commune.abrege_commune" color="info" name="abrege_commune" size="sm"
                        rounded-size="sm" type="text" @input="clearErrorCommunes(index, 'abrege_commune')" />
                      <small v-if="errors.Communes && errors.Communes[index] && errors.Communes[index].abrege_commune">{{
                        errors.Communes[index].abrege_commune }}</small>
                      <small v-if="resultError['Communes']"> {{ resultError["Communes"] }} </small>
                    </div>
                  </div>
  
  
  
                </div>
                <div class="row  content-group">
  
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Nom <span class="text-danger">*</span></label>
                      <MazInput v-model="commune.nom_commune" color="info" name="nom_commune" size="sm" rounded-size="sm"
                        type="text" @input="clearErrorCommunes(index, 'nom_commune')" />
                      <small v-if="errors.Communes && errors.Communes[index] && errors.Communes[index].nom_commune">{{
                        errors.Communes[index].nom_commune }}</small>
                      <small v-if="resultError['Communes']"> {{ resultError["Communes"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Préfecture <span class="text-danger">*</span></label>
                      <MazSelect v-model="commune.prefecture" color="info" name="prefecture" size="sm" rounded-size="sm"
                        search :options="PrefecturesOptions" @click="clearErrorCommunes(index, 'prefecture')" />
                      <small v-if="errors.Communes && errors.Communes[index] && errors.Communes[index].prefecture">{{
                        errors.Communes[index].prefecture }}</small>
                      <small v-if="resultError['Communes']"> {{ resultError["Communes"] }} </small>
                    </div>
                  </div>
  
  
  
                </div>
              </div>
              <div class="col-1" style="position: relative">
  
                <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowCommunes(index)"
                  style=" position:absolute !important ; top: 12px !important; background:red;">
                  <i class="ti-trash"></i>
                </button>
              </div>
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" @click="SubmitCommune('add-commune')"
              class="waves-effect waves-light btn btn-primary ">Valider</button>
          </div>
        </div>
      </div>
    </div>
  
  
    <div class="modal center-modal fade" id="update-commune" ref="update-commune" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier une préfecture</h5>
            <button type="button" class="btn btn-danger close py-1 px-3" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Code <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.code_commune" color="secondary" name="step2.code_commune" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.code_commune.$error">{{
                    v$.step2.code_commune.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['code_commune']">
                    {{ resultError["code_commune"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Abréviation <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.abrege_commune" color="secondary" name="step2.abrege_commune" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.abrege_commune.$error">{{
                    v$.step2.abrege_commune.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['abrege_commune']">
                    {{ resultError["abrege_commune"] }}
                  </small>
                </div>
              </div>
  
            </div>
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Nom <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.nom_commune" color="secondary" name="step2.nom_commune" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.nom_commune.$error">{{
                    v$.step2.nom_commune.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['nom_commune']">
                    {{ resultError["nom_commune"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Préfecture <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.prefecture" color="secondary" name="step2.prefecture" size="sm"
                    rounded-size="sm" search :options="PrefecturesOptions" />
                  <small v-if="v$.step2.prefecture.$error">{{
                    v$.step2.prefecture.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['prefecture']">
                    {{ resultError["prefecture"] }}
                  </small>
                </div>
              </div>
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" @click="submitUpdate('update-commune')"
              class="waves-effect waves-light btn btn-secondary ">Valider</button>
  
  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
export default {
  components: {
    Pag, Loading
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.CommunesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.CommunesOptions.slice(startIndex, endIndex);
    },

  },
  data() {
    return {
      loading: true,
      searchCommune: "",
      isModalUpdate: "",
      PrefecturesOptions: [],
      CommunesOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      v$: useVuelidate(),
      error: "",
      resultError: {},
      errors: { Communes: [], },
      Communes: [{
        code_commune: "",
        nom_commune: "",
        abrege_commune: "",
        prefecture: "",
      }
      ],
      step2: {
        code_commune: "",
        nom_commune: "",
        abrege_commune: "",
        prefecture: "",

      },


    }
  },
  validations: {

    step2: {
      code_commune: { require },
      nom_commune: { require },
      abrege_commune: { require },
      prefecture: { require },
    },
  },
  async mounted() {
    await this.fetchCommunes()
    await this.fetchPrefectures()

  },
  methods: {
    successmsg: successmsg,
    AddformDataCommunes() {
      this.Communes.push({ code_commune: "", nom_commune: "", abrege_commune: "", prefecture: "", });
    },
    deleteRowCommunes(index) {

      if (index !== 0) {
        this.Communes.splice(index, 1);
      }
    },
    clearErrorCommunes(index, field) {
      if (this.errors.Communes[index]) {
        this.errors.Communes[index][field] = null;
      }
    },
    validateCommunes() {
      let isValid = true;
      this.errors = { Communes: [] };
      this.Communes.forEach((commune, index) => {
        const communeErrors = {};

        if (!commune.code_commune) {
          communeErrors.code_commune = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!commune.nom_commune) {
          communeErrors.nom_commune = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!commune.abrege_commune) {
          communeErrors.abrege_commune = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!commune.prefecture) {
          communeErrors.prefecture = 'Ce champs est obligatoire!';
          isValid = false;
        }


        this.errors.Communes[index] = communeErrors;
      });
      return isValid;
    },

    async fetchPrefectures() {
      try {
        const response = await axios.get('/localites/prefectures',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        console.log('responseRegions', response.data)
        if (response.status === 200) {
          response.data.map(item => this.PrefecturesOptions.push({

            label: item.nom_prefecture,
            value: item.id_prefecture
          }))

          this.loading = false
        }
      } catch (error) {

        if (error) {
          if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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
        const response = await axios.get('/parametrages/localites/communes',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        console.log('response', response)
        if (response.status === 200) {
          this.data = response.data;
          this.CommunesOptions = this.data
          this.loading = false
        }
      } catch (error) {

        if (error) {
          if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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
    async SubmitCommune(modalId) {

      if (this.validateCommunes()) {
        console.log('regions', this.Communes)
        this.loading = true;
        try {
          const response = await axios.post("/parametrages/localites/communes", this.Communes, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

            }
          });
          console.log('qfs', response)


          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Création de communes",
              "Vos communes ont été créées avec succès !"
            );


            await this.fetchCommunes();
          } else {
          }
        } catch (error) {
          console.log('erroor', error)


          this.loading = false;
          if (error) {
            if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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

      }
    },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/localites/communes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.status === 200) {
          console.log('Slbvlkjbv', response)

          let data = response.data
          let Cprefecture = data?.prefecture
          this.step2 = {
            code_commune: data.code_commune,
            nom_commune: data.nom_commune,
            abrege_commune: data.abrege_commune,
            prefecture: Cprefecture

          }
          console.log('trest', Cprefecture)

          this.ToId = data.code_commune
          this.loading = false;

        }
      } catch (error) {

        if (error) {
          if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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
    async submitUpdate(modalId) {

      this.v$.step2.$touch();


      if (this.v$.$errors.length == 0) {

        this.loading = true;
        let data = {
          code_commune: this.step2.code_commune,
          nom_commune: this.step2.nom_commune,
          abrege_commune: this.step2.abrege_commune,
          prefecture: this.step2.prefecture,


        }



        try {
          const response = await axios.put(`/parametrages/localites/communes/${this.ToId}`, data, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Mise à jour de la commune",
              "Votre commune a été mise à jour avec succès !"
            );

            await this.fetchCommunes();


          }
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);

          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          else {
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
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      console.log('delete', id)
      this.loading = true

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/parametrages/localites/communes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },

        });

        if (response.status === 200) {
          this.loading = false
          this.successmsg(
            "Suppression de la commune",
            "Votre commune a été supprimée avec succès !"
          );

          await this.fetchCommunes();

        } else {

          this.loading = false
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);

        if (error) {
          if (error.response.data.detail === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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
    filterByName() {
      this.currentPage = 1;
      if (this.searchCommune !== null) {
        const tt = this.searchCommune;
        const searchValue = tt.toLowerCase()
        this.CommunesOptions = this.data.filter(user => {
          const Nom = user.nom_commune || '';
          const Code = user.code_commune || '';
          const Abréviation = user.abrege_commune || '';
          const Commune = user.nom_region_naturelle || '';
          const Préfecture = user.prefecture_?.nom_prefecture || '';
          const Région = user.prefecture_?.region_relation?.nom_region || '';
          const naturelle = user.prefecture_?.region_relation?.region_naturelle_relation?.nom_region_naturelle || '';
          return Nom.toLowerCase().includes(searchValue) || Code.toLowerCase().includes(searchValue) || Abréviation.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) || Préfecture.toLowerCase().includes(searchValue) || Région.toLowerCase().includes(searchValue) || naturelle.toLowerCase().includes(searchValue);
        });

      } else {
        this.CommunesOptions = [...this.data];

      }

    },
    closeModal(modalId) {
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
      return this.CommunesOptions.slice(startIndex, endIndex);
    },
  },

}
</script>
<style lang="css" scoped>

</style>