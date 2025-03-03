<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import PharmacieItem from "./PharmacieItem.vue";
import PharmacieForm from "./PharmacieForm.vue";
import PharmacieSearch from "./PharmacieSearch.vue";
import Medicament from "../Medicament";

const ID_PHARMACIE = "11";
const API_URL = `https://apipharmacie.pecatte.fr/api/11/medicaments`;

const listeMedicaments = reactive([]);
const recherche = ref("");

//etats pour le formulaire de modification
const medicamentModif = ref(null);
const idModif = ref(null);
const nomModif = ref("");
const formeModif = ref("");
const photoModif = ref("");
const qteModif = ref(0);
const nouvellePhoto = ref(null);

const chargerMedicaments = () => {
  const url = recherche.value ? `${API_URL}?search=${recherche.value}` : API_URL;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      listeMedicaments.splice(0, listeMedicaments.length);
      data.forEach(m => listeMedicaments.push(new Medicament(m.id, m.denomination, m.formepharmaceutique, m.photo, m.qte)));
    })
    .catch(err => console.error("Erreur chargement médicaments :", err));
};

//requete ajax pour ajouter medoc
const ajouterMedicament = (nouveauMedicament) => {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nouveauMedicament),
  })
  .then(() => chargerMedicaments())
  .catch(err => console.error("Erreur ajout médicament :", err));
};

//requete ajax pour supprimer medoc
const supprimerMedicament = (id) => {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => chargerMedicaments())
    .catch(err => console.error("Erreur suppression médicament :", err));
};

//gere l'importation de l'image en base64
const gererImportImage = (event) => {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const lecteur = new FileReader();
  lecteur.onload = () => {
    nouvellePhoto.value = lecteur.result.split(",")[1];
  };
  lecteur.readAsDataURL(fichier);
};

//ouvre le panel de modif
const ouvrirModification = (medicament) => {
  medicamentModif.value = medicament;
  idModif.value = medicament.id;
  nomModif.value = medicament.denomination;
  formeModif.value = medicament.forme;
  photoModif.value = `https://apipharmacie.pecatte.fr/images/${medicament.photo}`;
  qteModif.value = medicament.qte;
  nouvellePhoto.value = null;
};

//modifier medoc
const modifierMedicament = () => {
  if (!idModif.value) {
    console.error("Erreur : ID du médicament non défini !");
    return;
  }

  const photoFinale = nouvellePhoto.value
    ? nouvellePhoto.value
    : photoModif.value.split("/").pop();

  const medicamentModifie = {
    id: idModif.value,
    denomination: nomModif.value,
    formepharmaceutique: formeModif.value,
    photo: photoFinale,
    qte: qteModif.value,
  };

  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicamentModifie),
  })
  .then(() => {
    medicamentModif.value = null;
    chargerMedicaments();
  })
  .catch(err => console.error("Erreur modification médicament :", err));
};

watch(recherche, chargerMedicaments);
onMounted(chargerMedicaments);
</script>

<template>
  <div class="pharmacie-container">
    <h3>Stock de la Pharmacie</h3>
    <PharmacieSearch v-model="recherche" />
    <PharmacieForm @ajouterMedicament="ajouterMedicament" />
    <ul class="medicament-list">
      <PharmacieItem
        v-for="medicament of listeMedicaments"
        :key="medicament.id"
        :medicament="medicament"
        @supprimerMedicament="supprimerMedicament"
        @modifierMedicament="ouvrirModification"
      />
    </ul>

    <!-- formulaire de modif -->
    <div v-if="medicamentModif" class="modif-container">
      <h3>Modifier le médicament</h3>
      <input type="text" v-model="nomModif" placeholder="Nom" required />
      <input type="text" v-model="formeModif" placeholder="Forme" required />

      <!--image actuelle -->
      <img :src="photoModif" alt="Image actuelle" width="100" v-if="photoModif"/>

      <input type="file" @change="gererImportImage" />

      <!--aperçu de la nouvelle image -->
      <img :src="'data:image/png;base64,' + nouvellePhoto" alt="Aperçu" width="100" v-if="nouvellePhoto"/>

      <input type="number" v-model="qteModif" placeholder="Quantité" />

      <button @click="modifierMedicament">Enregistrer</button>
      <button @click="medicamentModif = null">Annuler</button>
    </div>
  </div>
</template>

<style scoped>
.pharmacie-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #1b5e20;
  margin-bottom: 15px;
}

.medicament-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.modif-container {
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  max-width: 300px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 5px;
}

img {
  display: block;
  margin: 10px auto;
  border: 1px solid #ccc;
  padding: 5px;
  max-width: 100px;
}
</style>
