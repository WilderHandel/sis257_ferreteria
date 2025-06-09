import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedoresRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const existe = await this.proveedoresRepository.findOneBy({
      ciNit: createProveedorDto.ciNit,
      RazonSocial: createProveedorDto.RazonSocial.trim(),
      telefono: createProveedorDto.telefono,
      direccion: createProveedorDto.direccion.trim(),
      representante: createProveedorDto.representante.trim(),
    });
    if (existe) throw new ConflictException('El Proveedor ya existe');

    const proveedor = new Proveedor();
    proveedor.ciNit = createProveedorDto.ciNit;
    proveedor.RazonSocial = createProveedorDto.RazonSocial.trim();
    proveedor.telefono = createProveedorDto.telefono;
    proveedor.representante = createProveedorDto.representante;
    proveedor.direccion = createProveedorDto.direccion;

    return this.proveedoresRepository.save(proveedor);
  }

  async findAll() {
    return this.proveedoresRepository.find({ order: { RazonSocial: 'ASC' } });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException('La Producto no existe');
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    const proveedor = await this.findOne(id);
    const proveedorUpdate = Object.assign(proveedor, updateProveedorDto);
    return this.proveedoresRepository.save(proveedorUpdate);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    if (proveedor) return this.proveedoresRepository.softRemove(proveedor);
  }
}
