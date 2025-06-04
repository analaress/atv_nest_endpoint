import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateCafeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
