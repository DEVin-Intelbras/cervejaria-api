import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsCervejaExiste } from './is-cerveja-existe';
import { TipoCerveja } from './tipo-cerveja.enum';

export class Cerveja {
  @IsNotEmpty()
  @IsString()
  @IsCervejaExiste()
  @IsNumber()
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
