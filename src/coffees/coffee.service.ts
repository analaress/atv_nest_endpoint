import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { CreateCafeDto } from './dto/create-cafe.dto';

export interface Coffee {
    nome: string;           
    tipo: string;           
    quantidade?: number;
    preco?: number;
    id: string;             
    descricao?: string;
    tags?: string[];
  }

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
          id: '1',
          nome: 'Café Expresso',
          tipo: 'Preto',
          quantidade: 100,
          preco: 4.5,
          descricao: 'Café forte e concentrado.',
          tags: ['forte', 'sem açúcar']
        },
        {
          id: '2',
          nome: 'Café Latte',
          tipo: 'Com leite',
          quantidade: 50,
          preco: 6.0,
          descricao: 'Mistura suave de café com leite vaporizado.',
          tags: ['suave', 'com leite']
        },
        {
          id: '3',
          nome: 'Café Gelado',
          tipo: 'Gelado',
          quantidade: 30,
          preco: 7.5,
          descricao: 'Bebida refrescante de café com gelo.',
          tags: ['gelado', 'refrescante']
        }
      ];
    
    getCoffees(): Coffee[] {
        return this.coffees;
    }

    getCoffeeUnico(id: string): Coffee | undefined {
        const coffee = this.coffees.find((coffee) => coffee.id === id)
        if (!coffee) {
            throw new NotFoundException(`Café com ID ${id} não encontrado.`);
        }

        return coffee;
    }

    createCoffee(createCoffeeDto: CreateCafeDto) {
        const existeCoffee = this.coffees.find((c) => c.nome== createCoffeeDto.nome)
        if(existeCoffee) {
          throw new ConflictException('Coffee já existe.')
        }

        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }
    

}