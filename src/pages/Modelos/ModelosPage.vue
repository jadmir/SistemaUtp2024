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

import MarcaTable from "pages/Modelos/components/ModeloTable.vue";
import MarcaForm from "pages/Modelos/components/ModeloForm.vue";

const title = "Modelos";
const description = "Creación y edición de modelos";
const newItemLabel = "Nuevo modelo";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("get modelo");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Modelo/ListarModelos"
    );
    console.log(response.data.data);
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
    items.value = [];
  }
};

const handleSubmit = async (modelo) => {
  if (isEditing.value) {
    // llamas a la edicion
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/Modelo/ActualizarModelo",
        modelo
      );
      console.log(response);
      isShowing.value = false;
    } catch (error) {
      console.error(error);
      items.value = [];
    }
  } else {
    console.log("submit", modelo);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Modelo/InsertarNuevoModelo",
        modelo
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

const handleEdit = async (modelo) => {
  console.log("eequpo", modelo);
  item.value = JSON.parse(JSON.stringify(modelo));
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Modelo/ObtenerDetallesModeloById",
      {
        IdModelo: modelo.IdModelo,
      }
    );
    item.value = response.data.data;
    isEditing.value = true;
    isShowing.value = true;
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (modelo) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:8000/api/Modelo/EliminarModelo",
      {
        data: {
          IdModelo: modelo.IdModelo,
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
