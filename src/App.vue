<template >
  <div>
    <RouterView />
   
  </div>
</template>

<script>



 import "@/assets/css/vendors_css.css"
import  "@/assets/css/style.css"
import  "@/assets/css/skin_color.css"

import  "@/assets/js/vendors.min.js"
import  "@/assets/js/pages/chat-popup.js"
import  "@/assets/icons/feather-icons/feather.min.js"	
import  "@/assets/vendor_components/apexcharts-bundle/dist/apexcharts.js"
import Footer from './components/others/footer.vue'
 import  "@/assets/js/template.js"
// import  "@/assets/js/pages/dashboard.js"
// import  "@/assets/js/pages/data-table.js"

    import "@/assets/vendor_components/jquery-steps-master/build/jquery.steps.js"
    import "@/assets/vendor_components/jquery-validation-1.17.0/dist/jquery.validate.min.js"
    import "@/assets/vendor_components/sweetalert/sweetalert.min.js"
    import "@/assets/js/pages/steps.js"

    import AOS from 'aos';
    import 'aos/dist/aos.css';



  export default {
  name:'App',
  components:{
    Footer
  },
  created() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  },
  watch: {
    
    $route(to,) {
      const name = to.name.toLowerCase()
      const title = name 
        // ? `${name} (${to.href.split('/')[2].toLowerCase()})`
        // : name
      document.title = `Sim-Guinee - ${title}`

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  },
  
}
</script>
<style lang="css" scoped>
  
</style>