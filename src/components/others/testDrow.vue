<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <BRow>
      <BCol md="12">
        <div class="mb-3 position-relative">
          <label for="userpassword">Indicateur</label>
          <MazSelect label="" disabled v-model="indicateur1" color="info" no-radius :options="IndicateursOptions" search></MazSelect>
        </div>
      </BCol>
    </BRow>
    <BCard class="card z-index-2">
      <div class="card-titre">
        <h6 class="mb-0 text-center">Statistiques par zone industrielle</h6>
        <BRow>
          <BCol md="12">
            <ul class="list-unstyled hstack gap-1 mb-0 justify-content-end !important;">
              <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                <div class="dropdowns">
                  <div class="dropdown-toggles btn btn-sm btn-soft-primary"  @click="toggleDropdown">
                    <i class="mdi mdi-dots-vertical"></i>
                  </div>
                  <ul class="dropdown-menus" v-show="isDropdownOpen">
                    <li @click="switchChartType('histogramme')">Histogramme</li>
                    <li @click="switchChartType('camembert')">Camembert</li>
                    <li @click="switchChartType('courbe')">Courbe</li>
                  </ul>
                </div>
              </li>
            </ul>
          </BCol>
        </BRow>
        <hr class="dark horizontal">
      </div>
      <div v-if="chartType === 'histogramme'">
        <highcharts v-for="(chartOption, index) in chartOptions" :key="index" :options="chartOption"></highcharts>
        <!-- Ajoutez ici les boutons spécifiques à l'histogramme -->
      </div>
      <div v-else-if="chartType === 'camembert'">
        <highcharts v-for="(camembertOption, index) in camembertOptions" :key="index" :options="camembertOption"></highcharts>
        <!-- Ajoutez ici les boutons spécifiques au camembert -->
      </div>
    </BCard>
  </div>
</template>


<script>
import axios from '@/lib/axiosConfig';
import { Chart } from 'highcharts-vue';
import Loading from '@/components/others/loading.vue';

export default {
  components: {
    highcharts: Chart,
    Loading
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
  },
  data() {
    return {
      loading: true,
      IndicateursOptions:[],
      isDropdownOpen: false,
      chartType: 'histogramme', // Par défaut, afficher l'histogramme
      chartOptions: [],
      camembertOptions: []
    };
  },

  async mounted() {
    await this.fetchIndicateursOptions();
    await this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        // Récupérer les IDs des 6 derniers indicateurs
        const lastIndicateurIds = this.IndicateursOptions.slice(0, 6).map(indicateur => indicateur.value);

        // Initialiser un tableau pour stocker les statistiques de chaque indicateur
        const statisticsPromises = lastIndicateurIds.map(async indicateurId => {
          const response = await axios.get(`/indicateurs/statistics/${indicateurId}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          return response.data.data;
        });

        const allStatistics = await Promise.all(statisticsPromises);
        console.log('allStatistics',allStatistics);

        // Réinitialiser les options de graphique
        this.chartOptions = [];
        this.camembertOptions = [];

        // Afficher les statistiques de chaque tableau
        allStatistics.forEach((statistics, index) => {
          this.loadChartData(statistics, index);
          console.log('statistics',statistics);
        });

        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchIndicateursOptions() {
      try {
        const response = await axios.get('/indicateurs', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        
        const indicateurs = response.data.data.filter(indicateur => indicateur.IsActive === "1"); // Filtrer les indicateurs actifs
        const derniersIndicateurs = indicateurs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6); // Trier par date de création et sélectionner les 6 derniers

        console.log(derniersIndicateurs); // Afficher les 6 derniers indicateurs

        this.IndicateursOptions = derniersIndicateurs.map(indicateur => ({
          label: indicateur.Description,
          value: indicateur.id,
        }));

        this.loading = false;
      } catch (error) {
        console.error('errorqqqqq', error);
      }
    },

    loadChartData(statisticsArray, index) {
      // Initialiser les tableaux pour stocker les données des deux types de graphiques
      const chartData = [];
      const camembertData = [];

      // Parcourir chaque statistique dans le tableau
      statisticsArray.forEach(statistic => {
        const name = statistic.IntituleZone || statistic.NomSecteurActivite;
        const y = parseInt(statistic.nb);

        // Ajouter les données à la série pour le graphique en colonnes
        chartData.push({
          name: name,
          y: y
        });

        // Ajouter les données à la série pour le graphique en camembert
        camembertData.push({
          name: name,
          y: y
        });
      });

      // Mettre à jour les options de graphique en colonnes
      this.chartOptions[index]= {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Unites Industrielles'
          }
        },
        plotOptions: {
          column: {
            depth: 25,
            dataLabels: {
              enabled: true,
              color: '#000',
              inside: false,
              format: '{point.y}',
            }
          }
        },
        series: [{
          name: 'Zone Industrielle',
          colorByPoint: true,
          data: chartData
        }]
      };

      // Mettre à jour les options de graphique en camembert
     
        this.camembertOptions[index] = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: null
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f}%',
              distance: -50
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Zone Industrielle',
          colorByPoint: true,
          data: camembertData
        }]
      };
    },

    switchChartType(type) {
      this.chartType = type;
      this.isDropdownOpen = false;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  },
};
</script>

<style lang="css" scoped>
/* Style pour le dropdown */
.dropdowns {
  position: relative;
  display: inline-block;
}

.dropdown-toggles {
  padding: 4px 9px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-menus {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  list-style: none;
  margin: 0;
  left: -91px;
  top: 101%;
  z-index: 1000;
  display: block;
}

.dropdown-menus li {
  padding: 8px 30px;
  cursor: pointer;
}

.dropdown-menus li:hover {
  background-color: #f0f0f0;
}
</style>
