import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, map, switchMap, catchError } from "rxjs/operators";
import { CvService } from "../services/cv.service";

export function cinUniqueValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      // Si la valeur est vide, pas d'erreur (validation réussie)
      return of(null);
    }

    // Ajoute un délai pour éviter de spammer l'API
    return of(control.value).pipe(
      debounceTime(500), // Temps d'attente avant l'appel API
      switchMap((cin) =>
        cvService.selectByProperty("cin", cin).pipe(
          map((cv) => (cv.length === 0 ? null : { cinNotUnique: true })), 
          catchError(() => of(null))
        )
      )
    );
  };
}
