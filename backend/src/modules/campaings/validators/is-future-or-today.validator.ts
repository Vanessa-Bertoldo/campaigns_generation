import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { convertDate } from 'src/utils/date.util';

@ValidatorConstraint({ name: 'isFutureOrToday', async: false })
export class IsFutureOrTodayConstraint implements ValidatorConstraintInterface {
  validate(value: Date): boolean {
    const today = convertDate(new Date());
    const dateValue = convertDate(value);

    return dateValue >= today;
  }

  defaultMessage(): string {
    return 'A data de início deve ser igual ou posterior à data atual.';
  }
}

export function IsFutureOrToday(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFutureOrToday',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsFutureOrTodayConstraint,
    });
  };
}


