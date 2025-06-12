<script setup lang="ts">
import VentaDetalleList from '@/components/ventadetalle/VentaDetalleList.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const ventadetalleListRef = ref<typeof VentaDetalleList | null>(null)
const ventadetalleEdit = ref<any>(null)

function handleCreate() {
  ventadetalleEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(ventadetalle: any) {
  ventadetalleEdit.value = ventadetalle
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventadetalleListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-7">
    <h2>Ventas Detalles</h2>
    <VentaDetalleList ref="ventadetalleListRef" @edit="handleEdit" />
  </div>
</template>

<style scoped></style>
