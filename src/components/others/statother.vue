<router-link to="#" @click.stop="toggleDropdownMenu('parametrages')">
  <i class="icon-Settings-2"><span class="path1"></span><span class="path2"></span></i>
  <span>Paramètres</span>
  <span class="pull-right-container">
    <i :class="['fa', 'fa-angle-right', 'pull-right', { 'fa-rotate-90': openMenus.parametrages }]"></i>
  </span>
</router-link>
<transition name="slide">
  <ul v-show="openMenus.parametrages" class="submenu">
    <li style="padding-top:6px !important">
      <router-link to="/sim/utilisateurs" @click="handleSubMenuClick('/sim/utilisateurs')" style="color:var(--color-primary)">
        <i class="icon-Commit me-2"><span class="path1"></span><span class="path2"></span></i>
        Gestion Utilisateurs
      </router-link>
    </li>
    <li style="padding-top:6px !important">
      <router-link to="/sim/localites" @click="handleSubMenuClick('/sim/localites')" style="color:var(--color-primary);">
        <i class="icon-Commit me-2"><span class="path1"></span><span class="path2"></span></i>
        Localités
      </router-link>
    </li>
    <!-- Ajoutez les autres sous-menus ici de la même manière -->
  </ul>
</transition>
export default {
  data() {
    return {
      openMenus: {
        parametrages: false,
        // Ajoutez d'autres menus si nécessaire
      },
    };
  },
  mounted() {
    // Récupérer l'état du menu "Paramètres" et du sous-menu actif depuis le localStorage
    const savedMenuState = localStorage.getItem('openMenus');
    const activeSubMenu = localStorage.getItem('activeSubMenu');

    if (savedMenuState) {
      this.openMenus = JSON.parse(savedMenuState);
    }

    if (activeSubMenu) {
      const subMenuElement = document.querySelector(`a[href="${activeSubMenu}"]`);
      if (subMenuElement) {
        subMenuElement.classList.add('active');
      }
    }
  },
  methods: {
    toggleDropdownMenu(menu) {
      this.openMenus[menu] = !this.openMenus[menu];

      // Fermer les autres menus
      for (let key in this.openMenus) {
        if (key !== menu) {
          this.openMenus[key] = false;
        }
      }

      // Sauvegarder l'état des menus dans le localStorage
      localStorage.setItem('openMenus', JSON.stringify(this.openMenus));
    },
    handleSubMenuClick(subMenuPath) {
      // Sauvegarder l'état du sous-menu actif dans le localStorage
      localStorage.setItem('activeSubMenu', subMenuPath);
    }
  }
};
