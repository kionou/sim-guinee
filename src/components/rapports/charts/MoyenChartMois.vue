<template>
    <Loading v-if="loading" style="z-index: 99999" />
    <div v-for="regionData in transformedData" :key="regionData.region" class="box">
      <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
        <h3 class="box-title mb-0 col" style="font-size: 20px;">
          Prix moyen des produits par  <b class="text-secondary">mois</b> dans la région <b style="color:red">{{ regionData.region }}</b>
        </h3>
      </div>
      <div class="box-body p-2">
        <highcharts :options="generateRegionChartOptions(regionData.data)" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/lib/axiosConfig';
  import Highcharts from "highcharts";
  import Loading from "@/components/others/loading.vue";
  
  export default {
    components: { Loading },
    props: { data: { type: Object, required: true } },
    computed: {
      loggedInUser() { return this.$store.getters["auth/myAuthenticatedUser"]; },
      typeLabel() { return this.typeLabels[this.data.type] || "Inconnu"; },
    },
    data() {
      return {
        loading: false,
        transformedData: [],
        typeLabels: {
          "01": "Collecte", "02": "Grossiste", "03": "Journalier", 
          "04": "Hebdomadaire", "05": "Bétail", "06": "Débarcadère",
          "07": "Port", "08": "Transfrontalier",
        },
      };
    },
    watch: {
      data: { immediate: true, deep: true, handler(newData) { this.submitChart(newData); } },
    },
    methods: {
      async submitChart(data) {
        this.loading = true
        try {
          const response = await axios.post(
            `statistiques/marches/par-famille-produit/avg-prices/${data.famille}`, 
            { type: data.type, regions: data.regions, week_or_month: data.week_or_month },
            { headers: { Authorization: `Bearer ${this.loggedInUser.token}` } }
          );
  
          if (response.status === 200) {
            this.transformedData = response.data;
            this.loading = false;
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
      generateRegionChartOptions(data) {
      console.log ('data',data)
       
      const series = data.map((produit) => {
    return {
      name: produit.produit,
      data: [
            {
              x: new Date(produit.year, produit.month - 1).getTime(),
              y: produit.prix_moy,
            },
          ],
     
    };
  });
      
  
        
  
        return {
          chart: { type: "line" },
          title: { text: "Évolution des prix" },
          xAxis: {
            type: "datetime",
            title: { text: "Mois" },
            tickInterval: 30 * 24 * 3600 * 1000, // Intervalle de 1 mois
                labels: {
                    formatter: function () {
                    return Highcharts.dateFormat('%b-%Y', this.value); // Format Mois-Année
                    },
                },
          },
          yAxis: { title: { text: "Prix Moyen en GNF" } },
          series,
          xDateFormat: '%B %Y', // Format du tooltip
      shared: true,
        };
      },
    
   
      async handleErrors(error) {
        console.log('Error:', error);
        if (error.response?.status === 500) { /* Handle server error */ }
        else if (error.response?.status === 401) { 
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); 
        }
        else if (error.response?.status === 404) { 
          this.loading = false; 
        }
        else { this.loading = false; }
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
  