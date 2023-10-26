import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  previousOperation: any = '';
  currentOperation: any = '';
  firstOperation= true;
  setState(value: any){
 if (this.firstOperation) {

  }
  }
}
