<template >
    <div>
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
		
	  <div class="container-full">
		  
		
		<section class="content">

		  <div class="row">
			<div class="col-12 col-lg-6 col-xl-6">
				
			  <div class="nav-tabs-custom">
				<ul class="nav nav-tabs">
				
				  <li><a href="#settings" class="active" data-toggle="tab">Information general</a></li>
				</ul>

				<div class="tab-content">
				  <div class=" active tab-pane" id="settings">		

					<div class="box p-15">		
						<form class="form-horizontal form-element col-12">
						  <div class="form-group row">
							<label for="inputName" class="col-sm-2 control-label">Nom</label>

							<div class="col-sm-10">
							  <input type="email" class="form-control" id="inputName" placeholder="">
							</div>
						  </div>
						  <div class="form-group row">
							<label for="inputEmail" class="col-sm-2 control-label">Prenoms</label>

							<div class="col-sm-10">
							  <input type="email" class="form-control" id="inputEmail" placeholder="">
							</div>
						  </div>
						  <div class="form-group row">
							<label for="inputPhone" class="col-sm-2 control-label">Pseudo</label>

							<div class="col-sm-10">
							  <input type="tel" class="form-control" id="inputPhone" placeholder="">
							</div>
						  </div>
						  
						  <div class="form-group row">
							<label for="inputSkills" class="col-sm-2 control-label">Adresse Email</label>

							<div class="col-sm-10">
							  <input type="text" class="form-control" id="inputSkills" placeholder="">
							</div>
						  </div>
						  <div class="form-group row">
							<label for="inputSkills" class="col-sm-2 control-label">Numéro Téléphonique</label>

							<div class="col-sm-10">
							  <input type="text" class="form-control" id="inputSkills" placeholder="">
							</div>
						  </div>
						 
						 
						</form>
					</div>			  
				  </div>
				  <!-- /.tab-pane -->
				</div>
				<!-- /.tab-content -->
			  </div>
			  <!-- /.nav-tabs-custom -->
			</div>
			<!-- /.col -->		

			  <div class="col-12 col-lg-6 col-xl-6">
				<div class="nav-tabs-custom">
				<ul class="nav nav-tabs">
				
				  <li><a href="#settings" class="active" data-toggle="tab">Mot de passe</a></li>
				</ul>

				<div class="tab-content">
				  <div class=" active tab-pane" id="settings">		
					<div class="box p-15 ">		           
					  <div class="row justify-content-center">
						<div class="row  content-group">
				
  
							<div class="col-xl-12 px-0" >
				  <div class="input-groupe">
					<label for="userpassword">
						Ancien mot de passe <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.old_pass"
					  color="secondary"
					  name="step1.old_pass"
					  
					  size="sm"
					  rounded-size="sm"
					  type="password"
					  autocomplete="new-password"
					/>
					<small v-if="v$.step1.old_pass.$error">{{
					  v$.step1.old_pass.$errors[0].$message
					}}</small>
					<small v-if="resultError['old_pass']">
					  {{ resultError["old_pass"] }}
					</small>
				  </div>
				</div>


				<div class="col-xl-12 px-0" >
				  <div class="input-groupe">
					<label for="userpassword">
						Nouveau mot de passe <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.password"
					  color="secondary"
					  name="step1.password"
					  size="sm"
					  rounded-size="sm"
					  type="password"
					  autocomplete="new-password"
					/>
					<small v-if="v$.step1.password.$error">{{
					  v$.step1.password.$errors[0].$message
					}}</small>
					<small v-if="resultError['password']">
					  {{ resultError["password"] }}
					</small>
				  </div>
				</div>
  
				<div class="col-xl-12 px-0" >
				  <div class="input-groupe">
					<label for="userpassword">
					  Confirmer votre mot de passe <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.password_confirm"
					  color="secondary"
					  name="step1.password_confirm"
					  size="sm"
					  rounded-size="sm"
					  type="password"
					/>
					<small v-if="v$.step1.password_confirm.$error">{{
					  v$.step1.password_confirm.$errors[0].$message
					}}</small>
					<small v-if="resultError['password_confirm']">
					  {{ resultError["password_confirm"] }}
					</small>
					<small v-if="!validatePasswordsMatch()">Les mots de passe ne correspondent pas.</small>
				  </div>
				</div>
				<div class=" text-end mt-4">
			  <button
				type="button"
				@click="SubmitUpdatePassword('password')"
				class="waves-effect waves-light btn btn-primary"
			  >
				Valider
			  </button>
			</div>
				
			  </div>

						
						
					  </div>	
				  </div>			  
				  </div>
				  <!-- /.tab-pane -->
				</div>
				<!-- /.tab-content -->
			  </div>
				 
				
				
				

			  </div>

		  </div>
		  <!-- /.row -->

		</section>
		<!-- /.content -->
	  </div>
 
    </div>
