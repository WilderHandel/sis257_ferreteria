import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
  ) {}

  async create(CreateVentaDto: CreateVentaDto): Promise<Venta> {
    const existe = await this.ventasRepository.findOneBy({
      idCliente: CreateVentaDto.idCliente,
      idUsuario: CreateVentaDto.idUsuario,
      fecha: CreateVentaDto.fecha,
      transaccion: CreateVentaDto.transaccion,
    });

    if (existe) throw new ConflictException('La venta ya existe');

    const venta = new Venta();
    venta.idCliente = CreateVentaDto.idCliente;
    venta.idUsuario = CreateVentaDto.idUsuario;
    venta.fecha = CreateVentaDto.fecha;
    venta.transaccion = CreateVentaDto.transaccion;
    return this.ventasRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: { cliente: true, usuario: true },
      select: {
        id: true,
        fecha: true,
        transaccion: true,
        cliente: { id: true, nombre: true, ciNit: true },
        usuario: { id: true },
      },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: { cliente: true, usuario: true },
    });
    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async findAllByCliente(idCliente: number): Promise<Venta[]> {
    return this.ventasRepository.findBy({ idCliente });
  }

  async findAllByUsuario(idUsuario: number): Promise<Venta[]> {
    return this.ventasRepository.findBy({ idUsuario });
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.findOne(id);
    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(ventaUpdate);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    if (venta) return this.ventasRepository.softRemove(venta);
  }
}
