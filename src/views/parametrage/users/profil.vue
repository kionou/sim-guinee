
<template>
  <div>
    <Loading v-if="loading" style="z-index: 999999"></Loading>
	<div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Profil </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Profil</li>
							</ol>
						</nav>
					</div>
				
				
			</div>
		</div>

    <div class=" card">
      <div class="row p-3">
        <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
          <div class="card overflow-hidden border" style="box-shadow: none; border: 1px solid #c9d1d9">
              <div class="account-pages ">
               
                  <div class="card-header">
                 <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Information general
                </h5>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="d-flex flex-column align-items-center">
                <div class="profile-pic text-center">
              <label class="-label" for="file">
                <span class="glyphicon glyphicon-camera"></span>
                <i class="ri-edit-line"></i> <span>Modifier</span>
              </label>
              <input id="file" type="file" @change="loadFile" />
              <img
                v-if="!image || !image.startsWith('https')"
                src="@/assets/img/user.png"
                id="output"
                width="200"
                accept="image/*"
              />
              <img v-else :src="image" id="output" width="200" />
               </div>
               <div>
                <small>{{ error }}</small>
                          <form data-request="onSignin" class="login_form">
                            <div class="row mb-3 content-group">
                              <div class="col">
                                <div class="input-group">
									<label for="userpassword"> Nom <span class="text-danger">*</span></label>
                                  <MazInput
                                    v-model="step2.firstname"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.firstname.$error">{{
                                    v$.step2.firstname.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
									<label for="userpassword"> Prenoms <span class="text-danger">*</span></label>
                                  <MazInput
                                    v-model="step2.lastname"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.lastname.$error">{{
                                    v$.step2.lastname.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
									<label for="userpassword"> Pseudo <span class="text-danger">*</span></label>
                                  <MazInput
                                    v-model="step2.username"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.username.$error">{{
                                    v$.step2.username.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
									<label for="userpassword"> Adresse Email <span class="text-danger">*</span></label>
                                  <MazInput
                                    v-model="step2.email"
                                    
                                    color="info"
                                    type="email" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.email.$error">{{
                                    v$.step2.email.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
									<label for="userpassword"> Commune <span class="text-danger">*</span></label>
                                  <MazSelect
                                    v-model="step2.commune"
                                    :options="communeOptions"
                                    color="info"
                                     size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.commune.$error">{{
                                    v$.email.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                
									<label for="userpassword"> Numéro Téléphonique <span class="text-danger">*</span></label>

                                  <MazPhoneNumberInput
                                    v-model="step2.whatsapp"
                                    show-code-on-list
                                    
                                    color="info"
                                    defaultCountryCode="GN"
                                    :ignored-countries="['AC']"
                                    @update="results = $event"
                                    :success="results?.isValid"
                                    noFlags="false" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.whatsapp.$error">{{
                                    v$.step2.whatsapp.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-0">
                              <div class="col-12 text-end">
                                <div class="button">
                                  <button
                                    class="btn btn-primary"
                                    @click.prevent="HamdlePassword"
                                  >
                                  Valider
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
               </div>


              </div>

            </div>
             
            </div>

          </div>
        
        </div>


        <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
          <div class="account-pages ">
              <div class="card overflow-hidden border" style="box-shadow: none; border: 1px solid #c9d1d9">
                <div class="card-header">
              <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Mot de passe
                </h5>
              </div>
            </div>
               
                <div class="card-body pt-0">
                      <div class="row">
                          <div class="p-2">
                                            <form class="form-horizontal">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="old_pass">Ancien mot de passe</label>
                                                            <MazInput v-model="step1.old_pass"  type="password" name="old_pass" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                                                            <small v-if="v$.step1.old_pass.$error">{{v$.step1.old_pass.$errors[0].$message}}</small>
                                                            <small v-if="resultError['old_pass']">{{resultError['old_pass']}}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="password">Nouveau mot de passe</label>
                                                            <MazInput v-model="step1.password"  type="password" name="password" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                                                            <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                                                            <small v-if="resultError['password']">{{resultError['password']}}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="password_confirm">Confirmer le mot de passe</label>
                                                            <MazInput v-model="step1.password_confirm"  type="password" name="password_confirm" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                                                            <small v-if="v$.step1.password_confirm.$error">{{v$.step1.password_confirm.$errors[0].$message}}</small>
                                                            <small v-if="resultError['password_confirm']">{{resultError['password_confirm']}}</small>
                                                            <small v-if="!validatePasswordsMatch()">Les mots de passe ne correspondent pas.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-0">
                                                    <div class="col-12 text-end">
                                                        <div class="button">
                                                            <button class="btn btn-primary" @click.prevent="HamdleAddUser()">Valider</button>
                                                        </div>
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
       
    </div>
  </div>
