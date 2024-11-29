import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Cv } from '../cv/model/cv';
import { Observable } from 'rxjs';
import { CvService } from '../cv/services/cv.service';

@Injectable({
  providedIn: 'root',
})
export class CvResolver implements Resolve<Cv> {
  constructor(private cvService: CvService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cv> | Cv {
    const cvId = route.paramMap.get('id');
    if(cvId) {
    return this.cvService.getCvById(+cvId); 
    }else 
     throw new Error('cv id is not found');
  }
}
