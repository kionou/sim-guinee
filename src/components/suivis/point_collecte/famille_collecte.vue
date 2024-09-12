<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
  
    <div class="box">
      <div class="box-header with-border p-2">
  
        <div class="navbar-custom-menu r-side">
          <ul class="nav navbar-nav justify-content-end">
  
            <li class="btn-group d-lg-inline-flex d-none h-40">
              <div class="app-menu">
                <div class="search-bx mx-5">
                  <form>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                        aria-describedby="button-addon2" v-model="searchMarche" @input="filterByName">
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
                @click="openModal('add-marche')"><i class="mdi mdi-plus"></i></button>
            </li>
  
  
          </ul>
        </div>
      </div>
    </div>
    <div class="box mx-2">
      <div class="box-header with-border">
        <h3 class="box-title mb-0"> {{ description }}</h3>
      </div>
  
      <div class="box-body">
        <div class="table-responsive">
          <table id="example1" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center">Code</th>
                <th>Nom </th>
                <th>Geo local.</th>
                <th>Commune</th>
                <th>Agent collecte</th>
                <th>Jours du marché</th>
                <th>Nb de fiches suiv.</th>
                <th> suivre</th>
  
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
              <tr v-for="data   in paginatedItems" :key="data.id">
                <td style="width: 50px;" class="text-center">
                  {{ data?.code_marche ?? "-"}}
                </td>
                <td>
                  <div>
                    {{ data?.nom_marche ?? "-"}}
  
                  </div>
                </td>
                <td style="width: 100px;" class="text-center">
                  {{ data?.longitude ?? "-"}} , {{ data?.latitude ?? "-"}}
                </td>
                <td style="width: 100px;" class="text-center">
                  {{ data?.commune_relation?.nom_commune ?? "-"}}
                </td>
                <td style="width: 170px;" class="text-center">
                  <span
                    class="text-dark font-weight-600 hover-primary mb-1 font-size-14">{{data?.collecteur_relation?.nom_collecteur
                    ?? "-"}} {{data?.collecteur_relation?.prenom_collecteur ?? "-"}}</span>
                  <span style="font-size:12px !important"
                    class="text-danger  d-block">{{data?.collecteur_relation?.whatsapp_collecteur ?? "-"}} </span>
                </td>
                <td class="text-center" style="width: 70px !important;">
                  {{ data?.jour_du_marche ?? "-"}}
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
    </div>
  
  
    <div class="modal center-modal fade" id="add-marche" ref="add-marche" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter un marché</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('add-marche')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Code <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.code_marche" color="secondary" name="step1.code_marche" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.code_marche.$error">{{
                    v$.step1.code_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['code_marche']">
                    {{ resultError["code_marche"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Nom <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.nom_marche" color="secondary" name="step1.nom_marche" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.nom_marche.$error">{{
                    v$.step1.nom_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['nom_marche']">
                    {{ resultError["nom_marche"] }}
                  </small>
                </div>
              </div>
  
            </div>
            <div class="row mt-3 content-group">
              <!-- <div class="col">
                            <div class="input-groupe">
                              <label for="userpassword"
                                > Type marché <span class="text-danger">*</span></label
                              >
                              <MazSelect
                                v-model="step1.type_marche"
                                color="secondary"
                                name="step1.type_marche"
                                size="sm"
                                rounded-size="sm"
                                search
                               :options="TypesOptions"
                                
                                
                              />
                              <small v-if="v$.step1.type_marche.$error">{{
                                v$.step1.type_marche.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['type_marche']">
                                {{ resultError["type_marche"] }}
                              </small>
                            </div>
                          </div> -->
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Jours marché <span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.jour_du_marche" color="secondary" name="step1.jour_du_marche" size="sm"
                    rounded-size="sm" search :options="jours" multiple />
                  <small v-if="v$.step1.jour_du_marche.$error">{{
                    v$.step1.jour_du_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['jour_du_marche']">
                    {{ resultError["jour_du_marche"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword">Commune <span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.commune" color="secondary" name="step1.commune" size="sm" rounded-size="sm"
                    search :options="CommunesOptions" />
                  <small v-if="v$.step1.commune.$error">{{
                    v$.step1.commune.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['commune']">
                    {{ resultError["commune"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col">
                            <div class="input-groupe">
                              <label for="userpassword"
                                > Superficie <span class="text-danger">*</span></label
                              >
                              <MazInput
                                v-model="step1.superficie"
                                color="secondary"
                                name="step1.superficie"
                                size="sm"
                                rounded-size="sm"
                               type="number"
                 :min="0"
                                
                                
                              />
                              <small v-if="v$.step1.superficie.$error">{{
                                v$.step1.superficie.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['superficie']">
                                {{ resultError["superficie"] }}
                              </small>
                            </div>
                          </div> -->
  
            </div>
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Longitude <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.longitude" color="secondary" name="step1.longitude" size="sm" rounded-size="sm"
                    type="number" />
                  <small v-if="v$.step1.longitude.$error">{{
                    v$.step1.longitude.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['longitude']">
                    {{ resultError["longitude"] }}
                  </small>
                </div>
              </div>
  
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Latitude <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.latitude" color="secondary" name="step1.latitude" size="sm" rounded-size="sm"
                    type="number" />
                  <small v-if="v$.step1.latitude.$error">{{
                    v$.step1.latitude.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['latitude']">
                    {{ resultError["latitude"] }}
                  </small>
                </div>
              </div>
  
            </div>
  
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Agent collecte <span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.collecteur" color="secondary" name="step1.collecteur" size="sm"
                    rounded-size="sm" search :options="CollecteursOptions" />
                  <small v-if="v$.step1.collecteur.$error">{{
                    v$.step1.collecteur.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div>
  
  
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
                    id="text-area" v-model="step1.description" rows="1"></textarea>
  
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
  
            <button type="button" @click="SubmitCollecteur('add-marche')"
              class="waves-effect waves-light btn btn-primary ">Valider</button>
  
  
          </div>
        </div>
      </div>
    </div>
  
  
    <div class="modal center-modal fade" id="update-marche" ref="update-marche" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier un marché</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('update-marche')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Code <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.code_marche" color="secondary" name="step2.code_marche" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.code_marche.$error">{{
                    v$.step2.code_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['code_marche']">
                    {{ resultError["code_marche"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Nom <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.nom_marche" color="secondary" name="step2.nom_marche" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.nom_marche.$error">{{
                    v$.step2.nom_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['nom_marche']">
                    {{ resultError["nom_marche"] }}
                  </small>
                </div>
              </div>
  
            </div>
            <div class="row mt-3 content-group">
              <!-- <div class="col">
                            <div class="input-groupe">
                              <label for="userpassword"
                                > Type marché <span class="text-danger">*</span></label
                              >
                              <MazSelect
                                v-model="step2.type_marche"
                                color="secondary"
                                name="step2.type_marche"
                                size="sm"
                                rounded-size="sm"
                                search
                                :options="TypesOptions"
                                
                                
                              />
                              <small v-if="v$.step2.type_marche.$error">{{
                                v$.step2.type_marche.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['type_marche']">
                                {{ resultError["type_marche"] }}
                              </small>
                            </div>
                          </div> -->
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Jours marché <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.jour_du_marche" color="secondary" name="step2.jour_du_marche" size="sm"
                    rounded-size="sm" search :options="jours" multiple />
                  <small v-if="v$.step2.jour_du_marche.$error">{{
                    v$.step2.jour_du_marche.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['jour_du_marche']">
                    {{ resultError["jour_du_marche"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword">Commune <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.commune" color="secondary" name="step2.commune" size="sm" rounded-size="sm"
                    search :options="CommunesOptions" />
                  <small v-if="v$.step2.commune.$error">{{
                    v$.step2.commune.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['commune']">
                    {{ resultError["commune"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col">
                            <div class="input-groupe">
                              <label for="userpassword"
                                > Superficie <span class="text-danger">*</span></label
                              >
                              <MazInput
                                v-model="step2.superficie"
                                color="secondary"
                                name="step2.superficie"
                                size="sm"
                                rounded-size="sm"
                               type="number"
                 :min="0"
                                
                                
                              />
                              <small v-if="v$.step2.superficie.$error">{{
                                v$.step2.superficie.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['superficie']">
                                {{ resultError["superficie"] }}
                              </small>
                            </div>
                          </div> -->
  
            </div>
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Longitude <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.longitude" color="secondary" name="step2.longitude" size="sm" rounded-size="sm"
                    type="number" />
                  <small v-if="v$.step2.longitude.$error">{{
                    v$.step2.longitude.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['longitude']">
                    {{ resultError["longitude"] }}
                  </small>
                </div>
              </div>
  
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Latitude <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.latitude" color="secondary" name="step2.latitude" size="sm" rounded-size="sm"
                    type="number" />
                  <small v-if="v$.step2.latitude.$error">{{
                    v$.step2.latitude.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['latitude']">
                    {{ resultError["latitude"] }}
                  </small>
                </div>
              </div>
  
            </div>
  
            <div class="row mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Agent collecte <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.collecteur" color="secondary" name="step2.collecteur" size="sm"
                    rounded-size="sm" search :options="CollecteursOptions" />
                  <small v-if="v$.step2.collecteur.$error">{{
                    v$.step2.collecteur.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['collecteur']">
                    {{ resultError["collecteur"] }}
                  </small>
                </div>
              </div>
  
  
              <div class="col">
                <div class="input-groupe">
                  <label for="userpassword"> Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
                    id="text-area" v-model="step2.description" rows="1"></textarea>
  
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
  
            <button type="button" @click="submitUpdate('update-marche')"
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
  props: {
    idTypeMarche: Number,
    marches: Array,
    description: String
  },
  components: {
    Pag, Loading, MazPhoneNumberInput
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

  },
  data() {
    return {
      loading: false,
      Code: "",
      searchMarche: "",
      isModalUpdate: "",
      MarchesOptions: [],
      TypesOptions: [],
      CommunesOptions: [],
      CollecteursOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      Marches: [
        { label: "Marché de collecte", value: 1 },
        { label: "Marché de consommation", value: 3 },
        { label: "Marché de grossiste", value: 2 },
        { label: "Marché de détail", value: 4 },
      ],
      step1: {
        code_marche: "",
        nom_marche: "",
        longitude: "",
        latitude: "",
        commune: "",
        collecteur: "",
        description: "",
        jour_du_marche: [],

      },
      step2: {
        code_marche: "",
        nom_marche: "",
        longitude: "",
        latitude: "",
        commune: "",
        collecteur: "",
        description: "",
        jour_du_marche: [],


      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
      jours: [
        { label: 'Lundi', value: 'Lundi' },
        { label: 'Mardi', value: 'Mardi' },
        { label: 'Mercredi', value: 'Mercredi' },
        { label: 'Jeudi', value: 'Jeudi' },
        { label: 'Vendredi', value: 'Vendredi' },
        { label: 'Samedi', value: 'Samedi' },
        { label: 'Dimanche', value: 'Dimanche' },
      ]

    }
  },
  watch: {

    idTypeMarche: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`idTypeMarche a changé : ${oldValue} -> ${newValue}`);
        // this.fetchMarches(newValue);
        this.Code = newValue
      },
    },

    marches: {
      immediate: true,
      handler(newData) {
        console.log('Nouvelles données de marches :', newData);
        this.MarchesOptions = [...newData];
        this.data = [...newData];
        this.updatePaginatedItems();
      }
    }
  },
  validations: {
    step1: {
      code_marche: { require },
      nom_marche: { require },
      longitude: { require },
      latitude: { require },
      commune: { require },
      collecteur: { require },
      description: { require },
      jour_du_marche: { require }

    },

    step2: {
      code_marche: { require },
      nom_marche: { require },
      longitude: { require },
      latitude: { require },
      commune: { require },
      collecteur: { require },
      description: { require },
      jour_du_marche: { require }

    },
  },
  async mounted() {
    // await this.fetchMarches()
    await this.fetchCommunes()
    await this.fetchCollecteurs()
    await this.fetchTypesMarches()

  },
  methods: {
    successmsg: successmsg,


    async fetchMarches(id) {
      try {
        const response = await axios.get(`/parametrages/marches/marche/listes?type_marche=${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        console.log('responsecolecteursaa', id, response)
        if (response.status === 200) {
          this.data = response.data;
          this.MarchesOptions = this.data
          this.$emit('marches-count', { idTypeMarche: id, count: this.data.length });
          this.loading = false
        }
      } catch (error) {
        this.handleErrors(error);
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

        if (response.status === 200) {
          response.data.map(item => this.CommunesOptions.push({
            label: item.nom_commune,
            value: item.id_commune
          }))

        }
      } catch (error) {

        this.handleErrors(error);
      }
    },
    async fetchTypesMarches() {
      try {
        const response = await axios.get('/parametrages/type-marches',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        if (response.status === 200) {
          response.data.map(item => this.TypesOptions.push({
            label: item.nom_type_marche,
            value: item.code_type_marche
          }))

        }
      } catch (error) {


      }
    },
    async fetchCollecteurs() {
      try {
        const response = await axios.get('/parametrages/collecteurs',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );

        if (response.status === 200) {
          response.data.map(item => {
            this.CollecteursOptions.push({
              label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
              value: item.id_collecteur
            });
          });
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async SubmitCollecteur(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {

          code_marche: this.step1.code_marche,
          nom_marche: this.step1.nom_marche,
          type_marche: this.Code,
          longitude: this.step1.longitude,
          latitude: this.step1.latitude,
          commune: this.step1.commune,
          collecteur: this.step1.collecteur,
          description: this.step1.description,
          jour_du_marche: (this.step1.jour_du_marche).toString(),
        }

        console.log('data', data)
        try {
          const response = await axios.post("/parametrages/marches", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            }
          });
          console.log('qfs', response)
          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Création du marché",
              "Votre marché a été créé avec succès !"
            );

            this.$emit('point-collecte-updated');
            this.loading = false
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }
      } else {

      }
    },
    async HandleIdUpdate(id, modalId) {
      console.log('Slbvlkjbv', id)

      this.openModal(modalId)
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/marches/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.status === 200) {
          console.log('Slbvlkjbv', response)

          let data = response.data
          this.step2 = {
            code_marche: data.code_marche,
            nom_marche: data.nom_marche,
            longitude: data.longitude,
            latitude: data.latitude,
            commune: data.commune,
            collecteur: data?.collecteur,
            description: data.description,
            jour_du_marche: data?.jour_du_marche?.split(','),
          }
          this.Code = parseInt(data.type_marche)
          this.ToId = data.code_marche
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
          code_marche: this.step2.code_marche,
          nom_marche: this.step2.nom_marche,
          type_marche: this.Code,
          longitude: this.step2.longitude,
          latitude: this.step2.latitude,
          commune: this.step2.commune,
          collecteur: this.step2.collecteur,
          description: this.step2.description,
          jour_du_marche: (this.step2.jour_du_marche).toString(),
        }



        try {
          const response = await axios.put(`/parametrages/marches/${this.ToId}`, data, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
              "Mise à jour du marché",
              "Votre marché a été mis à jour avec succès !"
            );
            this.$emit('point-collecte-updated');
            this.loading = false


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
        const response = await axios.delete(`/parametrages/marches/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,


          },


        });

        if (response.status === 200) {
          this.loading = false
          this.successmsg(
            "Suppression du marché",
            "Votre marché a été supprimé avec succès !"
          );
          this.$emit('point-collecte-updated');
          this.loading = false

        } else {

          this.handleErrors(error);
        }
      } catch (error) {
        this.handleErrors(error);

      }

    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchMarche !== null) {
        const tt = this.searchMarche;
        console.log('ee', tt)
        const searchValue = tt.toLowerCase()
        console.log('searchValue', searchValue)
        console.log('searchValue', this.data)

        this.MarchesOptions = this.data.filter(user => {
          console.log('searchValueUser', user)

          const Code = user.code_marche || '';
          const nom = user.nom_marche || '';
          const Commune = user?.commune_relation?.nom_commune || '';
          const Jour = user?.jour_du_marche || '';


          return Code.toLowerCase().includes(searchValue) || nom.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) || Jour.toLowerCase().includes(searchValue)

        });

      } else {
        this.MarchesOptions = [...this.data];

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
      return this.MarchesOptions.slice(startIndex, endIndex);
    },
  },
}
  </script>
  <style lang="css" scoped>

</style>