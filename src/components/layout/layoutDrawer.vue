<template>
  <q-drawer v-model="useUiStore.photosDrawer" bordered behavior="mobile">
    <q-scroll-area class="fit">
      <q-toolbar class="GPL__toolbar">
        <q-toolbar-title
          class="row items-center justify-center text-grey-8 q-my-lg"
        >
          <logo :width="110" />
        </q-toolbar-title>
      </q-toolbar>

      <q-list padding>
        <q-item
          v-for="link in links1"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links2"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links3"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links4"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links5"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links6"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links7"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="link in links8"
          :key="link.text"
          v-ripple
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import uiStore from "stores/uiStore";
import Logo from "components/LogoImage.vue";
import { ref } from "vue";

const useUiStore = uiStore();

const links1 = ref([{ icon: "computer", text: "Equipos", to: "/equipos" }]);
const links2 = ref([{ icon: "lock", text: "Roles", to: "/roles" }]);
const links3 = ref([{ icon: "person", text: "Usuarios", to: "/usuarios" }]);
const links4 = ref([
  { icon: "source_environment", text: "Ambientes", to: "/ambientes" },
]);
const links5 = ref([{ icon: "album", text: "Discos", to: "/discos" }]);
const links6 = ref([
  { icon: "branding_watermark", text: "Marcas", to: "/marcas" },
]);
const links7 = ref([
  { icon: "model_training", text: "Modelos", to: "/modelos" },
]);
const links8 = ref([{ icon: "apartment", text: "Sedes", to: "/sedes" }]);
</script>

<style>
.active-link {
  background-color: #f5f5f5;
}
</style>
