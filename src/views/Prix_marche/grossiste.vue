<template>
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="content-header">
            <div class="d-flex align-items-center justify-content-between">
    
                <h3 class="page-title"> Enquête prix sur marché grossiste </h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/"><i
                                        class="mdi mdi-home-outline"></i></router-link></li>
                            <li class="breadcrumb-item" aria-current="page">SIM</li>
                            <li class="breadcrumb-item active" aria-current="page">Enquête prix sur marché grossiste</li>
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
                        <h4 class="box-title mb-0">Fiche d'enquête N° <b style="color:red">{{ dataDetail?.num_fiche}}</b> du
                            <b>{{ getYear(dataDetail?.date_enquete)}}</b></h4>
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
                                <div class="mt-1"><i class="ti-user me-2 fs-14"></i>Nom Agent collecte : <span
                                        class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                        title="Current Salary">{{dataDetail?.collecteur_relation?.nom_collecteur}}
                                        {{dataDetail?.collecteur_relation?.prenom_collecteur}}</span></div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div class="mt-1"><i class="ti-location-pin me-2 fs-14"></i>Adresse : <span
                                        class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                        title="Current Salary">{{dataDetail?.collecteur_relation?.adresse}}</span>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div class="mt-1"><i class="ti-mobile me-2 fs-14"></i>Téléphone: <span
                                        class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                        title="Current Salary">{{dataDetail?.collecteur_relation?.whatsapp_collecteur}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div class="mt-1"><i class="ti-layout-column4 me-2 fs-14"></i>Nom marché : <span
                                        style="color:red" class="fw-semibold fs-16"
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
                                        title="Current Salary">{{dataDetail?.personnel_relation?.firstname}}
                                        {{dataDetail?.personnel_relation?.lastname}}</span></div>
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
                                                <input type="text" class="form-control" placeholder="Search"
                                                    aria-label="Recherchez..." aria-describedby="button-addon2"
                                                    v-model="searchMagasin" @input="filterByName">
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
                                    @click="openModal('add-prix-groosite')">
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
                                    <th>Unité de stock</th>
                                    <th>l'unité de mesure pour l'achat</th>
                                    <th>Prix d'achat</th>
                                    <th> Fournisseur principaux</th>
                                    <th> provenance du produit</th>
                                    <th>l'unité de mesure pour la vente</th>
                                    <th>Prix unitaire de vente</th>
                                    <th>Client principal</th>
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
                                                <img v-else :src="data?.produit_relation?.image" alt="Logo"
                                                    class="h-50 w-50" />
                                            </div>
    
                                            <div>
                                                <a href="#"
                                                    class="text-dark font-weight-600 hover-primary mb-1 font-size-16">{{data.produit_relation?.nom_produit}}</a>
                                                <span
                                                    class="text-fade d-block">{{data.produit_relation?.code_produit}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="width: 130px;" class="text-center">{{ data?.unite_stock_relation?.nom_unite ?? "-" }} </td>
                                    <td style="width: auto;" class="text-center">{{ data?.unite_achat_relation?.nom_unite ?? "-" }}</td>
                                    <td style="width: 120px;" class="text-center">
                                        {{ data?.prix_achat ?? "-"}}
                                    </td>
                                    <td style="width: 120px;" class="text-center">{{ data?.fournisseur_principaux ?? "-" }}</td>
    
                                    <td>{{ data.localite_relation?.nom_commune ?? "-" }}</td>
                                    <td>{{ data.unite_vente_relation?.nom_unite ?? "-" }}</td>
                                    <td>{{ data.prix_unitaire_vente ?? "-" }}</td>
                                    <td>{{ data.autre_client_principal ?? "-" }}</td>
                                    <td style="width: 130px">
                                        
    
                                        <div class="d-flex justify-content-evenly border-0">
                                            <a href="javascript:void(0)" class="btn btn-circle btn-success btn-xs" title=""
                                            @click="HandleDetail(data , 'Detail-collecte')"><i class="ti-eye"></i></a>
                                            <button :disabled="data.enquete_relation?.etat === true" class="btn btn-circle btn-info btn-xs" title=""
                                                @click="HandleIdUpdate(data.id_fiche , 'update-prix-groosite' , 'GROSSISTE')"
                                                data-original-title="Update"><i class="ti-marker-alt"></i></button>
                                            <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                                                @click="HandleIdDelete(data.id_fiche ,  'GROSSISTE')" title=""
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
    
        <div class="modal center-modal fade" id="add-prix-groosite" ref="add-prix-groosite" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Ajouter une enquete de prix
                        </h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('add-prix-groosite')">
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
                      <div  class="container-fluid"  >
                          <!-- Étape 1 -->
                      <div v-if="currentStep === 1">
                          <div class="form-container">
                              <div class="row mt-3 content-group">
                                                  <div class="col-6">
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
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Unité de stock <span class="text-danger">*</span></label>
                                                              <MazSelect v-model="step1.unite_stock" color="secondary" name="step1.unite" size="sm" rounded-size="sm" search
                                                              :options="UnitesOptions" />
                                                          <small v-if="v$.step1.unite_stock.$error">{{
                                                              v$.step1.unite_stock.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['unite_stock']">
                                                              {{ resultError["unite_stock"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                          
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Poids moyen d'unite de stock <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step1.poids_moyen_unite_stock" color="secondary" name="step1.poids_moyen_unite_stock" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step1.poids_moyen_unite_stock.$error">{{
                                                              v$.step1.poids_moyen_unite_stock.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['poids_moyen_unite_stock']">
                                                              {{ resultError["poids_moyen_unite_stock"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Stock anterieur <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step1.stock_anterieur" color="secondary" name="step1.stock_anterieur" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step1.stock_anterieur.$error">{{
                                                              v$.step1.stock_anterieur.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['stock_anterieur']">
                                                              {{ resultError["stock_anterieur"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Poids du stock <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step1.poids_stock" color="secondary" name="step1.poids_stock" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step1.poids_stock.$error">{{
                                                              v$.step1.poids_stock.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['poids_stock']">
                                                              {{ resultError["poids_stock"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Stock du jour à semaine <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step1.stock_du_jour" color="secondary" name="step1.stock_du_jour" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step1.stock_du_jour.$error">{{
                                                              v$.step1.stock_du_jour.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['stock_du_jour']">
                                                              {{ resultError["stock_du_jour"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                          
                                              
                          
                              </div> 
                          
                              
                          </div>
                          <div class="btnForm py-3 d-flex items-center justify-content-end">
                          <button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStep('add-prix-groosite')">
                              Suivant
                          </button>
                          </div>
                      </div>
                        <!-- Étape 2 -->
                        <div v-if="currentStep === 2">
                            <div class="form-container">
                              <div class="row mt-3 content-group">
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Quelle est l'unité de mesure pour l'achat <span class="text-danger">*</span></label>
                                                              <MazSelect v-model="step2.unite_achat" color="secondary" name="step2.unite" size="sm" rounded-size="sm" search
                                                              :options="UnitesOptions" />
                                                          <small v-if="v$.step2.unite_achat.$error">{{
                                                              v$.step2.unite_achat.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['unite_achat']">
                                                              {{ resultError["unite_achat"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Nombre d'unite d'achat <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step2.nombre_unite_achat" color="secondary" name="step2.nombre_unite_achat"
                                                              size="sm" rounded-size="sm" type="text" />
                                                          <small v-if="v$.step2.nombre_unite_achat.$error">{{
                                                              v$.step2.nombre_unite_achat.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['nombre_unite_achat']">
                                                              {{ resultError["nombre_unite_achat"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                          
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                          Quantité entrée <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step2.quantite_entree" color="secondary" name="step2.quantite_entree" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step2.quantite_entree.$error">{{
                                                              v$.step2.quantite_entree.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['quantite_entree']">
                                                              {{ resultError["quantite_entree"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Prix d'achat <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step2.prix_achat" color="secondary" name="step2.prix_achat" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step2.prix_achat.$error">{{
                                                              v$.step2.prix_achat.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['prix_achat']">
                                                              {{ resultError["prix_achat"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                
                                                
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Fournisseur principaux <span class="text-danger">*</span></label>
                                                              <MazSelect v-model="step2.fournisseur_principaux" color="secondary" name="step2.unite" size="sm" rounded-size="sm" search
                                                              :options="Fournisseurs" />
                                                          <small v-if="v$.step2.fournisseur_principaux.$error">{{
                                                              v$.step2.fournisseur_principaux.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['fournisseur_principaux']">
                                                              {{ resultError["fournisseur_principaux"] }}
                                                          </small>
                                                      </div>
                                                  </div>

                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              provenance du produit <span class="text-danger">*</span></label>
                                                              <MazSelect v-model="step2.localite_achat" color="secondary" name="step2.destination_finale"
                                                              size="sm" rounded-size="sm" search :options="CommunesOptions" />
                                                          <small v-if="v$.step2.localite_achat.$error">{{
                                                              v$.step2.localite_achat.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['localite_achat']">
                                                              {{ resultError["localite_achat"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                
                          
                                              
                          
                                              </div> 
                            </div>
                            <div class="btnForm py-3 d-flex items-center justify-content-between">
                            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                            <button class="btnLogin" @click.prevent="nextStep('add-prix-groosite')">Next</button>
                          </div>
                          </div>
                            <!-- Étape 3 -->
                        <div v-if="currentStep === 3">
                            <div class="form-container">
                              <div class="row mt-3 content-group">
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                          Quelle est l'unité de mesure pour la vente  <span class="text-danger">*</span></label>
                                                          <MazSelect v-model="step3.unite_vente" color="secondary" name="step3.unite_vente" size="sm" rounded-size="sm" search
                                                              :options="UnitesOptions" />
                                                          <small v-if="v$.step3.unite_vente.$error">{{
                                                              v$.step3.unite_vente.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['unite_vente']">
                                                              {{ resultError["unite_vente"] }}
                                                          </small>
                                                      </div>
                                                  </div>

                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Prix unitaire de vente  <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step3.prix_unitaire_vente" color="secondary" name="step3.prix_unitaire_vente" size="sm"
                                                              rounded-size="sm" type="text" />
                                                          <small v-if="v$.step3.prix_unitaire_vente.$error">{{
                                                              v$.step3.prix_unitaire_vente.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['prix_unitaire_vente']">
                                                              {{ resultError["prix_unitaire_vente"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Client principal   <span class="text-danger">*</span></label>
                                                              <MazSelect v-model="step3.client_vente" color="secondary" name="step3.client_vente" size="sm" rounded-size="sm" search
                                                              :options="Clients" />
                                                          <small v-if="v$.step3.client_vente.$error">{{
                                                              v$.step3.client_vente.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['client_vente']">
                                                              {{ resultError["client_vente"] }}
                                                          </small>
                                                      </div>
                                                  </div>

                                                  <div class="col-6">
                                                      <div class="input-groupe">
                                                          <label for="userpassword">
                                                              Autre client principal  <span class="text-danger">*</span></label>
                                                          <MazInput v-model="step3.autre_client_principal" color="secondary" name="step3.autre_client_principal" size="sm"
                                                              rounded-size="sm" type="number" />
                                                          <small v-if="v$.step3.autre_client_principal.$error">{{
                                                              v$.step3.autre_client_principal.$errors[0].$message
                                                              }}</small>
                                                          <small v-if="resultError['autre_client_principal']">
                                                              {{ resultError["autre_client_principal"] }}
                                                          </small>
                                                      </div>
                                                  </div>
                                              </div> 
                            </div>
                            <div class="btnForm py-3 d-flex items-center justify-content-between">
                            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                            <button class="btnLogin" @click.prevent="nextStep('add-prix-groosite')">Next</button>
                          </div>
                          </div>
                                <!-- Étape 4 -->
                        <div v-if="currentStep === 4">
                            <div class="form-container">
                              <div class="row mt-3 content-group">
                                                
                                                <div class="col-12">
                                                    <div class="input-groupe">
                                                        <label for="userpassword">
                                                            Statut  <span class="text-danger">*</span></label>
                                                        <MazSelect v-model="step4.statut" color="secondary" name="step4.statut"
                                                            size="sm" rounded-size="sm" type="text" search :options="choix" />
                                                        <small v-if="v$.step4.statut.$error">{{
                                                            v$.step4.statut.$errors[0].$message
                                                            }}</small>
                                                        <small v-if="resultError['statut']">
                                                            {{ resultError["statut"] }}
                                                        </small>
                                                    </div>
                                                </div>
                        
                                                
                                                <div class="col-12">
                                                    <div class="input-groupe">
                                                        <label for="userpassword">
                                                            Observations <span class="text-danger">*</span></label>
                                                            <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
                                                            id="text-area" v-model="step4.observation" rows="2"></textarea>
                                                        <small v-if="v$.step4.observation.$error">{{
                                                            v$.step4.observation.$errors[0].$message
                                                            }}</small>
                                                        <small v-if="resultError['observation']">
                                                            {{ resultError["observation"] }}
                                                        </small>
                                                    </div>
                                                </div>
                        
                                              
                        
                                            </div> 
                            </div>
                            <div class="btnForm py-3 d-flex items-center justify-content-between">
                            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
                            <button class="btnLogin" @click.prevent="nextStep('add-prix-groosite')">Finish</button>
                          </div>
                          </div>
                      </div>
                    </div>
                    
                </div>
            </div>
        </div>
    
        <div class="modal center-modal fade" id="update-prix-groosite" ref="update-prix-groosite" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Modifier une enquete prix
                        </h5>
                        <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
                            @click="closeModal('update-prix-groosite')">
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
<div  class="container-fluid"  >
<!-- Étape 1 -->
<div v-if="currentStep === 1">
<div class="form-container">
<div class="row mt-3 content-group">
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Produit <span class="text-danger">*</span></label>
                <MazSelect label="" v-model="Updatestep1.produit" :options="ProduitsOptions" v-slot="{ option  }" search
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
            <small v-if="v$.Updatestep1.produit.$error">{{
                v$.Updatestep1.produit.$errors[0].$message
                }}</small>
            <small v-if="resultError['produit']">
                {{ resultError["produit"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Unité de stock <span class="text-danger">*</span></label>
                <MazSelect v-model="Updatestep1.unite_stock" color="secondary" name="Updatestep1.unite" size="sm" rounded-size="sm" search
                :options="UnitesOptions" />
            <small v-if="v$.Updatestep1.unite_stock.$error">{{
                v$.Updatestep1.unite_stock.$errors[0].$message
                }}</small>
            <small v-if="resultError['unite_stock']">
                {{ resultError["unite_stock"] }}
            </small>
        </div>
    </div>

    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Poids moyen d'unite de stock <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep1.poids_moyen_unite_stock" color="secondary" name="Updatestep1.poids_moyen_unite_stock" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep1.poids_moyen_unite_stock.$error">{{
                v$.Updatestep1.poids_moyen_unite_stock.$errors[0].$message
                }}</small>
            <small v-if="resultError['poids_moyen_unite_stock']">
                {{ resultError["poids_moyen_unite_stock"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Stock anterieur <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep1.stock_anterieur" color="secondary" name="Updatestep1.stock_anterieur" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep1.stock_anterieur.$error">{{
                v$.Updatestep1.stock_anterieur.$errors[0].$message
                }}</small>
            <small v-if="resultError['stock_anterieur']">
                {{ resultError["stock_anterieur"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Poids du stock <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep1.poids_stock" color="secondary" name="Updatestep1.poids_stock" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep1.poids_stock.$error">{{
                v$.Updatestep1.poids_stock.$errors[0].$message
                }}</small>
            <small v-if="resultError['poids_stock']">
                {{ resultError["poids_stock"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Stock du jour à semaine <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep1.stock_du_jour" color="secondary" name="Updatestep1.stock_du_jour" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep1.stock_du_jour.$error">{{
                v$.step1.stock_du_jour.$errors[0].$message
                }}</small>
            <small v-if="resultError['stock_du_jour']">
                {{ resultError["stock_du_jour"] }}
            </small>
        </div>
    </div>

 

</div> 


</div>
<div class="btnForm py-3 d-flex items-center justify-content-end">
<button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStepUpdate('update-prix-groosite')">
Suivant
</button>
</div>
</div>

<!-- Étape 2 -->
<div v-if="currentStep === 2">
<div class="form-container">
<div class="row mt-3 content-group">
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Quelle est l'unité de mesure pour l'achat <span class="text-danger">*</span></label>
                <MazSelect v-model="Updatestep2.unite_achat" color="secondary" name="Updatestep2.unite" size="sm" rounded-size="sm" search
                :options="UnitesOptions" />
            <small v-if="v$.Updatestep2.unite_achat.$error">{{
                v$.Updatestep2.unite_achat.$errors[0].$message
                }}</small>
            <small v-if="resultError['unite_achat']">
                {{ resultError["unite_achat"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Nombre d'unite d'achat <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep2.nombre_unite_achat" color="secondary" name="Updatestep2.nombre_unite_achat"
                size="sm" rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep2.nombre_unite_achat.$error">{{
                v$.Updatestep2.nombre_unite_achat.$errors[0].$message
                }}</small>
            <small v-if="resultError['nombre_unite_achat']">
                {{ resultError["nombre_unite_achat"] }}
            </small>
        </div>
    </div>

    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
             Quantité entrée <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep2.quantite_entree" color="secondary" name="Updatestep2.quantite_entree" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep2.quantite_entree.$error">{{
                v$.Updatestep2.quantite_entree.$errors[0].$message
                }}</small>
            <small v-if="resultError['quantite_entree']">
                {{ resultError["quantite_entree"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Prix d'achat <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep2.prix_achat" color="secondary" name="Updatestep2.prix_achat" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep2.prix_achat.$error">{{
                v$.Updatestep2.prix_achat.$errors[0].$message
                }}</small>
            <small v-if="resultError['prix_achat']">
                {{ resultError["prix_achat"] }}
            </small>
        </div>
    </div>
  
  
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Fournisseur principaux <span class="text-danger">*</span></label>
                <MazSelect v-model="Updatestep2.fournisseur_principaux" color="secondary" name="Updatestep2.unite" size="sm" rounded-size="sm" search
                :options="Fournisseurs" />
            <small v-if="v$.Updatestep2.fournisseur_principaux.$error">{{
                v$.Updatestep2.fournisseur_principaux.$errors[0].$message
                }}</small>
            <small v-if="resultError['fournisseur_principaux']">
                {{ resultError["fournisseur_principaux"] }}
            </small>
        </div>
    </div>

    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                provenance du produit <span class="text-danger">*</span></label>
                <MazSelect v-model="Updatestep2.localite_achat" color="secondary" name="Updatestep2.destination_finale"
                size="sm" rounded-size="sm" search :options="CommunesOptions" />
            <small v-if="v$.Updatestep2.localite_achat.$error">{{
                v$.Updatestep2.localite_achat.$errors[0].$message
                }}</small>
            <small v-if="resultError['localite_achat']">
                {{ resultError["localite_achat"] }}
            </small>
        </div>
    </div>
  

 

</div> 
</div>
<div class="btnForm py-3 d-flex items-center justify-content-between">
<button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
<button class="btnLogin" @click.prevent="nextStepUpdate('update-prix-groosite')">Next</button>
</div>
</div>


<!-- Étape 3 -->
<div v-if="currentStep === 3">
<div class="form-container">
<div class="row mt-3 content-group">
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
             Quelle est l'unité de mesure pour la vente  <span class="text-danger">*</span></label>
             <MazSelect v-model="Updatestep3.unite_vente" color="secondary" name="Updatestep3.unite_vente" size="sm" rounded-size="sm" search
                :options="UnitesOptions" />
            <small v-if="v$.Updatestep3.unite_vente.$error">{{
                v$.Updatestep3.unite_vente.$errors[0].$message
                }}</small>
            <small v-if="resultError['unite_vente']">
                {{ resultError["unite_vente"] }}
            </small>
        </div>
    </div>

    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Prix unitaire de vente  <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep3.prix_unitaire_vente" color="secondary" name="Updatestep3.prix_unitaire_vente" size="sm"
                rounded-size="sm" type="text" />
            <small v-if="v$.Updatestep3.prix_unitaire_vente.$error">{{
                v$.Updatestep3.prix_unitaire_vente.$errors[0].$message
                }}</small>
            <small v-if="resultError['prix_unitaire_vente']">
                {{ resultError["prix_unitaire_vente"] }}
            </small>
        </div>
    </div>
    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Client principal   <span class="text-danger">*</span></label>
                <MazSelect v-model="Updatestep3.client_vente" color="secondary" name="Updatestep3.client_vente" size="sm" rounded-size="sm" search
                :options="Clients" />
            <small v-if="v$.Updatestep3.client_vente.$error">{{
                v$.Updatestep3.client_vente.$errors[0].$message
                }}</small>
            <small v-if="resultError['client_vente']">
                {{ resultError["client_vente"] }}
            </small>
        </div>
    </div>

    <div class="col-6">
        <div class="input-groupe">
            <label for="userpassword">
                Autre client principal  <span class="text-danger">*</span></label>
            <MazInput v-model="Updatestep3.autre_client_principal" color="secondary" name="Updatestep3.autre_client_principal" size="sm"
                rounded-size="sm" type="number" />
            <small v-if="v$.Updatestep3.autre_client_principal.$error">{{
                v$.Updatestep3.autre_client_principal.$errors[0].$message
                }}</small>
            <small v-if="resultError['autre_client_principal']">
                {{ resultError["autre_client_principal"] }}
            </small>
        </div>
    </div>
</div> 
</div>
<div class="btnForm py-3 d-flex items-center justify-content-between">
<button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
<button class="btnLogin" @click.prevent="nextStepUpdate('update-prix-groosite')">Next</button>
</div>
</div>

<!-- Étape 4 -->
<div v-if="currentStep === 4">
<div class="form-container">
<div class="row mt-3 content-group">
   
   <div class="col-12">
       <div class="input-groupe">
           <label for="userpassword">
               Statut  <span class="text-danger">*</span></label>
           <MazSelect v-model="Updatestep4.statut" color="secondary" name="Updatestep4.statut"
               size="sm" rounded-size="sm" type="text" search :options="choix" />
           <small v-if="v$.Updatestep4.statut.$error">{{
               v$.Updatestep4.statut.$errors[0].$message
               }}</small>
           <small v-if="resultError['statut']">
               {{ resultError["statut"] }}
           </small>
       </div>
   </div>

  
   <div class="col-12">
       <div class="input-groupe">
           <label for="userpassword">
               Observations <span class="text-danger">*</span></label>
               <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important"
               id="text-area" v-model="Updatestep4.observation" rows="2"></textarea>
           <small v-if="v$.Updatestep4.observation.$error">{{
               v$.Updatestep4.observation.$errors[0].$message
               }}</small>
           <small v-if="resultError['observation']">
               {{ resultError["observation"] }}
           </small>
       </div>
   </div>



</div> 
</div>
<div class="btnForm py-3 d-flex items-center justify-content-between">
<button class="btnLogin" @click.prevent="prevStepUpdate">Previous</button>
<button class="btnLogin" @click.prevent="nextStepUpdate('update-prix-groosite')">Finish</button>
</div>
</div>

</div>




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
                                        <div
                                            class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                            <div class="min-width-zero">
                                                <p class="mb-0 font-size-16 text-dark">Nom :
                                                    <b>{{detailData?.produit_relation?.nom_produit}}</b>
                                                </p>
                                                <p class="mb-0 font-size-16 text-dark">Code:
                                                    <b>{{detailData?.produit_relation?.code_produit}}</b>
                                                </p>
                                                <p class="mb-0 font-size-16 text-dark">Filière:
                                                    <b>{{detailData?.produit_relation?.filiere}}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="row">
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">Unité de stock <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.unite_stock_relation?.nom_unite}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">Poids moyen d'unite de stock : <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.poids_moyen_unite_stock}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">  Stock anterieur <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.stock_anterieur}}</span></div>
                                        </div>
    
    
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Poids du stock <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.poids_stock}}</span></div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Stock du jour à semaine <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.stock_du_jour}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Quelle est l'unité de mesure pour l'achat <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.unite_achat_relation?.nom_unite}}</span>
                                            </div>
                                        </div>
    
    
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Nombre d'unite d'achat: <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.nombre_unite_achat}}</span></div>
                                        </div>
    
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Quantité entrée : <span
                                                    class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.quantite_entree }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">  Prix d'achat : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.prix_achat}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Fournisseur principaux : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.fournisseur_principaux}}</span>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">   provenance du produit : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.localite_relation?.nom_commune}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">  Quelle est l'unité de mesure pour la vente : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.unite_vente_relation?.nom_unite}}</span>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">  Prix unitaire de vente : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.prix_unitaire_vente}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Client principal  : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.client_vente}}</span>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1">   Autre client principal : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.autre_client_principal}}</span>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="mt-1"> Statut : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
                                                    title="Current Salary">{{detailData?.statut === true ? "Validé" : "Non-validé" }}</span>
                                            </div>
                                        </div>

                                        <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div class="mt-1">  Observations : <span class="fw-semibold fs-16"
                                                    data-bs-toggle="tooltip"
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
      searchMagasin: "",
      currentStep: 1,
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
        unite_stock: "",
        stock_anterieur: "",
        poids_moyen_unite_stock: "",
        poids_stock: "",
        stock_du_jour: "",
      },
      step2:{
        unite_achat: "",
        nombre_unite_achat: "",
        quantite_entree: "",
        prix_achat: "",
        fournisseur_principaux: "",
        localite_achat: "",
      },
      step3:{
        unite_vente: "",
        prix_unitaire_vente: "",
        client_vente: "",
        autre_client_principal: "",
      },
      step4:{
        statut: "",
        observation: "",
      },
      step5: {
        code_magasin: "",
        nom_magasin: "",
        longitude: "",
        latitude: "",
        capacite: "",
        description: "",
        collecteur: "",
        commune: "",
      },

      Updatestep1: {
        produit: "",
        unite_stock: "",
        stock_anterieur: "",
        poids_moyen_unite_stock: "",
        poids_stock: "",
        stock_du_jour: "",
      },
       Updatestep2:{
        unite_achat: "",
        nombre_unite_achat: "",
        quantite_entree: "",
        prix_achat: "",
        fournisseur_principaux: "",
        localite_achat: "",
      },
       Updatestep3:{
        unite_vente: "",
        prix_unitaire_vente: "",
        client_vente: "",
        autre_client_principal: "",
      },
       Updatestep4:{
        statut: "",
        observation: "",
      },
      step5: {
        code_magasin: "",
        nom_magasin: "",
        longitude: "",
        latitude: "",
        capacite: "",
        description: "",
        collecteur: "",
        commune: "",
      },
      v$: useVuelidate(),
      error: "",
      resultError: {},
      Fournisseurs: [
        { label: "Collecteur", value: 1 },
        { label: "Grossiste", value: 2 },
        { label: "Importateur", value: 3 },
        { label: "Producteur", value: 4 },

      ],
      Clients: [
        { label: "Grossiste", value: 1 },
        { label: "Semi-grossiste", value: 2 },
        { label: "Detaillant", value: 3 },
        { label: "Autre", value: 4 },


      ],

      choix: [
        { label: "Validé", value: true },
        { label: "Non-validé", value: false },


      ],
    };
  },
  validations: {
    step1: {

      produit: { require },
      unite_stock: { require },
      stock_anterieur: { require },
      poids_moyen_unite_stock: { require },
      poids_stock: { require },
      stock_du_jour: { require },
    },
    step2:{
        unite_achat: { require },
      nombre_unite_achat: { require },
      quantite_entree: { require },
      prix_achat: { require },
      fournisseur_principaux: { require },
      localite_achat: { require },
    },
    step3:{
        unite_vente: { require },
      prix_unitaire_vente: { require },
      client_vente: { require },
      autre_client_principal: { require },
},
step4:{
    statut: { require },
    observation: { require },
},
   

Updatestep1: {

produit: { require },
unite_stock: { require },
stock_anterieur: { require },
poids_moyen_unite_stock: { require },
poids_stock: { require },
stock_du_jour: { require },
},
Updatestep2:{
  unite_achat: { require },
nombre_unite_achat: { require },
quantite_entree: { require },
prix_achat: { require },
fournisseur_principaux: { require },
localite_achat: { require },
},
Updatestep3:{
  unite_vente: { require },
prix_unitaire_vente: { require },
client_vente: { require },
autre_client_principal: { require },
},
Updatestep4:{
statut: { require },
observation: { require },
},
  },
  async mounted() {
    this.dataDetail = await JSON.parse(localStorage.getItem('DataPrixMarche'));
    await this.fetchMagasins();
    await this.fetchCommunes();
    await this.fetchCollecteurs();
    await this.fetchProduits();
    await this.fetchUnites();
   

  },
  methods: {
    successmsg: successmsg,
    stepperProgress() {
        return (100 / 3) * (this.currentStep - 1) + "%";
      },
      prevStep() {
        if (this.currentStep > 1) {
         
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
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
          
    }
   else if (this.currentStep === 2) { 
    this.v$.step2.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
     
    }
   else if (this.currentStep === 3) {
    this.v$.step3.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
    }
    else if (this.currentStep === 4) {
      this.v$.step4.$touch();
      if (this.v$.$errors.length == 0) {
        this.SubmitPixGrossiste(modalId)
      } else {
        console.log("errroor1", this.v$.$errors);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
       
      }
       
          
    }

       
    } catch (error) {
        // Gérer les erreurs
        console.log("errroor222", this.v$.$errors);

        console.error("Une erreur s'est produite :", error);
        console.log("errroor222", this.v$.$errors);
        

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
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
     
    }
   else if (this.currentStep === 3) {
    this.v$.Updatestep3.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        
      } else {
        console.log("errroor1", this.v$.$errors);
       
       
      }
       
    }
    else if (this.currentStep === 4) {
      this.v$.Updatestep4.$touch();
      if (this.v$.$errors.length == 0) {
        this.submitUpdate(modalId)
      } else {
        console.log("errroor1", this.v$.$errors);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
       
      }
       
          
    }

       
    } catch (error) {
        // Gérer les erreurs
        console.log("errroor222", this.v$.$errors);

        console.error("Une erreur s'est produite :", error);
        console.log("errroor222", this.v$.$errors);
        

        window.scrollTo({ top: 0, behavior: "smooth" });
         this.loading = false;
    }
      },
    goBack() {
      this.$router.go(-1);
    },
    goBackM() {
      this.$router.go(-2);

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
            value: item.code_commune
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
    async fetchProduits() {
      try {
        const response = await axios.get(`/parametrages/produits?code_type_marche=02`, {
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
        const response = await axios.get(`/parametrages/unites/associated-unites/type-marche?id_of_type_market=${2}`, {
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
    async SubmitPixGrossiste(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let data = {
        produit: this.step1?.produit,
        unite_stock: this.step1?.unite_stock,
        stock_anterieur: this.step1?.stock_anterieur,
        poids_moyen_unite_stock: this.step1?.poids_moyen_unite_stock,
        poids_stock: this.step1?.poids_stock,
        stock_du_jour: this.step1?.stock_du_jour,

        unite_achat: this.step2?.unite_achat,
        nombre_unite_achat: this.step2?.nombre_unite_achat,
        quantite_entree: this.step2?.quantite_entree,
        prix_achat: this.step2?.prix_achat,
        fournisseur_principaux: this.step2?.fournisseur_principaux,
        localite_achat: this.step2?.localite_achat,

        unite_vente: this.step3?.unite_vente,
        prix_unitaire_vente: this.step3?.prix_unitaire_vente,
        client_vente: this.step3?.client_vente,
        autre_client_principal: this.step3?.autre_client_principal,

        statut: this.step4?.statut,
        observation: this.step4?.observation,
        enquete:this.id
        };

        console.log('data', data)
        try {
          const response = await axios.post("/enquetes/marches-prix/grossistes", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            }
          });
          console.log('qfs', response)
          if (response.status === 200) {
            this.closeModal(modalId);
            this.step1 ={
        produit: "",
        unite_stock: "",
        stock_anterieur: "",
        poids_moyen_unite_stock: "",
        poids_stock: "",
        stock_du_jour: "",
      },
      this.step2={
        unite_achat: "",
        nombre_unite_achat: "",
        quantite_entree: "",
        prix_achat: "",
        fournisseur_principaux: "",
        localite_achat: "",
      },
      this.step3={
        unite_vente: "",
        prix_unitaire_vente: "",
        client_vente: "",
        autre_client_principal: "",
      },
      this.step4={
        statut: "",
        observation: "",
      },
            this.v$.step1.$reset();
            this.v$.step2.$reset();
            this.v$.step3.$reset();
            this.v$.step4.$reset();
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
    async HandleIdUpdate(id, modalId, nom) {
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
            (this.Updatestep1.produit = data.produit),
            (this.Updatestep1.unite_stock = data.unite_stock),
            (this.Updatestep1.stock_anterieur = data.stock_anterieur),
            (this.Updatestep1.poids_moyen_unite_stock = data.poids_moyen_unite_stock),
            (this.Updatestep1.poids_stock = data.poids_stock),
            (this.Updatestep1.stock_du_jour = data.stock_du_jour),

            (this.Updatestep2.unite_achat = data.unite_achat),
            (this.Updatestep2.nombre_unite_achat = data.nombre_unite_achat),
            (this.Updatestep2.quantite_entree = data.quantite_entree),
            (this.Updatestep2.prix_achat = data.prix_achat),
            (this.Updatestep2.fournisseur_principaux = data.fournisseur_principaux),
            (this.Updatestep2.localite_achat = data.localite_achat),

            (this.Updatestep3.unite_vente = data.unite_vente),
            (this.Updatestep3.prix_unitaire_vente = data.prix_unitaire_vente),
            (this.Updatestep3.client_vente = data.client_vente),
            (this.Updatestep3.autre_client_principal = data.autre_client_principal),

            (this.Updatestep4.statut = data.statut),
            (this.Updatestep4.observation = data.observation),

            (this.ToId = data.id_fiche);
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    async submitUpdate(modalId) {
    
        this.loading = true;
        let data = {
        produit: this.Updatestep1?.produit,
        unite_stock: this.Updatestep1?.unite_stock,
        stock_anterieur: this.Updatestep1?.stock_anterieur,
        poids_moyen_unite_stock: this.Updatestep1?.poids_moyen_unite_stock,
        poids_stock: this.Updatestep1?.poids_stock,
        stock_du_jour: this.Updatestep1?.stock_du_jour,

        unite_achat: this.Updatestep2?.unite_achat,
        nombre_unite_achat: this.Updatestep2?.nombre_unite_achat,
        quantite_entree: this.Updatestep2?.quantite_entree,
        prix_achat: this.Updatestep2?.prix_achat,
        fournisseur_principaux: this.Updatestep2?.fournisseur_principaux,
        localite_achat: this.Updatestep2?.localite_achat,

        unite_vente: this.Updatestep3?.unite_vente,
        prix_unitaire_vente: this.Updatestep3?.prix_unitaire_vente,
        client_vente: this.Updatestep3?.client_vente,
        autre_client_principal: this.Updatestep3?.autre_client_principal,

        statut: this.Updatestep4?.statut,
        observation: this.Updatestep4?.observation,
        enquete:this.id
        };

        console.log('data',data)
        try {
          const response = await axios.put(`/enquetes/marches-prix/grossistes/edition?id=${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.status === 200) {
            this.closeModal(modalId);
            this.currentStep = 1;
            this.successmsg(
                "Mise à jour de l'enquête",
                "Votre enquête sur les prix a été mise à jour avec succès !"
            );
            await this.fetchMagasins();
          }
        } catch (error) {
          this.handleErrors(error);
        }
      
     
    },
    async HandleIdDelete(id, nom) {
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
        this.ConfirmeDelete(id , nom);
      }
    },
    async ConfirmeDelete(id, nom) {
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
      if (this.searchMagasin !== null) {
        const tt = this.searchMagasin;
        const searchValue = tt.toLowerCase();
        this.MagasinsOptions = this.data.filter((user) => {
          const Nom = user.code_magasin || "";
          const Descriptions = user.nom_magasin || "";
          const Commune = user.commune_relation?.nom_commune || "";
          const Collecteur = user.collecteur_relation?.nom_collecteur || "";


          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) ||
            Commune.toLowerCase().includes(searchValue) ||
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
    cursor:pointer;
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
    border:1px solid var(--color-primary)
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
  }
  
  .btnLogin {
    padding: 1em 3em;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color:var(--color-primary);
    border: none;
    border-radius: 45px;
  
    cursor: pointer;
    outline: none;
  }
  
  .btnLogin:hover {
    background-color: #fff;
    border: 1px solid var(--color-primary);
    color:#000;
  }
    

.wizard-content .wizard>.steps>ul>li .step {
    color: red !important;
}
</style>
  