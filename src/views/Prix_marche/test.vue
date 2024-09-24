<template lang="">
    <div>
        <!-- /.box-header -->
			<div class="box-body wizard-content">
				<form action="#" class="tab-wizard wizard-circle">
					<!-- Step 1 -->
					<h6>Infos sur le stock</h6>
					<section>
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
					</section>
					<!-- Step 2 -->
					<h6> Infos sur l'Achat</h6>
					<section>
                        <div class="row mt-3 content-group">
                            <div class="col-6">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Quelle est l'unité de mesure pour l'achat <span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.unite_achat" color="secondary" name="step1.unite" size="sm" rounded-size="sm" search
                                        :options="UnitesOptions" />
                                    <small v-if="v$.step1.unite_achat.$error">{{
                                        v$.step1.unite_achat.$errors[0].$message
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
                                    <MazInput v-model="step1.nombre_unite_achat" color="secondary" name="step1.nombre_unite_achat"
                                        size="sm" rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.nombre_unite_achat.$error">{{
                                        v$.step1.nombre_unite_achat.$errors[0].$message
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
                                    <MazInput v-model="step1.quantite_entree" color="secondary" name="step1.quantite_entree" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.quantite_entree.$error">{{
                                        v$.step1.quantite_entree.$errors[0].$message
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
                                    <MazInput v-model="step1.prix_achat" color="secondary" name="step1.prix_achat" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.prix_achat.$error">{{
                                        v$.step1.prix_achat.$errors[0].$message
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
                                        <MazSelect v-model="step1.fournisseur_principaux" color="secondary" name="step1.unite" size="sm" rounded-size="sm" search
                                        :options="Fournisseurs" />
                                    <small v-if="v$.step1.fournisseur_principaux.$error">{{
                                        v$.step1.fournisseur_principaux.$errors[0].$message
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
                                        <MazSelect v-model="step1.localite_achat" color="secondary" name="step1.destination_finale"
                                        size="sm" rounded-size="sm" search :options="CommunesOptions" />
                                    <small v-if="v$.step1.localite_achat.$error">{{
                                        v$.step1.localite_achat.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['localite_achat']">
                                        {{ resultError["localite_achat"] }}
                                    </small>
                                </div>
                            </div>
                          
    
                         
    
                        </div> 
					</section>
					<!-- Step 3 -->
					<h6>Infos sur la Vente</h6>
					<section>
						<div class="row mt-3 content-group">
                            <div class="col-6">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                     Quelle est l'unité de mesure pour la vente  <span class="text-danger">*</span></label>
                                     <MazSelect v-model="step1.unite_vente" color="secondary" name="step1.unite_vente" size="sm" rounded-size="sm" search
                                        :options="UnitesOptions" />
                                    <small v-if="v$.step1.unite_vente.$error">{{
                                        v$.step1.unite_vente.$errors[0].$message
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
                                    <MazInput v-model="step1.prix_unitaire_vente" color="secondary" name="step1.prix_unitaire_vente" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.prix_unitaire_vente.$error">{{
                                        v$.step1.prix_unitaire_vente.$errors[0].$message
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
                                        <MazSelect v-model="step1.client_vente" color="secondary" name="step1.client_vente" size="sm" rounded-size="sm" search
                                        :options="Clients" />
                                    <small v-if="v$.step1.client_vente.$error">{{
                                        v$.step1.client_vente.$errors[0].$message
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
                                    <MazInput v-model="step1.autre_client_principal" color="secondary" name="step1.autre_client_principal" size="sm"
                                        rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.autre_client_principal.$error">{{
                                        v$.step1.autre_client_principal.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['autre_client_principal']">
                                        {{ resultError["autre_client_principal"] }}
                                    </small>
                                </div>
                            </div>

                           
                           
    
                         
    
                        </div> 
					</section>

                    <!-- Step 4 -->
					<h6>Autres infos</h6>
					<section>
						<div class="row mt-3 content-group">
                           
                            <div class="col-12">
                                <div class="input-groupe">
                                    <label for="userpassword">
                                        Statut  <span class="text-danger">*</span></label>
                                    <MazInput v-model="step1.statut" color="secondary" name="step1.statut"
                                        size="sm" rounded-size="sm" type="text" />
                                    <small v-if="v$.step1.statut.$error">{{
                                        v$.step1.statut.$errors[0].$message
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
                                        id="text-area" v-model="step1.observation" rows="2"></textarea>
                                    <small v-if="v$.step1.observation.$error">{{
                                        v$.step1.observation.$errors[0].$message
                                        }}</small>
                                    <small v-if="resultError['observation']">
                                        {{ resultError["observation"] }}
                                    </small>
                                </div>
                            </div>
    
                         
    
                        </div> 
					</section>
					
				</form>
			</div>
			<!-- /.box-body -->
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>