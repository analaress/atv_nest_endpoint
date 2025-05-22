import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCafeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

    quantidade?: number;
  preco?: number;
  descricao?: string;
  tags?: string[];
}
