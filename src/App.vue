<script setup>
import PharmacieHeader from "./components/PharmacieHeader.vue";
import PharmacieList from "./components/PharmacieList.vue";

const goTo = (path) => {
  window.location.href = path;
};
</script>

<template>
  <div class="app-container">
    <!-- header avec logo et titre -->
    <header class="header">
      <div class="header-content">
        <img src="./logo_pharmISIS.png" alt="PharmISIS Logo" class="logo" />
        <h1>PharmISIS</h1>
      </div>
      <!-- boutons d'action -->
      <nav class="nav-buttons">
        <button @click="goTo('/medicaments')">Gérer les Médicaments</button>
      </nav>
    </header>

    <main class="content">
      <PharmacieHeader />
      <PharmacieList />
    </main>

    <footer>
      <p>&copy; 2025 PharmISIS - Gestion de Pharmacie</p>
    </footer>
  </div>
</template>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #e8f5e9; /* Vert très clair */
  margin: 0;
  padding: 0;
  color: #2e7d32;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(90deg, #2e7d32, #1b5e20);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
}

.logo {
  width: 160px; 
}

.nav-buttons {
  display: flex;
  gap: 15px;
}

button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #388e3c;
}

.content {
  background: white;
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

footer {
  text-align: center;
  padding: 15px;
  background: #1b5e20;
  color: white;
  margin-top: auto;
}
</style>
