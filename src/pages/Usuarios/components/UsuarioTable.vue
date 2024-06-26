<template>
  <div class="text-center q-my-md" v-if="hasActiveStatus">
    <q-btn-toggle
      push
      v-model="aciveStatus"
      toggle-color="primary"
      :options="[
        { label: 'Activo', value: ActiveStatusEnum.active },
        { label: 'Inactivo', value: ActiveStatusEnum.inactive },
        { label: 'Todos', value: ActiveStatusEnum.all },
      ]"
      @update:model-value="handleRefresh"
    />
  </div>

  <filter-table
    v-if="hasFilters"
    v-model:query="filterQuery"
    @filter="handleFilter"
    @clean="handleRefresh"
  />

  <div class="q-my-sm">
    <js-table-wrapper>
      <thead>
        <tr>
          <th v-for="h in tableHeaders" :key="h.name" :class="[h.align]">
            {{ h.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in props.items" :key="item.id">
          <td class="text-center">{{ perPage * (page - 1) + key + 1 }}</td>
          <td v-for="p in properties" :key="p">
            {{ item[p] }}
          </td>
          <td class="text-center">
            <q-btn
              color="primary"
              label="Opciones"
              size="sm"
              v-if="!item.is_protected"
            >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="emit('edit', item)">
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="emit('delete', item)">
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </js-table-wrapper>
  </div>

  <div class="q-pa-lg flex flex-center" v-if="hasPagination">
    <q-pagination
      v-model="page"
      :max="maxPage"
      @update:model-value="handlePageChange"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

import JsTableWrapper from "src/lib/commonComponents/JsTableWrapper.vue";

import FilterTable from "src/lib/commonComponents/FilterTable.vue";

import { isActiveFilterEnum } from "src/types/http.types";
import { useRouter } from "vue-router";
import { ActiveStatusEnum } from "src/services/utils/http.types";

const router = useRouter();

const tableHeaders = [
  { name: "N°", align: "text-center" },
  { name: "Nombre" },
  { name: "Email" },
  { name: "Rol" },
  { name: "Estado" },
  { name: "Acciones", align: "text-center" },
];

const properties = ["NombreUsuario", "Email", "RolID", "Estado"];
const getPropertyValue = {};

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  query: {
    type: String,
    default: "",
  },
  hasFilters: {
    type: Boolean,
    default: false,
  },
  hasActiveStatus: {
    type: Boolean,
    default: false,
  },
  activeStatus: {
    type: String,
    default: isActiveFilterEnum.ALL,
  },
  page: {
    type: Number,
    default: 1,
  },
  maxPage: {
    type: Number,
    default: 1,
  },
  hasPagination: {
    type: Boolean,
    default: false,
  },
});

const filterQuery = computed({
  get: () => props.query,
  set: (value) => {
    emit("update:query", value);
  },
});

const aciveStatus = computed({
  get: () => props.activeStatus,
  set: (value) => {
    emit("update:activeStatus", value);
  },
});

const handleFilter = () => {
  emit("filter", { refreshPage: true });
};

const handlePageChange = (page) => {
  emit("filter", { refreshPage: false });
};

const handleRefresh = () => {
  page.value = 1;
  filterQuery.value = "";
  emit("refresh");
};

const handleGoToPermissions = (item) => {
  router.push({
    name: "RolesPermissionsPage",
    params: { id: item.id },
  });
};

const perPage = 25;
const page = computed({
  get: () => props.page,
  set: (value) => {
    emit("update:page", value);
  },
});

const emit = defineEmits([
  "edit",
  "update:query",
  "update:activeStatus",
  "update:page",
  "filter",
  "refresh",
  "delete",
  "restore",
]);
</script>

<style scoped>
.deleteRow {
  background-color: rgba(213, 158, 158, 0.73);
  /*color: white;*/
}
</style>
