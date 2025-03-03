<script setup>
import { ref } from "vue";

const nom = ref("");
const forme = ref("");
const photoBase64 = ref("");
const quantite = ref(1);

const emit = defineEmits(["ajouterMedicament"]);

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = () => {
    photoBase64.value = reader.result.split(",")[1];
  };
  reader.readAsDataURL(file);
};

const ajouterMedicament = () => {
  emit("ajouterMedicament", {
    denomination: nom.value,
    formepharmaceutique: forme.value,
    photo: photoBase64.value || "",
    qte: quantite.value,
  });

  nom.value = "";
  forme.value = "";
  photoBase64.value = "";
  quantite.value = 1;
};
</script>

<template>
  <form class="medicament-form" @submit.prevent="ajouterMedicament">
    <h2>Ajouter un Médicament</h2>

    <div class="form-group">
      <label>Nom</label>
      <input type="text" v-model="nom" required />
    </div>

    <div class="form-group">
      <label>Forme</label>
      <input type="text" v-model="forme" required />
    </div>

    <div class="form-group">
      <label>Image</label>
      <input type="file" @change="uploadImage" />
    </div>

    <div class="form-group">
      <label>Quantité</label>
      <input type="number" v-model="quantite" required min="1" />
    </div>

    <button type="submit" class="btn-add">➕ Ajouter</button>
  </form>
</template>

<style scoped>
.medicament-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
}

h2 {
  color: #1b5e20;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.btn-add {
  background: #4caf50;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

.btn-add:hover {
  background: #388e3c;
}
</style>
