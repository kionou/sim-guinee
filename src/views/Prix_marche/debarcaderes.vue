<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <div class="content-header">
        <div class="d-flex align-items-center justify-content-between">
    
          <h3 class="page-title"> Enquête prix sur marché debarcadère </h3>
          <div class="d-inline-block align-items-center">
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
                <li class="breadcrumb-item" aria-current="page">SIM</li>
                <li class="breadcrumb-item active" aria-current="page">Enquête prix sur marché debarcadère</li>
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
                      title="Current Salary">{{relai?.nom_collecteur}} {{relai?.prenom_collecteur}} ({{relai?.whatsapp_collecteur}})</span></div>
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
            <div class="navbar-custom-menu r-side  float-right">
              <ul class="nav navbar-nav justify-content-end">
                <li class="btn-group d-lg-inline-flex  h-40">
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
    
                    <th>Princ. espèce coll.</th>
                    <th>Collecteur</th>
                    <th> Qté cumulée prod. débarqué dans débarcadère sem.</th>
                    <th>  Px moy. sem. 1 kg prod. grossistes</th>
                    <th>  Px moy. sem. 1 kg prod. détaillants </th>
                    <th>  Px moy. sem. 1 kg prod. détaillants</th>
                    <th>date d'enquete</th>
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
                    <td>
					  <div class="widget-user-image">
						
						<div style="display: inline-block">
						  <span style="font-weight: 600; font-size: 1.1em; display: block"
							>{{ data?.collecteur_relation?.nom_collecteur }} {{ data?.collecteur_relation?.prenom_collecteur }}</span
						  >
						  <span style="display: block; color:red !important">{{ data?.collecteur_relation?.whatsapp_collecteur }}</span>
						</div>
					  </div>
					</td>
                    <td style="width: auto;">{{ data.volume_poissons_peches }}</td>
                    <td style="width: auto;" class="text-center">
                      {{ data?.prix_moyen_semaine_grossiste ?? "-"}}
                    </td>
                    <td>{{ data?.prix_moyen_semaine_detaillant ?? "-" }}</td>
                    <td>
                      <div class="widget-user-image">
    
                        <div style="display: inline-block">
                          <span style="font-weight: 600; font-size: 1.1em; display: block">{{
                         data?.niveau_disponibilite  }} </span>
                        </div>
                      </div>
                    </td>
    
                    <td style="width:100px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ getYear( data?.date_enquete) }}</td>
                    <td style="width: 130px">
                     
                     
                      <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-success btn-xs" title=""
                        @click="HandleDetail(data , 'Detail-collecte')"><i class="ti-eye"></i></a>
                        <button :disabled="data.enquete_relation?.etat === true"  class="btn btn-circle btn-info btn-xs" title=""
                          @click="HandleIdUpdate(data.id_fiche , 'update-prix-collecte' , 'DEBARCADERE')" data-original-title="Update"><i
                            class="ti-marker-alt"></i></button>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                          @click="HandleIdDelete(data.id_fiche , 'DEBARCADERE')" title="" data-toggle="tooltip"
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
        <div class="modal-dialog modal-lg">
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
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Principale espèce collecte <span class="text-danger">*</span></label>
                    <MazSelect label="" v-model="step1.principale_espece_peche" :options="ProduitsOptions" v-slot="{ option  }" search
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
                    <small v-if="v$.step1.principale_espece_peche.$error">{{
                      v$.step1.principale_espece_peche.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['principale_espece_peche']">
                      {{ resultError["principale_espece_peche"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Collecteur <span class="text-danger">*</span></label>
                    <MazSelect v-model="step1.collecteur" color="secondary" name="step1.collecteur" size="sm" rounded-size="sm" search
                      :options="CollectionOptions" />
                    <small v-if="v$.step1.collecteur.$error">{{
                      v$.step1.collecteur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['collecteur']">
                      {{ resultError["collecteur"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Quantité cumulée de la semaine du produit débarquée dans le débarcadère<span class="text-danger">*</span></label>
                    <MazInput v-model="step1.volume_poissons_peches" color="secondary" name="step1.volume_poissons_peches" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step1.volume_poissons_peches.$error">{{
                      v$.step1.volume_poissons_peches.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['volume_poissons_peches']">
                      {{ resultError["volume_poissons_peches"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Prix moyen de la semaine d'un kg du produit chez les grossistes<span class="text-danger">*</span></label>
                    <MazInput v-model="step1.prix_moyen_semaine_grossiste" color="secondary" name="step1.prix_moyen_semaine_grossiste" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step1.prix_moyen_semaine_grossiste.$error">{{
                      v$.step1.prix_moyen_semaine_grossiste.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_moyen_semaine_grossiste']">
                      {{ resultError["prix_moyen_semaine_grossiste"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Prix moyen de la semaine d'un kg du produit chez les détaillants <span class="text-danger">*</span></label>
                    <MazInput v-model="step1.prix_moyen_semaine_detaillant" color="secondary" name="step1.prix_moyen_semaine_detaillant" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step1.prix_moyen_semaine_detaillant.$error">{{
                      v$.step1.prix_moyen_semaine_detaillant.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_moyen_semaine_detaillant']">
                      {{ resultError["prix_moyen_semaine_detaillant"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Niveau de disponibilité du produit dans la semaine<span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step1.niveau_disponibilite" color="secondary" name="step1.niveau_disponibilite" size="sm"
                      rounded-size="sm" search :options="niveau_disponibilitesOptions" />
                    <small v-if="v$.step1.niveau_disponibilite.$error">{{
                      v$.step1.niveau_disponibilite.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['niveau_disponibilite']">
                      {{ resultError["niveau_disponibilite"] }}
                    </small>
                  </div>
                </div>
             
               
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Date d'enquete
                    </label>
                    <MazInput v-model="step1.date_enquete" color="secondary" name="step1.date_enquete" size="sm"
                      rounded-size="sm" type="date"  />
                    <small v-if="v$.step1.date_enquete.$error">{{
                      v$.step1.date_enquete.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['date_enquete']">
                      {{ resultError["date_enquete"] }}
                    </small>
                  </div>
                </div>
            
    
               
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Observation sur le prix du produit dans la semaine
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
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Principale espèce collecte <span class="text-danger">*</span></label>
                    <MazSelect label="" v-model="step2.principale_espece_peche" :options="ProduitsOptions" v-slot="{ option  }" search
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
                    <small v-if="v$.step2.principale_espece_peche.$error">{{
                      v$.step2.principale_espece_peche.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['principale_espece_peche']">
                      {{ resultError["principale_espece_peche"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Collecteur <span class="text-danger">*</span></label>
                    <MazSelect v-model="step2.collecteur" color="secondary" name="step2.collecteur" size="sm" rounded-size="sm" search
                      :options="CollectionOptions" />
                    <small v-if="v$.step2.collecteur.$error">{{
                      v$.step2.collecteur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['collecteur']">
                      {{ resultError["collecteur"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Quantité cumulée de la semaine du produit débarquée dans le débarcadère<span class="text-danger">*</span></label>
                    <MazInput v-model="step2.volume_poissons_peches" color="secondary" name="step2.volume_poissons_peches" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step2.volume_poissons_peches.$error">{{
                      v$.step2.volume_poissons_peches.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['volume_poissons_peches']">
                      {{ resultError["volume_poissons_peches"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Prix moyen de la semaine d'un kg du produit chez les grossistes<span class="text-danger">*</span></label>
                    <MazInput v-model="step2.prix_moyen_semaine_grossiste" color="secondary" name="step2.prix_moyen_semaine_grossiste" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step2.prix_moyen_semaine_grossiste.$error">{{
                      v$.step2.prix_moyen_semaine_grossiste.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_moyen_semaine_grossiste']">
                      {{ resultError["prix_moyen_semaine_grossiste"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Prix moyen de la semaine d'un kg du produit chez les détaillants <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.prix_moyen_semaine_detaillant" color="secondary" name="step2.prix_moyen_semaine_detaillant" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step2.prix_moyen_semaine_detaillant.$error">{{
                      v$.step2.prix_moyen_semaine_detaillant.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_moyen_semaine_detaillant']">
                      {{ resultError["prix_moyen_semaine_detaillant"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Niveau de disponibilité du produit dans la semaine<span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step2.niveau_disponibilite" color="secondary" name="step2.niveau_disponibilite" size="sm"
                      rounded-size="sm" search :options="niveau_disponibilitesOptions" />
                    <small v-if="v$.step2.niveau_disponibilite.$error">{{
                      v$.step2.niveau_disponibilite.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['niveau_disponibilite']">
                      {{ resultError["niveau_disponibilite"] }}
                    </small>
                  </div>
                </div>
             
               
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Date d'enquete
                    </label>
                    <MazInput v-model="step2.date_enquete" color="secondary" name="step2.date_enquete" size="sm"
                      rounded-size="sm" type="date"  />
                    <small v-if="v$.step2.date_enquete.$error">{{
                      v$.step2.date_enquete.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['date_enquete']">
                      {{ resultError["date_enquete"] }}
                    </small>
                  </div>
                </div>
            
    
               
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Observation sur le prix du produit dans la semaine
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
                        <div class="mt-1">Collecteur : <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{ detailData?.collecteur_relation?.nom_collecteur }} {{ detailData?.collecteur_relation?.prenom_collecteur }}</span>
                        </div>
                      </div>
                      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mt-1"> Quantité cumulée de la semaine du produit débarquée dans le débarcadère <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{detailData?.volume_poissons_peches}}</span>
                        </div>
                      </div>
                      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mt-1">Prix moyen de la semaine d'un kg du produit chez les grossistes <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{detailData?.prix_moyen_semaine_grossiste}}</span></div>
                      </div>
                   
    
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">Prix moyen de la semaine d'un kg du produit chez les détaillants <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.prix_moyen_semaine_detaillant}}</span></div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">Niveau de disponibilité du produit dans la semaine <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.niveau_disponibilite}}</span>
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1"> Date d'enquete <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip"  style="width:100px !important ; color:red !important; font-weight:bolder !important"
                          title="Current Salary">{{getYear( detailData?.date_enquete) }}</span></div>
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
        relai:"",
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
  
          principale_espece_peche: "",
          collecteur: "",
          volume_poissons_peches: "",
          prix_moyen_semaine_grossiste: "",
          prix_moyen_semaine_detaillant: "",
          niveau_disponibilite:"",
          date_enquete: "",
          observation: "",
          
        },
        step2: {
          principale_espece_peche: "",
          collecteur: "",
          volume_poissons_peches: "",
          prix_moyen_semaine_grossiste: "",
          prix_moyen_semaine_detaillant: "",
          niveau_disponibilite:"",
          date_enquete: "",
          observation: "",
        },
        Fournisseur: [
          { label: "Abondant", value: "Abondant" },
          { label: "Normal", value: "Normal" },
          { label: "Moyen", value: "Moyen" },
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
  
        principale_espece_peche:  { require },
          collecteur:  { require },
          volume_poissons_peches:  { require },
          niveau_disponibilite: { require },
          prix_moyen_semaine_grossiste:  { require },
          prix_moyen_semaine_detaillant:  { require },
          date_enquete:  { require },
        observation: {  },
      
  
  
      },
      step2: {
        principale_espece_peche:  { require },
          collecteur:  { require },
          volume_poissons_peches:  { require },
          niveau_disponibilite: { require },
          prix_moyen_semaine_grossiste:  { require },
          prix_moyen_semaine_detaillant:  { require },
          date_enquete:  { require },
        observation: {  },
      },
    },
    async mounted() {
      this.dataDetail = await JSON.parse(localStorage.getItem('DataPrixMarche'));
      await this.fetchMagasins();
      await this.fetchProduits();
      await this.fetchUnites();
      await this.fetchCommunes();
      await this.fetchCollecteurs( this.dataDetail?.marche_relation?.relai);
  
  
  
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
          const response = await axios.get(`/parametrages/produits?code_type_marche=06`, {
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
          this.handleErrorsGet(error);
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
          this.handleErrorsGet(error);
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
          this.handleErrorsGet(error);
        }
      },
      async fetchCollecteurs(id) {
        try {
          const response = await axios.get(`/parametrages/collecteurs/${id}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
       
          if (response.status === 200) {
            this.relai = response.data
          
            this.loading = false;
          }
        } catch (error) {
          this.handleErrorsGet(error);
        }
      },
      async fetchMagasins() {
        try {
          const response = await axios.get(`enquetes/marches-prix/prix-enquetes/debarcadere/{enquente_id}?identite=${this.id}`, {
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
          this.handleErrorsGet(error);
        }
      },
      async SubmitMagasins(modalId) {
        this.v$.step1.$touch();
        if (this.v$.$errors.length == 0) {
          this.loading = true;
  
          let data = {
  
            principale_espece_peche: this.step1.principale_espece_peche,
            collecteur: this.step1.collecteur,
            volume_poissons_peches: this.step1.volume_poissons_peches,
            niveau_disponibilite: this.step1.niveau_disponibilite,
            prix_moyen_semaine_grossiste: this.step1.prix_moyen_semaine_grossiste,
            prix_moyen_semaine_detaillant: this.step1.prix_moyen_semaine_detaillant,
            date_enquete: this.step1.date_enquete,
            observation: this.step1.observation,
            enquete: this.id,
  
  
  
          };
  
          console.log('data', data)
          try {
            const response = await axios.post("/enquetes/marches-prix/debarcaderes-ports", data, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              }
            });
            console.log('qfs', response)
            if (response.status === 200) {
              this.closeModal(modalId);
              this.step1 = {
  
        principale_espece_peche: "",
          collecteur: "",
          volume_poissons_peches: "",
          prix_moyen_semaine_grossiste: "",
          prix_moyen_semaine_detaillant: "",
          niveau_disponibilite:"",
          date_enquete: "",
          observation: "",
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
    
      async HandleIdUpdate(id, modalId , nom) {
        this.openModal(modalId)
        this.stepModal = "update";
        this.loading = true;
  
        try {
          const response = await axios.get(`/enquetes/marches-prix/collectes/detail/${id}?type=${nom}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          if (response.status === 200) {
            console.log("Slbvlkjbv", response);
  
            let data = response.data;
            (this.step2.principale_espece_peche = data.principale_espece_peche),
              (this.step2.collecteur = data.collecteur),
              (this.step2.volume_poissons_peches = data.volume_poissons_peches),
              (this.step2.prix_moyen_semaine_grossiste = data.prix_moyen_semaine_grossiste),
              (this.step2.prix_moyen_semaine_detaillant = data.prix_moyen_semaine_detaillant),
              (this.step2.niveau_disponibilite = data.niveau_disponibilite),
              (this.step2.date_enquete = data.date_enquete),
              (this.step2.observation = data.observation),
              (this.ToId = data.id_fiche);
            this.loading = false;
          }
        } catch (error) {
          this.handleErrorsGet(error);
        }
      },
      async submitUpdate(modalId) {
        this.v$.step2.$touch();
  
        if (this.v$.$errors.length == 0) {
          this.loading = true;
          let data = {
            principale_espece_peche: this.step2.principale_espece_peche,
            collecteur: this.step2.collecteur,
            volume_poissons_peches: this.step2.volume_poissons_peches,
            niveau_disponibilite: this.step2.niveau_disponibilite,
            prix_moyen_semaine_grossiste: this.step2.prix_moyen_semaine_grossiste,
            prix_moyen_semaine_detaillant: this.step2.prix_moyen_semaine_detaillant,
            date_enquete: this.step2.date_enquete,
            observation: this.step2.observation,
            enquete: this.id,
          };
          console.log('data',data)
  
          try {
            const response = await axios.put(`/enquetes/marches-prix/debarcaderes-ports/edition?id=${this.ToId}`, data, {
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
      async HandleIdDelete(id ,nom) {
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
          this.ConfirmeDelete(id ,nom);
        }
      },
      async ConfirmeDelete(id ,nom) {
        this.loading = true;
       
  
        try {
          // Faites une requête pour supprimer l'élément avec l'ID itemId
          const response = await axios.delete(`/enquetes/marches-prix/collectes/${id}?type=${nom}`, {
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
      getCleanCaractere(word){
        return word.replace(/[('")]/g, '')?.trim()
      
    }
    },
  
  
  };
    </script>
    <style lang="css" scoped></style>
    