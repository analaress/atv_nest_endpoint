import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.coffee.findMany({
        select: { id: true, nome: true, tags: true },
      });
    } catch (error) {
      throw new HttpException('Erro ao buscar cafés', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: any) {
    const { nome, tipo, preco, descricao, tags } = data;

    if (!nome || !tipo || preco === undefined) {
      throw new BadRequestException('Campos nome, tipo e preco são obrigatórios.');
    }

    try {
      return await this.prisma.coffee.create({
        data: {
          nome,
          tipo,
          precoUnitario: preco,
          descricao,
          tags,
        },
      });
    } catch (error) {
      throw new HttpException('Erro ao criar café', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPedidosByCafeId(coffeeId: number) {
    try {
      const pedidos = await this.prisma.itemPedido.findMany({
        where: { coffeeId },
        select: {
          quantidade: true,
          pedido: {
            select: {
              id: true,
              data: true,
              cliente: {
                select: {
                  nome: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (pedidos.length === 0) {
        throw new NotFoundException(`Nenhum pedido encontrado para o café ID ${coffeeId}`);
      }

      return pedidos.map(pedido => ({
        pedidoId: pedido.pedido.id,
        data: pedido.pedido.data,
        cliente: pedido.pedido.cliente,
        quantidade: pedido.quantidade,
      }));
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException('Erro ao buscar pedidos do café', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findMaisVendidos() {
    try {
      const agregados = await this.prisma.itemPedido.groupBy({
        by: ['coffeeId'],
        _sum: { quantidade: true },
        orderBy: { _sum: { quantidade: 'desc' } },
        take: 3,
      });

      if (agregados.length === 0) {
        throw new NotFoundException('Nenhum café vendido encontrado');
      }

      const cafesIds = agregados.map(a => a.coffeeId);

      const cafes = await this.prisma.coffee.findMany({
        where: { id: { in: cafesIds } },
        select: { id: true, nome: true, tags: true },
      });

      return agregados.map(agr => {
        const cafe = cafes.find(c => c.id === agr.coffeeId);
        return {
          id: cafe.id,
          nome: cafe.nome,
          tags: cafe.tags,
          totalVendido: agr._sum.quantidade,
        };
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException('Erro ao buscar cafés mais vendidos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const cafe = await this.prisma.coffee.findUnique({ where: { id } });

      if (!cafe) {
        throw new NotFoundException(`Café com ID ${id} não encontrado.`);
      }

      return await this.prisma.coffee.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException('Erro ao deletar o café', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
