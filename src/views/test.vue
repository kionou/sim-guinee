<template>
    <div>
      <!-- Bouton pour ouvrir le modal -->
      <div class="box-body">
        <h4 class="box-title d-block">Center Modal</h4>
        <button type="button" class="btn btn-primary" @click="openModal">
          Launch demo modal
        </button>
      </div>
  
      <!-- Modal -->
      <div :class="['modal', { show: isModalOpen }]" tabindex="-1" v-if="isModalOpen">
        <div class="modal-dialog modal-center">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Your content comes here</p>
            </div>
            <div class="modal-footer modal-footer-uniform">
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary float-end" @click="saveChanges">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isModalOpen: false,
      };
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      saveChanges() {
        // Logique de sauvegarde
        console.log("Changes saved!");
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Assure que le modal s'affiche */
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    opacity: 0;
    pointer-events: none; /* Empêche les clics si le modal est fermé */
  }
  
  .modal.show {
    opacity: 1;
    pointer-events: auto; /* Permet les clics quand le modal est ouvert */
  }
  
  /* Centrer le modal */
  .modal-center .modal-dialog {
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    position: relative;
  }
  
  .modal-dialog {
    max-width: 500px; /* Taille max du modal */
  }
  
  .modal.fade {
    transition: opacity 0.3s ease;
  }
  
  /* Pour masquer le bouton de fermeture et aligner le modal */
  .close {
    outline: none;
    border: none;
    background: transparent;
    font-size: 1.5rem;
  }
  
  /* Options supplémentaires de style */
  .modal-footer-uniform {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-content {
    border-radius: 8px;
  }
  </style>
  