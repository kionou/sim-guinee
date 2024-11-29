<template >
      <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="bg-white" style="height: 100vh !important;">
        <header class="p-2" style="background-color: #369f4a !important ; border-bottom: 1px solid #369f4a !important ; box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);">
		 
          <h3 class="text-center m-0 " style="color:var(--color-secondary)"> <b>Système d'Informations sur les Marchés</b> </h3>
		
  </header>
        <div class="loginHeader">
        <div class="containerHeader">
          <div class="row">
            <div class="col-xl-8">
              <div class=" d-none d-sm-block d-lg-block ">
                <div class="row justify-content-center text-center">
                    <h2> <b>BIENVENUE SUR</b> </h2>
                    <div class="col-lg-12 col-md-12">
                    <img src="@/assets/img/logo.png" class="text-center" alt="" style="width: 150px; height: auto ">

                    </div>
                    <div class="col-lg-6 col-md-6" style="width:600px !important">
                      <p>
                        Les SIM sont des dispositifs (ou services) qui ont pour objectif de collecter régulièrement 
                        sur les marchés (marchés de collecte, de gros ou de détail) des informations sur les prix des produits agricoles,
                    </p>
                    </div>
                   
                </div>
                <div class="swiper">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper">
              
              
                <div class="swiper-slide">
                  <img src="@/assets/img/img1.jpg" class="authentication-image img-thumbnail   h-400  w-600" alt="">
                </div>
                <div class="swiper-slide">
                  <img src="@/assets/img/img2.jpg" class="authentication-image img-thumbnail   h-400  w-600" alt="">
                </div>
                <div class="swiper-slide">
                  <img src="@/assets/img/img3.jpg" class="authentication-image img-thumbnail   h-400  w-600" alt="">
                </div>
                <div class="swiper-slide">
                  <img src="@/assets/img/img4.jpg" class="authentication-image img-thumbnail   h-400  w-600" alt="">
                </div>
              
              </div>
              <!-- If we need pagination -->
            

            </div>
             </div>
            </div>
            <div class="col-xl-4">
              <div class="formulaire">
                <div class="">
                    <div class="info">
                        <h1 class="text-center">Connexion</h1>
                        <span>Connectez-vous à votre espace administrateur</span>
                    </div>
                    <small>{{ error }}</small>
                </div>
                <div class="form">
                    <div class="row mt-3 content-group">
                        <div class="">
    <div class="mb-3 position-relative" style="text-align: start !important;">
      <label for="password" >Pseudo <span class="text-danger">*</span> </label>
      <MazInput v-model="step1.username" type="username" name="username" color="secondary"
        placeholder="Sim123" size="sm" rounded-size="sm" />
        <small v-if="v$.step1.username.$error">{{v$.step1.username.$errors[0].$message}}</small> 
        <small v-if="resultError['username']">{{resultError['username']}}</small>
      
    </div>
  </div>
  
  <div class="">
    <div class="mb-3 position-relative" style="text-align: start !important;">
      <label for="password">Mot de passe <span class="text-danger">*</span> </label>
      <MazInput v-model="step1.password" type="password" name="password" color="secondary"
        placeholder="012345" size="sm" rounded-size="sm" />
      <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small> 
       <small v-if="resultError['password']">{{resultError['password']}}</small>
    </div>
  </div>

                    </div>
                    <div  style="text-align: end;"  @click="openModal('add-email')">
                    <a  href="#">Mot de passe oublié ?</a>

                    </div>
                    <button @click="Hamdlelogin">Connexion</button>
                </div>
    
            </div>
            </div>

          </div>

           

         
    
    
        </div>
    </div>

    <footer class="main-footer p-3 text-center text-white" style="background-color: #ffca08 !important;">
  
  &copy; 2024 <a class="lien" href="https://anasa.gov.gn/2021/"><span class="lien">ANASA</span> </a>. Tout droit reservé.
