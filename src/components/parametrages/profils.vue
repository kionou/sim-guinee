<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="row">
      <div class="col-12 col-lg-5 col-xl-4">
        <div class="box box-widget widget-user">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            class="widget-user-header bg-black"
            style="background: url('/src/assets/images/man.avif') center center"
          >
            <h3 class="widget-user-username">{{ this.step1.username }}</h3>
            <h6 class="widget-user-desc">{{ this.step1.role }}</h6>
          </div>
          <div class="widget-user-image">
            <img
              class="rounded-circle"
              src="@/assets/images/man.avif"
              alt="User Avatar"
            />
          </div>
          <div class="box-footer">
            <div class="row">
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">12K</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 br-1 bl-1">
                <div class="description-block">
                  <h5 class="description-header">550</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">158</h5>
                  <span class="description-text">TWEETS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
        <div class="box">
          <div class="box-body box-profile">
            <div class="row">
              <div class="col-12">
                <div>
                  <p>
                    Nom :<span class="text-gray pl-10"
                      >{{ this.step1.lastname }} {{ this.step1.firstname }}</span
                    >
                  </p>
                  <p>
                    Email :<span class="text-gray pl-10">{{ this.step1.email }}</span>
                  </p>
                  <p>
                    Phone :<span class="text-gray pl-10">{{ this.step1.whatsapp }}</span>
                  </p>
                  <p>
                    Address :<span class="text-gray pl-10">{{ this.step1.commune }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
      <div class="col-12 col-lg-7 col-xl-8">
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li>
              <a class="active" data-toggle="tab" href="#settings" role="tab"
                >Informations</a
              >
            </li>
            <li>
              <a data-toggle="tab" href="#password" role="tab">Mot de passe</a>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="settings" role="tabpanel">
              <div class="box p-15">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label">
                    Nom d'utilisateur</label
                  >

                  <div class="col-sm-10">
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
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label">Email</label>

                  <div class="col-sm-10">
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
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label">Prénom</label>

                  <div class="col-sm-10">
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
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label">Nom</label>

                  <div class="col-sm-10">
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
                <div class="form-group row">
                  <label for="inputEmail" class="col-sm-2 control-label">whatsapp</label>

                  <div class="col-sm-10">
                    <MazInput
                      v-model="step1.whatsapp"
                      color="secondary"
                      name="step1.whatsapp"
                      size="sm"
                      rounded-size="sm"
                      type="text"
                    />
                    <small v-if="v$.step1.whatsapp.$error">{{
                      v$.step1.whatsapp.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['whatsapp']">
                      {{ resultError["whatsapp"] }}
                    </small>
                  </div>
                </div>
                <div class="form-group justify-content-center row">
                  <div class="ml-auto col-sm-8">
                    <button @click="SubmitUsers" class="btn btn-primary">
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="password" role="tabpanel">
              <div class="box p-15">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label">
                    Mot de passe actuel</label
                  >

                  <div class="col-sm-10">
                    <MazInput
                      v-model="step2.old_pass"
                      color="secondary"
                      name="step2.old_pass"
                      size="sm"
                      rounded-size="sm"
                      type="text"
                    />
                    <small v-if="v$.step2.old_pass.$error">{{
                      v$.step2.old_pass.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['old_pass']">
                      {{ resultError["old_pass"] }}
                    </small>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label"
                    >Nouveau mot de passe</label
                  >

                  <div class="col-sm-10">
                    <MazInput
                      v-model="step2.password"
                      color="secondary"
                      name="step2.password"
                      size="sm"
                      rounded-size="sm"
                      type="text"
                    />
                    <small v-if="v$.step2.password.$error">{{
                      v$.step2.password.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['password']">
                      {{ resultError["password"] }}
                    </small>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputName" class="col-sm-2 control-label"
                    >Confirmation du mot de passe</label
                  >

                  <div class="col-sm-10">
                    <MazInput
                      v-model="step2.password_confirm"
                      color="secondary"
                      name="step2.password_confirm"
                      size="sm"
                      rounded-size="sm"
                      type="text"
                    />
                    <small v-if="v$.step2.password_confirm.$error">{{
                      v$.step2.password_confirm.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['password_confirm']">
                      {{ resultError["password_confirm"] }}
                    </small>
                  </div>
                </div>
                <div class="form-group justify-content-center row">
                  <div class="ml-auto col-sm-8">
                    <button @click="ChangePass" class="btn btn-primary">
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.tab-pane -->
          </div>
          <!-- /.tab-content -->
        </div>
        <!-- /.nav-tabs-custom -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div>
</template>
<script>
import Loading from "@/components/others/loading.vue";
import axios from "@/lib/axiosConfig";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail, ValidNumeri } from "@/functions/rules";
import { successmsg, errorMsg } from "@/lib/modal.js";
import Swal from "sweetalert2";
export default {
  components: {
    Loading,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  },
  data() {
    return {
      loading: true,
      UsersOptions: [],
      dataCommunes: [],
      data: [],
      ToId: "",
      step1: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        whatsapp: "",
        role: "",
        commune: "",
      },
      step2: {
        old_pass: "",
        password: "",
        password_confirm: "",
      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {
      username: { require },
      email: { require },
      firstname: { require },
      lastname: { require },
      whatsapp: { require, ValidNumeri, lgmin: lgmin(8) },
    },
    step2: {
      old_pass: { require, lgmin: lgmin(4) },
      password: { require, lgmin: lgmin(4) },
      password_confirm: { require, lgmin: lgmin(4) },
    },
  },
  async mounted() {
    await this.fetchCommunes();
    await this.HandleIdUpdate();
  },
  methods: {
    successmsg: successmsg,
    errorMsg: errorMsg,
    async fetchCommunes() {
      try {
        const response = await axios.get("/parametrages/localites/communes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.dataCommunes = response.data;
          this.loading = false;
        }
      } catch (error) {
        if (error.response.data.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
      }
    },
    async SubmitUsers() {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let url;
        let title = "";
        let message = "";
        const data = {
          username: this.step1.username,
          email: this.step1.email,
          firstname: this.step1.firstname,
          lastname: this.step1.lastname,
          whatsapp: this.step1.whatsapp,
          commune: this.step1.commune,
        };
        url = await axios.put(`/parametrages/utilisateurs/${this.ToId}`, data, {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
        });
        title = "Mise à jour de debarcadère";
        message = "Les données du debarcadère ont été mises à jour avec succès !";

        try {
          const response = url;
          console.log("qfs", response);

          if (response.status === 200) {
            this.successmsg(title, message);
            await this.fetchUsers();
          } else {
            this.loading = false;
          }
        } catch (error) {
          console.log("erroor", error);

          this.loading = false;
        }
      } else {
        this.loading = false;
        errorMsg("Erreur", "les données ne sont pas valides");
      }
    },
    async ChangePass() {
      this.v$.step2.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let url;
        let title = "";
        let message = "";
        const data = {
          old_pass: this.step2.old_pass,
          password: this.step2.password,
          password_confirm: this.step2.password_confirm,
        };
        url = await axios.post(`/parametrages/utilisateurs/${this.ToId}`, data, {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
        });
        title = "Mise à jour de mot de passe";
        message = "Le mot de passe a été mis à jour avec succès !";

        try {
          const response = url;

          if (response.status === 200) {
            this.successmsg(title, message);
            await this.fetchUsers();
            this.step2 = {
              old_pass: "",
              password: "",
              password_confirm: "",
            };
          } else {
            this.loading = false;
          }
        } catch (error) {
          console.log("erroor", error);

          this.loading = false;
        }
      } else {
        this.loading = false;
        errorMsg("Erreur", "les données ne sont pas valides");
      }
    },
    async HandleIdUpdate() {
      this.loading = true;

      try {
        const response = await axios.get(`/parametrages/profile`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step1.username = data.username),
            (this.step1.email = data.email),
            (this.step1.firstname = data.firstname),
            (this.step1.lastname = data.lastname),
            (this.step1.whatsapp = data.whatsapp),
            //   (this.step1.role = data.role),
            (this.step1.commune = data.commune),
            (this.ToId = data.username);
          this.loading = false;
        }
      } catch (error) {}
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

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Données du debarcadère supprimées",
            "Les données du debarcadère ont été supprimées avec succès !"
          );
          await this.fetchUsers();
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
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
  },
};
</script>
