<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <div class="content-header">
        <div class="d-flex align-items-center justify-content-between">
    
          <h3 class="page-title"> Enquête prix sur marché bétail </h3>
          <div class="d-inline-block align-items-center">
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
                <li class="breadcrumb-item" aria-current="page">SIM</li>
                <li class="breadcrumb-item active" aria-current="page">Enquête prix sur marché bétail</li>
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
                    <th>Prix unitaire</th>
                    <th>  Total vendu distribué</th>
                    <th>  Nbr présent chez le vendeur</th>
                    <th>  provenance</th>
                    <th>  Nbr de têtes par provenance</th>
                    <th>  Nbr vendu par provenance</th>
                    <th>   Nbr présent chez l'acheteur</th>
                    <th>   Nbr de têtes achetées</th>
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
                    <td style="width: 80px;" class="text-center">{{ data?.prix_unitaire }}</td>
                    <td style="width: auto;">{{ data.total_vendu_distribues }}</td>
                    <td style="width: auto;" class="text-center">
                      {{ data?.nombre_present_chez_vendeur ?? "-"}}
                    </td>
                    <td>{{ data?.provenance_relation?.nom_origine_produit ?? "-" }}</td>
                    <td>
                      <div class="widget-user-image">
    
                        <div style="display: inline-block">
                          <span style="font-weight: 600; font-size: 1.1em; display: block">{{
                         data?.nombre_tete_par_provenance  }} </span>
                        </div>
                      </div>
                    </td>
    
                    <td>{{ data.nombre_vendu_par_provenance }}</td>
                    <td>{{ data.nombre_present_chez_acheteur }}</td>
                    <td>{{ data.nombre_tete_achete }}</td>
                    <td style="width: 130px">
                     
                     
                      <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-success btn-xs" title=""
                        @click="HandleDetail(data , 'Detail-collecte')"><i class="ti-eye"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title=""
                          @click="HandleIdUpdate(data.id_fiche , 'update-prix-collecte' , 'BETAIL')" data-original-title="Update"><i
                            class="ti-marker-alt"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs"
                          @click="HandleIdDelete(data.id_fiche , 'BETAIL')" title="" data-toggle="tooltip"
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
                <!-- <div class="col-4">
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
                </div> -->
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword"> Prix unitaire
                      <span class="text-danger">*</span></label>
                    <MazInput v-model="step1.prix_unitaire" color="secondary" name="step1.prix_unitaire" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step1.prix_unitaire.$error">{{
                      v$.step1.prix_unitaire.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_unitaire']">
                      {{ resultError["prix_unitaire"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Total vendu distribué <span class="text-danger">*</span></label>
                    <MazInput v-model="step1.total_vendu_distribues" color="secondary" name="step1.total_vendu_distribues" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step1.total_vendu_distribues.$error">{{
                      v$.step1.total_vendu_distribues.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['total_vendu_distribues']">
                      {{ resultError["total_vendu_distribues"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     Etat corporel <span class="text-danger">*</span></label>
                    <MazInput v-model="step1.etat_corporel" color="secondary" name="step1.etat_corporel" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step1.etat_corporel.$error">{{
                      v$.step1.etat_corporel.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['etat_corporel']">
                      {{ resultError["etat_corporel"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                    Nombre présent chez le vendeur<span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step1.nombre_present_chez_vendeur" color="secondary" name="step1.nombre_present_chez_vendeur" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step1.nombre_present_chez_vendeur.$error">{{
                      v$.step1.nombre_present_chez_vendeur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_present_chez_vendeur']">
                      {{ resultError["nombre_present_chez_vendeur"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     provenance<span class="text-danger">*</span>
                    </label>
                    <MazSelect v-model="step1.provenance" color="secondary" name="step1.provenance"
                      size="sm" rounded-size="sm" search :options="CommunesOptions" />
                    <small v-if="v$.step1.provenance.$error">{{
                      v$.step1.provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['provenance']">
                      {{ resultError["provenance"] }}
                    </small>
                  </div>
                </div>
             
    
                
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Nombre de têtes par provenance
                    </label>
                    <MazInput v-model="step1.nombre_tete_par_provenance" color="secondary" name="step1.nombre_tete_par_provenance" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step1.nombre_tete_par_provenance.$error">{{
                      v$.step1.nombre_tete_par_provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_tete_par_provenance']">
                      {{ resultError["nombre_tete_par_provenance"] }}
                    </small>
                  </div>
                </div>
              
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     Nombre vendu par provenance <span class="text-danger">*</span></label>
                    <MazInput v-model="step1.nombre_vendu_par_provenance" color="secondary"
                      name="step1.nombre_vendu_par_provenance" size="sm" rounded-size="sm" type="number" 
                     />
                    <small v-if="v$.step1.nombre_vendu_par_provenance.$error">{{
                      v$.step1.nombre_vendu_par_provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_vendu_par_provenance']">
                      {{ resultError["nombre_vendu_par_provenance"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Nombre présent chez l'acheteur <span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step1.nombre_present_chez_acheteur" color="secondary" name="step1.nombre_present_chez_acheteur" size="sm" rounded-size="sm"
                     type="number" />
                    <small v-if="v$.step1.nombre_present_chez_acheteur.$error">{{
                      v$.step1.nombre_present_chez_acheteur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_present_chez_acheteur']">
                      {{ resultError["nombre_present_chez_acheteur"] }}
                    </small>
                  </div>
                </div>
                    <div class="col-6">
                                    <div class="input-groupe">
                                        <label for="userpassword">
                                          
                                          Nombre de têtes achetées <span class="text-danger">*</span>
                                        </label>
                                        <MazInput v-model="step1.nombre_tete_achete" color="secondary" name="step1.nombre_tete_achete"
                                            size="sm" rounded-size="sm" type="number" />
                                        <small v-if="v$.step1.nombre_tete_achete.$error">{{
                                            v$.step1.nombre_tete_achete.$errors[0].$message
                                            }}</small>
                                        <small v-if="resultError['nombre_tete_achete']">
                                            {{ resultError["nombre_tete_achete"] }}
                                        </small>
                                    </div>
                                </div> 
                                   <!-- <div class="col-4">
                                    <div class="input-groupe">
                                        <label for="userpassword">
                                          
                                          Date de l'enquête  <span class="text-danger">*</span>
                                        </label>
                                        <MazInput v-model="step1.date_enquete" color="secondary" name="step1.date_enquete"
                                            size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.date_enquete.$error">{{
                                            v$.step1.date_enquete.$errors[0].$message
                                            }}</small>
                                        <small v-if="resultError['date_enquete']">
                                            {{ resultError["date_enquete"] }}
                                        </small>
                                    </div>
                                </div> 
               -->
    
    
    
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
                <!-- <div class="col-4">
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
                </div> -->
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword"> Prix unitaire
                      <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.prix_unitaire" color="secondary" name="step2.prix_unitaire" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step2.prix_unitaire.$error">{{
                      v$.step2.prix_unitaire.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['prix_unitaire']">
                      {{ resultError["prix_unitaire"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                        Total vendu distribué <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.total_vendu_distribues" color="secondary" name="step2.total_vendu_distribues" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step2.total_vendu_distribues.$error">{{
                      v$.step2.total_vendu_distribues.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['total_vendu_distribues']">
                      {{ resultError["total_vendu_distribues"] }}
                    </small>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     Etat corporel <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.etat_corporel" color="secondary" name="step2.etat_corporel" size="sm"
                      rounded-size="sm" type="text" />
                    <small v-if="v$.step2.etat_corporel.$error">{{
                      v$.step2.etat_corporel.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['etat_corporel']">
                      {{ resultError["etat_corporel"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                    Nombre présent chez le vendeur<span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step2.nombre_present_chez_vendeur" color="secondary" name="step2.nombre_present_chez_vendeur" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step2.nombre_present_chez_vendeur.$error">{{
                      v$.step2.nombre_present_chez_vendeur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_present_chez_vendeur']">
                      {{ resultError["nombre_present_chez_vendeur"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     provenance<span class="text-danger">*</span>
                    </label>
                    <MazSelect v-model="step2.provenance" color="secondary" name="step2.provenance"
                      size="sm" rounded-size="sm" search :options="CommunesOptions" />
                    <small v-if="v$.step2.provenance.$error">{{
                      v$.step2.provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['provenance']">
                      {{ resultError["provenance"] }}
                    </small>
                  </div>
                </div>
             
    
                
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Nombre de têtes par provenance
                    </label>
                    <MazInput v-model="step2.nombre_tete_par_provenance" color="secondary" name="step2.nombre_tete_par_provenance" size="sm"
                      rounded-size="sm" type="number" />
                    <small v-if="v$.step2.nombre_tete_par_provenance.$error">{{
                      v$.step2.nombre_tete_par_provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_tete_par_provenance']">
                      {{ resultError["nombre_tete_par_provenance"] }}
                    </small>
                  </div>
                </div>
              
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                     Nombre vendu par provenance <span class="text-danger">*</span></label>
                    <MazInput v-model="step2.nombre_vendu_par_provenance" color="secondary"
                      name="step2.nombre_vendu_par_provenance" size="sm" rounded-size="sm" type="number" 
                     />
                    <small v-if="v$.step2.nombre_vendu_par_provenance.$error">{{
                      v$.step2.nombre_vendu_par_provenance.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_vendu_par_provenance']">
                      {{ resultError["nombre_vendu_par_provenance"] }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-groupe">
                    <label for="userpassword">
                      Nombre présent chez l'acheteur <span class="text-danger">*</span>
                    </label>
                    <MazInput v-model="step2.nombre_present_chez_acheteur" color="secondary" name="step2.nombre_present_chez_acheteur" size="sm" rounded-size="sm"
                     type="number" />
                    <small v-if="v$.step2.nombre_present_chez_acheteur.$error">{{
                      v$.step2.nombre_present_chez_acheteur.$errors[0].$message
                      }}</small>
                    <small v-if="resultError['nombre_present_chez_acheteur']">
                      {{ resultError["nombre_present_chez_acheteur"] }}
                    </small>
                  </div>
                </div>
                    <div class="col-6">
                                    <div class="input-groupe">
                                        <label for="userpassword">
                                          
                                          Nombre de têtes achetées <span class="text-danger">*</span>
                                        </label>
                                        <MazInput v-model="step2.nombre_tete_achete" color="secondary" name="step2.nombre_tete_achete"
                                            size="sm" rounded-size="sm" type="number" />
                                        <small v-if="v$.step2.nombre_tete_achete.$error">{{
                                            v$.step2.nombre_tete_achete.$errors[0].$message
                                            }}</small>
                                        <small v-if="resultError['nombre_tete_achete']">
                                            {{ resultError["nombre_tete_achete"] }}
                                        </small>
                                    </div>
                                </div> 
                                   <!-- <div class="col-4">
                                    <div class="input-groupe">
                                        <label for="userpassword">
                                          
                                          Date de l'enquête  <span class="text-danger">*</span>
                                        </label>
                                        <MazInput v-model="step2.date_enquete" color="secondary" name="step2.date_enquete"
                                            size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step2.date_enquete.$error">{{
                                            v$.step2.date_enquete.$errors[0].$message
                                            }}</small>
                                        <small v-if="resultError['date_enquete']">
                                            {{ resultError["date_enquete"] }}
                                        </small>
                                    </div>
                                </div> 
               -->
    
    
    
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
        <div class="modal-dialog modal-lg">
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
                        <div class="mt-1">Prix unitaire <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{detailData?.prix_unitaire}}</span>
                        </div>
                      </div>
                      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mt-1"> Total vendu distribué <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{detailData?.total_vendu_distribues}}</span>
                        </div>
                      </div>
                      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mt-1"> Etat corporel <span class="fw-semibold fs-16"
                            data-bs-toggle="tooltip" title="Current Salary">{{detailData?.etat_corporel}}</span></div>
                      </div>
                   
    
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1"> Nombre présent chez le vendeur <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.nombre_present_chez_vendeur}}</span></div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1"> provenance <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.provenance_relation?.nom_origine_produit }}</span>
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">  Nombre de têtes par provenance <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip"
                          title="Current Salary">{{detailData?.nombre_tete_par_provenance}}</span></div>
                    </div>
    
    
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">  Nombre vendu par provenance <span class="fw-semibold fs-16"
                          data-bs-toggle="tooltip" title="Current Salary">{{detailData?.nombre_vendu_par_provenance}}</span></div>
                    </div>
                   
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1">  Nombre présent chez l'acheteur <span
                          class="fw-semibold fs-16" data-bs-toggle="tooltip"
                          title="Current Salary">{{detailData?.nombre_present_chez_acheteur }}</span>
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="mt-1"> Nombre de têtes achetées : <span class="fw-semibold fs-16" data-bs-toggle="tooltip"
                          title="Current Salary">{{detailData?.nombre_tete_achete}}</span>
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
        // unite: "",
        prix_unitaire: "",
        total_vendu_distribues: "",
        etat_corporel: "",
        nombre_present_chez_vendeur: "",
        provenance: "",
        nombre_tete_par_provenance: "",
        nombre_vendu_par_provenance: "",
        nombre_present_chez_acheteur: "",
        nombre_tete_achete: "",
        // date_enquete: "",
        },
        step2: {
            produit: "",
        // unite: "",
        prix_unitaire: "",
        total_vendu_distribues: "",
        etat_corporel: "",
        nombre_present_chez_vendeur: "",
        provenance: "",
        nombre_tete_par_provenance: "",
        nombre_vendu_par_provenance: "",
        nombre_present_chez_acheteur: "",
        nombre_tete_achete: "",
        // date_enquete: "",
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
  
  
       produit:  { require },
        // unite:  { require },
        prix_unitaire:  { require },
        total_vendu_distribues:  { require },
        etat_corporel:  { require },
        nombre_present_chez_vendeur:  { require },
        provenance:  { require },
        nombre_tete_par_provenance:  { require },
        nombre_vendu_par_provenance:  { require },
        nombre_present_chez_acheteur:  { require },
        nombre_tete_achete:  { require },
        // date_enquete:  { require },
      
  
  
      },
      step2: {
        produit:  { require },
        // unite:  { require },
        prix_unitaire:  { require },
        total_vendu_distribues:  { require },
        etat_corporel:  { require },
        nombre_present_chez_vendeur:  { require },
        provenance:  { require },
        nombre_tete_par_provenance:  { require },
        nombre_vendu_par_provenance:  { require },
        nombre_present_chez_acheteur:  { require },
        nombre_tete_achete:  { require },
        // date_enquete:  { require },
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
          const response = await axios.get(`/parametrages/produits?code_type_marche=05`, {
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
          const response = await axios.get(`/parametrages/unites/associated-unites/type-marche?id_of_type_market=${5}`, {
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
          const response = await axios.get("/parametrages/origines", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          console.log("responseorigine", response);
          if (response.status === 200) {
            response.data.map(item => this.CommunesOptions.push({
              label: item.nom_origine_produit,
              value:  item.code_origine_produit
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
            // unite: this.step1.unite,
            prix_unitaire: this.step1.prix_unitaire,
            total_vendu_distribues: this.step1.total_vendu_distribues,
            etat_corporel: this.step1.etat_corporel,
            nombre_present_chez_vendeur: this.step1.nombre_present_chez_vendeur,
            provenance: this.step1.provenance,
            nombre_tete_par_provenance: this.step1.nombre_tete_par_provenance,
            nombre_vendu_par_provenance: this.step1.nombre_vendu_par_provenance,
            nombre_present_chez_acheteur: this.step1.nombre_present_chez_acheteur,
            nombre_tete_achete: this.step1.nombre_tete_achete,
            // date_enquete: this.step1.date_enquete,
            enquete: this.id,
  
  
  
          };
  
          console.log('data', data)
          try {
            const response = await axios.post("enquetes/marches-prix/betails", data, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              }
            });
            console.log('qfs', response)
            if (response.status === 200) {
              this.closeModal(modalId);
              this.step1 = {
                produit: "",
                prix_unitaire: "",
                total_vendu_distribues: "",
                etat_corporel: "",
                nombre_present_chez_vendeur: "",
                provenance: "",
                nombre_tete_par_provenance: "",
                nombre_vendu_par_provenance: "",
                nombre_present_chez_acheteur: "",
                nombre_tete_achete: "",
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
            (this.step2.produit = data.produit),
              (this.step2.prix_unitaire = data.prix_unitaire),
              (this.step2.total_vendu_distribues = data.total_vendu_distribues),
              (this.step2.etat_corporel = data.etat_corporel),
              (this.step2.nombre_present_chez_vendeur = data.nombre_present_chez_vendeur),
              (this.step2.provenance = data.provenance),
              (this.step2.nombre_tete_par_provenance = data.nombre_tete_par_provenance),
              (this.step2.nombre_vendu_par_provenance = data.nombre_vendu_par_provenance),
              (this.step2.nombre_present_chez_acheteur = data.nombre_present_chez_acheteur.toString()),
              (this.step2.nombre_tete_achete = data.nombre_tete_achete),
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
            // unite: this.step2.unite,
            prix_unitaire: this.step2.prix_unitaire,
            total_vendu_distribues: this.step2.total_vendu_distribues,
            etat_corporel: this.step2.etat_corporel,
            nombre_present_chez_vendeur: this.step2.nombre_present_chez_vendeur,
            provenance: this.step2.provenance,
            nombre_tete_par_provenance: this.step2.nombre_tete_par_provenance,
            nombre_vendu_par_provenance: this.step2.nombre_vendu_par_provenance,
            nombre_present_chez_acheteur: this.step2.nombre_present_chez_acheteur,
            nombre_tete_achete: this.step2.nombre_tete_achete,
            // date_enquete: this.step2.date_enquete,
            enquete: this.id,
          };
          console.log('data',data)
  
          try {
            const response = await axios.put(`/enquetes/marches-prix/betails/edition?id=${this.ToId}`, data, {
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
    