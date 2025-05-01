import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';

@Controller('ventas-detalles')
export class VentasDetallesController {
  constructor(private readonly ventasDetallesService: VentasDetallesService) {}

  @Post()
  create(@Body() createVentasDetalleDto: CreateVentaDetalleDto) {
    return this.ventasDetallesService.create(createVentasDetalleDto);
  }

  @Get()
  findAll() {
    return this.ventasDetallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasDetallesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVentasDetalleDto: UpdateVentaDetalleDto,
  ) {
    return this.ventasDetallesService.update(+id, updateVentasDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasDetallesService.remove(+id);
  }
}
