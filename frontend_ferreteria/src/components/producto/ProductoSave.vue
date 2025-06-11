<script setup lang="ts">
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { Select } from 'primevue'

const ENDPOINT = 'productos'

// Props
const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({} as Producto),
  },
  modoEdicion: Boolean,
})

const emit = defineEmits(['guardar', 'close'])

// Refs
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const producto = ref<Producto>({ ...props.producto })
const categorias = ref<{ id: number; descripcion: string }[]>([])
const proveedores = ref<{ id: number; nombre: string }[]>([])

// Carga de datos
async function obtenerCategorias() {
  try {
    const response = await http.get('categorias')
    categorias.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías', error)
  }
}

async function obtenerProveedores() {
  try {
    const response = await http.get('proveedores')
    proveedores.value = response.data
  } catch (error) {
    console.error('Error al obtener proveedores', error)
  }
}

// Guardar producto
async function handleSave() {
  try {
    const body = {
      idCategoria: producto.value.categoria.id,
      idProveedor: producto.value.proveedor.id,
      codigo: producto.value.codigo,
      precioVenta: producto.value.precioVenta,
      saldo: producto.value.saldo,
      fotografia: producto.value.fotografia,
      unidadMedida: producto.value.unidadMedida,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    producto.value = {} as Producto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

// Watch para apertura del diálogo
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      producto.value = { ...props.producto }
      obtenerCategorias()
      obtenerProveedores()
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Producto'"
      style="width: 25rem"
    >
        <div class="flex items-center gap-4 mb-4">
          <label for="categoria" class="font-semibold w-3">Categoría</label>
          <Select
            id="categoria"
            v-model="producto.categoria.id"
            :options="categorias"
            optionLabel="descripcion"
            optionValue="id"
            class="flex-auto"
            autofocus
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="proveedor" class="font-semibold w-3">Proveedor</label>
          <Select
            id="proveedor"
            v-model="producto.proveedor.id"
            :options="proveedores"
            optionLabel="nombre"
            optionValue="id"
            class="flex-auto"
            autofocus
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="codigo" class="font-semibold w-3">Código</label>
          <InputText id="codigo" v-model="producto.codigo" class="flex-auto" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="descripcion" class="font-semibold">Descripción</label>
          <InputText id="descripcion" v-model="producto.descripcion" class="flex-auto" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="precio" class="font-semibold">Precio Venta</label>
          <InputNumber
            id="precio"
            v-model="producto.precioVenta"
            class="flex-auto"
            :min="0"
            mode="currency"
            currency="Bs"
            locale="es-BO"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="saldo" class="font-semibold">Saldo</label>
          <InputNumber
            id="saldo"
            v-model="producto.saldo"
            class="flex-auto"
            :min="0"
            :useGrouping="false"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="unidadmMedida" class="font-semibold">Unidad de Medida</label>
          <InputText id="unidadMedida" v-model="producto.unidadMedida" class="flex-auto" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="foto" class="font-semibold">Fotografía (URL)</label>
          <InputText id="foto" v-model="producto.fotografia" class="flex-auto" />
        </div>
        <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