</template>
<script>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazDialog from "maz-ui/components/MazDialog";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax } from "@/functions/rules";
import axios from "@/lib/axiosConfig.js";
import Loading from "@/components/others/loading.vue";
import { successmsg } from "@/lib/modal.js";
import { mapActions } from "vuex";
 import Swal from 'sweetalert2'

export default {
  name: "CositLSignUser",
  components: {
    MazPhoneNumberInput,
    MazDialog,
    Loading,
  },
  data() {
    return {
      isOpen: false,
      loading: true,
      isOpenPassword: false,
      communeOptions:[],
      menus:[],
      permissions:[],
    
      v$: useVuelidate(),
      errorPassword: "",
      error: "",
      id: "",
      image: "",
      roles: "",
      password: "",
    
      step1:{
            old_pass:'',
            password:'',
            password_confirm:'',
              }, 
              step2:{
                whatsapp: "",
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                commune: "",
              },
              resultError: {},
    };
  },
  validations: {
    step2:{
      whatsapp: {
      require,
    },
    email: {
      require,
    },
    lastname: {
      require,
      lgmin: lgmin(2),
    },
    firstname: {
      require,
      lgmin: lgmin(2),
    },
    username: {
      require,
      lgmin: lgmin(2),
    },
    commune: {
      require,
      
    },
    },
   
   
    step1:{
        old_pass: {
            require,
            lgmin: lgmin(5),
            lgmax: lgmax(100),
         
       },
       password: {
            require,
            lgmin: lgmin(5),
            lgmax: lgmax(100),
       },
       password_confirm: {
            require,
            lgmin: lgmin(5),
            lgmax: lgmax(100),
       },
      
       },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
      
    },
  },
  async mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    await this.fetchUserDetail('update');
    await this.getCommune()

  },
  methods: {
    ...mapActions("auth", ["setMyAuthenticatedUser"]),
    successmsg: successmsg,
    validatePasswordsMatch() {
     return this.step1.password === this.step1.password_confirm;
    },
    async fetchUserDetail() {
      try {
        const response = await axios.get('/parametrages/profile', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.status === 200) {
          const data = response.data;
          this.step2.firstname = data.firstname;
          this.step2.lastname = data.lastname;
          this.step2.username= data.username;
          this.step2.email = data.email;
          this.step2.whatsapp = data.whatsapp;
          this.step2.commune = data.commune;
          this.id = data.id;
        //   this.image = data.photo,
		  this.roles = data.role
        //   this.menus = data.roles[0].menus
        //   this.permissions = data.roles[0].permissions
      // await this.HandleIdStatut(a)
            
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
    async getCommune() {
		try {
        const response = await axios.get('/parametrages/localites/communes',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
  
          }
        );
  
        if (response.status === 200) {
      response.data.map(item => this.communeOptions.push({
        label: item.nom_commune,
        value: item.id_commune
        }))
          
        }
		this.loading = false
      } catch (error) {
  
      
      }
    
    },

    async HamdleSign() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.loading = true;
      this.isOpenPassword = false;
      let DataUser = {
       
        email: this.step2.email,
        firstname: this.step2.firstname,
        lastname: this.step2.lastname,
        username: this.step2.username,
        whatsapp: this.step2.whatsapp,
        commune: this.step2.commune,
	    	role:this.roles
        
      };
      try {
        const response = await axios.put(`/parametrages/utilisateurs/${this.loggedInUser.username}`, DataUser, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
       
        if (response.status === 200) {
				this.loading = false;
				this.successmsg(
				"Modification du compte",
				"Votre compte a été mis à jour avec succès !"
				);
        this.fetchUserDetail()


return
          const updatedUser = response.data.data;
          let role_id;
      if (Array.isArray(this.loggedInUser.role_id)) {
        role_id = this.loggedInUser.role_id.length > 0 ? this.loggedInUser.role_id[0].id : null;
      } else {
        role_id = this.loggedInUser.role_id;
      }
      console.log('menus',this.menus);
      

      this.$store.dispatch('auth/setMyAuthenticatedUser', {
        user: {
          id: updatedUser.id,
          Nom: updatedUser.Nom,
          Prenoms: updatedUser.Prenoms,
          email: updatedUser.email,
          Whatsapp: updatedUser.Whatsapp,
          photo: updatedUser.photo,
          username:updatedUser.username,
        },
        menus:this.menus,
        permissions:this.permissions,
        user_role:this.loggedInUser.user_role,
        roles: role_id,
        expires_in: this.loggedInUser.tokenExpiration - Math.floor(Date.now() / 1000),
        access_token: this.loggedInUser.token,
        });

       
        } else {
          this.loading = false;
          console.log(response);
        }
      } catch (error) {
        console.error("errorzzzz", error);
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },

    HamdlePassword() {
      this.v$.step2.$touch();
      this.error = "";
      if (this.v$.$errors.length == 0) {
        this.HamdleSign();
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },

    async loadFile(event) {
      // this.loading = true;
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profile", file);
      return

      try {
        const response = await axios.post("/auth-user-profile", formData, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response);

        if (response.data.status === "success") {
          const updatedUser = response.data.data;
          let role_id;
      if (Array.isArray(this.loggedInUser.role_id)) {
        role_id = this.loggedInUser.role_id.length > 0 ? this.loggedInUser.role_id[0].id : null;
      } else {
        role_id = this.loggedInUser.role_id;
      }

      this.$store.dispatch('auth/setMyAuthenticatedUser', {
        user: {
          id: updatedUser.id,
          Nom: updatedUser.Nom,
          Prenoms: updatedUser.Prenoms,
          email: updatedUser.email,
          Whatsapp: updatedUser.Whatsapp,
          photo: updatedUser.photo,
          username:updatedUser.username,
        },
        menus:this.menus,
        permissions:this.permissions,
        user_role:this.loggedInUser.user_role,
        roles: role_id,
        expires_in: this.loggedInUser.tokenExpiration - Math.floor(Date.now() / 1000),
        access_token: this.loggedInUser.token,
        });
          this.fetchUserDetail(); 
          this.loading = false;
          this.successmsg(
            "Modification du compte",
            "Votre compte a été mis à jour avec succès !"
          );

        } else {
          console.log("errorrr", response.data);
          this.errorImage = "L'enregistrement a échoué !!!";
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des données MPME guinee :",
          error
        );
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    async HamdleAddUser(){
         this.error = '',
         this.resultError= '',
        this.v$.step1.$touch()
        if (this.v$.$errors.length == 0 ) {
            // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
            const result = await Swal.fire({
              title: "Êtes-vous sûr ?",
              text: "Vous ne pourrez pas revenir en arrière !",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Oui, modifiez-le !",
              cancelButtonText: "Non, annulez !",
              reverseButtons: true,
            });
    
         // Si l'utilisateur confirme la suppression
         if (result.isConfirmed) {
           this.confirmDelete();
         }
           }else{
           
          
           
           } 
    },
    async confirmDelete() {
        this.loading = true
    let DataUser = {
      old_pass:this.step1.old_pass,
      password:this.step1.password,
      password_confirm:this.step1.password_confirm
    }
    
    try {
  
    const response = await axios.post(`/parametrages/utilisateurs/${this.loggedInUser.username}?is_agent=${false}` , DataUser, {
        headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
      });

    if (response.status === 200) { 
      
      this.loading = false
      this.step1 = {
      old_pass:'',
      password:'',
      password_confirm:'',
          },
      this.v$.step1.$reset();
      	//  this.fetchUserDetail('add')

       this.successmsg("Modification du mot de passe", "Votre mot de passe a été modifié avec succès !");

    } else {

    }



} catch (error) {
console.log('response.login', error); 

this.loading = false
if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
      await this.$store.dispatch('auth/clearMyAuthenticatedUser');
    this.$router.push("/");  //a revoir
  }
if (error.response.data.status === "error") {
return this.error = error.response.data.message


} else {
this.formatValidationErrors(error.response.data.errors);
}
} 
    },
    async HandleIdStatut(a) {
      try {
        const response = await axios.get('/parametrages/utilisateurs/statut', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            username: this.loggedInUser.username
          }
        });

        if (response.status === 200) {
          if(a === 'add'){
            this.successmsg(
            "Données de l'utilisateur mises à jour",
            "Les données de l'utilisateur ont été mises à jour avec succès !"
          );
          }
         
          this.$router.push({ path: '/sim/profil' })
		     
          this.loading = false;
        }
      } catch (error) {
         
      }

    },
           
           async formatValidationErrors(errors) {
         const formattedErrors = {};
    
         for (const field in errors) {
           const errorMessages = errors[field]; // Liste complète des messages d'erreur
           console.log(" errorMessages", errorMessages, typeof errorMessages);
    
           const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
           console.log(" concatenatedError", concatenatedError, typeof concatenatedError);
    
           formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
         }
    
         this.resultError = formattedErrors; // Stockez les erreurs dans un objet
    
         // Maintenant, this.resultError est un objet où les clés sont les noms des champs
         console.log("resultError", this.resultError);
       },
  },
};
</script>
<style lang="css" scoped>
.container-general {
  /* border: 1px solid red; */
  display: flex;
  padding: 30px 0;
}


.hero-content {
  background-repeat: no-repeat;
  /* background-size: cover; */
}

#container {
  box-shadow: var(--shadow-medium);
  border: 1px solid #d9d9d9;
}

#main-wrapper.oxyy-login-register {
  background: #fff;
}

