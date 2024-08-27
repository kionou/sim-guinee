<template>
    <div class="pagination">
      <button @click="previousPage" :class="{ disabled: currentPage === 1 }">Precedent</button>
      <button 
        v-for="page in visiblePages" 
        :key="page" 
        @click="fetchAndScroll(page)" 
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
      <button @click="nextPage" :class="{ disabled: currentPage === totalPages }">Suivant</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      fetchData: {
        type: Function,
        required: true
      }
    },
    computed: {
      visiblePages() {
        const pages = [];
        const startPage = Math.max(1, this.currentPage - 1);
        const endPage = Math.min(this.totalPages, startPage + 3);
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
    methods: {
      previousPage() {
        if (this.currentPage > 1) {
          this.fetchAndScroll(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.fetchAndScroll(this.currentPage + 1);
        }
      },
      fetchAndScroll(page) {
        this.fetchData(page);
        this.scrollToTop();
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };
  </script>
  

  
  
  <style scoped lang="css">
  .pagination {
  display: flex;
  align-items: center;
  justify-content: center;

}

.pagination button {
  border: none;
  background-color: #f5f5f5;
  color: #333;
  padding: 6px 12px;
  margin: 0 2px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination button:hover {
  background-color: #e0e0e0;
}

.pagination button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination button.active {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}
  
  </style>
  