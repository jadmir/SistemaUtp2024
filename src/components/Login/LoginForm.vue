<template>
  <q-form @submit.prevent="handleLogin">
    <div class="q-my-md">
      <js-input
        label="email"
        required
        required-label="Email obligatorio"
        v-model="email"
        id="email"
        autofocus
      />
    </div>

    <div class="q-my-md">
      <js-input
        label="Contraseña"
        required
        required-label="Contraseña obligatoria"
        v-model="password"
        id="password"
        type="password"
      />
    </div>

    <div class="q-my-md text-center">
      <q-checkbox v-model="remember" label="Recordarme" />
    </div>

    <div class="text-center">
      <q-btn label="Ingresar" size="sm" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import JsInput from "src/lib/jsComponents/JsInput.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const remember = ref(false);
const email = ref("lsalgueron@utp.edu.pe");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Usuario/IniciarSesion",
      {
        email: email.value,
        password: password.value,
      }
    );
    console.log(response.data.data);

    localStorage.setItem("user", JSON.stringify(response.data.data));

    router.push("/inicio");
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
};
</script>

<style scoped></style>
