<script setup lang="ts">
import VentaDetalleList from '@/components/ventadetalle/VentaDetalleList.vue'
import VentaDetalleSave from '@/components/ventadetalle/VentaDetalleSave.vue'
import Button from 'primevue/button'
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
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <VentaDetalleList ref="ventadetalleListRef" @edit="handleEdit" />
    <VentaDetalleSave
      :mostrar="mostrarDialog"
      :ventadetalle="ventadetalleEdit"
      :modoEdicion="!!ventadetalleEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
