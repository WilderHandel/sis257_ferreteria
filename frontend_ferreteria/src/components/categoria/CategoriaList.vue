<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const ENDPOINT = 'categorias'
const categorias = ref<Categoria[]>([])
const emit = defineEmits(['edit'])
const categoriaDelete = ref<Categoria | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
   try {
    const response = await http.get(ENDPOINT)
    console.log('Categorías obtenidas:', response.data)
    categorias.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
}

const categoriasFiltradas = computed(() => {
  return categorias.value.filter(
    (categoria) =>
      categoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      categoria.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function emitirEdicion(categoria: Categoria) {
  emit('edit', categoria)
}

function mostrarEliminarConfirm(categoria: Categoria) {
  categoriaDelete.value = categoria
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${categoriaDelete.value?.id}`)
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
          placeholder="Buscar por Nombre o Descripción"
        />
      </InputGroup>
    </div>
 <DataTable :value="categoriasFiltradas" paginator scrollable scrollHeight="flex" :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem">
      <Column field="nombre" header="Nombre" sortable />
      <Column field="descripcion" header="Descripción" sortable />
      <Column header="Acciones" frozen alignFrozen="right" style="min-width: 120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            severity="danger"
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
      <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
