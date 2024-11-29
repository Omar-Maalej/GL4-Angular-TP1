import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, of, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: ["gafsa"] });

  dropdownList : Cv[]= [];
  loading = false;

  constructor() {
    this.search.valueChanges
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(), 
        tap(() => (this.loading = true)),
        switchMap((value) => {
          if(value === '') {
            this.loading = false;
            return of([]);
          }else {
           return  this.cvService.selectByName(value).pipe(
              tap(() => (this.loading = false))
            )
          }
        }
        )
      )
      .subscribe({
        next: (results) => {
          this.dropdownList = results;
        },
        error: () => {
          this.loading = false;
          this.dropdownList = [];
        },
      });
  }

}
