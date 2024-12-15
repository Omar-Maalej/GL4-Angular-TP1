import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { cinUniqueValidator } from "../validators/cin-unique.validator";
import { cinAgeValidator } from "../validators/cin-age.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent implements OnInit {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.age?.valueChanges.subscribe((age) => {
      if(age && age < 18){
        this.path?.disable();
        this.path?.setValue("");
      }else {
        this.path?.enable();
      }
      });
      this.loadFormData();
      this.form.valueChanges.subscribe(()=> {
        console.log("form changed", this.form.value);
        this.saveFormData();
      });

    }
  
  private loadFormData() {
    const data = localStorage.getItem("form");
    if(data){
      this.form.patchValue(JSON.parse(data));
    }
  }

  private saveFormData() {
    console.log("here", this.form.valid);
    if(this.form.valid){
    localStorage.setItem("form", JSON.stringify(this.form.value));
    }
  }



  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [{value : "", disabled : true}],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: [cinUniqueValidator(this.cvService)],
          updateOn: "change",
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required,],
        },
      ],
    },
    {
    validators : cinAgeValidator(), 
    }
  );

  addCv() {
    console.log("cv",this.form.value);
    console.log("path",this.path);
    if(!this.path?.value){
      this.form.value.path = "";
    }
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }

}
