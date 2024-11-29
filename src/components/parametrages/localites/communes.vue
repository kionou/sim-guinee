<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0">Liste des Communes </h3>
          <div class="navbar-custom-menu r-side  float-right">
            <ul class="nav navbar-nav justify-content-end">
  
              <li class="btn-group d-lg-inline-flex h-40">
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
                @click="openModal('add-commune')"  ><i class="mdi mdi-plus"></i></button>
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
                        @click="HandleIdUpdate(data.code_commune ,'update-commune')" 
                        ><i class="ti-marker-alt"></i></a>
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
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('add-commune')"  >
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
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('update-commune')" >
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
              class="waves-effect waves-light btn btn-primary ">Valider</button>
  
  
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
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
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
      itemsPerPage: 20,
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
        const response = await axios.get('/parametrages/localites/prefectures',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

     
        if (response.status === 200) {
          response.data.map(item => this.PrefecturesOptions.push({

            label: item.nom_prefecture,
            value: item.id_prefecture
          }))

          this.loading = false
        }
      } catch (error) {

        this.handleErrorsGet(error);
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
          this.$emit('commune-count', this.data.length)
          this.loading = false
        }
      } catch (error) {

        this.handleErrorsGet(error);
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
        


          if (response.status === 200) {
      this.Communes = [{ code_commune: "", nom_commune: "", abrege_commune: "", prefecture: "", }];

            this.closeModal(modalId);
            this.successmsg(
              "Création de communes",
              "Vos communes ont été créées avec succès !"
            );


            await this.fetchCommunes();
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }
      } else {

      }
    },
    async HandleIdUpdate(id ,modalId) {
      this.openModal(modalId)
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/localites/communes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.status === 200) {
          

          let data = response.data
          let Cprefecture = data?.prefecture
          this.step2 = {
            code_commune: data.code_commune,
            nom_commune: data.nom_commune,
            abrege_commune: data.abrege_commune,
            prefecture: Cprefecture

          }
         

          this.ToId = data.code_commune
          this.loading = false;

        }
      } catch (error) {

        this.handleErrorsGet(error);
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
          this.handleErrors(error);
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
        this.handleErrors(error);

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
      return this.CommunesOptions.slice(startIndex, endIndex);
    },
  },

}
</script>
<style lang="css" scoped>

</style>