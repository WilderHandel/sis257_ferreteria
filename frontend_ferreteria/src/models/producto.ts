import type { Categoria } from "./categoria"
import type { Proveedor } from "./proveedor"

export interface Producto {
  id: number
  idCategoria: number
  idProveedor: number
  codigo: string
  descripcion: string
  precioVenta: number
  saldo: number
  unidadMedida: string
  fotografia: string
  categoria: Categoria
  proveedor: Proveedor
}
