import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cinAgeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const cin = group.get('cin')?.value;
    const age = group.get('age')?.value;

    if (!cin || !age || cin.length < 2) {
      return null; 
    }

    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);

    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { invalidCinForAge: true }; 
    }

    if (age < 60 && firstTwoDigits <= 19) {
      return { invalidCinForAge: true }; 
    }

    return null; 
  };
}
