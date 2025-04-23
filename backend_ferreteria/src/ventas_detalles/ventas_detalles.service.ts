import { Injectable } from '@nestjs/common';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';

@Injectable()
export class VentasDetallesService {
  create(createVentasDetalleDto: CreateVentaDetalleDto) {
    return 'This action adds a new ventasDetalle';
  }

  findAll() {
    return `This action returns all ventasDetalles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ventasDetalle`;
  }

  update(id: number, updateVentasDetalleDto: UpdateVentaDetalleDto) {
    return `This action updates a #${id} ventasDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} ventasDetalle`;
  }
}
