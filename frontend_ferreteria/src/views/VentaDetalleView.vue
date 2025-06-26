<script setup lang="ts">
import VentaDetalleList from '@/components/ventadetalle/VentaDetalleList.vue'
import VentaDetalleSave from '@/components/ventadetalle/VentaDetalleSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const ventadetalleListRef = ref<typeof VentaDetalleList | null>(null)
const ventadetalleEdit = ref<any>(null)
const modoEdicion = ref(false)

function handleCreate() {
  ventadetalleEdit.value = null
  modoEdicion.value = false
  mostrarDialog.value = true
}

function handleEdit(ventadetalle: any) {
  ventadetalleEdit.value = ventadetalle
  modoEdicion.value = true
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventadetalleListRef.value?.obtenerLista()
  mostrarDialog.value = false
}
</script>

<template>
  <div class="m-7 fondo-formulario-venta">
    <Button label="Nuevo Detalle" icon="pi pi-plus" @click="handleCreate" class="mb-3" />
    <VentaDetalleList ref="ventadetalleListRef" @edit="handleEdit" />
    <VentaDetalleSave
      :mostrar="mostrarDialog"
      :ventaDetalle="ventadetalleEdit"
      :modoEdicion="modoEdicion"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}

.mt-3 {
  margin-top: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.p-datatable-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.p-datatable-table th,
.p-datatable-table td {
  border: 1px solid #000000;
  padding: 0.5rem;
}

.fondo-formulario-venta {
  background: #fdd143;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  padding: 2rem 2.5rem;
  max-width: 900px;
  margin: auto; /* Cambiado de 2rem auto */
}

.tabla-productos {
  background: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}
</style>
