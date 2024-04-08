<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @new="showModal"
      @refresh="getData"
    />

    <sede-table
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

import SedeTable from "pages/Sedes/components/SedeTable.vue";

const title = "Sedes";
const description = "Creación y edición de sedes";
const newItemLabel = "Nueva sede";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("get sede");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Sede/ListarSedes"
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
