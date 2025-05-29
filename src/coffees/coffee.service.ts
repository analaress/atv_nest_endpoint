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
    data?: string;
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
          tags: ['forte', 'sem açúcar'],
          data: "2025-05-26"
        },
        {
          id: '2',
          nome: 'Café Latte',
          tipo: 'Com leite',
          quantidade: 50,
          preco: 6.0,
          descricao: 'Mistura suave de café com leite vaporizado.',
          tags: ['suave', 'com leite'],
          data: "2025-05-22"

        },
        {
          id: '3',
          nome: 'Café Gelado',
          tipo: 'Gelado',
          quantidade: 30,
          preco: 7.5,
          descricao: 'Bebida refrescante de café com gelo.',
          tags: ['gelado', 'refrescante'],
          data: "2025-05-28"
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

    getCoffeesData(start_date: string, end_date: string){

      if (end_date < start_date) {
        throw new ConflictException('A data fim deve ser menor que a data início.')
      }
      
      const filtroDatas = this.coffees.filter((coffees) => coffees.data >= start_date &&
      coffees.data <= end_date )

      console.log(start_date)
      console.log(end_date)

      return filtroDatas
    }
    

}