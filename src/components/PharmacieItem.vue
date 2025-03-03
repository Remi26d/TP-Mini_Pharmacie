<script setup>
defineProps(["medicament"]);
const emit = defineEmits(["supprimerMedicament", "modifierMedicament"]);
</script>

<template>
  <li class="medicament-card">
    <div class="medicament-image">
      <img :src="medicament.photo" alt="Médicament" v-if="medicament.photo" />
    </div>

    <div class="medicament-info">
      <h2 class="nom">{{ medicament.denomination }}</h2>
      <p class="forme"><strong>Forme :</strong> {{ medicament.forme }}</p>
      <p class="quantite"><strong>Stock :</strong> {{ medicament.qte }}</p>
    </div>

    <div class="medicament-actions">
      <button class="btn edit" @click="$emit('modifierMedicament', medicament)">✏ Modifier</button>
      <button class="btn delete" @click="$emit('supprimerMedicament', medicament.id)">🗑 Supprimer</button>
    </div>
  </li>
</template>

<style scoped>
.medicament-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  margin: 15px 0;
  width: 100%;
  max-width: 700px;
  transition: transform 0.2s ease-in-out;
}

.medicament-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid #2e7d32;
}

.medicament-info {
  flex-grow: 1;
  margin-left: 20px;
  text-align: left;
  min-width: 200px;
}

.nom {
  font-size: 20px;
  color: #1b5e20;
}

.forme,
.quantite {
  color: #388e3c;
  font-size: 16px;
  word-wrap: break-word;
}

.medicament-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn.edit {
  background: #4caf50;
  color: white;
}

.btn.delete {
  background: #d32f2f;
  color: white;
}
</style>
