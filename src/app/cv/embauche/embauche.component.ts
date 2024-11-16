import { Component, inject, Signal, signal } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';

import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-embauche',
    templateUrl: './embauche.component.html',
    styleUrls: ['./embauche.component.css'],
    standalone: true,
    imports: [
    ItemComponent
],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

 

  public embauchees: Signal<Cv[]> = this.embaucheService.embauchees;
  constructor() {
    this.embauchees = this.embaucheService.embauchees;
  }

  getEmbauchees() {
    //console.log(this.embaucheService.getEmbauchees());
    return this.embaucheService.getEmbauchees();
  }
}
