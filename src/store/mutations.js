export default {
  SET_MPME_DATA: (state, data) => {
    state.mpmeData = data;
  },
 
  SET_ALLMPME(state, data) {
    state.mpmeAll = data;
  },
  SET_REGION_OPTIONS(state, options ) {
    state.regionOptions = options;
  },
  SET_REGION2_OPTIONS(state, options ) {
    state.regionOptions2 = options;
  },
  SET_COUNTRY_OPTIONS: (state, options) => {
    state.countryOptions = options;
  },
  SET_PREFECTURE_OPTIONS: (state, options) => {
    state.prefectureOptions = options;
  },
  SET_SOUS_PREFECTURE_OPTIONS: (state, options) => {
    state.SousprefectureOptions = options;
  },
  SET_QUARTIER_OPTIONS: (state, options) => {
    state.QuartierOptions = options;
  },
  SET_SECTEUR_ACTIVITE_OPTIONS(state, options) {
    state.secteurActiviteOptions = options;
  },
  SET_SECTEUR_ACTIVITE2_OPTIONS(state, options) {
    state.secteurActiviteOptions2 = options;
  },
  SET_SOUS_SECTEUR_OPTIONS(state, options) {
    state.sousSecteurOptions = options;
  },
  SET_STATUT_JURIDIQUE_OPTIONS(state, options) {
    state.statutJuridiqueOptions = options;
  },
  SET_BOURSE_OPTIONS(state, options) {
    state.bourseOptions = options;
  },
  SET_LOGGED_IN_MPME(state, userData) {
    state.loggedInMPME = userData;
  },
  SET_SOUS_DOC_OPTIONS(state, options) {
    state.sousdocOptions = options;
  },
  SET_SOUS_CATEGORIES_DATA(state, data) {
    state.sousCategoriesData = data;
  },
  SET_CATEGORIES_DATA(state, data) {
    state.categoriesData = data;
  },
  SET_PUBLIQUE_DATA(state, data) {
    state.publiqueData = data;
  },
  SET_TOTAL_EMPLOIS_FEMME(state, totalEmploisFemme) {
    state.totalEmploisFemme = totalEmploisFemme;
  },
  SET_TOTAL_MPME(state, totalMpme) {
    state.totalMpme = totalMpme;
  },
  SET_TYPE_CARTES_DATA(state, data) {
    state.typeCartesData = data;
  },
  SET_TYPE_COMPTABILITES_DATA(state, data) {
    state.typeComptabilitesData = data;
  },
  SET_TYPE_DEMANDE_DATA(state, data) {
    state.typeDemandesData = data;
  },
  SET_ACTUALITES(state, actualites) {
    state.actualites = actualites;
  },
  SET_PARTENAIRES_DATA(state, data) {
    state.partenaires = data;
  },
  SET_REGIMES(state, regimes) {
    state.regimes = regimes;
  },
  SET_TYPES_GESTIONS(state, typesGestions) {
    state.typesGestions = typesGestions;
  },
  SET_TYPES_CONTRIBUABLES(state, typesContribuables) {
    state.typesContribuables = typesContribuables;
  },
  SET_PUBLIQUE_VISIBLE_PHOTOS(state, photos) {
    state.publiqueVisiblePhotos = photos;
  },

  SET_SOUS_SECTEURS(state, data) {
    state.sousSecteurs = data;
  },

  SET_ACCOMPAGEMENT(state, accompagnementData) {
    state.accompagnementData = accompagnementData;
  },

  SET_PERSONNEL(state, personnelData) {
    state.personnelData = personnelData;
  },
  SET_DIRECTIONS(state, directions) {
    state.directions = directions;
  }
  
  
}