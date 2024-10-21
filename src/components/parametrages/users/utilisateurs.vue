<template>
	<div>
		<Loading v-if="loading" style="z-index: 99999"></Loading>
       
	  <div class="col-12">
		<div class="box">
		  <div
			class="box-header with-border d-flex justify-content-between align-items-center p-3"
		  >
			<h3 class="box-title mb-0">Liste des utilisateurs</h3>
			<div class="navbar-custom-menu r-side  float-right">
			  <ul class="nav navbar-nav justify-content-end">
				<li class="btn-group d-lg-inline-flex  h-40">
				  <div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchUsers" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				  </div>
				</li>
				<li class="h-40">
				  <button
					type="button"
					class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
					@click="openModal('add-user')" 
					
					>
					<i class="mdi mdi-plus"></i>
				  </button>
				</li>
			  </ul>
			</div>
		  </div>
		  <!-- /.box-header -->
		  <div class="box-body">
			<div class="table-responsive">
			  <table id="example1" class="table table-bordered table-striped">
				<thead>
				  <tr>
					<th>Nom & Prenoms</th>
					<th>Coordonnées</th>
					<th>Role</th>
					<th>Commune</th>
					<th>Status</th>
					<th>Actions</th>
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
				  <tr v-for="(data) in paginatedItems" :key="data.id_user">
					<td>
					  <div class="widget-user-image">
						<img
						  class="rounded-circle border-1"
						  width="50"
						  src="@/assets/img/user.png"
						  alt="User Avatar"
						  style="float: left; margin-right: 10px"
						/>
						<div style="display: inline-block">
						  <span style="font-weight: 600; font-size: 1.1em; display: block"
							>{{ data.lastname }} {{ data.firstname }}</span
						  >
						  <span style="display: block">{{ data.username }}</span>
						</div>
					  </div>
					</td>
					
					<td>
					  <span style="font-weight: 600; font-size: 1.1em">{{
						data.email
					  }}</span>
					  <br />
					  {{ data.whatsapp }}
					</td>
					<td>{{ data.role ?? "pas rôle" }}</td>
					<td>
					  {{ data.commune_relation?.nom_commune ?? "-" }}
					</td>
					
					<td>
					  <!-- <a href="javascript:void(0)" :class=" data.status ? 'btn btn-circle btn-success btn-xs': 'btn btn-circle btn-danger btn-xs'
