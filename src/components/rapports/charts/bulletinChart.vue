<template>
  <div>
    <div v-for="anneeData in transformedData" :key="anneeData.annee" class="box">
      <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
        <h3 class="box-title mb-0 col-xl-3" style="font-size: 20px;">
          Bulletin de collecte <b style="color:red">{{ anneeData.annee }}</b>
        </h3>
      </div>
      <div class="box-body p-2">
        <div class="row">
          <!-- Iterate through each product-market combination -->
          <div
            v-for="chart in generateProductMarketCharts(anneeData)"
            :key="chart.id"
            class="col-xl-6 col-md-12 col-sm-12"
          >
            <h4 class="text-primary">{{ chart.title }}</h4>
            <highcharts :options="chart.options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/lib/axiosConfig'
import Highcharts from "highcharts";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  },
  data() {
    return {
      transformedData: [],
    };
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData) {
        this.submitChart(newData);
      },
    },
  },
  methods: {
    async submitChart(data) {
      try {
        const datas = {
          marches: [237, 309],
          produits: ["GOF", "ARN"],
          date_debut: "2023-01-01",
          date_fin: "2024-11-24",
          annees: [2023, 2024],
        };

        const response = await axios.post(
          "/statistiques/marche-collecte/par-produit/avg-prices",
          datas,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        if (response.status === 200) {
          this.transformedData = response.data;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },

    generateProductMarketCharts(anneeData) {
      const charts = [];
      
      // Get unique products across all markets
      const allProducts = new Set();
      anneeData.data.forEach(marche => {
        marche.produits.forEach(produit => {
          allProducts.add(produit.produit);
        });
      });

      // For each product, create a chart for each market
      allProducts.forEach(productName => {
        anneeData.data.forEach(marche => {
          const productData = marche.produits.find(p => p.produit === productName);
          
          if (productData) {
            const chartData = {
              id: `${marche.marche}-${productName}`,
              title: `${productName} dans le marché ${marche.marche}`,
              options: this.generateChartOptions([productData])
            };
            charts.push(chartData);
          }
        });
      });

      return charts;
    },

    generateChartOptions(produits) {
      const series = produits.map((produit) => {
        return {
          name: produit.produit,
          data: produit.data.map((item) => ({
            x: item.month,
            y: item.prix_moy,
          })),
        };
      });

      return {
        chart: {
          type: "line",
        },
        title: {
          text: "prix moyen par produit",
        },
        xAxis: {
          title: { text: "Mois" },
          categories: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        },
        yAxis: {
          title: {
            text: "Prix Moyen en GNF",
          },
        },
        series,
      };
    },

    async handleErrors(error) {
      console.log('Error:', error);
      if (error.response?.status === 500) {
        // Logique pour une erreur serveur
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
        this.FichesCollOptions = [];
      } else {
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
  },
};
</script>