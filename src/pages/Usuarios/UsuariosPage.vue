<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @new="showModal"
      @refresh="getData"
    />

    <usuario-table
      :items="items"
      has-filters
      @edit="handleEdit"
      has-active-status
      @delete="handleDelete"
    />

    <q-dialog v-model="isShowing" width="350px">
      <usuario-form
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

import UsuarioTable from "pages/Usuarios/components/UsuarioTable.vue";
import UsuarioForm from "pages/Usuarios/components/UsuarioForm.vue";

const title = "Usuarios";
const description = "Creación y edición de usuarios";
const newItemLabel = "nuevo usuario";

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
      "http://127.0.0.1:8000/api/Usuario/ListarUsuarios"
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
