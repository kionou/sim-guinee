<template>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div>
      <div v-for="anneeData in transformedData" :key="anneeData.annee" class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0 col-xl-3" style="font-size: 20px;">
            Bulletin de {{ typeLabel  }} <b style="color:red">{{ anneeData.annee }}</b>
          </h3>
        </div>
        <div class="box-body p-2">
          <div class="row">
            <div
              v-for="marche in anneeData.data"
              :key="marche.marche"
              class="col-xl-6 col-md-12 col-sm-12"
            >
              <h4 class="text-primary">Produit(s) dans le marché {{ marche.marche }}</h4>
              <highcharts :options="generateChartOptions(marche.produits)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/lib/axiosConfig'
  import Highcharts from "highcharts";
  import Loading from "@/components/others/loading.vue";
  
  export default {
    components:{
      Loading
    },
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
      typeLabel() {
      return this.typeLabels[this.data.type] || "Inconnu"; 
    },
    
    },
  
    data() {
      return {
      loading: false,
        transformedData: [],
        typeLabels: {
        "01": "Collecte",
        "02": "Grossiste",
        "03": "Journalier",
        "04": "Hebdomadaire",
        "05": "Bétail",
        "06": "Débarcadère",
        "07": "Port",
        "08": "Transfrontalier",
      },
         
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
      
       
        let url 
        switch (data.type) {
    case "01": 
      url = "/statistiques/marche-collecte/par-produit/avg-prices";
      break;
    case "02": 
      url = "/statistiques/marche-grossiste/par-produit/avg-prices";
      break;
    case "03": 
      url = "/statistiques/marche-journalier/par-produit/avg-prices";
      break;
    case "04": 
      url = "/statistiques/marche-consommation/par-produit/avg-prices";
      break;
    case "05":
      url = "/statistiques/marche-betail/par-produit/avg-prices";
      break;
      case "06": 
      case "07": 
      url = "/statistiques/marche-debarcadere/par-produit/avg-prices";
      break;
    case "08": 
      url = "/statistiques/marche-transfrontalier/par-produit/avg-prices";
      break;
    default:
      console.error("Type de marché inconnu :", data.type);
      return ;
  }
        
        try {
          // const datas = {
          //   marches: [237, 309],
          //   produits:["GOF", "ARN"],
          //   date_debut: "2023-01-01",
          //   date_fin: "2024-11-24",
          //   annees:  [2023, 2024],
          // };
          this.loading = true
          const datas = {
              marches: data.marches,
              produits: data.produits,
              date_debut: data.date_debut,
              date_fin: data.date_fin,
              annees: data.annees,
            };
  
          const response = await axios.post(  url, datas, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            }
          );
  
          if (response.status === 200) {
            this.transformedData = response.data;
            this.loading = false
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
  
      generateChartOptions(produits) {
  const series = produits.map((produit) => {
    return {
      name: produit.produit,
      data: produit.data.map((item) => ({
        x: new Date(item.year, item.month - 1).getTime(), // Convertir en timestamp
        y: item.prix_moy,
      })),
    };
  });

  return {
    chart: {
      type: "line",
    },
    title: {
      text: "Prix moyen par produit",
    },
    xAxis: {
      type: "datetime", // Axe en datetime
      title: { text: "Mois" },
      tickInterval: 30 * 24 * 3600 * 1000, // Intervalle de 1 mois
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%b-%Y', this.value); // Format Mois-Année
        },
      },
    },
    yAxis: {
      title: {
        text: "Prix Moyen en GNF",
      },
    },
    series,
    tooltip: {
      xDateFormat: '%B %Y', // Format du tooltip
      shared: true,
    },
  };
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
          this.$router.push("/"); 
        } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
          this.loading = false;
          this.FichesCollOptions = [];
        } else {
          // this.triggerToast(error.response?.data.detail);
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
  