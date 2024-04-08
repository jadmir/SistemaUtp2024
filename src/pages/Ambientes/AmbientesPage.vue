<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @new="showModal"
      @refresh="getData"
    />

    <ambiente-table
      :items="items"
      has-filters
      @edit="handleEdit"
      has-active-status
      @delete="handleDelete"
    />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import ModuleDescriptionCard from "src/lib/commonComponents/ModuleDescriptionCard.vue";
import ModuleHeader from "src/lib/commonComponents/ModuleHeader.vue";

import AmbienteTable from "pages/Ambientes/components/AmbienteTable.vue";

const title = "Ambientes";
const description = "Creación y edición de Ambientes";
const newItemLabel = "Ambiente nuevo";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("getDataAmbientes");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Ambiente/ListarAmbientes"
    );
    console.log(response.data.data);
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
    items.value = [];
  }
};

onMounted(async () => {
  await getData();
});
</script>
