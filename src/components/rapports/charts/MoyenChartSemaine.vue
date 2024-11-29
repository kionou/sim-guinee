<template>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div v-for="regionData in transformedData" :key="regionData.region" class="box">
      <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
        <h3 class="box-title mb-0 " style="font-size: 20px;">
          Prix moyen des produits par  <b class="text-secondary">semaine</b> dans la région <b style="color:red">{{ regionData.region }}</b>
        </h3>
      </div>
      <div class="box-body p-2">
        <highcharts :options="generateRegionChartOptions(regionData.data)" />
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

       
   
        
        try {
          
        //   this.loading = true
          const datas = {
              type: data.type,
              regions: data.regions,
              week_or_month: data.week_or_month,
          
            };
  
          const response = await axios.post(  `statistiques/marches/par-famille-produit/avg-prices/${data.famille}`, datas, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            //   params:{
            //     famille:data.famille
            //   }
            }
          );
          console.log('dataresponse',response)
  
          if (response.status === 200) {
            this.transformedData = response.data;
            this.loading = false
          }
        } catch (error) {
          this.handleErrors(error);
        }
      },
  
      generateRegionChartOptions(data) {
  const productMap = new Map();
  const allWeeks = new Set();

  // Organiser les données par produit et collecter toutes les semaines
  data.forEach((item) => {
    if (!productMap.has(item.produit)) {
      productMap.set(item.produit, {
        name: item.produit,
        data: [],
      });
    }
    const year = Math.floor(item.year_week / 100);
    const week = item.year_week % 100;
    const date = this.convertWeekToDate(year, week);

    // Ajouter la semaine et ses données
    productMap.get(item.produit).data.push({ x: date, y: item.prix_moy });
    allWeeks.add(date);
  });

  // Convertir `allWeeks` en tableau trié
  const sortedWeeks = Array.from(allWeeks).sort((a, b) => a - b);

// Remplir les semaines manquantes avec `null`
productMap.forEach((product) => {
  const completeData = sortedWeeks.map((week) => {
    const found = product.data.find((entry) => entry.x === week);
    return found || { x: week, y: null };
  });
  product.data = completeData;
});

// Récupérer la première et la dernière semaine
if (sortedWeeks.length > 0) {
  const firstWeek = sortedWeeks[0];
  const lastWeek = sortedWeeks[sortedWeeks.length - 1];

  // Convertir les semaines en format lisible
  const firstDate = new Date(firstWeek);
  const lastDate = new Date(lastWeek);

  const firstYear = firstDate.getUTCFullYear();
  const lastYear = lastDate.getUTCFullYear();

  const firstFormattedWeek = Math.ceil(
    ((firstDate - new Date(firstYear, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1
  );
  const lastFormattedWeek = Math.ceil(
    ((lastDate - new Date(lastYear, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1
  );

  // Afficher l'intervalle des semaines
  console.log(`Intervalle des semaines : Semaine ${firstFormattedWeek} à ${lastFormattedWeek}`);
}


  return {
    chart: {
      type: "line",
    },
    title: {
      text: "Évolution des prix",
    },
    xAxis: {
      type: "datetime",
      title: { text: "Semaine" },
      labels: {
        formatter: function () {
          const date = new Date(this.value);
          const year = date.getUTCFullYear();
          const week = Math.ceil(
            ((date - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1
          );
          return `Sem. ${week} - ${year}`;
        },
      },
    },
    yAxis: {
      title: {
        text: "Prix Moyen en GNF",
      },
    },
    series: Array.from(productMap.values()),
    tooltip: {
      shared: true,
      formatter: function () {
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const week = Math.ceil(
          ((date - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000)) + 1
        );
        return `Semaine ${week}, ${year}<br>${this.points
          .map((point) => `<b>${point.series.name}</b>: ${point.y}`)
          .join("<br>")}`;
      },
    },
  };
},


convertWeekToDate(year, week) {
  const janFirst = new Date(year, 0, 1); // 1er janvier
  const daysOffset = (week - 1) * 7; // Décalage en jours pour atteindre la semaine souhaitée
  return new Date(janFirst.setDate(janFirst.getDate() + daysOffset)).getTime();
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
  