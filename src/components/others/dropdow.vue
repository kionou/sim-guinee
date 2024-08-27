







<template>
  <div>
    <div v-for="(statistics, index) in allStatistics" :key="index">
      <h3>Statistique {{ index + 1 }}</h3>
      <p v-if="isDropdownOpen[index]">Contenu de la statistique {{ index + 1 }}</p>
      <button @click="toggleDropdown(index)">Toggle</button>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allStatistics: Array.from({ length: 6 }, (_, index) => ({ id: index + 1 })),
      isDropdownOpen: Array(6).fill(false)
    };
  },
  methods: {
    toggleDropdown(index) {
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    }
  }
};
</script>





