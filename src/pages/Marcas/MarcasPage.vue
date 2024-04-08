<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @new="showModal"
      @refresh="getData"
    />

    <marca-table
      :items="items"
      has-filters
      @edit="handleEdit"
      has-active-status
      @delete="handleDelete"
    />

    <q-dialog v-model="isShowing" width="350px">
      <marca-form
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

import MarcaTable from "pages/Marcas/components/MarcaTable.vue";
import MarcaForm from "pages/Marcas/components/MarcaForm.vue";

const title = "Marcas";
const description = "Creación y edición de marcas";
const newItemLabel = "Nueva marca";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("get marca");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Marca/ListarMarcas"
    );
    console.log(response.data.data);
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
    items.value = [];
  }
};

const handleSubmit = async (marca) => {
  if (isEditing.value) {
    // llamas a la edicion
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/Marca/ActualizarMarca",
        marca
      );
      console.log(response);
      isShowing.value = false;
    } catch (error) {
      console.error(error);
      items.value = [];
    }
  } else {
    console.log("submit", marca);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Marca/InsertarNuevaMarca",
        marca
      );
      console.log(response);
      isShowing.value = false;
    } catch (error) {
      console.error(error);
      items.value = [];
    }
  }
  await getData();
};

const handleEdit = async (marca) => {
  console.log("eequpo", marca);
  item.value = JSON.parse(JSON.stringify(marca));
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Marca/ObtenerDetallesMarcaById",
      {
        IdMarca: marca.IdMarca,
      }
    );
    item.value = response.data.data;
    isEditing.value = true;
    isShowing.value = true;
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (marca) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:8000/api/Marca/EliminarMarca",
      {
        data: {
          IdMarca: marca.IdMarca,
        },
      }
    );
    console.log(response);
    await getData();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getData();
});
</script>
