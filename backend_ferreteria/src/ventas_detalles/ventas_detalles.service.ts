import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VentasDetallesService {
  constructor(
    @InjectRepository(VentaDetalle)
    private ventasRepository: Repository<VentaDetalle>,
  ) {}

  async create(
    CreateVentaDetalleDto: CreateVentaDetalleDto,
  ): Promise<VentaDetalle> {
    const existe = await this.ventasRepository.findOneBy({
      idVenta: CreateVentaDetalleDto.idVenta,
      idProducto: CreateVentaDetalleDto.idProducto,
      precioUnitario: CreateVentaDetalleDto.precioUnitario,
      total: CreateVentaDetalleDto.total,
    });

    if (existe) throw new ConflictException('El det ya existe');

    const ventaDetalle = new VentaDetalle();
    ventaDetalle.idVenta = CreateVentaDetalleDto.idVenta;
    ventaDetalle.idProducto = CreateVentaDetalleDto.idProducto;
    ventaDetalle.precioUnitario = CreateVentaDetalleDto.precioUnitario;
    ventaDetalle.total = CreateVentaDetalleDto.total;
    return this.ventasRepository.save(ventaDetalle);
  }

  async findAll(): Promise<VentaDetalle[]> {
    return this.ventasRepository.find({
      relations: { producto: true, venta: true },
      select: {
        id: true,
        precioUnitario: true,
        total: true,
        producto: {
          id: true,
          codigo: true,
          descripcion: true,
          precioVenta: true,
          saldo: true,
          unidadMedida: true,
        },
        venta: {
          id: true,
          idCliente: true,
          idUsuario: true,
          fecha: true,
          transaccion: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<VentaDetalle> {
    const ventaDetalle = await this.ventasRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });
    if (!ventaDetalle)
      throw new NotFoundException('El detalle de la venta no existe');
    return ventaDetalle;
  }

  async findAllByVenta(idVenta: number): Promise<VentaDetalle[]> {
    return this.ventasRepository.findBy({ idVenta });
  }

  async findAllByProducto(idProducto: number): Promise<VentaDetalle[]> {
    return this.ventasRepository.findBy({ idProducto });
  }

  async update(id: number, updateVentaDetalleDto: UpdateVentaDetalleDto) {
    const ventaDetalle = await this.findOne(id);
    const ventaDetalleUpdate = Object.assign(
      ventaDetalle,
      updateVentaDetalleDto,
    );
    return this.ventasRepository.save(ventaDetalleUpdate);
  }

  async remove(id: number) {
    const ventaDetalle = await this.findOne(id);
    if (ventaDetalle) return this.ventasRepository.softRemove(ventaDetalle);
  }
}
