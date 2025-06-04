import { PrismaClient, EntregaStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'Ana Silva',
      email: 'ana@example.com',
      cpf: '12345678900',
      telefone: '11999999999',
    },
  });

  const coffee1 = await prisma.coffee.create({
    data: {
      nome: 'Café Forte',
      tipo: 'Forte',
      precoUnitario: 9.5,
      descricao: 'Café encorpado e intenso',
      tags: ['forte', 'intenso'],
    },
  });

  const coffee2 = await prisma.coffee.create({
    data: {
      nome: 'Café Suave',
      tipo: 'Suave',
      precoUnitario: 7.0,
      descricao: 'Café leve e aromático',
      tags: ['suave', 'leve'],
    },
  });

  const pedido = await prisma.pedido.create({
    data: {
      clienteId: cliente.id,
      total: 26.0,
      itens: {
        create: [
          {
            coffeeId: coffee1.id,
            quantidade: 1,
            precoUnitario: coffee1.precoUnitario,
          },
          {
            coffeeId: coffee2.id,
            quantidade: 2,
            precoUnitario: coffee2.precoUnitario,
          },
        ],
      },
      entrega: {
        create: {
          endereco: 'Rua das Flores, 123',
          status: EntregaStatus.PENDENTE,
          dataPrevista: new Date('2025-06-10'),
        },
      },
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