.oxyy-login-register .hero-wrap {
  position: relative;
  overflow: hidden;
}

.oxyy-login-register .hero-wrap .hero-mask {
  z-index: 1;
}

.oxyy-login-register .hero-wrap .hero-mask,
.oxyy-login-register .hero-wrap .hero-bg,
.oxyy-login-register .hero-wrap .hero-bg-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.oxyy-login-register .bg-secondary {
  background-color: #fff !important;
}
.oxyy-login-register .opacity-4 {
  opacity: 0.4;
}

.oxyy-login-register .hero-wrap .hero-bg.hero-bg-scroll {
  background-attachment: scroll;
}

.oxyy-login-register .hero-wrap .hero-bg {
  z-index: 0;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  transition: background-image 300ms ease-in 200ms;
}
.oxyy-login-register .hero-wrap .hero-mask,
.oxyy-login-register .hero-wrap .hero-bg,
.oxyy-login-register .hero-wrap .hero-bg-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.oxyy-login-register .hero-wrap .hero-content {
  position: relative;
  z-index: 2;
}

.oxyy-login-register .font-weight-700 {
  font-weight: 700 !important;
}

.oxyy-login-register .text-5 {
  font-size: 21px !important;
  font-size: 1.3125rem !important;
}

.oxyy-login-register .font-weight-600 {
  font-weight: 600 !important;
}

