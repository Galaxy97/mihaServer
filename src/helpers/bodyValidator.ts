import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const bodyValidator = async <T>(
  validatingDto: ClassConstructor<T>,
  body,
) => {
  const validatingDtoObject = plainToClass(validatingDto, body, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const validationErrors = await validate(validatingDtoObject as any, {
    validationError: { target: false, value: false },
  });

  if (validationErrors.length) {
    throw validationErrors;
  }
  return validatingDtoObject;
};
