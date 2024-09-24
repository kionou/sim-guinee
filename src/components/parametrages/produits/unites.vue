<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0">Liste des unités</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
  
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchNaturelle" @input="filterByName">
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
                  @click="openModal('add-unite')"><i class="mdi mdi-plus"></i></button>
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
                  <th>Définition</th>
                  <th>Poids indicatif</th>
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
                <tr v-for="(data , index)  in paginatedItems" :key="data.id">
                  <td style="width: 50px;" class="text-center">
                    {{ index+1 }}
                  </td>
                  <td>
                    <div class="widget-user-image">
                      <div style="cursor: pointer;" data-original-title="picture"
                        @click="handleImageClick(data , 'update-picture-unite')">
                        <img v-if="data?.image === '' || data?.image === null" class="rounded-circle " width="45"
                          src="@/assets/img/logo_mobile.png" alt="Avatar"
                          style="float: left; margin-right: 10px ;  height:45px !important" />
  
                        <img v-else class="rounded-circle " width="45" :src="data?.image" alt="Avatar"
                          style="float: left; margin-right: 10px ; height:45px !important" />
                      </div>
  
  
                      <div style="display: inline-block">
                        <span style="font-weight: 600; font-size: 1.1em; display: block">{{ data.nom_unite }} </span>
                      </div>
                    </div>
                  </td>
                  <td>{{ data?.definition }}</td>
                  <td>{{ data?.poids_indicatif }}</td>
  
                  <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                      <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title=""
                        @click="HandleIdUpdate(data.id_unite , 'update-unite')" data-original-title="Update"><i
                          class="ti-marker-alt"></i></a>
                      <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.id_unite)" title="" data-toggle="tooltip"
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
  
    <div class="modal center-modal fade" id="add-unite" ref="add-unite" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter des Unités</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('add-unite')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
            <div class="bouttons" style="position: relative ; width: 100%; ">
              <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000"
                @click="AddformDataUnites"><i class="ti-plus"></i></div>
            </div>
            <!-- </div>  -->
            <div class="row align-items-center p-2  border-bottom " v-for="(unite, index) in Unites" :key="unite.id">
              <div class="col-11">
                <span class="nombre">
                  {{index + 1}}
                </span>
                <div class="row  content-group">
  
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Nom <span class="text-danger">*</span></label>
                      <MazInput v-model="unite.nom_unite" color="info" name="nom_unite" size="sm" rounded-size="sm"
                        type="text" @input="clearErrorUnites(index, 'nom_unite')" />
                      <small v-if="errors.Unites && errors.Unites[index] && errors.Unites[index].nom_unite">{{
                        errors.Unites[index].nom_unite }}</small>
                      <small v-if="resultError['Unites']"> {{ resultError["Unites"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Définition <span class="text-danger">*</span></label>
                      <MazInput v-model="unite.definition" color="info" name="definition" size="sm" rounded-size="sm"
                        type="text" @input="clearErrorUnites(index, 'definition')" />
                      <small v-if="errors.Unites && errors.Unites[index] && errors.Unites[index].definition">{{
                        errors.Unites[index].definition }}</small>
                      <small v-if="resultError['Unites']"> {{ resultError["Unites"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Poids Indicatif <span class="text-danger">*</span></label>
                      <MazInput v-model="unite.poids_indicatif" color="info" name="poids_indicatif" size="sm"
                        rounded-size="sm" type="text" @input="clearErrorUnites(index, 'poids_indicatif')" />
                      <small v-if="errors.Unites && errors.Unites[index] && errors.Unites[index].poids_indicatif">{{
                        errors.Unites[index].poids_indicatif }}</small>
                      <small v-if="resultError['Unites']"> {{ resultError["Unites"] }} </small>
                    </div>
                  </div>
  
  
  
                </div>
              </div>
              <div class="col-1" style="position: relative">
  
                <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowUnites(index)"
                  style=" position:absolute !important ; top: 12px !important; background:red;">
                  <i class="ti-trash"></i>
                </button>
              </div>
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
  
            <button type="button" @click="SubmitUnite('add-unite')"
              class="waves-effect waves-light btn btn-primary ">Valider</button>
  
  
          </div>
        </div>
      </div>
    </div>
  
  
    <div class="modal center-modal fade" id="update-unite" ref="update-unite" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier une unité</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('update-unite')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
  
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword"> Nom <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.nom_unite" color="secondary" name="step2.nom_unite" size="sm" rounded-size="sm"
                    type="text" />
                  <small v-if="v$.step2.nom_unite.$error">{{
                    v$.step2.nom_unite.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['nom_unite']">
                    {{ resultError["nom_unite"] }}
                  </small>
                </div>
              </div>
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword"> Définition <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.definition" color="secondary" name="step2.definition" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.definition.$error">{{
                    v$.step2.definition.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['definition']">
                    {{ resultError["definition"] }}
                  </small>
                </div>
              </div>
              <div class="col-12">
                <div class="input-groupe">
                  <label for="userpassword"> Poids Indicateur <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.poids_indicatif" color="secondary" name="step2.poids_indicatif" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.poids_indicatif.$error">{{
                    v$.step2.poids_indicatif.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['poids_indicatif']">
                    {{ resultError["poids_indicatif"] }}
                  </small>
                </div>
              </div>
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
  
            <button type="button" @click="submitUpdate('update-unite')"
              class="waves-effect waves-light btn btn-primary ">Valider</button>
  
  
          </div>
        </div>
      </div>
    </div>
  
    <div class="modal center-modal fade" id="update-picture-unite" ref="update-picture-unite" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier l'image de l'unité de mesure
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('update-picture-unite')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-xl-12 col-md-12 col-sm-12">
                <div class="image-container">
                  <div class="image-wrapper">
                    <img :src="selectedImage" alt="Image" class="img-thumbnail mb-2" @click="triggerFileInput">
                    <div class="overlay">
                      <span class="change-text">Changer</span>
                    </div>
                    <input type="file" id="input-file" accept="image/*" @change="handleFileUploadImagesUpdate"
                      class="file-input" ref="fileInput">
                  </div>
                </div>
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
      return Math.ceil(this.UnitesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.UnitesOptions.slice(startIndex, endIndex);
    },

  },
  data() {
    return {
      loading: true,
      searchNaturelle: "",
      isModalUpdate: "",
      UnitesOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      selectedImage: "",
      dataFile: "",
      dataImage: "",
      totalPageArray: [],
      step2: {
        nom_unite: "",
        definition: "",
        poids_indicatif: 0,
      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
      errors: { Unites: [], },
      Unites: [{
        nom_unite: "",
        definition: "",
        poids_indicatif: 0,

      }
      ],

    }
  },
  validations: {

    step2: {
      nom_unite: { require },
      definition: { require },
      poids_indicatif: { require },

    },
  },
  async mounted() {
    await this.fetchUnites()

  },
  methods: {
    successmsg: successmsg,
    AddformDataUnites() {
      this.Unites.push({ nom_unite: "", definition: "", poids_indicatif: 0, });
    },
    deleteRowUnites(index) {

      if (index !== 0) {
        this.Unites.splice(index, 1);
      }
    },
    clearErrorUnites(index, field) {
      if (this.errors.Unites[index]) {
        this.errors.Unites[index][field] = null;
      }
    },
    validateUnites() {
      let isValid = true;
      this.errors = { Unites: [] };
      this.Unites.forEach((unite, index) => {
        const uniteErrors = {};

        if (!unite.nom_unite) {
          uniteErrors.nom_unite = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!unite.definition) {
          uniteErrors.definition = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!unite.poids_indicatif) {
          uniteErrors.poids_indicatif = 'Ce champs est obligatoire!';
          isValid = false;
        }


        this.errors.Unites[index] = uniteErrors;
      });
      return isValid;
    },

    async fetchUnites() {
      try {
        const response = await axios.get('/parametrages/unites',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        console.log('response', response)
        if (response.status === 200) {
          this.data = response.data;
          this.UnitesOptions = this.data
          this.$emit('unite-count', this.data.length)

          this.loading = false
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async SubmitUnite(modalId) {

      if (this.validateUnites()) {
        console.log('regions', this.Unites)
        this.loading = true;
        try {
          const response = await axios.post("/parametrages/unites", this.Unites, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

            }
          });
          console.log('qfs', response)


          if (response.status === 200) {
            this.Unites = [{ nom_unite: "", definition: "", poids_indicatif: 0, }];

            this.closeModal(modalId);
            this.successmsg(
              "Création d'unités",
              "Vos unités ont été créées avec succès !"
            );
            await this.fetchUnites();
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }
      } else {

      }
    },
    async HandleIdUpdate(id, modalId) {
      this.openModal(modalId)
      this.stepModal = "update";
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/unites/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.status === 200) {
          console.log('Slbvlkjbv', response)

          let data = response.data
          this.step2.nom_unite = data.nom_unite,
            this.step2.definition = data.definition,
            this.step2.poids_indicatif = data.poids_indicatif,

            this.ToId = data.id_unite
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
          nom_unite: this.step2.nom_unite,
          definition: this.step2.definition,
          poids_indicatif: this.step2.poids_indicatif,
        }

        try {
          const response = await axios.put(`/parametrages/unites/${this.ToId}`, data, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Mise à jour de l'unité",
              "Votre unité a été mise à jour avec succès !"
            );
            await this.fetchUnites();


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
      this.loading = true

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/parametrages/unites/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },


        });

        if (response.status === 200) {
          this.loading = false
          this.successmsg(
            "Suppression de l'unité",
            "Votre unité a été supprimée avec succès !"
          );
          await this.fetchUnites();

        } else {

          this.handleErrors(error);
        }
      } catch (error) {
        this.handleErrors(error);

      }

    },

    //      handleFileUploadLogo(event , operationType) {
    //   console.log("File input change");
    //   const file = event.target.files[0];
    //   console.log("handleFileUploadLogo Selected file:", file);
    //   console.log('test ima',operationType)
    //    this.submitFile(file , operationType)


    // },
    handleImageClick(data, modalId) {
      this.openModal(modalId)
      this.selectedImage = data.image || '@/assets/img/logo_mobile.png';
      this.dataFile = data
      console.log('Image sélectionnée:', this.dataFile);
      // Vous pouvez ajouter ici d'autres actions à effectuer lors du clic sur l'image
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
        this.submitFile(file, 'update')

      }
    },
    async submitFile(file, operationType) {
      const formData = new FormData();
      formData.append('image', file);


      try {
        const response = await axios.post(`/parametrages/produits/upload/image-produit?type=UNITE`, formData, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Réponse du téléversement :', response);
        if (response.status === 200) {
          if (operationType === 'update') {
            await this.submitUpdateFile(response.data, 'update-picture-unite')
          }

        } else {

        }
      } catch (error) {
        this.handleErrors(error);

      }


    },
  
    async submitUpdateFile(url, modalId) {

      this.loading = true;
      let data = {
        nom_unite: this.dataFile.nom_unite,
        definition: this.dataFile.definition,
        poids_indicatif: this.dataFile.poids_indicatif,
        image: url,
      };
      console.log('data', data)

      try {
        const response = await axios.put(`/parametrages/unites/${this.dataFile.id_unite}`, data, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
             "Mise à jour de l'unité",
              "Votre unité a été mise à jour avec succès !"
          )
          await this.fetchUnites();

        }
      } catch (error) {
        this.handleErrors(error);
      }

    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchNaturelle !== null) {
        const tt = this.searchNaturelle;
        const searchValue = tt.toLowerCase()
        this.UnitesOptions = this.data.filter(user => {
          const Nom = user.nom_unite || '';
          const definition = user.definition || '';
          const poids_indicatif = user.poids_indicatif || '';
          return Nom.toLowerCase().includes(searchValue) ||
            Nom.toLowerCase().includes(searchValue) || definition.toLowerCase().includes(searchValue) || poids_indicatif.toLowerCase().includes(searchValue)
        });

      } else {
        this.UnitesOptions = [...this.data];

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
      return this.UnitesOptions.slice(startIndex, endIndex);
    },
  },

}
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
  border: 3px solid;
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

/* .file-input {
  display: none;
} */
</style>