.oxyy-login-register .text-9 {
  font-size: 36px !important;
  font-size: 2.25rem !important;
}
.text-color-orange {
  color: var(--color-primary);
}

.oxyy-login-register .text-primary,
.oxyy-login-register .btn-link {
  color: #007bff !important;
}

form {
  padding: 0;
  margin: 0;
  display: inline;
}

.form-group {
  margin-bottom: 1rem;
}

.oxyy-login-register .font-weight-600 {
  font-weight: 600 !important;
}

.text-color-orange {
  color: var(--color-primary);
}

.oxyy-login-register .form-control:not(.form-control-sm) {
  padding: 0.81rem 0.96rem;
  height: inherit;
}

.oxyy-login-register .form-control,
.oxyy-login-register .custom-select {
  border-color: #dae1e3;
  font-size: 16px;
  color: var(--color-defaut);
}

.oxyy-login-register .btn:not(.btn-link) {
  -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.oxyy-login-register .btn {
  padding: 0.8rem 2.6rem;
  font-weight: 500;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.form-container {
  width: 510px;
  border-radius: 0.75rem;

  z-index: 100;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* font-size: 1.5rem; */
  /* line-height: 2rem; */
  /* font-weight: 700; */
}

.title img {
  width: 90px;
  height: ç0px;
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--color-secondary);
  padding: 0.75rem;
  text-align: center;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 50px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}

.sign:hover {
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  background-color: white;
}

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  height: 210px;
  width: 210px;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 80%;
  height: 80%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  z-index: 0;
  border:1px solid #435971;
  border-radius: 50%;
  padding:2px;
}

.profile-pic .-label {
  left: 12px;
  cursor: pointer;
  height: 23px;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 10000;
  color: var(--color-primary);
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 0;
  position: absolute;
  top: 160px;
  border-radius: 3px;
  border: 1px solid var(--color-primary);
}

.profile-pic .-label:hover {
  background-color: var(--color-primary);
  color: #fff;
}

.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
}
@media (max-width: 1210px) {
  .container-general {
    flex-direction: column;
    align-items: center;
  }
  .class1{
    flex-direction: column;
    align-items: center;

  }
  .class2{
    
    width: 100%;

  }

  .cole {
    width: 100%;
  }
}

</style>
