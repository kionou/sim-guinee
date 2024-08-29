<template>
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
                    <h3 class="box-title mb-0">Liste des utilisateurs</h3>
                    <div class="navbar-custom-menu r-side">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="btn-group d-lg-inline-flex d-none h-40">
                                <div class="app-menu">
                                    <div class="search-bx mx-5">
                                        <form>
                                            <div class="input-group">
                                                <input type="search" class="form-control" placeholder="Search"
                                                    aria-label="Search" aria-describedby="button-addon2" />
                                                <div class="input-group-append">
                                                    <button class="btn border border-1">
                                                        <i class="ti-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li class="h-40">
                                <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
                                    data-toggle="modal" data-target="#modal-users"
                                    @click="stepModal = 'add'; initUser()">
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
                                    <th class="text-center">N°</th>
                                    <th>Nom d'utilisateur</th>
                                    <th>email</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Whatsapp</th>
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
                                <tr v-for="(data, index) in paginatedItems" :key="data.id_user">
                                    <td style="width: 50px" class="text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td>{{ data.username }}</td>
                                    <td>{{ data.email }}</td>
                                    <td>{{ data.lastname }}</td>
                                    <td>{{ data.firstname }}</td>
                                    <td>{{ data.whatsapp }}</td>
                                    <td>{{ data.role }}</td>
                                    <td>{{ data.commune }}</td>
                                    <td>{{ data.status }}</td>
                                    <td style="width: 100px">
                                        <div class="d-flex justify-content-evenly border-0">
                                            <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title=""
                                                @click="HandleIdUpdate(data.username)" data-original-title="Update"
                                                data-toggle="modal" data-target="#modal-users"><i
                                                    class="ti-marker-alt"></i></a>
                                            <!-- <a
                          href="javascript:void(0)"
                          class="btn btn-circle btn-danger btn-xs"
                          @click="HandleIdDelete(data.username)"
                          title=""
                          data-toggle="tooltip"
                          data-original-title="Delete"
                          ><i class="ti-trash"></i
                        ></a> -->
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="container_pagination">
                                <Pag :current-page="currentPage" :total-pages="totalPages"
                                    @page-change="updateCurrentPage" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
        </div>

        <div class="modal center-modal fade" id="modal-users" ref="modal-users" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            {{ stepModal === "add" ? "Ajouter" : "Modifier" }} un utilisateur
                        </h5>
                        <button type="button" class="close btn btn-danger py-1 px-3" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3 content-group">
                            <div class="col-6">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Nom d'utilisateur <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.username" color="secondary" name="step1.username" size="sm"
                                        rounded-size="sm" type="text" />
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
                                        email <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.email" color="secondary" name="step1.email" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.email.$error">{{
                                        v$.step1.email.$errors[0].$message
                                    }}</small>
                                    <small v-if="resultError['email']">
                                        {{ resultError["email"] }}
                                    </small>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        firstname <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.firstname" color="secondary" name="step1.firstname"
                                        size="sm" rounded-size="sm" type="text" />
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
                                        lastname <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.lastname" color="secondary" name="step1.lastname" size="sm"
                                        rounded-size="sm" type="text" />
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
                                        whatsapp <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.whatsapp" color="secondary" name="step1.whatsapp" size="sm"
                                        rounded-size="sm" type="text" />
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
                                    <select v-model="step1.commune" class="form-select" name="step1.commune">
                                        <option value="" disabled>Sélectionnez une commune</option>
                                        <option v-for="commune in dataCommunes" :key="commune.id_commune"
                                            :value="commune.id_commune">
                                            {{ commune.nom_commune }}
                                        </option>
                                    </select>
                                    <small v-if="v$.step1.commune.$error">{{
                                        v$.step1.commune.$errors[0].$message
                                    }}</small>
                                    <small v-if="resultError['commune']">
                                        {{ resultError["commune"] }}
                                    </small>
                                </div>
                            </div>

                            <div class="col-6" v-if="stepModal=== 'add'">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Mot de passe <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.password" color="secondary" name="step1.password" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.password.$error">{{
                                        v$.step1.password.$errors[0].$message
                                    }}</small>
                                    <small v-if="resultError['password']">
                                        {{ resultError["password"] }}
                                    </small>
                                </div>
                            </div>

                            <div class="col-6" v-if="stepModal=== 'add'">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Confirmer votre mot de passe <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.password_confirm" color="secondary"
                                        name="step1.password_confirm" size="sm" rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.password_confirm.$error">{{
                                        v$.step1.password_confirm.$errors[0].$message
                                    }}</small>
                                    <small v-if="resultError['password_confirm']">
                                        {{ resultError["password_confirm"] }}
                                    </small>
                                </div>
                            </div>


                            <!-- 
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        role <span class="text-danger">*</span></label
                    >
                    <MazInput
                      v-model="step1.firstname"
                      color="secondary"
                      name="step1.role"
                      size="sm"
                      rounded-size="sm"
                      type="text"
                    />
                    <small v-if="v$.step1.role.$error">{{
                      v$.step1.role.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['role']">
                      {{ resultError["role"] }}
                    </small>
                  </div>
                </div> -->


                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform text-end">
                        <button type="button" @click="SubmitUsers('modal-users')"
                            class="waves-effect waves-light btn btn-primary">
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
export default {
    components: {
        Pag,
        Loading,
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
            dataCommunes: [],
            data: [],
            currentPage: 1,
            itemsPerPage: 10,
            ToId: "",
            stepModal: "add",
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
            commune: { require },
            password_confirm: { require, lgmin: lgmin(5) },
            password: { require }
        },
    },
    async mounted() {
        await this.fetchUsers();
        await this.fetchCommunes();
    },
    methods: {
        successmsg: successmsg,
        initUser() {
            this.step1 = {
                username: "",
                email: "",
                firstname: "",
                lastname: "",
                whatsapp: "",
                role: "",
                password: "",
                password_confirm: "",
                commune: "",
            }
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
                if (this.stepModal === "add") {
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
                    url = await axios.post("/signup", data, {
                        headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
                    });
                    title = "Création de debarcadère";
                    message = "Votre debarcadère a été crée avec succès !";
                } else {
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
                }

                try {
                    const response = url;
                    console.log("qfs", response);

                    if (response.status === 200) {
                        this.closeModal("modal-users");
                        this.successmsg(
                            title,
                            message
                        );
                        await this.fetchUsers();
                    } else {
                        this.loading = false;
                    }
                } catch (error) {
                    console.log("erroor", error);

                    this.loading = false;
                    //   if (error.response.data.status === "error") {
                    //     return (this.error = error.response.data.message);
                    //   } else {
                    //     this.formatValidationErrors(error.response.data.errors);
                    //   }
                }
            } else {
            }
        },
        async HandleIdUpdate(id) {
            this.stepModal = "update";
            this.loading = true;

            try {
                const response = await axios.get(`/parametrages/utilisateurs/statut?username=${id}`, {
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
                        (this.step1.password_confirm = "00000"),
                        (this.step1.password = "00000"),
                        (this.ToId = data.username);
                    this.loading = false;
                }
            } catch (error) { }
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
        filterByName() {
            this.currentPage = 1;
            if (this.control.name !== null) {
                const tt = this.control.name;
                const searchValue = tt.toLowerCase();
                this.ClientOptions = this.data.filter((user) => {
                    const Nom = user.duty_name || "";
                    const firstnames = user.firstnames || "";

                    return (
                        Nom.toLowerCase().includes(searchValue) ||
                        firstnames.toLowerCase().includes(searchValue)
                    );
                });
            } else {
                this.ClientOptions = [...this.data];
            }
        },
        closeModal(modalId) {
            let modalElement = this.$refs[modalId];
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            document.body.classList.remove("modal-open");
            let modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                modalBackdrop.parentNode.removeChild(modalBackdrop);
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