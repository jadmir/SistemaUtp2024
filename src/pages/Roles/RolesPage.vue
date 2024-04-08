<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @new="showModal"
      @refresh="getData"
    />

    <role-table
      :items="items"
      has-filters
      @edit="handleEdit"
      has-active-status
      @delete="handleDelete"
    />

    <q-dialog v-model="isShowing" width="350px">
      <rol-form
        :u="item"
        :is-editing="isEditing"
        @handleSubmit="handleSubmit"
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import ModuleDescriptionCard from "src/lib/commonComponents/ModuleDescriptionCard.vue";
import ModuleHeader from "src/lib/commonComponents/ModuleHeader.vue";

import RoleTable from "pages/Roles/components/RoleTable.vue";
import RolForm from "pages/Roles/components/RoleForm.vue";

const title = "Roles";
const description = "Creación y edición de Roles";
const newItemLabel = "Rol nuevo";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("getDataRoles");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Rol/obtenerRolesDisponibles"
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
