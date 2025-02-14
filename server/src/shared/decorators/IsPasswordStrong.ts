import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPasswordStrongConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string) {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  defaultMessage(validationArguments: ValidationArguments) {
    return (
      validationArguments?.constraints[0]?.message ||
      'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.'
    );
  }
}

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordStrongConstraint,
    });
  };
}
