import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { Cerveja } from './cerveja.entity';

@Injectable()
export class CervejaService {
  constructor(private database: Database) {}

  public async criarCerveja(cerveja: Cerveja): Promise<Cerveja> {
    const cervejaExiste = await this.getCerveja(cerveja.nome);
    if (cervejaExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Nome da cerveja já existe',
      });
    }
    await this.database.gravar(cerveja);
    return cerveja;
  }

  public async getCerveja(nome: string) {
    const cervejas = await this.database.getCervejas();
    return cervejas.find(
      (cerveja) => cerveja.nome.toLowerCase() == nome.toLowerCase(),
    );
  }

  public async buscarCervejas(page: number, size: number) {
    const indiceInicial = page * size;
    const indiceFinal = indiceInicial + size;

    const cervejas = await this.database.getCervejas();
    if (cervejas.length > indiceInicial) {
      if (cervejas.length > indiceFinal) {
        return cervejas.slice(indiceInicial, indiceFinal);
      } else {
        return cervejas.slice(indiceInicial, cervejas.length - 1);
      }
    } else {
      return [];
    }
  }

  public async apagarCerveja(nome: string) {
    const cervejas = await this.database.getCervejas();
    const novaLista = cervejas.filter(
      (cerveja) => cerveja.nome.toLowerCase() != nome.toLowerCase(),
    );
    await this.database.gravarCervejas(novaLista);
  }
}