</footer>
      
    </div>

    <div
      class="modal center-modal fade"
      id="add-email"
      ref="add-email"
      tabindex="-1"
    >
      <div class="modal-dialog " v-if="isEmail">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Entrez votre Adresse Email
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"   @click="closeModal('update-magasin')" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-xl-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Adresse Email <span class="text-danger">*</span></label
                  >
                  <MazInput
                    v-model="step2.email"
                    color="secondary"
                    name="step2.email"
                    size="sm"
                    rounded-size="sm"
                   
                  />
                  <small v-if="v$.step2.email.$error">{{
                    v$.step2.email.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['email']">
                    {{ resultError["email"] }}
                  </small>
                </div>
              </div>
             
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="PasswordOtp('add-email')"
                  class="waves-effect waves-light btn btn-primary"
                >
                  Valider
                </button>
          </div>
        </div>
      </div>

      <div class="modal-dialog " v-if="isCode">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Verification de  Code
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"   @click="closeModal('update-magasin')" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-subtitle-2 font-weight-bold mb-3">
              Veuillez entrer le code que nous avons envoyé à votre
         adresse e-mail pour réinitialiser votre mot de passe.
      </div>
            <div class="row mt-3 content-group">
              <div class="col-xl-12">
                <div class="input-groupe">
                  <label for="userpassword">
                    Code <span class="text-danger">*</span></label
                  >
                  <MazInputCode v-model="step3.code" size="xs"  divider="•" color="secondary"  @input="onOtpInputPassworod" />

                  <small v-if="v$.step3.code.$error">{{
                    v$.step3.code.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['code']">
                    {{ resultError["code"] }}
                  </small>
                </div>
              </div>
             
            </div>
           
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button
                  type="button"
                  @click="submitUpdate('add-email')"
                  class="waves-effect waves-light btn btn-primary"
                >
                  Valider
                </button>
          </div>
        </div>
      </div>

    </div>
   
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import { mapActions } from 'vuex';
export default {
    components: {
      Loading,

    },

    data() {
        return {
           loading:false,
           isEmail:true,
           isCode:false,
            step1:{
             username: '',
             password: '',
           },
           step2:{
            email:"",
           },
           step3:{
            code:"",
           },
        resultError: {},
        v$: useVuelidate(),
        error:''
        }
    },
    validations: {
    step1:{
        username: {
      require,
    },
    
    password: {
      require,
      lgmin: lgmin(4),
      lgmax: lgmax(20),
    }
    },
    step2:{
            email:{require},
           },
           step3:{
            code:{},
           },

  },
  methods: {
      ...mapActions('auth', ['setMyAuthenticatedUser']),
  async Hamdlelogin(){

this.error = '',
this.v$.step1.$touch()
if (this.v$.$errors.length == 0 ) {
   this.loading = true
  
let DataUser = {
username:this.step1.username,
password:this.step1.password,
}
console.log("eeeee",DataUser);
try {
const response = await axios.post('/login' , DataUser);


if (response.data) {

 this.InfoUser = response.data
//  this.setMyAuthenticatedUser(this.InfoUser);
 this.fetchUserDetail(this.InfoUser)
 this.loading = false

    

} else {

}



} catch (error) {
console.log('response.login', error); 

this.loading = false
if (error.response.data) { 
return this.error = error.response.data.detail

} else {
return this.error = "L'authentification a échoué"
}
}
  }else{
  

  
  } 
},


async fetchUserDetail(data) {

      try {
        const response = await axios.get("/parametrages/profile", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
          console.log('role/id',response.data)
        if (response.status === 200) {
          console.log('role',response.data)
          const userProfile = {
            ...response.data,
            access_token: data.access_token, 
          };
           this.setMyAuthenticatedUser(userProfile);
          this.$router.push('/sim'); 
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors du téléversement :", error);
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },

async ChangePassword(){
          this.dialogPassword = true
          this.error = ''
          
  
  }, 

  async PasswordOtp(modalId){

           this.v$.step2.$touch()
          if (this.v$.$errors.length == 0 ) {
            //  this.loading = true
          
          let CodeUserEmail ={
            email:1,
            value:this.step2.email
          
          }
          this.isEmail = false,
          this.isCode = true
          return
          try {
         const response = await axios.post('/mcipme/send-otp', CodeUserEmail);
         
; 
         if (response.data.status === 'success') {
          this.dialogPassword = false
         this.dialogOtpPassword = true
         this.loading = false
         } else {
          
         }
    
    } catch (error) {
    
    }
          }else{
          
     
          
          
          }
  },

  onOtpInputPassworod() {
      // Vérifiez si l'OTP est complètement saisi (longueur de 4 chiffres)
      this.errorOtp  = ''
   console.log('code',this.step3.code)

      if (this.step3.code.length === 5) {
   console.log('code',this.step3.code)
        // this.HamdleOtpPassword();
      }
    },
    async  HamdleOtpPassword(){
        this.error = '',
         this.v$.step4.$touch()
          if (this.v$.$errors.length == 0 ) {
             this.loading = true
            
            let DataUser = {
            email: true,
            value: this. step3.email,
            code: this. step4.code
        }

   
     
      try {
      const response = await axios.post('/mcipme/verification-otp' , DataUser);

      if(response.data.status === 'success'){
        localStorage.setItem('resetPasswordInfo', JSON.stringify({
                  email: this.step3.email,
                  code: this.step4.code// Assurez-vous de récupérer le code correctement
                }));
             this.$router.push('/reinitialiser');
              this.loading = false
              this.dialogOtpPassword = false
      }else{
      
       this.errorOtp = "Echec de vérification du code."
       this. step4.code = ''
       this.loading = false
      }
    
        
              
     
    } catch (error) {
   

      this.loading = false
      if (error.response.data.status === 'error') {
       return this.errorOtp = "L'authentification a échoué"
        
      } else {
        
      }
    }
            }else{
            
      
            
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
  },
    mounted() {
      const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    
  },

  autoplay: {
          delay: 5000,
          disableOnInteraction: false
      }
});
  //       const swiper = new Swiper(".keyboard-control", {
  //     slidesPerView: 1,
  //     spaceBetween: 30,
  //     keyboard: {
  //         enabled: true,
  //     },
  //     pagination: {
  //         el: ".swiper-pagination",
  //         clickable: true,
  //     },
  //     navigation: {
  //         nextEl: ".swiper-button-next",
  //         prevEl: ".swiper-button-prev",
  //     },
  //     loop: true,
  //     autoplay: {
  //         delay: 5000,
  //         disableOnInteraction: false
  //     }
  // });
    },

}
</script>
<style lang="css" scoped>
.swiper {
  width: 600px;
  height: 320px;
}
.loginHeader {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: flex-start;

}

.containerHeader {

    width: 100%;
    height: 00%;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: space-around;
}

.containerHeader .texte {
    width: 65%;
    height: 100%;
    /* border: 1px solid blue; */
}

.containerHeader .formulaire {
   
    height: 100%;
    border: 1px solid rgb(203, 208, 204);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


/* Form */
.form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 400px;
    padding: 30px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    text-align: center;
}







.form button {
    outline: 0;
    background: #ffca08;
    width: 50%;
    border: 0;
    padding: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    color: #FFFFFF;
    font-size: 14px;
    transition: all 0.3 ease;
    cursor: pointer;
    margin-top: 10px;
}
.form button:hover {
  
    background: #fff; 
    border: 1px solid #ffca08;
    color: #ffca08 !important;
   
    
}

.form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
}

.form .message a {
    color: #ffca08;
    text-decoration: none;
}



.container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
}

.container:before,
.container:after {
    content: "";
    display: block;
    clear: both;
}

.container .info {
    margin: 0px auto;
    text-align: center;
}

.container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
}

.slide{
  
    height: 310px;
}

@media (max-width: 1200px) {
  .loginHeader{
    height: auto !important;
  }
  .formulaire{
    margin-top: 10px !important;
  }
 }

 a .lien:hover{
  color:red !important ;

}


</style>