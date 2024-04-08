<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-page-container class="GPL__page-container">
      <q-page class="column items-center justify-center LoginPage">
        <q-card
          bordered
          style="max-width: 320px; width: 100%; padding-top: 25px"
        >
          <div class="column items-center justify-center">
            <logo :width="300" class="q-ma-none" />
          </div>
          <q-card-section horizontal>
            <div class="q-px-lg q-pb-lg" style="width: 100%">
              <login-form />
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Logo from "components/LogoImage.vue";
import LoginForm from "components/login/LoginForm.vue";
</script>

<style scoped>
.LoginPage {
  background-image: url("/bg.webp");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
