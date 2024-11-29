<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
            <div class="box">
                <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
                    <h3 class="box-title mb-0 col-8" style="font-size: 20px;">Liste des fiches d'enquêtes sur le marché <b
                            style="color:red !important">{{nom }}</b> dans la commune de <b
                            style="color:red !important">{{Commune.nom_commune }}</b> et dans la région <b
                            style="color:red !important">{{Commune?.prefecture_?.region_relation?.nom_region }}</b></h3>
    
    
                    <div class="navbar-custom-menu r-side  float-right col-4">
                        <ul class="nav navbar-nav justify-content-end">
    
                            <li class="btn-group d-lg-inline-flex  h-40">
                                <div class="app-menu">
                                    <div class="search-bx mx-5">
                                        <form>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Search"
                                                    aria-label="Recherchez..." aria-describedby="button-addon2"
                                                    v-model="searchFicheCollecteFiche" @input="filterByName">
                                                <div class="input-group-append">
                                                    <button class="btn border border-1"><i class="ti-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li class="h-40">
                                <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"
                                    @click="openModal('add-fiche-collecte')"><i class="mdi mdi-plus"></i></button>
                            </li>
    
    
                        </ul>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div>
        <div v-if="hasNewSelection" class="position-fixed  my-1" style="left: 30%;">
      <button class="btn " style="background-color: red; color:white" @click="validateSelection">
        <i class="mdi mdi-checkbox-marked-circle-outline"></i>
        Valider
      </button>
    </div>

    </div>
                    <div class="table-responsive">
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                                <tr>
    
                                    <th> <input type="checkbox"  @change="selectAll" 
                                        :checked="isAllSelected"></th>
                                    <th>N° Fiche</th>
                                    <th>Agent collecte</th>
                                    <th>Stock initial des bovins</th>
                                    <th>Stock initial des ovins</th>
                                    <th>Stock initial des caprins</th>
                                    <th>Nb de prod. collectés </th>
                                    <th>Date</th>
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
                                <tr v-for="(data )  in paginatedItems" :key="data.id">
                                    <td class="text-center" style="width:50px">
                                        <input type="checkbox"
                                            v-model="selectedItems" 
                                            :value="data.enquete?.num_fiche"
                                            :checked="data.enquete?.etat === true" 
                                            @change="updateSelection(data.enquete?.num_fiche, $event.target.checked)"
                                    
                                            >
    
                                    </td>
    
                                    <td style="width:100px !important">{{ data?.enquete?.num_fiche }}</td>
                                    <td>
                                        <div class="widget-user-image">
    
                                            <div style="display: inline-block">
                                                <span style="font-weight: 600; font-size: 1.1em; display: block">{{
                                                    data?.enquete?.collecteur_relation?.nom_collecteur }} {{
                                                    data?.enquete?.collecteur_relation?.prenom_collecteur }}</span>
                                                <span style="display: block; color:red !important">{{
                                                    data?.enquete?.collecteur_relation?.whatsapp_collecteur }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{ data?.enquete?.stock_initial_bovins }}</td>
                                    <td class="text-center">{{ data?.enquete?.stock_initial_ovins }}</td>
                                    <td class="text-center">{{ data?.enquete?.stock_initial_caprins }}</td>
    
                                    <td style="width:100px !important ; color:red !important; font-weight:bolder !important"
                                        class="text-center">{{ data?.nbre_produit }}</td>
                                    <td style="width:100px !important ; color:red !important; font-weight:bolder !important"
                                        class="text-center">{{ getYear( data?.enquete?.date_enquete) }}</td>
    
                                    <td style="width: 120px;">
                                        <div class="d-flex justify-content-evenly border-0">
                                            <router-link
                                                :to="{ name: 'enquete-prix-par-marche-betail', params: { id: data.enquete?.id , nom:'BETAIL' }}"
                                                class="btn btn-circle btn-success btn-xs" title=""
                                                @click="HandleData(data?.enquete)" data-original-title="view"><i
                                                    class="ti-eye"></i></router-link>
                                            <button :disabled="data.enquete?.etat === true" class="btn btn-circle btn-info btn-xs" title=""
                                                @click="HandleIdUpdate(data.enquete?.id , 'update-fiche-collecte')"><i
                                                    class="ti-marker-alt"></i></button>
                                            <a href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs"
                                                @click="HandleIdDelete(data.enquete?.id , 'BETAIL')" title=""
                                                data-toggle="tooltip" data-original-title="Delete"><i
                                                    class="ti-trash"></i></a>
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
    
        <div class="modal center-modal fade" id="add-fiche-collecte" ref="add-fiche-collecte" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ajouter une fiche</h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('add-fiche-collecte')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
    
                        <div class="generastep">
                            <div class="stepper">
                                <div class="stepper-progress">
                                    <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
                                </div>
    
                                <div class="stepper-item"
                                    :class="{ current: currentStep == item, success: currentStep > item }" v-for="item in 4"
                                    :key="item" @click="goToStep(item)">
                                    <div class="stepper-item-counter">
                                        <img class="icon-success"
                                            src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
                                            alt="" />
                                        <span class="number">
                                            {{ item }}
                                        </span>
                                    </div>
                                    <!-- <span class="stepper-item-title"> Step {{ item }} </span> -->
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <!-- Étape 1 -->
                            <div v-if="currentStep === 1">
                                <div class="text-header">Information générale</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    N° Fiche <span class="text-danger">*</span></label>
                                                <MazInput v-model="step1.num_fiche" color="secondary" name="step1.num_fiche"
                                                    size="sm" rounded-size="sm" type="text" readonly disabled />
                                                <small v-if="v$.step1.num_fiche.$error">{{
                                                    v$.step1.num_fiche.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['num_fiche']">
                                                    {{ resultError["num_fiche"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Date d'enquete <span class="text-danger">*</span></label>
                                                <MazInput v-model="step1.date_enquete" color="secondary"
                                                    name="step1.date_enquete" size="sm" rounded-size="sm" type="date" />
                                                <small v-if="v$.step1.date_enquete.$error">{{
                                                    v$.step1.date_enquete.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['date_enquete']">
                                                    {{ resultError["date_enquete"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Agent collecte <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step1.collecteur" color="secondary"
                                                    name="step1.collecteur" size="sm" rounded-size="sm" search
                                                    :options="CollecteursOptions" />
                                                <small v-if="v$.step1.collecteur.$error">{{
                                                    v$.step1.collecteur.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['collecteur']">
                                                    {{ resultError["collecteur"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                    </div>
    
    
                                </div>
                                <div class="btnForm py-3 d-flex items-center justify-content-end">
                                    <button class="btnLogin" :disabled="isButtonDisabled"
                                        @click.prevent="nextStep('add-fiche-collecte')">
                                        Suivant
                                    </button>
                                </div>
                            </div>
    
                            <!-- Étape 2 -->
                            <div v-if="currentStep === 2">
                                <div class="text-header">Stock et Débarquement des Bovins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock initial des bovins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.stock_initial_bovins" color="secondary"
                                                    name="step2.unite" size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step2.stock_initial_bovins.$error">{{
                                                    v$.step2.stock_initial_bovins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_initial_bovins']">
                                                    {{ resultError["stock_initial_bovins"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de bovins débarqués <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.nbr_bovins_debarques" color="secondary"
                                                    name="step2.nbr_bovins_debarques" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.nbr_bovins_debarques.$error">{{
                                                    v$.step2.nbr_bovins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nbr_bovins_debarques']">
                                                    {{ resultError["nbr_bovins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock du soir des bovins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.stock_soir_bovins" color="secondary"
                                                    name="step2.stock_soir_bovins" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.stock_soir_bovins.$error">{{
                                                    v$.step2.stock_soir_bovins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_soir_bovins']">
                                                    {{ resultError["stock_soir_bovins"] }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="text-header">Ventes de Bovins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de bovins vendus calculé <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step2.nombre_bovin_vendu_calcule" color="secondary"
                                                    name="step2.nombre_bovin_vendu_calcule" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.nombre_bovin_vendu_calcule.$error">{{
                                                    v$.step2.nombre_bovin_vendu_calcule.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_bovin_vendu_calcule']">
                                                    {{ resultError["nombre_bovin_vendu_calcule"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de bovins présents sur le marché <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step2.nombre_bovin_present_marche" color="secondary"
                                                    name="step2.unite" size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step2.nombre_bovin_present_marche.$error">{{
                                                    v$.step2.nombre_bovin_present_marche.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_bovin_present_marche']">
                                                    {{ resultError["nombre_bovin_present_marche"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de têtes de bovins vendues <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step2.nombre_tete_bovins_vendu" color="secondary"
                                                    name="step2.destination_finale" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.nombre_tete_bovins_vendu.$error">{{
                                                    v$.step2.nombre_tete_bovins_vendu.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_tete_bovins_vendu']">
                                                    {{ resultError["nombre_tete_bovins_vendu"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Taureaux de 4 à 8 ans vendus <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.taureaux_4_8_ans_vendus" color="secondary"
                                                    name="step2.taureaux_4_8_ans_vendus" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.taureaux_4_8_ans_vendus.$error">{{
                                                    v$.step2.taureaux_4_8_ans_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['taureaux_4_8_ans_vendus']">
                                                    {{ resultError["taureaux_4_8_ans_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Taurillons de 2 à 3 ans vendus <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step2.taurillons_2_3_ans_vendus" color="secondary"
                                                    name="step2.unite" size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step2.taurillons_2_3_ans_vendus.$error">{{
                                                    v$.step2.taurillons_2_3_ans_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['taurillons_2_3_ans_vendus']">
                                                    {{ resultError["taurillons_2_3_ans_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Vaches de 4 à 10 ans vendues <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.vaches_4_10_ans_vendus" color="secondary"
                                                    name="step2.destination_finale" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.vaches_4_10_ans_vendus.$error">{{
                                                    v$.step2.vaches_4_10_ans_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['vaches_4_10_ans_vendus']">
                                                    {{ resultError["vaches_4_10_ans_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Génisses de 2 à 3 ans vendues <span class="text-danger">*</span></label>
                                                <MazInput v-model="step2.genisses_2_3_ans_vendus" color="secondary"
                                                    name="step2.genisses_2_3_ans_vendus" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step2.genisses_2_3_ans_vendus.$error">{{
                                                    v$.step2.genisses_2_3_ans_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['genisses_2_3_ans_vendus']">
                                                    {{ resultError["genisses_2_3_ans_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Veaux et velles de 0 à 12 mois vendus <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step2.veaux_velles_0_12_mois" color="secondary"
                                                    name="step2.unite" size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step2.veaux_velles_0_12_mois.$error">{{
                                                    v$.step2.veaux_velles_0_12_mois.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['veaux_velles_0_12_mois']">
                                                    {{ resultError["veaux_velles_0_12_mois"] }}
                                                </small>
                                            </div>
                                        </div>
    
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Origine des bovins débarqués <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step2.origine_bovins_debarques" color="secondary"
                                                    name="step2.destination_finale" size="sm" rounded-size="sm" search
                                                    :options="CommunesOptions" />
                                                <small v-if="v$.step2.origine_bovins_debarques.$error">{{
                                                    v$.step2.origine_bovins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['origine_bovins_debarques']">
                                                    {{ resultError["origine_bovins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Destination des bovins vendus <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step2.destination_bovins_vendus" color="secondary"
                                                    name="step2.destination_finale" size="sm" rounded-size="sm" search
                                                    :options="CommunesOptions" />
                                                <small v-if="v$.step2.destination_bovins_vendus.$error">{{
                                                    v$.step2.destination_bovins_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['destination_bovins_vendus']">
                                                    {{ resultError["destination_bovins_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btnForm py-3 d-flex items-center justify-content-between">
                                    <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                                    <button class="btnLogin" @click.prevent="nextStep('add-fiche-collecte')">Next</button>
                                </div>
                            </div>
    
    
                            <!-- Étape 3 -->
                            <div v-if="currentStep === 3">
                                <div class="text-header">Stock et Débarquement des Ovins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock initial des ovins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step3.stock_initial_ovins" color="secondary"
                                                    name="step3.stock_initial_ovins" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step3.stock_initial_ovins.$error">{{
                                                    v$.step3.stock_initial_ovins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_initial_ovins']">
                                                    {{ resultError["stock_initial_ovins"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre d'ovins débarqués <span class="text-danger">*</span></label>
                                                <MazInput v-model="step3.nombre_ovins_debarques" color="secondary"
                                                    name="step3.nombre_ovins_debarques" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step3.nombre_ovins_debarques.$error">{{
                                                    v$.step3.nombre_ovins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_ovins_debarques']">
                                                    {{ resultError["nombre_ovins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock du soir des ovins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step3.stock_soir_ovins" color="secondary"
                                                    name="step3.stock_soir_ovins" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step3.stock_soir_ovins.$error">{{
                                                    v$.step3.stock_soir_ovins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_soir_ovins']">
                                                    {{ resultError["stock_soir_ovins"] }}
                                                </small>
                                            </div>
                                        </div>
    
    
                                    </div>
                                </div>
    
                                <div class="text-header">Ventes d'Ovins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre d'ovins présentés sur le marché <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step3.nombre_ovins_presentes_marche" color="secondary"
                                                    name="step3.nombre_ovins_presentes_marche" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step3.nombre_ovins_presentes_marche.$error">{{
                                                    v$.step3.nombre_ovins_presentes_marche.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_ovins_presentes_marche']">
                                                    {{ resultError["nombre_ovins_presentes_marche"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre d'ovins vendus <span class="text-danger">*</span></label>
                                                <MazInput v-model="step3.nombre_ovins_vendus" color="secondary"
                                                    name="step3.nombre_ovins_vendus" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step3.nombre_ovins_vendus.$error">{{
                                                    v$.step3.nombre_ovins_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_ovins_vendus']">
                                                    {{ resultError["nombre_ovins_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Ovins mâles et femelles de 0 à 12 mois vendus <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step3.ovins_males_femelles_0_12_vendus" color="secondary"
                                                    name="step3.ovins_males_femelles_0_12_vendus" size="sm"
                                                    rounded-size="sm" type="number" />
                                                <small v-if="v$.step3.ovins_males_femelles_0_12_vendus.$error">{{
                                                    v$.step3.ovins_males_femelles_0_12_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['ovins_males_femelles_0_12_vendus']">
                                                    {{ resultError["ovins_males_femelles_0_12_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Ovins mâles et femelles de plus d'1 an vendus <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step3.ovins_males_femelles_plus_1_vendus"
                                                    color="secondary" name="step3.ovins_males_femelles_plus_1_vendus"
                                                    size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step3.ovins_males_femelles_plus_1_vendus.$error">{{
                                                    v$.step3.ovins_males_femelles_plus_1_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['ovins_males_femelles_plus_1_vendus']">
                                                    {{ resultError["ovins_males_femelles_plus_1_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Origine des ovins débarqués <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step3.origine_ovins_debarques" color="secondary"
                                                    name="step3.origine_ovins_debarques" size="sm" rounded-size="sm" search
                                                    :options="CommunesOptions" />
                                                <small v-if="v$.step3.origine_ovins_debarques.$error">{{
                                                    v$.step3.origine_ovins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['origine_ovins_debarques']">
                                                    {{ resultError["origine_ovins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Destination des ovins vendus <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step3.destination_ovins_vendus" color="secondary"
                                                    name="step3.destination_ovins_vendus" size="sm" rounded-size="sm"
                                                    :options="CommunesOptions" search />
                                                <small v-if="v$.step3.destination_ovins_vendus.$error">{{
                                                    v$.step3.destination_ovins_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['destination_ovins_vendus']">
                                                    {{ resultError["destination_ovins_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btnForm py-3 d-flex items-center justify-content-between">
                                    <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                                    <button class="btnLogin" @click.prevent="nextStep('add-fiche-collecte')">Next</button>
                                </div>
                            </div>
    
                            <!-- Étape 4 -->
                            <div v-if="currentStep === 4">
                                <div class="text-header">Stock et Débarquement des Caprins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock initial des caprins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step4.stock_initial_caprins" color="secondary"
                                                    name="step4.stock_initial_caprins" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.stock_initial_caprins.$error">{{
                                                    v$.step4.stock_initial_caprins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_initial_caprins']">
                                                    {{ resultError["stock_initial_caprins"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de caprins débarqués <span class="text-danger">*</span></label>
                                                <MazInput v-model="step4.nombre_caprins_debarques" color="secondary"
                                                    name="step4.nombre_caprins_debarques" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.nombre_caprins_debarques.$error">{{
                                                    v$.step4.nombre_caprins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_caprins_debarques']">
                                                    {{ resultError["nombre_caprins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Stock du soir des caprins <span class="text-danger">*</span></label>
                                                <MazInput v-model="step4.stock_soir_caprins" color="secondary"
                                                    name="step4.stock_soir_caprins" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.stock_soir_caprins.$error">{{
                                                    v$.step4.stock_soir_caprins.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['stock_soir_caprins']">
                                                    {{ resultError["stock_soir_caprins"] }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="text-header">Ventes de Caprins</div>
                                <div class="form-container">
                                    <div class="row mt-3 content-group">
    
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de caprins présentés sur le marché <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step4.nombre_caprins_presentes_marche" color="secondary"
                                                    name="step4.nombre_caprins_presentes_marche" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.nombre_caprins_presentes_marche.$error">{{
                                                    v$.step4.nombre_caprins_presentes_marche.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_caprins_presentes_marche']">
                                                    {{ resultError["nombre_caprins_presentes_marche"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Nombre de caprins vendus <span class="text-danger">*</span></label>
                                                <MazInput v-model="step4.nombre_caprins_vendus" color="secondary"
                                                    name="step4.nombre_caprins_vendus" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.nombre_caprins_vendus.$error">{{
                                                    v$.step4.nombre_caprins_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['nombre_caprins_vendus']">
                                                    {{ resultError["nombre_caprins_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Caprins mâles et femelles de 0 à 12 mois <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step4.caprins_males_femelles_0_12_ans" color="secondary"
                                                    name="step4.caprins_males_femelles_0_12_ans" size="sm" rounded-size="sm"
                                                    type="number" />
                                                <small v-if="v$.step4.caprins_males_femelles_0_12_ans.$error">{{
                                                    v$.step4.caprins_males_femelles_0_12_ans.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['caprins_males_femelles_0_12_ans']">
                                                    {{ resultError["caprins_males_femelles_0_12_ans"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Caprins mâles et femelles de plus d'1 an <span
                                                        class="text-danger">*</span></label>
                                                <MazInput v-model="step4.caprins_males_femelles_plus_1_ans"
                                                    color="secondary" name="step4.caprins_males_femelles_plus_1_ans"
                                                    size="sm" rounded-size="sm" type="number" />
                                                <small v-if="v$.step4.caprins_males_femelles_plus_1_ans.$error">{{
                                                    v$.step4.caprins_males_femelles_plus_1_ans.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['caprins_males_femelles_plus_1_ans']">
                                                    {{ resultError["caprins_males_femelles_plus_1_ans"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Origine des caprins débarqués <span class="text-danger">*</span></label>
                                                <MazSelect v-model="step4.origine_caprins_debarques" color="secondary"
                                                    name="step4.origine_caprins_debarques" size="sm" rounded-size="sm"
                                                    type="text" search :options="CommunesOptions" />
                                                <small v-if="v$.step4.origine_caprins_debarques.$error">{{
                                                    v$.step4.origine_caprins_debarques.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['origine_caprins_debarques']">
                                                    {{ resultError["origine_caprins_debarques"] }}
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-groupe">
                                                <label for="userpassword">
                                                    Destination des caprins vendus <span
                                                        class="text-danger">*</span></label>
                                                <MazSelect v-model="step4.destination_caprins_vendus" color="secondary"
                                                    name="step4.destination_caprins_vendus" size="sm" rounded-size="sm"
                                                    type="text" search :options="CommunesOptions" />
                                                <small v-if="v$.step4.destination_caprins_vendus.$error">{{
                                                    v$.step4.destination_caprins_vendus.$errors[0].$message
                                                    }}</small>
                                                <small v-if="resultError['destination_caprins_vendus']">
                                                    {{ resultError["destination_caprins_vendus"] }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btnForm py-3 d-flex items-center justify-content-between">
                                    <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                                    <button class="btnLogin" @click.prevent="nextStep('add-fiche-collecte')">Finish</button>
                                </div>
                            </div>
    
                        </div>
    
    
    
    
                    </div>
    
                </div>
            </div>
        </div>
    
    
        <div class="modal center-modal fade" id="update-fiche-collecte" ref="update-fiche-collecte" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modifier une fiche</h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('update-fiche-collecte')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                 
                    <div class="modal-body">
    
    <div class="generastep">
        <div class="stepper">
            <div class="stepper-progress">
                <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
            </div>

            <div class="stepper-item"
                :class="{ current: currentStep == item, success: currentStep > item }" v-for="item in 4"
                :key="item" @click="goToStep(item)">
                <div class="stepper-item-counter">
                    <img class="icon-success"
                        src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
                        alt="" />
                    <span class="number">
                        {{ item }}
                    </span>
                </div>
                <!-- <span class="stepper-item-title"> Step {{ item }} </span> -->
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <!-- Étape 1 -->
        <div v-if="currentStep === 1">
            <div class="text-header">Information générale</div>
            <div class="form-container">
                <div class="row mt-3 content-group">

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                N° Fiche <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep1.num_fiche" color="secondary" name="Updatestep1.num_fiche"
                                size="sm" rounded-size="sm" type="text" readonly disabled />
                            <small v-if="v$.Updatestep1.num_fiche.$error">{{
                                v$.Updatestep1.num_fiche.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['num_fiche']">
                                {{ resultError["num_fiche"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Date d'enquete <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep1.date_enquete" color="secondary"
                                name="Updatestep1.date_enquete" size="sm" rounded-size="sm" type="date" />
                            <small v-if="v$.Updatestep1.date_enquete.$error">{{
                                v$.Updatestep1.date_enquete.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['date_enquete']">
                                {{ resultError["date_enquete"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Agent collecte <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep1.collecteur" color="secondary"
                                name="Updatestep1.collecteur" size="sm" rounded-size="sm" search
                                :options="CollecteursOptions" />
                            <small v-if="v$.Updatestep1.collecteur.$error">{{
                                v$.Updatestep1.collecteur.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['collecteur']">
                                {{ resultError["collecteur"] }}
                            </small>
                        </div>
                    </div>

                </div>


            </div>
            <div class="btnForm py-3 d-flex items-center justify-content-end">
                <button class="btnLogin" :disabled="isButtonDisabled"
                    @click.prevent="nextStepUpdate('update-fiche-collecte')">
                    Suivant
                </button>
            </div>
        </div>

        <!-- Étape 2 -->
        <div v-if="currentStep === 2">
            <div class="text-header">Stock et Débarquement des Bovins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock initial des bovins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.stock_initial_bovins" color="secondary"
                                name="Updatestep2.unite" size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep2.stock_initial_bovins.$error">{{
                                v$.Updatestep2.stock_initial_bovins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_initial_bovins']">
                                {{ resultError["stock_initial_bovins"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de bovins débarqués <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.nbr_bovins_debarques" color="secondary"
                                name="Updatestep2.nbr_bovins_debarques" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.nbr_bovins_debarques.$error">{{
                                v$.Updatestep2.nbr_bovins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nbr_bovins_debarques']">
                                {{ resultError["nbr_bovins_debarques"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock du soir des bovins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.stock_soir_bovins" color="secondary"
                                name="Updatestep2.stock_soir_bovins" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.stock_soir_bovins.$error">{{
                                v$.Updatestep2.stock_soir_bovins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_soir_bovins']">
                                {{ resultError["stock_soir_bovins"] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-header">Ventes de Bovins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de bovins vendus calculé <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.nombre_bovin_vendu_calcule" color="secondary"
                                name="Updatestep2.nombre_bovin_vendu_calcule" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.nombre_bovin_vendu_calcule.$error">{{
                                v$.Updatestep2.nombre_bovin_vendu_calcule.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_bovin_vendu_calcule']">
                                {{ resultError["nombre_bovin_vendu_calcule"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de bovins présents sur le marché <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.nombre_bovin_present_marche" color="secondary"
                                name="Updatestep2.unite" size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep2.nombre_bovin_present_marche.$error">{{
                                v$.Updatestep2.nombre_bovin_present_marche.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_bovin_present_marche']">
                                {{ resultError["nombre_bovin_present_marche"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de têtes de bovins vendues <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.nombre_tete_bovins_vendu" color="secondary"
                                name="Updatestep2.destination_finale" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.nombre_tete_bovins_vendu.$error">{{
                                v$.Updatestep2.nombre_tete_bovins_vendu.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_tete_bovins_vendu']">
                                {{ resultError["nombre_tete_bovins_vendu"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Taureaux de 4 à 8 ans vendus <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.taureaux_4_8_ans_vendus" color="secondary"
                                name="Updatestep2.taureaux_4_8_ans_vendus" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.taureaux_4_8_ans_vendus.$error">{{
                                v$.Updatestep2.taureaux_4_8_ans_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['taureaux_4_8_ans_vendus']">
                                {{ resultError["taureaux_4_8_ans_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Taurillons de 2 à 3 ans vendus <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.taurillons_2_3_ans_vendus" color="secondary"
                                name="Updatestep2.unite" size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep2.taurillons_2_3_ans_vendus.$error">{{
                                v$.Updatestep2.taurillons_2_3_ans_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['taurillons_2_3_ans_vendus']">
                                {{ resultError["taurillons_2_3_ans_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Vaches de 4 à 10 ans vendues <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.vaches_4_10_ans_vendus" color="secondary"
                                name="Updatestep2.destination_finale" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.vaches_4_10_ans_vendus.$error">{{
                                v$.Updatestep2.vaches_4_10_ans_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['vaches_4_10_ans_vendus']">
                                {{ resultError["vaches_4_10_ans_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Génisses de 2 à 3 ans vendues <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.genisses_2_3_ans_vendus" color="secondary"
                                name="Updatestep2.genisses_2_3_ans_vendus" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep2.genisses_2_3_ans_vendus.$error">{{
                                v$.Updatestep2.genisses_2_3_ans_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['genisses_2_3_ans_vendus']">
                                {{ resultError["genisses_2_3_ans_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Veaux et velles de 0 à 12 mois vendus <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep2.veaux_velles_0_12_mois" color="secondary"
                                name="Updatestep2.unite" size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep2.veaux_velles_0_12_mois.$error">{{
                                v$.Updatestep2.veaux_velles_0_12_mois.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['veaux_velles_0_12_mois']">
                                {{ resultError["veaux_velles_0_12_mois"] }}
                            </small>
                        </div>
                    </div>


                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Origine des bovins débarqués <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep2.origine_bovins_debarques" color="secondary"
                                name="Updatestep2.destination_finale" size="sm" rounded-size="sm" search
                                :options="CommunesOptions" />
                            <small v-if="v$.Updatestep2.origine_bovins_debarques.$error">{{
                                v$.Updatestep2.origine_bovins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['origine_bovins_debarques']">
                                {{ resultError["origine_bovins_debarques"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Destination des bovins vendus <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep2.destination_bovins_vendus" color="secondary"
                                name="Updatestep2.destination_finale" size="sm" rounded-size="sm" search
                                :options="CommunesOptions" />
                            <small v-if="v$.Updatestep2.destination_bovins_vendus.$error">{{
                                v$.Updatestep2.destination_bovins_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['destination_bovins_vendus']">
                                {{ resultError["destination_bovins_vendus"] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
                <button class="btnLogin" @click.prevent="nextStepUpdate('update-fiche-collecte')">Next</button>
            </div>
        </div>


        <!-- Étape 3 -->
        <div v-if="currentStep === 3">
            <div class="text-header">Stock et Débarquement des Ovins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock initial des ovins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.stock_initial_ovins" color="secondary"
                                name="Updatestep3.stock_initial_ovins" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep3.stock_initial_ovins.$error">{{
                                v$.Updatestep3.stock_initial_ovins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_initial_ovins']">
                                {{ resultError["stock_initial_ovins"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre d'ovins débarqués <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.nombre_ovins_debarques" color="secondary"
                                name="Updatestep3.nombre_ovins_debarques" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep3.nombre_ovins_debarques.$error">{{
                                v$.Updatestep3.nombre_ovins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_ovins_debarques']">
                                {{ resultError["nombre_ovins_debarques"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock du soir des ovins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.stock_soir_ovins" color="secondary"
                                name="Updatestep3.stock_soir_ovins" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep3.stock_soir_ovins.$error">{{
                                v$.Updatestep3.stock_soir_ovins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_soir_ovins']">
                                {{ resultError["stock_soir_ovins"] }}
                            </small>
                        </div>
                    </div>


                </div>
            </div>

            <div class="text-header">Ventes d'Ovins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre d'ovins présentés sur le marché <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.nombre_ovins_presentes_marche" color="secondary"
                                name="Updatestep3.nombre_ovins_presentes_marche" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep3.nombre_ovins_presentes_marche.$error">{{
                                v$.Updatestep3.nombre_ovins_presentes_marche.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_ovins_presentes_marche']">
                                {{ resultError["nombre_ovins_presentes_marche"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre d'ovins vendus <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.nombre_ovins_vendus" color="secondary"
                                name="Updatestep3.nombre_ovins_vendus" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep3.nombre_ovins_vendus.$error">{{
                                v$.Updatestep3.nombre_ovins_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_ovins_vendus']">
                                {{ resultError["nombre_ovins_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Ovins mâles et femelles de 0 à 12 mois vendus <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.ovins_males_femelles_0_12_vendus" color="secondary"
                                name="Updatestep3.ovins_males_femelles_0_12_vendus" size="sm"
                                rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep3.ovins_males_femelles_0_12_vendus.$error">{{
                                v$.Updatestep3.ovins_males_femelles_0_12_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['ovins_males_femelles_0_12_vendus']">
                                {{ resultError["ovins_males_femelles_0_12_vendus"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Ovins mâles et femelles de plus d'1 an vendus <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep3.ovins_males_femelles_plus_1_vendus"
                                color="secondary" name="Updatestep3.ovins_males_femelles_plus_1_vendus"
                                size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep3.ovins_males_femelles_plus_1_vendus.$error">{{
                                v$.Updatestep3.ovins_males_femelles_plus_1_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['ovins_males_femelles_plus_1_vendus']">
                                {{ resultError["ovins_males_femelles_plus_1_vendus"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Origine des ovins débarqués <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep3.origine_ovins_debarques" color="secondary"
                                name="Updatestep3.origine_ovins_debarques" size="sm" rounded-size="sm" search
                                :options="CommunesOptions" />
                            <small v-if="v$.Updatestep3.origine_ovins_debarques.$error">{{
                                v$.Updatestep3.origine_ovins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['origine_ovins_debarques']">
                                {{ resultError["origine_ovins_debarques"] }}
                            </small>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Destination des ovins vendus <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep3.destination_ovins_vendus" color="secondary"
                                name="Updatestep3.destination_ovins_vendus" size="sm" rounded-size="sm"
                                :options="CommunesOptions" search />
                            <small v-if="v$.Updatestep3.destination_ovins_vendus.$error">{{
                                v$.Updatestep3.destination_ovins_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['destination_ovins_vendus']">
                                {{ resultError["destination_ovins_vendus"] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
                <button class="btnLogin" @click.prevent="nextStepUpdate('update-fiche-collecte')">Next</button>
            </div>
        </div>

        <!-- Étape 4 -->
        <div v-if="currentStep === 4">
            <div class="text-header">Stock et Débarquement des Caprins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock initial des caprins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.stock_initial_caprins" color="secondary"
                                name="Updatestep4.stock_initial_caprins" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.stock_initial_caprins.$error">{{
                                v$.Updatestep4.stock_initial_caprins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_initial_caprins']">
                                {{ resultError["stock_initial_caprins"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de caprins débarqués <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.nombre_caprins_debarques" color="secondary"
                                name="Updatestep4.nombre_caprins_debarques" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.nombre_caprins_debarques.$error">{{
                                v$.Updatestep4.nombre_caprins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_caprins_debarques']">
                                {{ resultError["nombre_caprins_debarques"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Stock du soir des caprins <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.stock_soir_caprins" color="secondary"
                                name="Updatestep4.stock_soir_caprins" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.stock_soir_caprins.$error">{{
                                v$.Updatestep4.stock_soir_caprins.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['stock_soir_caprins']">
                                {{ resultError["stock_soir_caprins"] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-header">Ventes de Caprins</div>
            <div class="form-container">
                <div class="row mt-3 content-group">

                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de caprins présentés sur le marché <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.nombre_caprins_presentes_marche" color="secondary"
                                name="Updatestep4.nombre_caprins_presentes_marche" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.nombre_caprins_presentes_marche.$error">{{
                                v$.Updatestep4.nombre_caprins_presentes_marche.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_caprins_presentes_marche']">
                                {{ resultError["nombre_caprins_presentes_marche"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Nombre de caprins vendus <span class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.nombre_caprins_vendus" color="secondary"
                                name="Updatestep4.nombre_caprins_vendus" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.nombre_caprins_vendus.$error">{{
                                v$.Updatestep4.nombre_caprins_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['nombre_caprins_vendus']">
                                {{ resultError["nombre_caprins_vendus"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Caprins mâles et femelles de 0 à 12 mois <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.caprins_males_femelles_0_12_ans" color="secondary"
                                name="Updatestep4.caprins_males_femelles_0_12_ans" size="sm" rounded-size="sm"
                                type="number" />
                            <small v-if="v$.Updatestep4.caprins_males_femelles_0_12_ans.$error">{{
                                v$.Updatestep4.caprins_males_femelles_0_12_ans.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['caprins_males_femelles_0_12_ans']">
                                {{ resultError["caprins_males_femelles_0_12_ans"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Caprins mâles et femelles de plus d'1 an <span
                                    class="text-danger">*</span></label>
                            <MazInput v-model="Updatestep4.caprins_males_femelles_plus_1_ans"
                                color="secondary" name="Updatestep4.caprins_males_femelles_plus_1_ans"
                                size="sm" rounded-size="sm" type="number" />
                            <small v-if="v$.Updatestep4.caprins_males_femelles_plus_1_ans.$error">{{
                                v$.Updatestep4.caprins_males_femelles_plus_1_ans.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['caprins_males_femelles_plus_1_ans']">
                                {{ resultError["caprins_males_femelles_plus_1_ans"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Origine des caprins débarqués <span class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep4.origine_caprins_debarques" color="secondary"
                                name="Updatestep4.origine_caprins_debarques" size="sm" rounded-size="sm"
                                type="text" search :options="CommunesOptions" />
                            <small v-if="v$.Updatestep4.origine_caprins_debarques.$error">{{
                                v$.Updatestep4.origine_caprins_debarques.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['origine_caprins_debarques']">
                                {{ resultError["origine_caprins_debarques"] }}
                            </small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-groupe">
                            <label for="userpassword">
                                Destination des caprins vendus <span
                                    class="text-danger">*</span></label>
                            <MazSelect v-model="Updatestep4.destination_caprins_vendus" color="secondary"
                                name="Updatestep4.destination_caprins_vendus" size="sm" rounded-size="sm"
                                type="text" search :options="CommunesOptions" />
                            <small v-if="v$.Updatestep4.destination_caprins_vendus.$error">{{
                                v$.Updatestep4.destination_caprins_vendus.$errors[0].$message
                                }}</small>
                            <small v-if="resultError['destination_caprins_vendus']">
                                {{ resultError["destination_caprins_vendus"] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
                <button class="btnLogin" @click.prevent="nextStepUpdate('update-fiche-collecte')">Finish</button>
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
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  props: {
    nom: {
      type: String,
      required: true,
    },
    enquetes: {
      type: Array,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Pag, Loading
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.FichesCollOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.FichesCollOptions.slice(startIndex, endIndex);
    },
    isAllSelected() {
    // Vérifie si tous les éléments de paginatedItems sont sélectionnés
    return this.paginatedItems.length > 0 && this.selectedItems.length === this.paginatedItems.length;
  }

  },
  data() {
    return {
      loading: false,
      searchFicheCollecteFiche: "",
      Commune: "",
      isModalUpdate: "",
      FichesCollOptions: [],
      CollecteursOptions: [],
      ProvenancesOptions:[],
      CommunesOptions: [],
      MarchesOptions: [],
      currentStep: 1,
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
      currentMarcheName: "",

      initialSelectedItems: [],
    selectAllCheckbox: false,  // État de la checkbox "select all"
    selectedItems: [],
    hasNewSelection: false, //

      step1: {
        num_fiche: "",
        date_enquete: "",
        collecteur: "",
      },
      step2: {
        stock_initial_bovins: "",
        nbr_bovins_debarques: "",
        stock_soir_bovins: "",
        nombre_bovin_vendu_calcule: "",
        nombre_bovin_present_marche: "",
        nombre_tete_bovins_vendu: "",
        taureaux_4_8_ans_vendus: "",
        taurillons_2_3_ans_vendus: "",
        vaches_4_10_ans_vendus: "",
        genisses_2_3_ans_vendus: "",
        veaux_velles_0_12_mois: "",
        destination_bovins_vendus: "",
        origine_bovins_debarques: ""
      },
      step3: {
        stock_initial_ovins: "",
        nombre_ovins_debarques: "",
        stock_soir_ovins: "",
        nombre_ovins_presentes_marche: "",
        nombre_ovins_vendus: "",
        ovins_males_femelles_0_12_vendus: "",
        ovins_males_femelles_plus_1_vendus: "",
        destination_ovins_vendus: "",
        origine_ovins_debarques: "",
      },
      step4: {
        stock_initial_caprins: "",
        nombre_caprins_debarques: "",
        stock_soir_caprins: "",
        nombre_caprins_presentes_marche: "",
        nombre_caprins_vendus: "",
        caprins_males_femelles_0_12_ans: "",
        caprins_males_femelles_plus_1_ans: "",
        destination_caprins_vendus: "",
        origine_caprins_debarques: "",

      },

     Updatestep1: {
        num_fiche: "",
        date_enquete: "",
        collecteur: "",
      },
      Updatestep2: {
        stock_initial_bovins: "",
        nbr_bovins_debarques: "",
        stock_soir_bovins: "",
        nombre_bovin_vendu_calcule: "",
        nombre_bovin_present_marche: "",
        nombre_tete_bovins_vendu: "",
        taureaux_4_8_ans_vendus: "",
        taurillons_2_3_ans_vendus: "",
        vaches_4_10_ans_vendus: "",
        genisses_2_3_ans_vendus: "",
        veaux_velles_0_12_mois: "",
        destination_bovins_vendus: "",
        origine_bovins_debarques: ""
      },
      Updatestep3: {
        stock_initial_ovins: "",
        nombre_ovins_debarques: "",
        stock_soir_ovins: "",
        nombre_ovins_presentes_marche: "",
        nombre_ovins_vendus: "",
        ovins_males_femelles_0_12_vendus: "",
        ovins_males_femelles_plus_1_vendus: "",
        destination_ovins_vendus: "",
        origine_ovins_debarques: "",
      },
      Updatestep4: {
        stock_initial_caprins: "",
        nombre_caprins_debarques: "",
        stock_soir_caprins: "",
        nombre_caprins_presentes_marche: "",
        nombre_caprins_vendus: "",
        caprins_males_femelles_0_12_ans: "",
        caprins_males_femelles_plus_1_ans: "",
        destination_caprins_vendus: "",
        origine_caprins_debarques: "",

      },

     
      v$: useVuelidate(),
      error: "",
      resultError: {},


    }
  },
  validations: {

    step1: {
      num_fiche: { require },
      date_enquete: { require },
      collecteur: { require },
    },
    step2: {
      stock_initial_bovins: { require },
      nbr_bovins_debarques: { require },
      stock_soir_bovins: { require },
      nombre_bovin_vendu_calcule: { require },
      nombre_bovin_present_marche: { require },
      nombre_tete_bovins_vendu: { require },
      taureaux_4_8_ans_vendus: { require },
      taurillons_2_3_ans_vendus: { require },
      vaches_4_10_ans_vendus: { require },
      genisses_2_3_ans_vendus: { require },
      veaux_velles_0_12_mois: { require },
      destination_bovins_vendus: { require },
      origine_bovins_debarques: { require }
    },
    step3: {
      stock_initial_ovins: { require },
      nombre_ovins_debarques: { require },
      stock_soir_ovins: { require },
      nombre_ovins_presentes_marche: { require },
      nombre_ovins_vendus: { require },
      ovins_males_femelles_0_12_vendus: { require },
      ovins_males_femelles_plus_1_vendus: { require },
      destination_ovins_vendus: { require },
      origine_ovins_debarques: { require },
    },
    step4: {
      stock_initial_caprins: { require },
      nombre_caprins_debarques: { require },
      stock_soir_caprins: { require },
      nombre_caprins_presentes_marche: { require },
      nombre_caprins_vendus: { require },
      caprins_males_femelles_0_12_ans: { require },
      caprins_males_femelles_plus_1_ans: { require },
      destination_caprins_vendus: { require },
      origine_caprins_debarques: { require },

    },
   

    Updatestep1: {
      num_fiche: { require },
      date_enquete: { require },
      collecteur: { require },
    },
     Updatestep2: {
      stock_initial_bovins: { require },
      nbr_bovins_debarques: { require },
      stock_soir_bovins: { require },
      nombre_bovin_vendu_calcule: { require },
      nombre_bovin_present_marche: { require },
      nombre_tete_bovins_vendu: { require },
      taureaux_4_8_ans_vendus: { require },
      taurillons_2_3_ans_vendus: { require },
      vaches_4_10_ans_vendus: { require },
      genisses_2_3_ans_vendus: { require },
      veaux_velles_0_12_mois: { require },
      destination_bovins_vendus: { require },
      origine_bovins_debarques: { require }
    },
     Updatestep3: {
      stock_initial_ovins: { require },
      nombre_ovins_debarques: { require },
      stock_soir_ovins: { require },
      nombre_ovins_presentes_marche: { require },
      nombre_ovins_vendus: { require },
      ovins_males_femelles_0_12_vendus: { require },
      ovins_males_femelles_plus_1_vendus: { require },
      destination_ovins_vendus: { require },
      origine_ovins_debarques: { require },
    },
     Updatestep4: {
      stock_initial_caprins: { require },
      nombre_caprins_debarques: { require },
      stock_soir_caprins: { require },
      nombre_caprins_presentes_marche: { require },
      nombre_caprins_vendus: { require },
      caprins_males_femelles_0_12_ans: { require },
      caprins_males_femelles_plus_1_ans: { require },
      destination_caprins_vendus: { require },
      origine_caprins_debarques: { require },

    },
  },
  async mounted() {
    const code = await JSON.parse(localStorage.getItem('DataCommune'));
    await this.fetchCommuneByCode(code)
    await this.fetchNumberFiche()
    await this.fetchCollecteurs()
    await this.fetchProvenances()
    await this.fetchCommunes()



  },
  watch: {
    enquetes: {
      handler(newData) {
        this.FichesCollOptions = [...newData];
        this.data = [...newData];
        this.updatePaginatedItems();

        this.initialSelectedItems = this.data
        .filter(item => item.enquete?.etat === true) 
        .map(item => item.enquete?.num_fiche); 
      this.selectedItems = [...this.initialSelectedItems];
      this.updateSelectedItems();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    stepperProgress() {
      return (100 / 3) * (this.currentStep - 1) + "%";
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    prevStepUpdate() {
        if (this.currentStep > 1) {
          this.currentStep--;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    goToStep(step) {
      this.currentStep = step;
    },
    async nextStep(modalId) {
      try {

        if (this.currentStep === 1) {
          this.v$.step1.$touch();
          if (this.v$.$errors.length == 0) {
            this.currentStep++;

          } else {

          }


        }
        else if (this.currentStep === 2) {
          this.v$.step2.$touch();
          if (this.v$.$errors.length == 0) {
            this.currentStep++;

          } else {
          }


        }
        else if (this.currentStep === 3) {
          this.v$.step3.$touch();
          if (this.v$.$errors.length == 0) {
            this.currentStep++;

          } else {
          }

        }
        else if (this.currentStep === 4) {
          this.v$.step4.$touch();
          if (this.v$.$errors.length == 0) {
            this.submitFicheCollecte(modalId)
          } else {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

          }


        }


      } catch (error) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
      }
    },
    async nextStepUpdate(modalId) {   
        try {
             
      if (this.currentStep === 1) {
      this.v$.Updatestep1.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
          
    }
   else if (this.currentStep === 2) { 
    this.v$.Updatestep2.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {     
      }
       
     
    }
   else if (this.currentStep === 3) {
    this.v$.Updatestep3.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {     
      }
       
    }
    else if (this.currentStep === 4) {
      this.v$.Updatestep4.$touch();
      if (this.v$.$errors.length == 0) {
        this.submitUpdate(modalId)
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
       
      }
       
          
    }

       
    } catch (error) {
        window.scrollTo({ top: 0, behavior: "smooth" });
         this.loading = false;
    }
      },
    successmsg: successmsg,
    HandleData(data) {
      localStorage.setItem('DataPrixMarche', JSON.stringify(data));

    },
    getYear(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`
    },


    async fetchFichesCollectes() {
      try {
        const response = await axios.get(`/enquetes/Fiches/par-marche/{id}?identite=${this.id}&type=COLLECTE`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );
        if (response.status === 200) {
          this.data = response.data;
          this.FichesCollOptions = this.data

          this.loading = false
        }
      } catch (error) {
         this.handleErrorsGet(error);
        return



      }
    },

    updateSelectedItems() {
    this.paginatedItems.forEach(item => {
        if (this.selectedItems.includes(item.enquete?.num_fiche)) {
            item.enquete.etat = true; 
        } else {
            item.enquete.etat = false; 
        }
    });
},
    async fetchCollecteurs() {
      try {
        const response = await axios.get('/parametrages/collecteurs',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );
        if (response.status === 200) {
          response.data.map(item => {
            this.CollecteursOptions.push({
              label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
              value: item.id_collecteur
            });
          });
        }
      } catch (error) {
         this.handleErrorsGet(error);
        return

      }
    },
    async fetchCommunes() {
      try {
        const response = await axios.get("/parametrages/localites/communes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.status === 200) {
          response.data.map(item => this.CommunesOptions.push({
            label: item.nom_commune,
            value: item.code_commune
          }))
          this.loading = false;
        }
      } catch (error) {
         this.handleErrorsGet(error);
        return

      }
    },
    async fetchCommuneByCode(code) {
      try {
        const response = await axios.get(`/parametrages/localites/communes/${code.code_commune}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );
        if (response.status === 200) {
          this.Commune = response.data

        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
    async fetchNumberFiche() {
      try {
        const response = await axios.get('/enquetes/Fiches/fiche-numero',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          }
        );
        if (response.status === 200) {
          this.step1.num_fiche = response.data
        }
      } catch (error) {
         this.handleErrorsGet(error);
        return

      }
    },
    async fetchProvenances() {
        try {
          const response = await axios.get("/parametrages/origines", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          if (response.status === 200) {
            response.data.map(item => this.ProvenancesOptions.push({
              label: item.nom_origine_produit,
              value:  item.code_origine_produit
            }))
            this.loading = false;
          }
        } catch (error) {
           this.handleErrorsGet(error);
        return

        }
      },
    async submitFicheCollecte(modalId) {

      this.loading = true;
      let data = {
        num_fiche: this.step1?.num_fiche,
        date_enquete: this.step1?.date_enquete,
        collecteur: this.step1?.collecteur,

        stock_initial_bovins: this.step2?.stock_initial_bovins,
        nbr_bovins_debarques: this.step2?.nbr_bovins_debarques,
        stock_soir_bovins: this.step2?.stock_soir_bovins,
        nombre_bovin_vendu_calcule: this.step2?.nombre_bovin_vendu_calcule,
        nombre_bovin_present_marche: this.step2?.nombre_bovin_present_marche,
        nombre_tete_bovins_vendu: this.step2?.nombre_tete_bovins_vendu,
        taureaux_4_8_ans_vendus: this.step2?.taureaux_4_8_ans_vendus,
        taurillons_2_3_ans_vendus: this.step2?.taurillons_2_3_ans_vendus,
        vaches_4_10_ans_vendus: this.step2?.vaches_4_10_ans_vendus,
        genisses_2_3_ans_vendus: this.step2?.genisses_2_3_ans_vendus,
        veaux_velles_0_12_mois: this.step2?.veaux_velles_0_12_mois,
        destination_bovins_vendus: this.step2?.destination_bovins_vendus,
        origine_bovins_debarques: this.step2?.origine_bovins_debarques,

        stock_initial_ovins: this.step3?.stock_initial_ovins,
        nombre_ovins_debarques: this.step3?.nombre_ovins_debarques,
        stock_soir_ovins: this.step3?.stock_soir_ovins,
        nombre_ovins_presentes_marche: this.step3?.nombre_ovins_presentes_marche,
        nombre_ovins_vendus: this.step3?.nombre_ovins_vendus,
        ovins_males_femelles_0_12_vendus: this.step3?.ovins_males_femelles_0_12_vendus,
        ovins_males_femelles_plus_1_vendus: this.step3?.ovins_males_femelles_plus_1_vendus,
        destination_ovins_vendus: this.step3?.destination_ovins_vendus,
        origine_ovins_debarques: this.step3?.origine_ovins_debarques,

        stock_initial_caprins: this.step4?.stock_initial_caprins,
        nombre_caprins_debarques: this.step4?.nombre_caprins_debarques,
        stock_soir_caprins: this.step4?.stock_soir_caprins,
        nombre_caprins_presentes_marche: this.step4?.nombre_caprins_presentes_marche,
        nombre_caprins_vendus: this.step4?.nombre_caprins_vendus,
        caprins_males_femelles_0_12_ans: this.step4?.caprins_males_femelles_0_12_ans,
        caprins_males_femelles_plus_1_ans: this.step4?.caprins_males_femelles_plus_1_ans,
        destination_caprins_vendus: this.step4?.destination_caprins_vendus,
        origine_caprins_debarques: this.step4?.origine_caprins_debarques,

        marche: this.id
      };
      try {
        const response = await axios.post("/enquetes/Fiches/betails", data, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,

          }
        });
        if (response.status === 200) {
          this.closeModal(modalId);
         
          this.v$.step1.$reset();
            this.v$.step2.$reset();
            this.v$.step3.$reset();
            this.v$.step4.$reset();
            this.$emit('enquete-updated');
          this.successmsg(
            "Création de la fiche d'enquête",
            "Votre fiche d'enquête a été créée avec succès !"
          );
         
          this.loading = false
        } else {
        }
      } catch (error) {
        this.handleErrors(error);
      }

    },
    async HandleIdUpdate(id, modalId) {
      this.openModal(modalId)
      this.loading = true;

      try {
        const response = await axios.get(`/enquetes/Fiches/collectes/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.status === 200) {
          let data = response.data
            this.Updatestep1.num_fiche = data.num_fiche,
            this.Updatestep1.date_enquete = data.date_enquete,
            this.Updatestep1.collecteur = data.collecteur,

            this.Updatestep2.stock_initial_bovins = data.stock_initial_bovins || this.Updatestep2.stock_initial_bovins;
            this.Updatestep2.nbr_bovins_debarques = data.nbr_bovins_debarques || this.Updatestep2.nbr_bovins_debarques;
            this.Updatestep2.stock_soir_bovins = data.stock_soir_bovins || this.Updatestep2.stock_soir_bovins;
            this.Updatestep2.nombre_bovin_vendu_calcule = data.nombre_bovin_vendu_calcule || this.Updatestep2.nombre_bovin_vendu_calcule;
            this.Updatestep2.nombre_bovin_present_marche = data.nombre_bovin_present_marche || this.Updatestep2.nombre_bovin_present_marche;
            this.Updatestep2.nombre_tete_bovins_vendu = data.nombre_tete_bovins_vendu || this.Updatestep2.nombre_tete_bovins_vendu;
            this.Updatestep2.taureaux_4_8_ans_vendus = data.taureaux_4_8_ans_vendus || this.Updatestep2.taureaux_4_8_ans_vendus;
            this.Updatestep2.taurillons_2_3_ans_vendus = data.taurillons_2_3_ans_vendus || this.Updatestep2.taurillons_2_3_ans_vendus;
            this.Updatestep2.vaches_4_10_ans_vendus = data.vaches_4_10_ans_vendus || this.Updatestep2.vaches_4_10_ans_vendus;
            this.Updatestep2.genisses_2_3_ans_vendus = data.genisses_2_3_ans_vendus || this.Updatestep2.genisses_2_3_ans_vendus;
            this.Updatestep2.veaux_velles_0_12_mois = data.veaux_velles_0_12_mois || this.Updatestep2.veaux_velles_0_12_mois;
            this.Updatestep2.destination_bovins_vendus = data.destination_bovins_vendus || this.Updatestep2.destination_bovins_vendus;
            this.Updatestep2.origine_bovins_debarques = data.origine_bovins_debarques || this.Updatestep2.origine_bovins_debarques;

            this.Updatestep3.stock_initial_ovins = data.stock_initial_ovins || this.Updatestep3.stock_initial_ovins;
            this.Updatestep3.nombre_ovins_debarques = data.nombre_ovins_debarques || this.Updatestep3.nombre_ovins_debarques;
            this.Updatestep3.stock_soir_ovins = data.stock_soir_ovins || this.Updatestep3.stock_soir_ovins;
            this.Updatestep3.nombre_ovins_presentes_marche = data.nombre_ovins_presentes_marche || this.Updatestep3.nombre_ovins_presentes_marche;
            this.Updatestep3.nombre_ovins_vendus = data.nombre_ovins_vendus || this.Updatestep3.nombre_ovins_vendus;
            this.Updatestep3.ovins_males_femelles_0_12_vendus = data.ovins_males_femelles_0_12_vendus || this.Updatestep3.ovins_males_femelles_0_12_vendus;
            this.Updatestep3.ovins_males_femelles_plus_1_vendus = data.ovins_males_femelles_plus_1_vendus || this.Updatestep3.ovins_males_femelles_plus_1_vendus;
            this.Updatestep3.destination_ovins_vendus = data.destination_ovins_vendus || this.Updatestep3.destination_ovins_vendus;
            this.Updatestep3.origine_ovins_debarques = data.origine_ovins_debarques || this.Updatestep3.origine_ovins_debarques;

            this.Updatestep4.stock_initial_caprins = data.stock_initial_caprins || this.Updatestep4.stock_initial_caprins;
            this.Updatestep4.nombre_caprins_debarques = data.nombre_caprins_debarques || this.Updatestep4.nombre_caprins_debarques;
            this.Updatestep4.stock_soir_caprins = data.stock_soir_caprins || this.Updatestep4.stock_soir_caprins;
            this.Updatestep4.nombre_caprins_presentes_marche = data.nombre_caprins_presentes_marche || this.Updatestep4.nombre_caprins_presentes_marche;
            this.Updatestep4.nombre_caprins_vendus = data.nombre_caprins_vendus || this.Updatestep4.nombre_caprins_vendus;
            this.Updatestep4.caprins_males_femelles_0_12_ans = data.caprins_males_femelles_0_12_ans || this.Updatestep4.caprins_males_femelles_0_12_ans;
            this.Updatestep4.caprins_males_femelles_plus_1_ans = data.caprins_males_femelles_plus_1_ans || this.Updatestep4.caprins_males_femelles_plus_1_ans;
            this.Updatestep4.destination_caprins_vendus = data.destination_caprins_vendus || this.Updatestep4.destination_caprins_vendus;
            this.Updatestep4.origine_caprins_debarques = data.origine_caprins_debarques || this.Updatestep4.origine_caprins_debarques;

            this.ToId = data.id
          this.loading = false;

        }
      } catch (error) {

         this.handleErrorsGet(error);
        return

      }

    },
    async submitUpdate(modalId) {
        this.loading = true;
        let data = {
        num_fiche: this.Updatestep1?.num_fiche,
        date_enquete: this.Updatestep1?.date_enquete,
        collecteur: this.Updatestep1?.collecteur,

        stock_initial_bovins: this.Updatestep2?.stock_initial_bovins,
        nbr_bovins_debarques: this.Updatestep2?.nbr_bovins_debarques,
        stock_soir_bovins: this.Updatestep2?.stock_soir_bovins,
        nombre_bovin_vendu_calcule: this.Updatestep2?.nombre_bovin_vendu_calcule,
        nombre_bovin_present_marche: this.Updatestep2?.nombre_bovin_present_marche,
        nombre_tete_bovins_vendu: this.Updatestep2?.nombre_tete_bovins_vendu,
        taureaux_4_8_ans_vendus: this.Updatestep2?.taureaux_4_8_ans_vendus,
        taurillons_2_3_ans_vendus: this.Updatestep2?.taurillons_2_3_ans_vendus,
        vaches_4_10_ans_vendus: this.Updatestep2?.vaches_4_10_ans_vendus,
        genisses_2_3_ans_vendus: this.Updatestep2?.genisses_2_3_ans_vendus,
        veaux_velles_0_12_mois: this.Updatestep2?.veaux_velles_0_12_mois,
        destination_bovins_vendus: this.Updatestep2?.destination_bovins_vendus,
        origine_bovins_debarques: this.Updatestep2?.origine_bovins_debarques,

        stock_initial_ovins: this.Updatestep3?.stock_initial_ovins,
        nombre_ovins_debarques: this.Updatestep3?.nombre_ovins_debarques,
        stock_soir_ovins: this.Updatestep3?.stock_soir_ovins,
        nombre_ovins_presentes_marche: this.Updatestep3?.nombre_ovins_presentes_marche,
        nombre_ovins_vendus: this.Updatestep3?.nombre_ovins_vendus,
        ovins_males_femelles_0_12_vendus: this.Updatestep3?.ovins_males_femelles_0_12_vendus,
        ovins_males_femelles_plus_1_vendus: this.Updatestep3?.ovins_males_femelles_plus_1_vendus,
        destination_ovins_vendus: this.Updatestep3?.destination_ovins_vendus,
        origine_ovins_debarques: this.Updatestep3?.origine_ovins_debarques,

        stock_initial_caprins: this.Updatestep4?.stock_initial_caprins,
        nombre_caprins_debarques: this.Updatestep4?.nombre_caprins_debarques,
        stock_soir_caprins: this.Updatestep4?.stock_soir_caprins,
        nombre_caprins_presentes_marche: this.Updatestep4?.nombre_caprins_presentes_marche,
        nombre_caprins_vendus: this.Updatestep4?.nombre_caprins_vendus,
        caprins_males_femelles_0_12_ans: this.Updatestep4?.caprins_males_femelles_0_12_ans,
        caprins_males_femelles_plus_1_ans: this.Updatestep4?.caprins_males_femelles_plus_1_ans,
        destination_caprins_vendus: this.Updatestep4?.destination_caprins_vendus,
        origine_caprins_debarques: this.Updatestep4?.origine_caprins_debarques,

        marche: this.id
      };
      

        try {
          const response = await axios.put(`/enquetes/Fiches/betails/${this.ToId}`, data, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.currentStep = 1;
            this.successmsg(
              "Mise à jour de la fiche d'enquête",
              "Votre fiche d'enquête a été mise à jour avec succès !"
            )
            this.$emit('enquete-updated');
            this.loading = false


          }
        } catch (error) {
          this.handleErrors(error);
        }
      
    },
    async HandleIdDelete(id, nom) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id, nom);
      }
    },
    async ConfirmeDelete(id, nom) {
      this.loading = true

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/enquetes/Fiches/collectes/${id}?type=${nom}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },


        });

        if (response.status === 200) {
          this.loading = false
          this.successmsg(
            "Suppression de la fiche d'enquête",
            "Votre fiche d'enquête a été supprimée avec succès !"
          );
          this.$emit('enquete-updated');
          this.loading = false

        } else {

          this.handleErrors(error);
        }
      } catch (error) {
        this.handleErrors(error);

      }

    },
    updateSelection(num_fiche, etat) {
  if (etat) {
    if (!this.selectedItems.includes(num_fiche)) {
      this.selectedItems.push(num_fiche);
    }
  } else {
    const index = this.selectedItems.indexOf(num_fiche);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    
  }
  this.hasNewSelection = this.selectedItems.some(item => !this.initialSelectedItems.includes(item));
},

selectAll(event) {
  if (event.target.checked) {
    this.selectedItems = this.paginatedItems.map(item => item.enquete?.num_fiche);
    this.hasNewSelection = this.selectedItems.some(item => !this.initialSelectedItems.includes(item));
  } else {
 
    this.selectedItems = [];
    this.hasNewSelection = false; 
  }

  this.showValidationButton = this.selectedItems.length > 0;
},

    async validateSelection() {
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, validez !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });
  
     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.validateSelection1();
     }
         },
  async  validateSelection1() {
    const newItems = this.selectedItems.filter(item => !this.initialSelectedItems.includes(item));
      const formattedItems = newItems.map(item => {
      return { code: String(item) };  
    });
      this.loading = true
         
         try {
           const response = await axios.post('/enquetes/Fiches/validations',formattedItems, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                  "Validation des fiches d'enquête",
                  "Les fiches d'enquête sélectionnées ont été validées avec succès !"
              );
              this.$emit('enquete-updated');
              this.hasNewSelection = false
              this.loading = false
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
            this.handleErrors(error);
           
         }

    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchFicheCollecteFiche !== null) {
        const tt = this.searchFicheCollecteFiche;
        const searchValue = tt.toLowerCase()
        this.FichesCollOptions = this.data.filter(user => {
          const Nom = user.enquete?.num_fiche || '';
          const definition = user.enquete?.marche_relation?.nom_marche || '';
          const collecte = user.enquete?.collecteur_relation?.nom_collecteur || '';
          const Prenom = user.enquete?.collecteur_relation?.prenom_collecteur || '';
          const Numero = user?.num_fiche || '';
          return Nom.toLowerCase().includes(searchValue) ||
            collecte.toLowerCase().includes(searchValue) ||
            Prenom.toLowerCase().includes(searchValue) ||
            Numero.toLowerCase().includes(searchValue) ||
            definition.toLowerCase().includes(searchValue)
        });

      } else {
        this.FichesCollOptions = [...this.data];

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
        this.loading = false;
        this.data = [];

        // Logique pour une erreur serveur
        //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
      }
      else if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); // Redirection vers la page de connexion
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.FichesCollOptions = [];
      } else {
        this.triggerToast(error.response?.data.detail);
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
    addBackdrop() {
      if (!$('.modal-backdrop').length) {
        const backdrop = $('<div class="modal-backdrop fade"></div>');
        $('body').append(backdrop);
        backdrop.fadeIn(100);
      }
    },

    openModal(modalId) {
      this.fetchNumberFiche()
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeIn(100, function () {
        $(modalElement).addClass('show');
      });
      $('body').addClass('modal-open');
      this.addBackdrop();
    },
    closeModal(modalId) {
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeOut(100, function () {
        $(modalElement).removeClass('show');
        $(modalElement).css('display', 'none');
      });
      $('body').removeClass('modal-open');
      $('.modal-backdrop').fadeOut(100, function () {
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
      return this.FichesCollOptions.slice(startIndex, endIndex);
    },
  },

}
</script>
<style lang="css" scoped>
.tx-green-1 {
    color: #75cc65;
    font-weight: 600;
}

.wrapper-stepper {
    background-color: #fff;
    padding: 60px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 660px; */
    position: relative;
    z-index: 0;
    /* margin-bottom: 24px; */
}

.stepper-progress {
    position: absolute;
    background-color: #c5c5c5;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;
}

.stepper-progress-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: #47c00b;
    transition: all 500ms ease;
}

.stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #c5c5c5;
    transition: all 500ms ease;
    cursor: pointer;
}

.stepper-item-counter {
    height: 35px;
    width: 35px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid #c5c5c5;
    position: relative;
}

.stepper-item-counter .icon-success {
    position: absolute;
    opacity: 0;
    transform: scale(0);
    width: 18px;
    transition: all 500ms ease;
}

.stepper-item-counter .number {
    font-size: 15px;
    transition: all 500ms ease;
}

.stepper-item-title {
    position: absolute;
    font-size: 15px;
    bottom: -39px;
    width: 71px;
    display: flex;
    justify-content: center;
}

.stepper-item.success .stepper-item-counter {
    border-color: #75cc65;
    background-color: #c8ebc1;
    color: #fff;
    font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
    opacity: 1;
    transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
    opacity: 0;
    transform: scale(0);
}

.stepper-item.success .stepper-item-title {
    color: #75cc65;
}

.stepper-item.current .stepper-item-counter {
    border-color: #75cc65;
    background-color: #75cc65;
    color: #fff;
    font-weight: 600;
}

.stepper-item.current .stepper-item-title {
    color: #818181;
}

.signup a:hover {
    text-decoration: underline var(--color-primary);
}

.sign {
    display: block;
    width: 100%;
    background-color: var(--color-primary);
    padding: 0.75rem;
    text-align: center;
    color: black;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 50px;
}

.signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
}


.btnForm {
    max-width: 1140px;
    margin: 20px auto;
    background-color: white;
    padding: 1rem;
    color: black;
    border: 1px solid var(--color-primary)
        /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
}

.btnLogin {
    padding: 1em 3em;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color: var(--color-primary);
    border: none;
    border-radius: 45px;

    cursor: pointer;
    outline: none;
}

.btnLogin:hover {
    background-color: #fff;
    border: 1px solid var(--color-primary);
    color: #000;
}

.text-header {

    color: red;
    font-weight: bolder;
    border: 1px solid var(--color-primary);
    float: left;
    padding: 0 10px;
    margin-left: 12px;
}
</style>