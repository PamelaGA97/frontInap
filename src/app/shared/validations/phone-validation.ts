import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value?.toString().trim();

    if (!value) {
      return { required: true };
    }
    // - opcionalmente empieza con + y un código de país (1 a 3 dígitos)
    // - seguido de 6 a 12 dígitos (sin letras)
    const phoneRegex = /^(\+?\d{1,3})?\s?\d{6,12}$/;

    if (!phoneRegex.test(value)) {
      return { invalidPhone: true };
    }

    return null;
  };
}