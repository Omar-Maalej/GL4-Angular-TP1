import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../cv/services/cv.service';
import { Cv } from '../cv/model/cv';
import { ListComponent } from '../cv/list/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES } from 'src/config/routes.config';

@Component({
  selector: 'app-master-detail-cv',
  templateUrl: './master-detail-cv.component.html',
  styleUrl: './master-detail-cv.component.css'
})
export class MasterDetailCvComponent {
  selectedCv: Cv | null = null;
  date = new Date();

  cvs$ = this.cvService.getCvs().pipe(
    catchError((error) => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
 



  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router : Router,
    private route : ActivatedRoute
  ) {
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }


  goToCvDetail(cv: Cv) {
    console.log(cv);
    this.router.navigate([APP_ROUTES.list + cv.id]);
    }

}