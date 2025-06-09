import { VentaDetalle } from 'src/ventas_detalles/entities/venta_detalle.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar')
  codigo: string;

  @Column('varchar')
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioVenta: number;

  @Column('int')
  cantidad: number;

  @Column('varchar', { name: 'unidad_medida' })
  unidadMedida: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => VentaDetalle, (ventaDetalle) => ventaDetalle.producto)
  ventasDetalles: VentaDetalle[];
}
