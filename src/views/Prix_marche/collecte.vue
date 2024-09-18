<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
  
        <h3 class="page-title"> Enquête prix sur marché collecte </h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page">Enquête prix sur marché collecte</li>
            </ol>
          </nav>
        </div>
  
  
      </div>
    </div>
    <div class="col-12">
      <div class="box">
        <div class="box">
          <div class="box-header with-border d-flex justify-content-between align-items-center">
            <div>
              <div class="float-end w-80 h-30 d-flex align-items-center me-2"
                style="background-color:var(--color-primary) !important">
                <a class="p-2 text-white  fs-15 " @click="goBackM" href="#"> &larr; Marché</a>
  
              </div>
            </div>
            <h4 class="box-title mb-0">Fiche d'enquête N° <b style="color:red">{{ dataDetail?.num_fiche}}</b> du <b>{{
                getYear(dataDetail?.date_enquete)}}</b></h4>
            <div>
              <div class="float-end w-80 h-30 d-flex align-items-center  "
                style="background-color:var(--color-primary) !important">
                <a class="p-2 text-white  fs-15 " @click="goBack" href="#"> &larr; Retour</a>
  
              </div>
  
            </div>
  
  
  
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-user me-2 fs-14"></i>Nom Agent collecte : <span class="fw-semibold fs-16"
                    data-bs-toggle="tooltip" title="Current Salary">{{dataDetail?.collecteur_relation?.nom_collecteur}}
                    {{dataDetail?.collecteur_relation?.prenom_collecteur}}</span></div>
              </div>
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-location-pin me-2 fs-14"></i>Adresse : <span class="fw-semibold fs-16"
                    data-bs-toggle="tooltip" title="Current Salary">{{dataDetail?.collecteur_relation?.adresse}}</span>
                </div>
              </div>
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-mobile me-2 fs-14"></i>Téléphone: <span class="fw-semibold fs-16"
                    data-bs-toggle="tooltip"
                    title="Current Salary">{{dataDetail?.collecteur_relation?.whatsapp_collecteur}}</span></div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-layout-column4 me-2 fs-14"></i>Nom marché : <span style="color:red"
                    class="fw-semibold fs-16"
                    :title="dataDetail?.marche_relation?.nom_marche">{{dataDetail?.marche_relation?.nom_marche}}</span>
                </div>
              </div>
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-layout-column4 me-2 fs-14"></i>Jour du marché : <span
                    class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary">
                    {{dataDetail?.marche_relation?.jour_du_marche }}
                  </span>
                </div>
              </div>
              <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="mt-1"><i class="ti-layout-column4 me-2 fs-14"></i>Superviseur: <span
                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                    title="Current Salary">{{dataDetail?.personnel_relation?.firstname}} {{dataDetail?.personnel_relation?.lastname}}</span></div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
          <h3 class="box-title mb-0">Liste des enquêtes sur les prix marché</h3>
          <div class="navbar-custom-menu r-side">
            <ul class="nav navbar-nav justify-content-end">
              <li class="btn-group d-lg-inline-flex d-none h-40">
                <div class="app-menu">
                  <div class="search-bx mx-5">
                    <form>
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchPrixCollecte" @input="filterByName">
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
                  @click="openModal('add-prix-collecte')">
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
  
                  <th>Produit</th>
                  <th>Unité de mesure</th>
                  <th> Prix (GNF) unité de produit</th>
                  <th> Prix moyen en (kg ou L)</th>
                  <th> Quantite / Volume total collecté</th>
                  <th> Niveau d'approvisionnement</th>
                  <th>Destination finale</th>
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
                <tr v-for="(data) in paginatedItems" :key="data.id_magasin">
  
                  <td class="text-center" style="width: 220px;">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0 mr-20">
                        <img v-if="data?.produit_relation?.image === '' || data?.produit_relation?.image === null"
                          src="@/assets/img/logo_mobile.png" alt="Logo" class="h-50 w-50" />
                        <img v-else :src="data?.produit_relation?.image" alt="Logo" class="h-50 w-50" />
                      </div>
  
                      <div>
                        <a href="#"
                          class="text-dark font-weight-600 hover-primary mb-1 font-size-16">{{data.produit_relation?.nom_produit}}</a>
                        <span class="text-fade d-block">{{data.produit_relation?.code_produit}}</span>
                      </div>
                    </div>
                  </td>
                  <td style="width: 80px;" class="text-center">{{ data?.unite_relation?.nom_unite }}</td>
                  <td style="width: auto;">{{ data.montant_achat }}</td>
                  <td style="width: auto;" class="text-center">
                    {{ data?.prix_fg_kg ?? "-"}}
                  </td>
                  <td>{{ data?.quantite_collecte ?? "-" }}</td>
                  <td>
                    <div class="widget-user-image">
  
                      <div style="display: inline-block">
                        <span style="font-weight: 600; font-size: 1.1em; display: block">{{
                         data?.niveau_approvisionement}} </span>
                      </div>
                    </div>
                  </td>
  
                  <td>{{ data.localite_relation?.nom_commune }}</td>
                  <td style="width: 130px">
                   
                   
                    <div class="d-flex justify-content-evenly border-0">
                      <a href="javascript:void(0)" class="btn btn-circle btn-success btn-xs" title=""
                      @click="HandleDetail(data , 'Detail-collecte')"><i class="ti-eye"></i></a>
                      <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title=""
                        @click="HandleIdUpdate(data.id_fiche , 'update-prix-collecte')" data-original-title="Update"><i
                          class="ti-marker-alt"></i></a>
                      <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                        @click="HandleIdDelete(data.id_fiche)" title="" data-toggle="tooltip"
                        data-original-title="Delete"><i class="ti-trash"></i></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="container_pagination">
                <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
  
    <div class="modal center-modal fade" id="add-prix-collecte" ref="add-prix-collecte" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Ajouter une enquete de prix
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('add-prix-collecte')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Produit <span class="text-danger">*</span></label>
                  <MazSelect label="" v-model="step1.produit" :options="ProduitsOptions" v-slot="{ option  }" search
                    size="sm" rounded-size="sm" color="secondary">
                    <div class="d-flex align-items-center" style="
                          padding-top: 0.5rem;
                          padding-bottom: 0.5rem;
                          width: 100%;
                          gap: 1rem;
                        ">
                      <MazAvatar size="0.8rem" :src="option.picture" />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                  <small v-if="v$.step1.produit.$error">{{
                    v$.step1.produit.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['produit']">
                    {{ resultError["produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Quelle est unité de mesure pour la vente ? <span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.unite" color="secondary" name="step1.unite" size="sm" rounded-size="sm" search
                    :options="UnitesOptions" />
                  <small v-if="v$.step1.unite.$error">{{
                    v$.step1.unite.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['unite']">
                    {{ resultError["unite"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Equivalent unité de mesure local en (kg ou L )<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.poids_unitaire" color="secondary" name="step1.poids_unitaire" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.poids_unitaire.$error">{{
                    v$.step1.poids_unitaire.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['poids_unitaire']">
                    {{ resultError["poids_unitaire"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Prix (GNF) unité de produit <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.montant_achat" color="secondary" name="step1.montant_achat" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.montant_achat.$error">{{
                    v$.step1.montant_achat.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['montant_achat']">
                    {{ resultError["montant_achat"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Prix moyen en (kg ou L) est : <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.prix_fg_kg" color="secondary" name="step1.prix_fg_kg" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.prix_fg_kg.$error">{{
                    v$.step1.prix_fg_kg.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['prix_fg_kg']">
                    {{ resultError["prix_fg_kg"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Quantite / Volume total collecté ce (kg / L)<span class="text-danger">*</span>
                  </label>
                  <MazInput v-model="step1.quantite_collecte" color="secondary" name="step1.quantite_collecte" size="sm"
                    rounded-size="sm" search :options="quantite_collectesOptions" />
                  <small v-if="v$.step1.quantite_collecte.$error">{{
                    v$.step1.quantite_collecte.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['quantite_collecte']">
                    {{ resultError["quantite_collecte"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Destination finale du produit<span class="text-danger">*</span>
                  </label>
                  <MazSelect v-model="step1.destination_finale" color="secondary" name="step1.destination_finale"
                    size="sm" rounded-size="sm" search :options="CommunesOptions" />
                  <small v-if="v$.step1.destination_finale.$error">{{
                    v$.step1.destination_finale.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['destination_finale']">
                    {{ resultError["destination_finale"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        
                                        Montant de transport   <span class="text-danger">*</span>
                                      </label>
                                      <MazInput v-model="step1.montant_transport" color="secondary" name="step1.montant_transport"
                                          size="sm" rounded-size="sm" search :options="CollectionOptions" />
                                      <small v-if="v$.step1.montant_transport.$error">{{
                                          v$.step1.montant_transport.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['montant_transport']">
                                          {{ resultError["montant_transport"] }}
                                      </small>
                                  </div>
                              </div> -->
  
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        Commune <span class="text-danger">*</span></label>
                                      <MazSelect v-model="step1.localite_origine" color="secondary" name="step1.localite_origine" size="sm"
                                          rounded-size="sm" type="text" search :options="CommunesOptions" />
                                      <small v-if="v$.step1.localite_origine.$error">{{
                                          v$.step1.localite_origine.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['localite_origine']">
                                          {{ resultError["localite_origine"] }}
                                      </small>
                                  </div>
                              </div> -->
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Etat de la route pour atteindre la localité 
                  </label>
                  <MazInput v-model="step1.etat_route" color="secondary" name="step1.etat_route" size="sm"
                    rounded-size="sm" search :options="etat_routesOptions" />
                  <small v-if="v$.step1.etat_route.$error">{{
                    v$.step1.etat_route.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['etat_route']">
                    {{ resultError["etat_route"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Etat <span class="text-danger">*</span>
                  </label>
                  <MazInput v-model="step1.etat" color="secondary" name="step1.etat" size="sm" rounded-size="sm" search
                    :options="CollectionOptions" />
                  <small v-if="v$.step1.etat.$error">{{
                    v$.step1.etat.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['etat']">
                    {{ resultError["etat"] }}
                  </small>
                </div>
              </div> -->
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        
                                        Fournisseur principal <span class="text-danger">*</span>
                                      </label>
                                      <MazInput v-model="step1.fournisseur_principal" color="secondary" name="step1.fournisseur_principal"
                                          size="sm" rounded-size="sm"  />
                                      <small v-if="v$.step1.fournisseur_principal.$error">{{
                                          v$.step1.fournisseur_principal.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['fournisseur_principal']">
                                          {{ resultError["fournisseur_principal"] }}
                                      </small>
                                  </div>
                              </div> -->
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Niveau d'approvisionnement du produit dans le marché <span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.niveau_approvisionement" color="secondary"
                    name="step1.niveau_approvisionement" size="sm" rounded-size="sm" type="text" search
                    :options="Fournisseur" />
                  <small v-if="v$.step1.niveau_approvisionement.$error">{{
                    v$.step1.niveau_approvisionement.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['niveau_approvisionement']">
                    {{ resultError["niveau_approvisionement"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Statut <span class="text-danger">*</span>
                  </label>
                  <MazSelect v-model="step1.statut" color="secondary" name="step1.statut" size="sm" rounded-size="sm"
                    search :options="choix" />
                  <small v-if="v$.step1.statut.$error">{{
                    v$.step1.statut.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['statut']">
                    {{ resultError["statut"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Observation 
                  </label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
                    id="text-area" v-model="step1.observation" rows="1"></textarea>
  
  
                  <small v-if="v$.step1.observation.$error">{{
                    v$.step1.observation.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['observation']">
                    {{ resultError["observation"] }}
                  </small>
                </div>
              </div>
  
  
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" @click="SubmitMagasins('add-prix-collecte')"
              class="waves-effect waves-light btn btn-primary">
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <div class="modal center-modal fade" id="update-prix-collecte" ref="update-prix-collecte" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modifier une enquete de prix
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('update-prix-collecte')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mt-3 content-group">
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Produit <span class="text-danger">*</span></label>
                  <MazSelect label="" v-model="step2.produit" :options="ProduitsOptions" v-slot="{ option  }" search
                    size="sm" rounded-size="sm" color="secondary">
                    <div class="d-flex align-items-center" style="
                          padding-top: 0.5rem;
                          padding-bottom: 0.5rem;
                          width: 100%;
                          gap: 1rem;
                        ">
                      <MazAvatar size="0.8rem" :src="option.picture" />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                  <small v-if="v$.step2.produit.$error">{{
                    v$.step2.produit.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['produit']">
                    {{ resultError["produit"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Quelle est unité de mesure pour la vente ? <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.unite" color="secondary" name="step2.unite" size="sm" rounded-size="sm" search
                    :options="UnitesOptions" />
                  <small v-if="v$.step2.unite.$error">{{
                    v$.step2.unite.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['unite']">
                    {{ resultError["unite"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Equivalent unité de mesure local en (kg ou L )<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.poids_unitaire" color="secondary" name="step2.poids_unitaire" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.poids_unitaire.$error">{{
                    v$.step2.poids_unitaire.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['poids_unitaire']">
                    {{ resultError["poids_unitaire"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Prix (GNF) unité de produit <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.montant_achat" color="secondary" name="step2.montant_achat" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.montant_achat.$error">{{
                    v$.step2.montant_achat.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['montant_achat']">
                    {{ resultError["montant_achat"] }}
                  </small>
                </div>
              </div>
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Prix moyen en (kg ou L) est : <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.prix_fg_kg" color="secondary" name="step2.prix_fg_kg" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.prix_fg_kg.$error">{{
                    v$.step2.prix_fg_kg.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['prix_fg_kg']">
                    {{ resultError["prix_fg_kg"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Quantite / Volume total collecté ce (kg / L)<span class="text-danger">*</span>
                  </label>
                  <MazInput v-model="step2.quantite_collecte" color="secondary" name="step2.quantite_collecte" size="sm"
                    rounded-size="sm" search :options="quantite_collectesOptions" />
                  <small v-if="v$.step2.quantite_collecte.$error">{{
                    v$.step2.quantite_collecte.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['quantite_collecte']">
                    {{ resultError["quantite_collecte"] }}
                  </small>
                </div>
              </div>
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Destination finale du produit<span class="text-danger">*</span>
                  </label>
                  <MazSelect v-model="step2.destination_finale" color="secondary" name="step2.destination_finale"
                    size="sm" rounded-size="sm" search :options="CommunesOptions" />
                  <small v-if="v$.step2.destination_finale.$error">{{
                    v$.step2.destination_finale.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['destination_finale']">
                    {{ resultError["destination_finale"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        
                                        Montant de transport   <span class="text-danger">*</span>
                                      </label>
                                      <MazInput v-model="step2.montant_transport" color="secondary" name="step2.montant_transport"
                                          size="sm" rounded-size="sm" search :options="CollectionOptions" />
                                      <small v-if="v$.step2.montant_transport.$error">{{
                                          v$.step2.montant_transport.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['montant_transport']">
                                          {{ resultError["montant_transport"] }}
                                      </small>
                                  </div>
                              </div> -->
  
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        Commune <span class="text-danger">*</span></label>
                                      <MazSelect v-model="step2.localite_origine" color="secondary" name="step2.localite_origine" size="sm"
                                          rounded-size="sm" type="text" search :options="CommunesOptions" />
                                      <small v-if="v$.step2.localite_origine.$error">{{
                                          v$.step2.localite_origine.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['localite_origine']">
                                          {{ resultError["localite_origine"] }}
                                      </small>
                                  </div>
                              </div> -->
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Etat de la route pour atteindre la localité 
                  </label>
                  <MazInput v-model="step2.etat_route" color="secondary" name="step2.etat_route" size="sm"
                    rounded-size="sm" search :options="etat_routesOptions" />
                  <small v-if="v$.step2.etat_route.$error">{{
                    v$.step2.etat_route.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['etat_route']">
                    {{ resultError["etat_route"] }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Etat <span class="text-danger">*</span>
                  </label>
                  <MazInput v-model="step2.etat" color="secondary" name="step2.etat" size="sm" rounded-size="sm" search
                    :options="CollectionOptions" />
                  <small v-if="v$.step2.etat.$error">{{
                    v$.step2.etat.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['etat']">
                    {{ resultError["etat"] }}
                  </small>
                </div>
              </div> -->
              <!-- <div class="col-4">
                                  <div class="input-groupe">
                                      <label for="userpassword">
                                        
                                        Fournisseur principal <span class="text-danger">*</span>
                                      </label>
                                      <MazInput v-model="step2.fournisseur_principal" color="secondary" name="step2.fournisseur_principal"
                                          size="sm" rounded-size="sm"  />
                                      <small v-if="v$.step2.fournisseur_principal.$error">{{
                                          v$.step2.fournisseur_principal.$errors[0].$message
                                          }}</small>
                                      <small v-if="resultError['fournisseur_principal']">
                                          {{ resultError["fournisseur_principal"] }}
                                      </small>
                                  </div>
                              </div> -->
  
              <div class="col-4">
                <div class="input-groupe">
                  <label for="userpassword">
                    Niveau d'approvisionnement du produit dans le marché <span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.niveau_approvisionement" color="secondary"
                    name="step2.niveau_approvisionement" size="sm" rounded-size="sm" type="text" search
                    :options="Fournisseur" />
                  <small v-if="v$.step2.niveau_approvisionement.$error">{{
                    v$.step2.niveau_approvisionement.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['niveau_approvisionement']">
                    {{ resultError["niveau_approvisionement"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Statut <span class="text-danger">*</span>
                  </label>
                  <MazSelect v-model="step2.statut" color="secondary" name="step2.statut" size="sm" rounded-size="sm"
                    search :options="choix" />
                  <small v-if="v$.step2.statut.$error">{{
                    v$.step2.statut.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['statut']">
                    {{ resultError["statut"] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="input-groupe">
                  <label for="userpassword">
                    Observation 
                  </label>
                  <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
                    id="text-area" v-model="step2.observation" rows="1"></textarea>
  
  
                  <small v-if="v$.step2.observation.$error">{{
                    v$.step2.observation.$errors[0].$message
                    }}</small>
                  <small v-if="resultError['observation']">
                    {{ resultError["observation"] }}
                  </small>
                </div>
              </div>
  
  
  
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" @click="submitUpdate('update-prix-collecte')"
              class="waves-effect waves-light btn btn-primary">
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  
  
    <div class="modal center-modal fade" id="Detail-collecte" ref="Detail-collecte" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Détail d'enquete sur le prix {{detailData?.produit_relation?.nom_produit}} au marche de collecte
            </h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('Detail-collecte')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card  max-w-p100" style="margin-bottom:0 !important">
  
              <div class="card-body">
                <div class="d-flex flex-row pb-2">
                  <a class="d-flex" href="#">
                    <img alt="Profile"
                      v-if="detailData?.produit_relation?.image === '' || detailData?.produit_relation?.image === nulll"
                      src="@/assets/img/logo_mobile.png" class="avatar avatar-xxl mr-10 border-1">
                    <img alt="Profile" v-else :src="detailData?.produit_relation?.image"
                      class="avatar avatar-xxl mr-10 border-1">
                  </a>
                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                      <div class="min-width-zero">
                        <p class="mb-0 font-size-16 text-dark">Nom : <b>{{detailData?.produit_relation?.nom_produit}}</b>
                        </p>
                        <p class="mb-0 font-size-16 text-dark">Code: <b>{{detailData?.produit_relation?.code_produit}}</b>
                        </p>
                        <p class="mb-0 font-size-16 text-dark">Filière: <b>{{detailData?.produit_relation?.filiere}}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="row">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">Quelle est unité de mesure pour la vente ? : <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.unite_relation?.nom_unite}}</span>
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">Equivalent unité de mesure local en (kg ou L ) : <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.poids_unitaire}}</span>
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1"> Prix (GNF) unité de produit: <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.montant_achat}}</span></div>
                    </div>
                 
  
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1">Prix moyen en (kg ou L) est : <span class="fw-semibold fs-16"
                        data-bs-toggle="tooltip" title="Current Salary">{{detailData?.prix_fg_kg}}</span></div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1">Quantite / Volume total collecté ce (kg / L) : <span class="fw-semibold fs-16"
                        data-bs-toggle="tooltip" title="Current Salary">{{detailData?.quantite_collecte}}</span>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1"> Destination finale du produit: <span class="fw-semibold fs-16"
                        data-bs-toggle="tooltip"
                        title="Current Salary">{{detailData?.localite_relation?.nom_commune}}</span></div>
                  </div>
  
  
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1"> Etat de la route pour atteindre la localité : <span class="fw-semibold fs-16"
                        data-bs-toggle="tooltip" title="Current Salary">{{detailData?.etat_route}}</span></div>
                  </div>
                 
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1"> Niveau d'approvisionnement du produit dans le marché : <span
                        class="fw-semibold fs-16" data-bs-toggle="tooltip"
                        title="Current Salary">{{detailData?.niveau_approvisionement}}</span>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1"> Statut : <span class="fw-semibold fs-16" data-bs-toggle="tooltip"
                        title="Current Salary">{{detailData?.statut}}</span>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="mt-1"> Observation : <span class="fw-semibold fs-16" data-bs-toggle="tooltip"
                        title="Current Salary">{{detailData?.observation}}</span>
                    </div>
                  </div>
  
                </div>
  
                </div>
              </div>
            </div>
  
          </div>
          <div class="modal-footer modal-footer-uniform text-end">
            <button type="button" @click="submitUpdate('update-prix-collecte')"
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
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  props: ['id', 'nom'],
  components: {

    Pag,
    Loading,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.MagasinsOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MagasinsOptions.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      loading: true,
      dataDetail: "",
      searchPrixCollecte: "",
      MagasinsOptions: [],
      CommunesOptions: [],
      CollectionOptions: [],
      ProduitsOptions: [],
      UnitesOptions: [],
      detailData: "",
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
    
      totalPageArray: [],
      step1: {

        produit: "",
        unite: "",
        poids_unitaire: "",
        montant_achat: "",
        prix_fg_kg: "",
        quantite_collecte: "",
        destination_finale: "",
        etat_route: "",
        niveau_approvisionement: "",
        statut: "",
        observation: "",
        



        //  destination_finale: "",
        //  montant_transport: "",
        //  etat_route:"",

        //  client_principal:"",
        //  fournisseur_principal:"",


        localite_origine: ""
      },
      step2: {
        produit: "",
        unite: "",
        poids_unitaire: "",
        montant_achat: "",
        prix_fg_kg: "",
        quantite_collecte: "",
        destination_finale: "",
        etat_route: "",
        niveau_approvisionement: "",
        statut: "",
        observation: "",
      },
      Fournisseur: [
        { label: "Abondant", value: "Abondant" },
        { label: "Normal", value: "Normal" },
        { label: "Rare", value: "Rare" },

      ],
      Route: [
        { label: "Abondant", value: "Abondant" },
        { label: "Abondant", value: "Abondant" },


      ],

      choix: [
        { label: "Validé", value: true },
        { label: "Non-validé", value: false },


      ],
      v$: useVuelidate(),
      error: "",
      resultError: {},
    };
  },
  validations: {
    step1: {


      produit: { require },
      unite: { require },
      poids_unitaire: { require },
      montant_achat: { require },
      prix_fg_kg: { require },
      quantite_collecte: { require },
      destination_finale: { require },
      etat_route: {  },
      niveau_approvisionement: { require },
      statut: { require },
      observation: {  },
    


    },
    step2: {
      produit: { require },
      unite: { require },
      poids_unitaire: { require },
      montant_achat: { require },
      prix_fg_kg: { require },
      quantite_collecte: { require },
      destination_finale: { require },
      etat_route: {  },
      niveau_approvisionement: { require },
      statut: { require },
      observation: {  },
    },
  },
  async mounted() {
    this.dataDetail = await JSON.parse(localStorage.getItem('DataPrixMarche'));
    await this.fetchMagasins();
    await this.fetchProduits();
    await this.fetchUnites();
    await this.fetchCommunes();
    await this.fetchCollecteurs();



  },
  methods: {
    successmsg: successmsg,
    goBack() {
      this.$router.go(-1);
    },
    goBackM() {
      this.$router.go(-2);

    },
    async fetchProduits() {
      try {
        const response = await axios.get(`/parametrages/produits?code_type_marche=01`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.ProduitsOptions.push({
            label: `${item.nom_produit} ( ${item.code_produit})`,
            picture: item.image,
            value: item.code_produit
          }))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchUnites() {
      try {
        const response = await axios.get(`/parametrages/unites/associated-unites/type-marche?id_of_type_market=${1}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("responseunitesre", response);
        if (response.status === 200) {
          response.data[0]?.unites.map(item => this.UnitesOptions.push({
            label: item?.unite_relation?.nom_unite,
            value: item.unite_mesure
          }))
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
    async fetchCollecteurs() {
      try {
        const response = await axios.get("/parametrages/collecteurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          response.data.map(item => this.CollectionOptions.push({
            label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
            value: item.id_collecteur
          }))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async fetchMagasins() {
      try {
        const response = await axios.get(`enquetes/marches-prix/prix-enquetes/{enquente_id}?identite=${this.id}&type=${this.nom}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          this.data = response.data;
          this.MagasinsOptions = this.data;
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async SubmitMagasins(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {

          produit: this.step1.produit,
          unite: this.step1.unite,
          poids_unitaire: this.step1.poids_unitaire,
          montant_achat: this.step1.montant_achat,
          prix_fg_kg: this.step1.prix_fg_kg,
          quantite_collecte: this.step1.quantite_collecte,
          destination_finale: this.step1.destination_finale,
          etat_route: this.step1.etat_route,
          niveau_approvisionement: this.step1.niveau_approvisionement,
          statut: this.step1.statut,
          observation: this.step1.observation,
          // etat:"",
          enquete: this.id,



        };

        console.log('data', data)
        try {
          const response = await axios.post("enquetes/marches-prix/collectes", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            }
          });
          console.log('qfs', response)
          if (response.status === 200) {
            this.closeModal(modalId);
            this.step1 = {

              produit: "",
              unite: "",
              poids_unitaire: "",
              montant_achat: "",
              prix_fg_kg: "",
              quantite_collecte: "",
              destination_finale: "",
              etat_route: "",
              niveau_approvisionement: "",
              statut: "",
              observation: "",
              etat: "",
            }
            this.v$.step1.$reset();
            this.successmsg(
              "Création de l'enquête",
              "Votre enquête sur les prix a été créée avec succès !"
          );

            await this.fetchMagasins();
          } else {
          }
        } catch (error) {
          this.handleErrors(error);
        }


      } else {
      }
    },
    async HandleIdUpdate(id, modalId) {
      this.openModal(modalId)
      this.stepModal = "update";
      this.loading = true;

      try {
        const response = await axios.get(`/enquetes/marches-prix/collectes/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Slbvlkjbv", response);

          let data = response.data;
          (this.step2.produit = data.produit),
            (this.step2.unite = data.unite),
            (this.step2.poids_unitaire = data.poids_unitaire),
            (this.step2.montant_achat = data.montant_achat),
            (this.step2.prix_fg_kg = data.prix_fg_kg),
            (this.step2.quantite_collecte = data.quantite_collecte),
            (this.step2.destination_finale = data.destination_finale),
            (this.step2.etat_route = data.etat_route),
            (this.step2.niveau_approvisionement = data.niveau_approvisionement.toString()),
            (this.step2.statut = data.statut),
            (this.step2.observation = data.observation),
            (this.ToId = data.id_fiche);
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          produit: this.step2.produit,
          unite: this.step2.unite,
          poids_unitaire: this.step2.poids_unitaire,
          montant_achat: this.step2.montant_achat,
          prix_fg_kg: this.step2.prix_fg_kg,
          quantite_collecte: this.step2.quantite_collecte,
          destination_finale: this.step2.destination_finale,
          etat_route: this.step2.etat_route,
          niveau_approvisionement: this.step2.niveau_approvisionement,
          statut: this.step2.statut,
          observation: this.step2.observation,
          // etat:"",
          enquete: this.id,
        };
        console.log('data',data)

        try {
          const response = await axios.put(`/enquetes/marches-prix/collectes/edition?id=${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.successmsg(
                "Mise à jour de l'enquête",
                "Votre enquête sur les prix a été mise à jour avec succès !"
            );
            await this.fetchMagasins();
          }
        } catch (error) {
          this.handleErrors(error);
        }
      } else {
        this.loading = false;
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
      console.log('id',id)

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/enquetes/marches-prix/collectes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
              "Suppression de l'enquête",
              "Votre enquête sur les prix a été supprimée avec succès !"
          );
          await this.fetchMagasins();
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    HandleDetail(data, modalId) {
      this.openModal(modalId)
      console.log('da', data)
      this.detailData = data

    },

    getYear(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`
    },
    filterByName() {
      this.currentPage = 1;
      if (this.searchPrixCollecte !== null) {
        const tt = this.searchPrixCollecte;
        const searchValue = tt.toLowerCase();
        this.MagasinsOptions = this.data.filter((user) => {
          const Nom = user.niveau_approvisionement || "";
          const Descriptions = user.produit_relation?.nom_produit || "";
          const Code = user.produit_relation?.code_produit || "";
          const Commune = user.unite_relation?.nom_unite || "";
          const Collecteur = user.localite_relation?.nom_commune || "";


          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) ||
            Commune.toLowerCase().includes(searchValue) ||
            Code.toLowerCase().includes(searchValue) ||
            Collecteur.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.MagasinsOptions = [...this.data];
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
      return this.MagasinsOptions.slice(startIndex, endIndex);
    },
  },
};
  </script>
  <style lang="css" scoped></style>
  