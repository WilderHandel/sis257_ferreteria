import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_empleado' })
  idEmpleado: number;

  @Column('varchar', { length: 15 })
  usuario: string;

  @Column('varchar', { length: 250 })
  contraseña: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;
}
