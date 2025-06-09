import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

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
}
