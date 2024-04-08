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
      <equipo-form
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

import RoleTable from "pages/Discos/components/DiscoTable.vue";
import EquipoForm from "pages/Discos/components/DiscoForm.vue";

const title = "Discos";
const description = "Creación y edición de discos";
const newItemLabel = "Equipo disco";

const items = ref([]);
const isShowing = ref(false);
const item = ref({});
const isEditing = ref(false);

const showModal = () => {
  isShowing.value = true;
};

const getData = async () => {
  console.log("get disco");
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Disco/ListarDiscos"
    );
    console.log(response.data.data);
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
    items.value = [];
  }
};

const handleSubmit = async (equipo) => {
  if (isEditing.value) {
    // llamas a la edicion
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/Disco/ActualizarDisco",
        equipo
      );
      console.log(response);
      isShowing.value = false;
    } catch (error) {
      console.error(error);
      items.value = [];
    }
  } else {
    console.log("submit", equipo);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Disco/InsertarNuevoDisco",
        equipo
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

const handleEdit = async (equipo) => {
  console.log("eequpo", equipo);
  item.value = JSON.parse(JSON.stringify(equipo));
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Disco/ObtenerDetallesDiscoById",
      {
        IdDisco: equipo.IdDisco,
      }
    );
    item.value = response.data.data;
    isEditing.value = true;
    isShowing.value = true;
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (equipo) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:8000/api/Disco/EliminarDisco",
      {
        data: {
          IdDisco: equipo.IdDisco,
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
