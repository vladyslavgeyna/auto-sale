import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, { constraints, object }: ValidationArguments) {
    const [relatedPropertyName] = constraints;
    const relatedValue = (object as any)[relatedPropertyName];

    return value === relatedValue;
  }
}

export const Match =
  (property: string, validationOptions?: ValidationOptions) =>
  (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
