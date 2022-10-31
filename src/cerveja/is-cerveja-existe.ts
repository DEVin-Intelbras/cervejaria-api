import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from 'src/database/database';

@Injectable()
@ValidatorConstraint()
export class IsCervejaExisteConstraint implements ValidatorConstraintInterface {
  constructor(private database: Database) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const cervejas = await this.database.getCervejas();

    const cervejaExiste = cervejas.find((cerveja) => cerveja.nome === value);

    if (cervejaExiste) {
      return new Promise<boolean>((resolve) => {
        resolve(false);
      });
    } else {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    }
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Nome da cerveja já existe';
  }
}

export function IsCervejaExiste(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCervejaExisteConstraint,
    });
  };
}
