import { IsInt, IsString, IsArray } from 'class-validator';

export class CafeResponseDto {
  @IsInt()
  id: number;

  @IsString()
  nome: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
