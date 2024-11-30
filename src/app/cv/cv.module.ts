import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCvComponent } from './add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { CvCardComponent } from './cv-card/cv-card.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { MasterDetailCvComponent } from '../master-detail-cv/master-detail-cv.component';
import { Route, RouterModule } from '@angular/router';
import { EmbaucheComponent } from './embauche/embauche.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CvResolver } from '../master-detail-cv/cv-resolver';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardProfilComponent } from '../components/card-profil/card-profil.component';

const routes : Route[] = [
  {
    path: "",
    component: CvComponent,
  },
  { path: "add", component: AddCvComponent, canActivate: [AuthGuard] },
  {
    path: "list", 
    component: MasterDetailCvComponent, 
    children : [
      { path : ":id", component : DetailsCvComponent , resolve: {
        cv: CvResolver
      }}
   ]
 },
  { path: ":id", component: DetailsCvComponent },
]




@NgModule({
  declarations: [
    CardProfilComponent,
    AddCvComponent,
    CvComponent,
    DetailsCvComponent,
    CvCardComponent,
    ListComponent,
    ItemComponent,
    MasterDetailCvComponent,
    EmbaucheComponent,
    DefaultImagePipe,
    AutocompleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [RouterModule]
})
export class CvModule { }
