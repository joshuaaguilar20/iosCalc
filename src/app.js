import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'


class App extends React.Component {
    constructor(props) {
      super(props);
      this.acc = '';
      this.currentNumber = '';
      this.flagNewNumber = false;
      this.operator = '';
      this.result = '';
    }
    state = {
      display: '0'
    };

    operatorFunction = (operator) => { //This Function Takes string from onClick 'sub'/add and passes the symbol to this.operator then is passed to calculate
      if (this.flagNewNumber && this.operator === '') {
        this.displayFunction('Error Invalid Op');   //this logic prevents erros if a number is pressed incorrectly.
      }
      this.flagNewNumber = true;      //resets the flag to true to all for system to store secound number 
      if (this.currentNumber !== '' && this.acc !== '') {
        this.calculate()          //logic that tells it when user enters number + number to only calculate if it has two correct values. 
      }
      this.operator = operator;   //sets operator to be used by calculate 
    }


    clearDisplay = () => {    //clears the display 
      this.displayFunction('0');
      this.acc = '';
      this.currentNumber = '';
      this.flagNewNumber = false;
      this.operator = '';

    }
    calculate = () => {     //all this does is take string from button below passed to op and do the op based on the string. simple 
      let op1 = parseFloat(this.acc);
      let op2 = parseFloat(this.currentNumber);
      switch (this.operator) {
        case 'add':
          this.result = op1 + op2;
          this.displayFunction(this.result);
          break;
        case 'sub':
          this.result = op1 - op2;
          this.displayFunction(this.result);
          break;
        case 'multi':
          this.result = Math.round(10000 * op1 * op2) / 10000
          this.displayFunction(this.result);
          break;
        case 'div':
          this.result = Math.round(10000 * op1 / op2) / 10000
          this.displayFunction(this.result);
          break;
        case 'mod':
          this.result = op1 % op2
          this.displayFunction(this.result);
          break;
        default:
          alert("Invalid Op '" + this.operator + "'")
      }
      this.acc = '';                //clears the second number 
      this.currentNumber = this.result    // ***important keeps running total of calcuations

    }                                 // sets numbers as string so it can support numbers like 99 900 etc. 
    handleNumber = (number) => {    // if flag is true sets second number or ACC
      if (this.flagNewNumber) {       // if flag is false sets first Number as Current Number 
        this.acc = this.currentNumber
        this.currentNumber = '' + number;
        this.flagNewNumber = false;
      } else {
        if (number !== 0 && number !== '.' || (number === 0 && this.state.display.charAt(0) !== '0' && this.currentNumber.indexOf('.') === -1) ||
          (number === 0 && this.currentNumber.indexOf('.') > -1) ||
          (number === '.' && this.currentNumber.indexOf('.') === -1))   //All this logic does is say if its 0 dont allow double zero unless                                       
          this.currentNumber += number;                    //there is a '.' then allow a zero ohh yeah and only allow one . sorry for long logic
      }
      this.displayFunction(this.currentNumber);
    }
    displayFunction = (input) => {
      this.setState(() => ({
        display: this.state.display = input
      }));
    };
                                //below button click fires function and sends number or operator to functions above* 
render(){
  return (
    <div>                                                                          
  <div className="container">
  <div className="item item-header" id="display">{this.state.display}</div>
  <button className="btn silver" id="clear" onClick={this.clearDisplay}>C</button>
  <button className="btn silver" onClick={() => this.operatorFunction('add')}>+</button>
  <button className="btn silver" onClick={() => this.operatorFunction('mod')} >%</button>
  <button className="btn orange" id="divide" onClick={() => this.operatorFunction('div')}>÷</button>
  
  <button className="btn" id="seven" onClick={() => this.handleNumber(7)}>7</button>
  <button className="btn" id="eight" onClick={() => this.handleNumber(8)}>8</button>
  <button className="btn" id="nine" onClick={() => this.handleNumber(9)}>9</button>
  <button className="btn orange" id="multiply" onClick={() => this.operatorFunction('multi')}>X</button>
  
  <button className="btn" id="four" onClick={() => this.handleNumber(4)}>4</button>
  <button className="btn" id="five" onClick={() => this.handleNumber(5)}>5</button>
  <button className="btn" id="six" onClick={() => this.handleNumber(6)}>6</button>
  <button className="btn orange" id="subtract" onClick={() => this.operatorFunction('sub')}>-</button>
  
  <button className="btn" id="one" onClick={() => this.handleNumber(1)}>1</button>
  <button className="btn" id="two" onClick={() => this.handleNumber(2)}>2</button>
  <button className="btn" id="three" onClick={() => this.handleNumber(3)}>3</button>
  <button className="btn orange" id="add" onClick={() => this.operatorFunction('add')}>+</button>
  
  <button className="btn" id="zero" onClick={() => this.handleNumber(0)}>0</button>
  <button className="btn" id="clear" onClick={this.clearDisplay}>C</button>
  <button className="btn" id="decimal" onClick={() => this.handleNumber('.')}>.</button>
  <button className="btn orange" id="equals" onClick={() => this.calculate()}>=</button>
  
</div>
  </div>
  )};
};
 

  ReactDOM.render(<App/>, document.getElementById('app'));
  
