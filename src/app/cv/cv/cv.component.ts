import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { BehaviorSubject, catchError, combineLatest, map, of, Subject } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {


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

  private activeTab$ = new BehaviorSubject<string>("juniors");

  //private activeTab$ = new Subject<string>(); we need intial value


  activeTab = "juniors";
 
  filteredCvs$ = combineLatest([this.cvs$, this.activeTab$]).pipe(
    map(([cvs, activeTab]) => {
      return activeTab === "juniors"
        ? cvs.filter((cv) => cv.age < 40)
        : cvs.filter((cv) => cv.age >= 40);
    })
  );
  

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

  setTab(tab: string) {
    this.activeTab = tab;
    this.activeTab$.next(tab);
  }
}
