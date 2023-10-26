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

  setStateVisor(value: any){
 if (this.firstOperation) {
    if(+value >= 0 || value === ".") {
      this.addDigit(value);
    }else {
      this.processOperation(value);
    }
   }
   else {
    this.previousOperation = "";
    this.currentOperation = "";
    this.firstOperation = true;

   }
 }

addDigit(digit:any) {
  if (digit === "." && this.currentOperation.includes(".")) {
    return;
  }
  this.currentOperation += digit;
  this.updateVisor(null, null, null, null);
}
processOperation(operation:any) {
if(this.currentOperation === "" && operation !== "C"){

  if(this.previousOperation !== "") {
    this.changeOperation(operation);
      }
      return
    }
    let operationValue:any;
    let previousValue = +  this.previousOperation.split(" ") [0];
    let currentValue = + this.currentOperation;


    switch(operation){
      case '+':
       operationValue = previousValue + currentValue;
       this.updateVisor(operationValue, operation, currentValue, previousValue);
        break;

        case '-':
          operationValue = previousValue - currentValue;
          this.updateVisor(operationValue, operation, currentValue, previousValue);
          break;
        case '*':
          operationValue = previousValue * currentValue;
          this.updateVisor(operationValue, operation, currentValue, previousValue);
          break;
        case '/':
          operationValue = previousValue / currentValue;
          this.updateVisor(operationValue, operation, currentValue, previousValue);
          break;
          case 'DEL':
            this.operationDelete();
            break;
          case 'CE':
            this.operationClearEntry();
            break;
          case 'C':
            this.operationClear();
            break;
          case '=':
            this.operationEqual();
            break;
    }
  }

  changeOperation(operation: any){
    const operationsMath = ["+", "-", "/", "*", "%"];
  if (!operationsMath.includes(operation)) {
    return;
  }
  this.previousOperation = this.previousOperation.trim().slice(0, -1) + operation;
  }
  updateVisor(
    operationValue= null,
    operation = null,
    currentValue: any,
    previousValue: any,
  ){
    if(operationValue !== null) {
    if(previousValue == 0) {
      operationValue = currentValue;
    }
    this.previousOperation = `${currentValue} ${operation}`
    if(previousValue >0) {
      this.previousOperation = `${previousValue} ${operation} ${currentValue}=`
     this.currentOperation= operationValue;
    } else {
      this.currentOperation = "";
    }

    }

  }

  operationDelete() {
    this.currentOperation = this.currentOperation.slice(0, -1);
  }

  operationClearEntry() {
    this.currentOperation = "";
  }

  operationClear() {
    this.currentOperation = "";
    this.previousOperation = "";

  }

  operationEqual() {
    let operation = this.previousOperation.split(" ") [1];
    this.firstOperation = false;

    this.processOperation(operation);
  }
}
