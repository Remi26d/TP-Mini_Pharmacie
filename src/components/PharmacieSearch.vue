<script setup>
import { ref } from "vue";

const search = defineModel();
</script>

<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="search" 
      placeholder="🔍 Rechercher un médicament..."
      class="search-bar"
    />
  </div>
</template>

<style scoped>
/*conteneur de la barre de recherche */
.search-container {
  margin: 20px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.search-bar {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #2e7d32;
  border-radius: 8px;
  outline: none;
  transition: 0.3s ease-in-out;
  text-align: center;
}

.search-bar:focus {
  border-color: #1b5e20;
  box-shadow: 0px 0px 10px rgba(46, 125, 50, 0.4);
}
</style>