</template>
<script>
  import Loading from "@/components/others/loading.vue";
  import axios from "@/lib/axiosConfig";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail, ValidNumeri } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
  import { useToast } from "vue-toastification";
export default {
	setup() {
   const toast = useToast();
   return { toast }
 },
	components: {
	  
	  Loading, MazPhoneNumberInput
	},
	computed: {
	  loggedInUser() {
		return this.$store.getters["auth/myAuthenticatedUser"];
	  },
	
	}, 
	data() {
	  return {
		loading: true,
		CommunesOptions:[],
		ToId: "",
		step1: {
			old_pass:"",
		  password: "",
		  password_confirm: "",
		 
		},
		step2: {
		  username: "",
		  email: "",
		  firstname: "",
		  lastname: "",
		  whatsapp: "",
		  role: "",
		  commune: "",
		},
		v$: useVuelidate(),
		error: "",
		resultError: {},
	  };
	},
	validations: {
	  step1: {

	
		old_pass: { require },
		password_confirm: { require, lgmin: lgmin(5) },
		password: { require },
		
	  },
	//   step2: {
	// 	username: { require },
	// 	email: { require , ValidEmail },
	// 	firstname: { require },
	// 	lastname: { require },
	// 	whatsapp: { require, },
	// 	commune: { require },
	// 	role: {},
	//   }
	},
	async mounted() {
	//   await this.fetchUsers();
	//   await this.fetchCommunes();
	//   await this.getRoles()
	},
	methods: {
	  successmsg: successmsg,
	  validatePasswordsMatch() {
      return this.step1.password === this.step1.password_confirm;
    },
	 
	
	  async fetchCommunes() {
		try {
		  const response = await axios.get("/parametrages/localites/communes", {
			headers: {
			  Authorization: `Bearer ${this.loggedInUser.token}`,
			},
		  });
  
		console.log("response", response);
		  if (response.status === 200) {
			response.data.map(item => this.CommunesOptions.push({
				label: item.nom_commune,
				value: item.id_commune
				}))
			this.loading = false;
		  }
		} catch (error) {
			this.handleErrorsGet(error);
		}
	  },
	
	  async SubmitUpdatePassword(modalId) {
		this.v$.step1.$touch();
		if (this.v$.$errors.length == 0) {
		  this.loading = true;
		  const data = {
			  
			  old_pass: this.step1.old_pass,
			  password_confirm: this.step1.password_confirm,
			  password: this.step1.password,
			
			};

		  try {
          const response = await axios.post("/signup", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
          }
          });
		  console.log('qfs', response)
		  if (response.status === 201 || response.status === 200) {
            this.closeModal(modalId);
			this.successmsg(
					"Création de l'utilisateur",
					"Votre utilisateur a été créé avec succès !"
				);


            await this.fetchUsers();
          } else {
          }
        } catch (error) {
			this.handleErrors(error);
        }
	 
		} else {
		}
	  },
	  async HandleIdUpdate(id , modalId) {
		this.openModal(modalId)
		this.stepModal = "update";
		this.loading = true;
  
		try {
		  const response = await axios.get(`/parametrages/utilisateurs/statut?username=${id}`,
			{
			  headers: {
				Authorization: `Bearer ${this.loggedInUser.token}`,
			  },
			}
		  );
  
		  if (response.status === 200) {
			console.log("Slbvlkjbv", response);
  
			let data = response.data;
			(this.step2.username = data.username),
			  (this.step2.email = data.email),
			  (this.step2.firstname = data.firstname),
			  (this.step2.lastname = data.lastname),
			  (this.step2.whatsapp = data.whatsapp),
			     (this.step2.role = data.role),
			  (this.step2.commune = data.commune),		
			  (this.ToId = data.username);
			this.loading = false;
		  }
		} catch (error) {
			this.handleErrorsGet(error);
		}
	  },
	  async submitUpdate(modalId) {
		console.log('bonjour')
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
			  username: this.step2.username,
			  email: this.step2.email,
			  firstname: this.step2.firstname,
			  lastname: this.step2.lastname,
			  whatsapp: this.step2.whatsapp,
			  commune: this.step2.commune,
			  role:this.step2.role,
        };

        try {
          const response = await axios.put(`/parametrages/utilisateurs/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
							this.successmsg(
					"Mise à jour de l'utilisateur",
					"Votre utilisateur a été mis à jour avec succès !"
				);
            await this.fetchUsers();
          }
        } catch (error) {
			this.handleErrors(error);
        }
      } else {
        this.loading = false;
		console.log('error',this.v$.$errors)
      }
    },
	  async HandleIdDelete(id) {
		// Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
		const result = await Swal.fire({
		  title: "Êtes-vous sûr ?",
		  text: "Vous ne pourrez pas annuler cette action !",
		  icon: "warning",
		  showCancelButton: true,
		  confirmButtonText: "Oui, supprimez-le !",
		  cancelButtonText: "Non, annulez !",
		  reverseButtons: true,
		});
  
		// Si l'utilisateur confirme la suppression
		if (result.isConfirmed) {
		  this.ConfirmeDelete(id);
		}
	  },
	  async ConfirmeDelete(id) {
		this.loading = true;
  
		try {
		  // Faites une requête pour supprimer l'élément avec l'ID itemId
		  const response = await axios.delete(`/utilisateurs/${id}`, {
			headers: {
			  Authorization: `Bearer ${this.loggedInUser.token}`,
			},
		  });
  
		  if (response.status === 201 || response.status === 200) {
			this.loading = false;
			this.successmsg(
					"Suppression de l'utilisateur",
					"Votre utilisateur a été supprimé avec succès !"
				);
			await this.fetchUsers();
		  } else {
			this.loading = false;
		  }
		} catch (error) {
			this.handleErrors(error);
		}
	  },
	  async HandleIdDeleteStatus(id) {
		// Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
		const result = await Swal.fire({
		  title: "Êtes-vous sûr ?",
		  text: "Vous ne pourrez pas annuler cette action !",
		  icon: "warning",
		  showCancelButton: true,
		  confirmButtonText: "Oui, modifiez-le !",
		  cancelButtonText: "Non, annulez !",
		  reverseButtons: true,
		});
  
		// Si l'utilisateur confirme la suppression
		if (result.isConfirmed) {
		  this.HandleIdStatut(id);
		}
	  },
	  async HandleIdStatut(id) {
      this.loading = true;
      try {
        const response = await axios.get('/parametrages/utilisateurs/statut', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            username: id
          }
        });

        if (response.status === 200) {
          this.successmsg(
            "Données de l'utilisateur mises à jour",
            "Les données de l'utilisateur ont été mises à jour avec succès !"
          );
          await this.fetchUsers();
          this.loading = false;
        }
      } catch (error) {
       
        this.handleErrorsGet(error);


        
      }

    },
	  filterByName() {
		this.currentPage = 1;
		if (this.searchUsers !== null) {
		  const tt = this.searchUsers;
		  const searchValue = tt.toLowerCase();
		  console.log('user',searchValue)
		  this.UsersOptions = this.data.filter((user) => {
			const Username = user.username || "";
			const Email = user.email || "";
			const Firstname = user.firstname || "";
			const Lastname = user.lastname || "";
			const Whatsapp = user.whatsapp || "";
			const Commune = user.commune_relation?.nom_commune || "";
			const Role = user.role || "";
			// const Status = user.status || "";
			return (
			  Username.toLowerCase().includes(searchValue) ||
			  Email.toLowerCase().includes(searchValue) ||
			  Firstname.toLowerCase().includes(searchValue) ||
			  Lastname.toLowerCase().includes(searchValue) ||
			  Whatsapp.toLowerCase().includes(searchValue) ||
			  Commune.toLowerCase().includes(searchValue) ||
			  Role.toLowerCase().includes(searchValue) 
			//   Status.toLowerCase().includes(searchValue)
			);
		  });
		} else {
		  this.UsersOptions = [...this.data];
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
	async handleErrorsGet(error) {
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
		return this.UsersOptions.slice(startIndex, endIndex);
	  },
	},
}
</script>
<style lang="css" scoped>
    
</style>