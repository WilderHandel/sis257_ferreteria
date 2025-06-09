import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [TypeOrmModule.forFeature([Venta])],
})
export class VentasModule {}
