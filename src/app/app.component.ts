import { Component, signal, effect, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { single } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  template: ` <div>
      valore contatore {{ contatore() }}
      <p>nome : {{ nome() }}</p>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="incrementaContatore()"
      >
        INCREMENTA
      </button>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="decrementa()"
      >
        DECREMENTA
      </button>

      <!-- <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="reset()"
        [style.display]="nascondiAZero()"
      >
        RESET
      </button> -->

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="reset()"
        *ngIf="contatore() > 0"
      >
        RESET
      </button>
    </div>

    <div>
      <button
        class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="funzioneFinta()"
      >
        funzione finta
      </button>
    </div>

    Scrivi tuo nome:
    <input type="text" [(ngModel)]="nome" (keydown)="funzioneFinta()" />

    <!-- IF SMART DI ANGULAR NUOVO IF CON DECORATORE  -->
    <!-- PUOI AVERE ANCHE ELSE O ELSE IF  -->
    <!-- prettier-ignore -->
    @if (allievi().length) { 

      @for ( allievo of allievi(); track allievo.id) {

    <div>{{ allievo.name }}</div>

    } } @else {
    <div>attualmente non ci sono allievi.</div>
    }

    <router-outlet />`,
  styles: [],
})
export class AppComponent {
  contatore = signal<number>(0);
  nome = signal(localStorage.getItem('name') || '');
  allievi = signal([
    { name: 'danilo', id: 1 },
    { name: 'marcello', id: 2 },
    { name: 'antonio', id: 3 },
  ]);

  constructor() {
    effect(() => {
      // console.log(' valore contatore' + this.contatore());
      localStorage.setItem('name', this.nome());
    });
  }

  public incrementaContatore() {
    // this.contatore++;
    // this.nome.set('antonio');
    this.contatore.update((valore) => valore + 1);
  }

  public decrementa() {
    this.contatore.update((val) => val - 1);
  }

  public reset() {
    this.contatore.set(0);
  }

  // public isZero() {
  //   console.log('esecuzione metodo isZero');
  //   return this.contatore() === 0;
  // }

  // utilizzando il metodo computed la funzione viene richiamata solo quando il valore cambia -- STO BYPASSANDO ZONEJS PER IL RIRENDER DEL DOM
  isZero = computed(() => {
    console.log('esecuzione metodo isZero');
    return this.contatore() === 0;
  });
  public nascondiAZero = computed(() => {
    return this.isZero() ? 'none' : 'inline';
  });

  public funzioneFinta() {
    console.log('esecuzione funzione funta');
  }
}
