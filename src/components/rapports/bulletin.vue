<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0 col-xl-3" style="font-size: 20px;">Bulletin SIM-GUINEE</h3>
  
          <div class="col-xl-9">
            <div class="navbar-custom-menu r-side  float-right" style="width: 100%;">
              <div class="app-menu">
                <div class="search-bx mx-5">
                  <form>
                    <div class="row">
                      <div class="col-4 ">
                        <div class="input-groupe">
                          <label for="">Type de marché</label>
                          <MazSelect v-model="bulletin.type" color="secondary" secondary :options="TypesMarchesOptions"
                            search v-slot="{ option }" size="sm" rounded-size="sm">
                            <div class="flex items-center"
                              style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem"
                              @click="handleOptionClickType(option)">
  
                              {{ option.label }}
  
                            </div>
  
                          </MazSelect>
                          <small v-if="v$.bulletin.type.$error">{{
                              v$.bulletin.type.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type']">
                              {{ resultError["type"] }}
                            </small>
                        </div>
                      </div>
  
                      <div class="col-4">
                        <div class="input-groupe">
                          <label for="">Produit</label>
                          <MazSelect label="" v-model="bulletin.product" :options="ProduitsOptions" v-slot="{ option  }"
                            search :disabled="isMarketDisabled" multiple size="sm" rounded-size="sm" color="secondary">
                            <div class="d-flex align-items-center" style="
                              padding-top: 0.5rem;
                              padding-bottom: 0.5rem;
                              width: 100%;
                              gap: 1rem;
                            ">
                              <MazAvatar size="0.8rem" :src="option.picture" />
                              <strong>
                                {{ option.label }}
                              </strong>
                            </div>
                          </MazSelect>
                          <small v-if="v$.bulletin.type.$error">{{
                              v$.bulletin.type.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type']">
                              {{ resultError["type"] }}
                            </small>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="input-groupe">
  
                          <label for="">Marché</label>
  
                          <MazSelect multiple v-model="bulletin.marche" color="secondary" secondary :options="MarchesOptions"
                            search :disabled="isMarketDisabled" v-slot="{ option }" size="sm" rounded-size="sm">
                            <div class="flex items-center"
                              style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem">
  
                              {{ option.label }}
  
                            </div>
  
                          </MazSelect>
                          <small v-if="v$.bulletin.type.$error">{{
                              v$.bulletin.type.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type']">
                              {{ resultError["type"] }}
                            </small>
                        </div>
                      </div>
  
                      <div class="col-4 ">
                        <div class="input-groupe">
                          <label for="">Date de début</label>
  
                          <MazInput v-model="bulletin.start" color="secondary" secondary type="date" size="sm"
                            rounded-size="sm" placeholder="mois début" @input="filterMonth" />
                            <small v-if="v$.bulletin.type.$error">{{
                              v$.bulletin.type.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type']">
                              {{ resultError["type"] }}
                            </small>
                        </div>
                      </div>
                      <div class="col-4 ">
                        <div class="input-groupe">
  
                          <label for="">Date de fin</label>
  
                          <MazInput v-model="bulletin.end" color="secondary" secondary type="date" size="sm" :min="bulletin.start"
                            rounded-size="sm" placeholder="mois début" @input="filterMonth" />
                            <small v-if="v$.bulletin.type.$error">{{
                              v$.bulletin.type.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type']">
                              {{ resultError["type"] }}
                            </small>
                        </div>
                      </div>
                      <div class="col-4 d-flex align-items-end">
  
                        <button type="button" @click="submitChart"
                          class="waves-effect waves-light btn btn-primary">
                          Valider
                        </button>
  
  
                        <button type="button"
                          class="waves-effect waves-circle btn btn-circle btn-sm btn-primary mb-8 ms-2 mt-5"
                          @click="Refesh"><i class="mdi mdi-refresh"></i></button>
  
                      </div>
  
  
  
                    </div>
  
                  </form>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    </div>

    <div class="col-12">
      <!-- <BulletinChart  :data="data"></BulletinChart> -->
      <Test  :data="data"></Test>


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
import BulletinChart from './charts/bulletinChart.vue';
import Test from './charts/test.vue';


export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  props: {


  },
  components: {
    Pag, Loading, BulletinChart , Test
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.FichesCollOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.FichesCollOptions.slice(startIndex, endIndex);
    },
    isMarketDisabled() {
      return !this.bulletin.type;
    },

  },
  data() {
    return {
      loading: false,
      yearArray:[],
      data:"",
      bulletin: {
        type: "",
        marche: [],
        product: [],
        start: "",
        end: "",
      },
      MarchesOptions: [],
      TypesMarchesOptions: [],
      ProduitsOptions: [],



      yearOptions: [],
      years: [],
      datas: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      year: new Date().getFullYear(),
      v$: useVuelidate(),
      error: "",
      resultError: {},


    }
  },
  validations: {
    bulletin:{
      type:{
        require
      },
      marche:{
        require
      },
      product:{
        require
      },
      start:{
        require
      },
      end:{
        require
      },
    }


  },
  async mounted() {
    await this.initializeYears()
    await this.fetchTypesMarches()
  },
  watch: {

  },
  methods: {


    successmsg: successmsg,
    async fetchTypesMarches() {
      try {
        const response = await axios.get('parametrages/type-marches/admin-dynamic-types',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        if (response.status === 200) {

          response.data.map(tm => this.TypesMarchesOptions.push({
            value: tm.type.code_type_marche,
            label: tm.type.nom_type_marche,
            id: tm.type.id_type_marche
          }))
          this.loading = false
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async handleOptionClickType(a) {
      this.loading = true
      await this.fetchMarches(a.id)
      await this.fetchProduits(a.value)

    },
    async fetchMarches(id) {
      try {
        const response = await axios.get(`/parametrages/marches/par-type/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        if (response.status === 200) {
          
          this.MarchesOptions = []
          response.data?.marches.map(m => this.MarchesOptions.push({
            value: m.marche.id_marche,
            label: m.marche.nom_marche
          }))
          // this.loading =  false
        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
    async fetchProduits(code) {
      try {
        const response = await axios.get(`/parametrages/produits?code_type_marche=${code}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.status === 200) {
          response.data.map(item => this.ProduitsOptions.push({
            label: `${item.nom_produit} ( ${item.code_produit})`,
            picture: item.image,
            value: item.code_produit
          }))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
    generateyearArray(start , end){
      if(!start || !end) return
      const startYear = new Date(start).getFullYear()
      const endYear = new Date(end).getFullYear()
      if(startYear ===  endYear){
        this.yearArry = []
        return this.yearArray.push(startYear)
      }else{
       
        for(let year = startYear; year <= endYear; year++){
          this.yearArry = []
         this.yearArray.push(year)
        }     
        return this.yearArray
      }

    },

    async submitChart() {
      this.v$.bulletin.$touch();
      if (this.v$.$errors.length == 0) {
        this.yearArray = []
        const date =    this.generateyearArray(this.bulletin.start , this.bulletin.end)
        //  this.loading = true;
       this.data = {
        type:this.bulletin.type,
        marches:this.bulletin.marche,
        produits:this.bulletin.product,
        date_debut:this.bulletin.start,
        date_fin:this.bulletin.end,
        annees: date

    
      };
    
       return 
      try {
        const response = await axios.post('/statistiques/marche-collecte/par-produit/avg-prices', data, {
          headers: {

            Authorization: `Bearer ${this.loggedInUser.token}`,

          },
        });

        console.log('response',response)
        if (response.status === 200) {
    

          transformedData = response.data
       

          // this.closeModal(modalId);
          // this.currentStep = 1;
          // this.successmsg(
          //   "Mise à jour de la fiche d'enquête",
          //   "Votre fiche d'enquête a été mise à jour avec succès !"
          // )
          // this.$emit('enquete-updated');
          // this.loading = false


        }
      } catch (error) {
        this.handleErrors(error);
      }

      }else{
        
      }
     
    

    },
    Refesh() {
      this.bulletin = {}
      this.currentPage = 1;
      this.FichesCollOptions = [...this.data];

    },


    
    getYear(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`
    },

    async initializeYears() {
      const currentYear = new Date().getFullYear();
      for (let year = 2013; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.yearOptions = await this.years.map((year) => ({
        label: String(year),
        value: year,
      }));
    },
    filterMonth() {
      this.currentPage = 1;
      const startMonth = this.debut ? new Date(this.debut + '-01') : null;
      const endMonth = this.fin ? new Date(this.fin + '-31') : null;
      this.FichesCollOptions = this.data.filter(fiche => {

        const ficheDate = new Date(fiche.enquete?.date_enquete);

        return (
          (!startMonth || ficheDate >= startMonth) &&
          (!endMonth || ficheDate <= endMonth)
        );
      });


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
        this.loading = false;
        this.data = [];

        // Logique pour une erreur serveur
        //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
      }
      else if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); // Redirection vers la page de connexion
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.FichesCollOptions = [];
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
  
  },

}
</script>
<style lang="css" scoped>
.tx-green-1 {
  color: #75cc65;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: #fff;
  padding: 60px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 660px; */
  position: relative;
  z-index: 0;
  /* margin-bottom: 24px; */
}

.stepper-progress {
  position: absolute;
  background-color: #c5c5c5;
  height: 2px;
  z-index: -1;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.stepper-progress-bar {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #47c00b;
  transition: all 500ms ease;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c5;
  transition: all 500ms ease;
  cursor: pointer;
}

.stepper-item-counter {
  height: 35px;
  width: 35px;
  display: grid;
  place-items: center;
  background-color: #fff;
  border-radius: 100%;
  border: 2px solid #c5c5c5;
  position: relative;
}

.stepper-item-counter .icon-success {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  width: 18px;
  transition: all 500ms ease;
}

.stepper-item-counter .number {
  font-size: 15px;
  transition: all 500ms ease;
}

.stepper-item-title {
  position: absolute;
  font-size: 15px;
  bottom: -39px;
  width: 71px;
  display: flex;
  justify-content: center;
}

.stepper-item.success .stepper-item-counter {
  border-color: #75cc65;
  background-color: #c8ebc1;
  color: #fff;
  font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
  opacity: 1;
  transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
  opacity: 0;
  transform: scale(0);
}

.stepper-item.success .stepper-item-title {
  color: #75cc65;
}

.stepper-item.current .stepper-item-counter {
  border-color: #75cc65;
  background-color: #75cc65;
  color: #fff;
  font-weight: 600;
}

.stepper-item.current .stepper-item-title {
  color: #818181;
}

.signup a:hover {
  text-decoration: underline var(--color-primary);
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--color-primary);
  padding: 0.75rem;
  text-align: center;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 50px;
}

.signup {
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
}


.btnForm {
  max-width: 1140px;
  margin: 20px auto;
  background-color: white;
  padding: 1rem;
  color: black;
  border: 1px solid var(--color-primary)
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
}

.btnLogin {
  padding: 1em 3em;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  background-color: var(--color-primary);
  border: none;
  border-radius: 45px;

  cursor: pointer;
  outline: none;
}

.btnLogin:hover {
  background-color: #fff;
  border: 1px solid var(--color-primary);
  color: #000;
}

.text-header {

  color: red;
  font-weight: bolder;
  border: 1px solid var(--color-primary);
  float: left;
  padding: 0 10px;
  margin-left: 12px;
}
</style>