<script setup lang="ts">
import type { Proveedor } from '@/models/proveedor'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const ENDPOINT = 'proveedores'
const proveedores = ref<Proveedor[]>([])
const emit = defineEmits(['edit'])
const proveedorDelete = ref<Proveedor | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    console.log('Proveedores obtenidos:', response.data)
    proveedores.value = response.data
  } catch (error) {
    console.error('Error al obtener proveedores:', error)
  }
}

const proveedoresFiltrados = computed(() => {
  return proveedores.value.filter(
    (proveedor) =>
      proveedor.razonSocial.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      proveedor.ciNit.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      proveedor.representante.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(proveedor: Proveedor) {
  emit('edit', proveedor)
}

function mostrarEliminarConfirm(proveedor: Proveedor) {
  proveedorDelete.value = proveedor
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${proveedorDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-2">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por Razón Social, CI, NIT o Representante"
        />
      </InputGroup>
    </div>
    <DataTable
      :value="proveedoresFiltrados"
      paginator
      scrollable
      scrollHeight="flex"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 50rem"
      showGridlines
    >
      <Column
        field="razonSocial"
        header="Razón Social"
        sortable
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      />
      <Column
        field="ciNit"
        header="CI/NIT"
        sortable
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      />
      <Column
        field="telefono"
        header="Teléfono"
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      />
      <Column
        field="direccion"
        header="Dirección"
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      />
      <Column
        field="representante"
        header="Representante"
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      />
      <Column
        header="Acciones"
        frozen
        alignFrozen="right"
        style="min-width: 120px"
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }"
      >
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" class="boton-amarillo" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            severity="danger"
            class="boton-rojo"
            text
            @click="mostrarEliminarConfirm(data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este proveedor?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" severity="danger" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
