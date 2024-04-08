<template>
  <q-card>
    <q-card-section>
      <module-description-card :title="title" />
    </q-card-section>

    <q-card-section>
      <q-form class="row" @submit.prevent="handleSubmit">
        <div class="q-pa-xs col-xs-12">
          <js-input
            label="Nombre Equipo"
            v-model="item.Equipo"
            :disable="isEditing"
          />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Tipo Equipo" v-model="item.TipoEquipo" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Sistema Operativo" v-model="item.SistemaOperativo" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="marca" type="number" v-model="item.IdMarca" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="modelo" type="number" v-model="item.IdModelo" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Codigo Inventario" v-model="item.Inventario" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Serie" v-model="item.Serie" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Unidad" v-model="item.Unidad" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Obsolescencia" v-model="item.Obsolescencia" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Procesador" v-model="item.Procesador" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Memoria RAM" v-model="item.MemoriaRAM" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Disco" type="number" v-model="item.IdDisco" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Usuario Equipo" v-model="item.IdUsuarioEquipo" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Ambiente" v-model="item.IdAmbiente" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Sede" v-model="item.IdSede" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Propietario" v-model="item.Propietario" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Estado" v-model="item.Estado" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Anexo" v-model="item.Anexo" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Responsable" v-model="item.Responsable" />
        </div>

        <div class="q-pa-xs col-xs-12">
          <js-input label="Observaciones" v-model="item.Observaciones" />
        </div>

        <div class="text-right col-xs-12 q-my-md">
          <q-btn :label="buttonLabel" size="sm" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

import JsInput from "src/lib/jsComponents/JsInput.vue";
import ModuleDescriptionCard from "src/lib/commonComponents/ModuleDescriptionCard.vue";

const CREATE_TITLE = "Crear equipo";
const EDIT_TITLE = "Editar equipo";
const CREATE_BUTTON_LABEL = "Crear";
const EDIT_BUTTON_LABEL = "Editar";

const item = ref({});

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  u: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  item.value = props.u;
});

onUnmounted(() => {
  item.value = {};
});

const buttonLabel = computed(() =>
  props.isEditing ? EDIT_BUTTON_LABEL : CREATE_BUTTON_LABEL
);
const title = computed(() => (props.isEditing ? EDIT_TITLE : CREATE_TITLE));
const emit = defineEmits(["handleSubmit"]);
const handleSubmit = async () => {
  emit("handleSubmit", item.value);
};
</script>

<style scoped></style>
