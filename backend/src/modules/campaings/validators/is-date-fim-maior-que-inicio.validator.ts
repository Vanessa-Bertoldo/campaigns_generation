import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateFimMaiorQueDataInicio', async: false })
export class IsDateFimMaiorQueDataInicioConstraint implements ValidatorConstraintInterface {
  validate(dataFim: string, args: ValidationArguments): boolean {
    const obj = args.object as { dataInicio?: string };
    if (!obj.dataInicio) return true;

    const inicio = new Date(obj.dataInicio);
    const fim = new Date(dataFim);

    inicio.setHours(0, 0, 0, 0);
    fim.setHours(0, 0, 0, 0);

    return fim > inicio;
  }

  defaultMessage(): string {
    return 'A data final deve ser maior que a data de início.';
  }
}

export function IsDateFinalLargerThanDataInicioValidation(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateFimMaiorQueDataInicio',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsDateFimMaiorQueDataInicioConstraint,
    });
  };
}

