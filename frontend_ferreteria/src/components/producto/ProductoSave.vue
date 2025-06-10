<script setup lang="ts">
import http from '@/plugins/axios'
import { Select } from 'primevue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { ref, computed, watch } from 'vue'
import type { Producto } from '@/models/producto'

const ENDPOINT = 'series'

const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

//const categorias = ref<Categoria[]>([])
//const proveedores = ref<Proveedor[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const producto = ref<Producto>({
  ...(props.producto || { categoria: { id: 0 }, proveedor: { id: 0 } }),
})

async function obtenerCategorias() {
  producto.value = await http.get('categorias').then((response) => response.data)
}

async function obtenerProveedores() {
  producto.value = await http.get('proveedores').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idCategoria: producto.value.categoria.id,
      idProveedor: producto.value.proveedor.id,
      codigo: producto.value.codigo,
      descripcion: producto.value.descripcion,
      precioVenta: producto.value.precioVenta,
      saldo: producto.value.saldo,
      unidadMedida: producto.value.unidadMedida,
      fotografia: producto.value.fotografia
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

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerCategorias()
      obtenerProveedores()
      
      if (props.modoEdicion) {
        producto.value = { ...props.producto }
        if (producto.value.fechaEstreno && !(producto.value.fechaEstreno instanceof Date)) {
          producto.value.fechaEstreno = new Date(producto.value.fechaEstreno)
        }
      } else {
        // Inicializar la serie con valores por defecto para "crear"
        producto.value = {
          titulo: '',
          sinopsis: '',
          director: '',
          temporadas: 1,
          tipoClasificacion: '',
          fechaEstreno: new Date(),
          pais: { id: 0, descripcion: '' },
        }
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Serie'"
      style="width: 30rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="pais" class="font-semibold w-3">País</label>
        <Select
          id="pais"
          v-model="producto.pais.id"
          :options="productos"
          optionLabel="descripcion"
          optionValue="id"
          placeholder="Seleccione un país"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="titulo" class="font-semibold w-3">Título</label>
        <InputText
          id="titulo"
          v-model="producto.titulo"
          class="flex-auto"
          autocomplete="off"
          autofocus
          maxlength="250"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="sinopsis" class="font-semibold w-3">Sinopsis</label>
        <InputText
          id="sinopsis"
          v-model="producto.sinopsis"
          class="flex-auto"
          autocomplete="off"
          maxlength="5000"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="director" class="font-semibold w-3">Director</label>
        <InputText
          id="director"
          v-model="producto.director"
          class="flex-auto"
          autocomplete="off"
          maxlength="100"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="temporadas" class="font-semibold w-3">Temporadas</label>
        <InputNumber v-model="producto.temporadas" class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha_estreno" class="font-semibold w-3">Fecha de estreno</label>
        <Calendar
          v-model="producto.fechaEstreno"
          date-format="yy-mm-dd"
          showIcon
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tipo_clasificacion" class="font-semibold w-3">Tipo de Clasificación</label>
        <Select
          id="tipo_clasificacion"
          v-model="producto.tipoClasificacion"
          :options="tiposClasificacion"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccione una clasificación"
          class="flex-auto"
          autofocus
        />
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
