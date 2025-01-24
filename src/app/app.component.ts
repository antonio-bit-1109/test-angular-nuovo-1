import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        (click)="reset()"
      >
        RESET
      </button>
    </div>
    <router-outlet />`,
  styles: [],
})
export class AppComponent {
  contatore = signal<number>(0);
  nome = signal<null | string>(null);

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
}
