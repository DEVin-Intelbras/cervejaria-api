import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoCerveja } from './tipo-cerveja.enum';

export class Cerveja {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  nomeCervejaria: string;

  @IsNotEmpty()
  @IsEnum(TipoCerveja)
  tipo: TipoCerveja;
}
