import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, of } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  cvs$ = this.cvService.getCvs().pipe(
    catchError((error) => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
 

  selectedCv$ = this.cvService.selectCv$;

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }

  selectCv(cv: Cv) {
    this.cvService.selectCv(cv);
  }
}
