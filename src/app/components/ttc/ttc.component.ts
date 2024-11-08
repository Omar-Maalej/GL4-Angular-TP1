import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TTCComponent {
  tva : WritableSignal<number> = signal(18);
  quantity : WritableSignal<number> = signal(10);
  price : WritableSignal<number> = signal(100);

  total : Signal<number> = computed(() => { return this.price() * this.quantity() * (1 + this.tva() / 100); });
  ttc : Signal<number> = computed(() => { return this.price() * (1+this.tva() / 100); });
  discount : Signal<number> = computed(() => { const quant = this.quantity(); 
    const total = this.total();
    if(quant >= 10 && quant <= 15) return total*0.2;
    else if (quant > 15) return total*0.3;
    else return 0; }
  );

  constructor() {}
}