"
						title=""
						><i :class="data.status ? 'ti-lock' : 'ti-unlock'"></i>
					  </a> -->
					  <a v-if="data?.status === true" @click="HandleIdDeleteStatus(data?.username)" href="javascript:void(0)" class="btn btn-circle btn-success btn-xs"><i class="ti-lock "></i></a>
					  <a v-else href="javascript:void(0)" @click="HandleIdDeleteStatus(data?.username)" class="btn btn-circle btn-danger btn-xs"><i class="ti-unlock "></i></a>
					</td>
					<td style="width: 100px">
					  <div class="d-flex justify-content-evenly border-0">
						<a
						  href="javascript:void(0)"
						  class="btn btn-circle btn-info btn-xs"
						  title=""
						  @click="HandleIdUpdate(data.username , 'update-user')"
						
						  ><i class="ti-marker-alt"></i
						></a>
						<a
						  href="javascript:void(0)"
						  class="btn btn-circle btn-danger btn-xs"
						  @click="HandleIdDelete(data.username)"
						  title=""
						  data-toggle="tooltip"
						  data-original-title="Delete"
						  ><i class="ti-trash"></i
						></a>
					  </div>
					</td>
				  </tr>
				</tbody>
			  </table>
			</div>
			<div class="row">
			  <div class="col-lg-12">
				<div class="container_pagination">
				  <Pag
					:current-page="currentPage"
					:total-pages="totalPages"
					@page-change="updateCurrentPage"
				  />
				</div>
			  </div>
			</div>
		  </div>
		  <!-- /.box-body -->
		</div>
	  </div>
  
	  <div class="modal center-modal fade" id="add-user" ref="add-user" tabindex="-1">
		<div class="modal-dialog modal-lg">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title">
				Ajouter un utilisateur
			  </h5>
			  <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-user')" >
              <span aria-hidden="true">&times;</span>
            </button>
			</div>
			<div class="modal-body">
			  <div class="row mt-3 content-group">
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Nom <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.firstname"
					  color="secondary"
					  name="step1.firstname"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step1.firstname.$error">{{
					  v$.step1.firstname.$errors[0].$message
					}}</small>
					<small v-if="resultError['firstname']">
					  {{ resultError["firstname"] }}
					</small>
				  </div>
				</div>
  
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Prenoms <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.lastname"
					  color="secondary"
					  name="step1.lastname"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step1.lastname.$error">{{
					  v$.step1.lastname.$errors[0].$message
					}}</small>
					<small v-if="resultError['lastname']">
					  {{ resultError["lastname"] }}
					</small>
				  </div>
				</div>
  
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Pseudo <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.username"
					  color="secondary"
					  name="step1.username"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step1.username.$error">{{
					  v$.step1.username.$errors[0].$message
					}}</small>
					<small v-if="resultError['username']">
					  {{ resultError["username"] }}
					</small>
				  </div>
				</div>
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Adresse Email <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step1.email"
					  color="secondary"
					  name="step1.email"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step1.email.$error">{{
					  v$.step1.email.$errors[0].$message
					}}</small>
					<small v-if="resultError['email']">
					  {{ resultError["email"] }}
					</small>
				  </div>
				</div>
  
				
				<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Whatsapp <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step1.whatsapp" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step1.whatsapp.$error">{{
                        v$.step1.whatsapp.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['whatsapp']">
                        {{ resultError["whatsapp"] }}
                      </small>
                    </div>
                  </div>
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Commune <span class="text-danger">*</span>
					</label>
					<MazSelect
						v-model="step1.commune"
						color="secondary"
						name="step1.commune"
						size="sm"
						rounded-size="sm"
						search
						:options="CommunesOptions"
						
                              
                            />
					<small v-if="v$.step1.commune.$error">{{
					  v$.step1.commune.$errors[0].$message
					}}</small>
					<small v-if="resultError['commune']">
					  {{ resultError["commune"] }}
					</small>
				  </div>
				</div>
				<div class="col-12">
				  <div class="input-groupe">
					<label for="userpassword">
					  Role <span class="text-danger">*</span>
					</label>
					<MazSelect
						v-model="step1.role"
						color="secondary"
						name="step1.role"
						size="sm"
						rounded-size="sm"
						search
						:options="CommunesOptions"
						
                              
                            />
					<small v-if="v$.step1.role.$error">{{
					  v$.step1.role.$errors[0].$message
					}}</small>
					<small v-if="resultError['role']">
					  {{ resultError["role"] }}
					</small>
				  </div>
				</div>
				<div class="col-6" >
				  <div class="input-groupe">
					<label for="userpassword">
					  Mot de passe <span class="text-danger">*</span></label
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
  
				<div class="col-6" v-if="stepModal === 'add'">
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
  
				
			  </div>
			</div>
			<div class="modal-footer modal-footer-uniform text-end">
			  <button
				type="button"
				@click="SubmitUsers('add-user')"
				class="waves-effect waves-light btn btn-primary"
			  >
				Valider
			  </button>
			</div>
		  </div>
		</div>
	  </div>

	  <div class="modal center-modal fade" id="update-user" ref="update-user" tabindex="-1">
		<div class="modal-dialog modal-lg">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title">
				Modifier un utilisateur
			  </h5>
			  <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-user')" >
              <span aria-hidden="true">&times;</span>
            </button>
			</div>
			<div class="modal-body">
			  <div class="row mt-3 content-group">
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Nom <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step2.firstname"
					  color="secondary"
					  name="step2.firstname"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step2.firstname.$error">{{
					  v$.step2.firstname.$errors[0].$message
					}}</small>
					<small v-if="resultError['firstname']">
					  {{ resultError["firstname"] }}
					</small>
				  </div>
				</div>
  
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Prenoms <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step2.lastname"
					  color="secondary"
					  name="step2.lastname"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step2.lastname.$error">{{
					  v$.step2.lastname.$errors[0].$message
					}}</small>
					<small v-if="resultError['lastname']">
					  {{ resultError["lastname"] }}
					</small>
				  </div>
				</div>
  
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Pseudo <span class="text-danger">*</span></label
					>
					<MazInput
					  v-model="step2.username"
					  color="secondary"
					  name="step2.username"
					  size="sm"
					  rounded-size="sm"
					  type="text"
					/>
					<small v-if="v$.step2.username.$error">{{
					  v$.step2.username.$errors[0].$message
					}}</small>
					<small v-if="resultError['username']">
					  {{ resultError["username"] }}
					</small>
				  </div>
				</div>
				<div class="col-6">
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
					  type="text"
					/>
					<small v-if="v$.step2.email.$error">{{
					  v$.step2.email.$errors[0].$message
					}}</small>
					<small v-if="resultError['email']">
					  {{ resultError["email"] }}
					</small>
				  </div>
				</div>
  
				
				<div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Numéro Whatsapp <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step2.whatsapp" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step2.whatsapp.$error">{{
                        v$.step2.whatsapp.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['whatsapp']">
                        {{ resultError["whatsapp"] }}
                      </small>
                    </div>
                  </div>
				<div class="col-6">
				  <div class="input-groupe">
					<label for="userpassword">
					  Commune <span class="text-danger">*</span>
					</label>
					<MazSelect
						v-model="step2.commune"
						color="secondary"
						name="step2.commune"
						size="sm"
						rounded-size="sm"
						search
						:options="CommunesOptions"
						
                              
                            />
					<small v-if="v$.step2.commune.$error">{{
					  v$.step2.commune.$errors[0].$message
					}}</small>
					<small v-if="resultError['commune']">
					  {{ resultError["commune"] }}
					</small>
				  </div>
				</div>
				<div class="col-12">
				  <div class="input-groupe">
					<label for="userpassword">
					  Role <span class="text-danger">*</span>
					</label>
					<MazSelect
						v-model="step2.role"
						color="secondary"
						name="step2.role"
						size="sm"
						rounded-size="sm"
						search
						:options="CommunesOptions"
						
                              
                            />
					<small v-if="v$.step2.role.$error">{{
					  v$.step2.role.$errors[0].$message
					}}</small>
					<small v-if="resultError['role']">
					  {{ resultError["role"] }}
					</small>
				  </div>
				</div>
			  </div>
			</div>
			<div class="modal-footer modal-footer-uniform text-end">
			  <button
				type="button"
				@click="submitUpdate('update-user')"
				class="waves-effect waves-light btn btn-primary"
			  >
				Valider
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  <script>
  import Pag from "@/components/others/pagination.vue";
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
	  Pag,
	  Loading, MazPhoneNumberInput
	},
	computed: {
	  loggedInUser() {
		return this.$store.getters["auth/myAuthenticatedUser"];
	  },
	  totalPages() {
		return Math.ceil(this.UsersOptions.length / this.itemsPerPage);
	  },
	  paginatedItems() {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		return this.UsersOptions.slice(startIndex, endIndex);
	  },
	},
	data() {
	  return {
		loading: true,
		UsersOptions: [],
		CommunesOptions:[],
		data: [],
		currentPage: 1,
		itemsPerPage: 10,
		ToId: "",
		stepModal: "add",
		searchUsers: "",
		totalPageArray: [],
		step1: {
		  username: "",
		  email: "",
		  firstname: "",
		  lastname: "",
		  whatsapp: "",
		  role: "",
		  password: "",
		  password_confirm: "",
		  commune: "",
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
		username: { require },
		email: { require , ValidEmail },
		firstname: { require },
		lastname: { require },
		whatsapp: { require, },
		commune: { require },
		password_confirm: { require, lgmin: lgmin(5) },
		password: { require },
		role: {},
	  },
	  step2: {
		username: { require },
		email: { require , ValidEmail },
		firstname: { require },
		lastname: { require },
		whatsapp: { require, },
		commune: { require },
		role: {},
	  }
	},
	async mounted() {
	  await this.fetchUsers();
	  await this.fetchCommunes();
	},
	methods: {
	  successmsg: successmsg,
	  validatePasswordsMatch() {
      return this.step1.password === this.step1.password_confirm;
    },
	 
	  async fetchUsers() {
		try {
		  const response = await axios.get("/utilisateurs", {
			headers: {
			  Authorization: `Bearer ${this.loggedInUser.token}`,
			},
		  });
  
		  console.log("response", response);
		  if (response.status === 200) {
			this.data = response.data;
			this.UsersOptions = this.data;
			this.loading = false;
		  }
		} catch (error) {
			this.handleErrors(error);
		}
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
			this.handleErrors(error);
		}
	  },
	  async SubmitUsers(modalId) {
		this.v$.step1.$touch();
		if (this.v$.$errors.length == 0) {
		  this.loading = true;
		  const data = {
			  username: this.step1.username,
			  email: this.step1.email,
			  firstname: this.step1.firstname,
			  lastname: this.step1.lastname,
			  whatsapp: this.step1.whatsapp,
			  commune: this.step1.commune,
			  password_confirm: this.step1.password_confirm,
			  password: this.step1.password,
			  role: null,
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
			this.handleErrors(error);
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
			  role:null,
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
       
        this.handleErrors(error);


        
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
  };
  </script>
  <style lang="css" scoped></style>
  