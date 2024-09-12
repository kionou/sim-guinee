<template>
    <div>
      <!-- Menu Paramètres avec sous-menus -->
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
            <router-link 
              to="/sim/utilisateurs" 
              @click="setActiveSubMenu('/sim/utilisateurs')" 
              :class="{ active: activeSubMenu === '/sim/utilisateurs' }">
              <i class="icon-Commit me-2"><span class="path1"></span><span class="path2"></span></i>
              Gestion Utilisateurs
            </router-link>
          </li>
          <li style="padding-top:6px !important">
            <router-link 
              to="/sim/localites" 
              @click="setActiveSubMenu('/sim/localites')" 
              :class="{ active: activeSubMenu === '/sim/localites' }">
              <i class="icon-Commit me-2"><span class="path1"></span><span class="path2"></span></i>
              Localités
            </router-link>
          </li>
          <!-- Ajoutez les autres sous-menus ici -->
        </ul>
      </transition>
  
      <!-- Menu sans sous-menu -->
      <li>
        <router-link 
          to="/sim/marches" 
          @click="setActiveMenu('/sim/marches')" 
          :class="{ active: activeMenu === '/sim/marches' }">
          <i class="icon-Layout-grid"><span class="path1"></span><span class="path2"></span></i>
          <span>Gestion Marchés</span>
        </router-link>
      </li>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      openMenus: {
        parametrages: false,
      },
      activeMenu: null,
      activeSubMenu: null,
    };
  },
  mounted() {
    this.loadMenuState();
  },
  methods: {
    toggleDropdownMenu(menu) {
      this.openMenus[menu] = !this.openMenus[menu];
      this.saveMenuState();
    },
    setActiveSubMenu(subMenu) {
      this.activeSubMenu = subMenu;
      this.activeMenu = '/sim/parametrages'; // Le menu "Paramètres" est actif lorsque n'importe quel sous-menu est actif
      this.openMenus.parametrages = true; // Assurez-vous que le menu Paramètres est ouvert
      this.saveMenuState();
    },
    setActiveMenu(menu) {
      this.activeMenu = menu;
      this.activeSubMenu = null; // Réinitialiser activeSubMenu lorsqu'un menu principal est actif
      this.closeAllMenus(); // Fermer tous les autres menus
      this.saveMenuState();
    },
    closeAllMenus() {
      for (let key in this.openMenus) {
        this.openMenus[key] = false;
      }
    },
    saveMenuState() {
      localStorage.setItem('openMenus', JSON.stringify(this.openMenus));
      localStorage.setItem('activeMenu', this.activeMenu);
      localStorage.setItem('activeSubMenu', this.activeSubMenu);
    },
    loadMenuState() {
      const savedOpenMenus = localStorage.getItem('openMenus');
      const savedActiveMenu = localStorage.getItem('activeMenu');
      const savedActiveSubMenu = localStorage.getItem('activeSubMenu');

      if (savedOpenMenus) {
        this.openMenus = JSON.parse(savedOpenMenus);
      }

      if (savedActiveMenu) {
        this.activeMenu = savedActiveMenu;
      }

      if (savedActiveSubMenu) {
        this.activeSubMenu = savedActiveSubMenu;
        if (savedActiveMenu === '/sim/parametrages') {
          this.openMenus.parametrages = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.theme-primary a.active,
.theme-primary a:hover,
.theme-primary a:focus {
  color: var(--color-secondary) !important; /* La couleur change lorsque l'élément est actif */
}

.fa-rotate-90 {
  transform: rotate(90deg);
}

.submenu {
  list-style: none !important;
  padding-left: 57px !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  max-height: 200px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

</style>  