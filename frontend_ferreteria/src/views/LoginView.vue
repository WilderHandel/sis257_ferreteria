<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const contraseña = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, contraseña.value).catch(() => (error.value = true))
}
</script>

<template>
  <div class="my-5 pt-5">
    <h1 class="text-center">Iniciar Sesión</h1>
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label">Usuario:</label>
      <input v-model="usuario" type="text" class="form-input" placeholder="Usuario" autofocus />

      <label class="form-label">Contraseña:</label>
      <input v-model="contraseña" type="password" class="form-input" placeholder="Contraseña" />

      <p v-if="error" class="text-danger">Usuario y/o contraseña incorrectos</p>
      <input type="submit" class="form-submit" value="Ingresar" />
    </form>
  </div>
</template>

<style>
.form {
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  background-color: #0f0f0f;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.form-label {
  margin-top: 1.5rem;
  color: #f1f5f9;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-input {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  color: white;
  transition: border-color 0.3s, background-color 0.3s;
}

.form-input:focus {
  border-color: #f97316;
  background-color: #222425 ;
  outline: none;
}

.form-submit {
  background:   #ffb120 ;
  border: none;
  border-radius: 2rem;
  color: white;
  margin-top: 2.5rem;
  padding: 0.9rem 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit:hover {
  background-color: #e49400;
}

</style>
