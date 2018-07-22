
import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'


class App extends React.Component {
  constructor(props){
    super(props);
    this.clearDisplay = this.clearDisplay.bind(this)
    this.calculate = this.calculate.bind(this)
    //this.equalFunction = this.equalFunction.bind(this)
    this.handleNumber = this.handleNumber.bind(this);
    this.operatorFunction = this.operatorFunction.bind(this);
    this.displayFunction = this.displayFunction.bind(this);
    this.acc = '';
    this.currentNumber = '';
    this.flagNewNumber = false;
    this.operator = '';
    this.result = '';
  }
  state = {
    calculated:'',
    display:'0'
  };
  
  operatorFunction = (operator) => {  //This Function Takes string from onClick 'sub'/add and passes the symbol to this.operator then is passed to calculate
    
    if(this.flagNewNumber && this.operator === ''){
      this.displayFunction('Error Invalid Op');
    }
    this.flagNewNumber = true;
     if(this.currentNumber !== '' && this.acc !== ''){
      this.calculate()
    }
    this.operator = operator;




    // if(this.flagNewNumber) {
    //   debugger;
    //   this.displayFunction('Error Invalid Op');
    // } else {
    //   if(this.operator !== '') {
    //     this.calculate();
    //   } 
    //   this.operator = operator;
     
    // }
    //  this.flagNewNumber = true
     
     console.log(` flag ${this.flagNewNumber}`);
     console.log(` current ${this.currentNumber}`);
     console.log(` acc ${this.acc}`);
     console.log(`operator  ${this.operator}`);
     console.log("this is the OP")
     
  }
  
  
  clearDisplay = () => {
    this.displayFunction('0');
    this.acc = '';
    this.currentNumber = '';
    this.flagNewNumber = false;
    this.operator = '';
    
  }
  
  
  calculate = () =>{
  ///make new equal function - operator handle- ready for operation to call equals. Calculate function value in this.this.this.this.this.this.acculator perform the operation in operator variable on current 
  //value 
    let op1 = parseFloat(this.acc);
    let op2 = parseFloat(this.currentNumber);
    switch(this.operator) {
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
        this.result = Math.round(10000 * op1 / op2) /10000
        this.displayFunction(this.result);
        break;
      default:
        alert("Invalid Op '" + this.operator + "'")
    }
    this.acc = '';
      this.currentNumber = this.result

      console.log(` flag ${this.flagNewNumber}`);
      console.log(` current ${this.currentNumber}`);
      console.log(` acc ${this.acc}`);
      console.log(`operator  ${this.operator}`);
      console.log("this is the cal")
    
   // Clear Operator and set Current Number to result
   
  }
  // equalFunction = () => {
  //   debugger;
  //   this.flagNewNumber = true
  //   this.calculate();
  // }

  handleNumber = (number) =>{
    if(this.flagNewNumber) {
      this.acc = this.currentNumber
      this.currentNumber = '' +  number;
      this.flagNewNumber = false;
      console.log(` flag ${this.flagNewNumber}`);
      console.log(` current ${this.currentNumber}`);
      console.log(` acc ${this.acc}`);
      console.log(`operator  ${this.operator}`);
      console.log("this is the # acc handle")                                                             //if . then true
                                                                                                          // if no decimal then false
    } else { 
      if(number !== 0 && number !== '.' || (number === 0 && this.state.display.charAt(0) !== '0' && this.currentNumber.indexOf('.') === -1)
        || (number === 0 && this.currentNumber.indexOf('.') > -1) 
        || (number === '.' && this.currentNumber.indexOf('.') === -1)
      
      )
        this.currentNumber += number;
    }
    console.log(this.currentNumber);
    this.displayFunction(this.currentNumber); 
    console.log(` flag ${this.flagNewNumber}`);
      console.log(` current ${this.currentNumber}`);
      console.log(` acc ${this.acc}`);
      console.log(`operator  ${this.operator}`);
      console.log("this is the CN handle")
  
  }
  
  
  displayFunction = (input) => {
    this.setState(()=>({display:this.state.display = input}));
  };

render(){
  return (
    <div>
  <div className="container">
  <div className="item item-header" id="display">{this.state.display}</div>
  <button className="btn silver" id="clear" onClick={this.clearDisplay}>C</button>
  <button className="btn silver">+/-</button>
  <button className="btn silver">%</button>
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
  <button className="btn">11</button>
  <button className="btn" id="decimal" onClick={() => this.handleNumber('.')}>.</button>
  <button className="btn orange" id="equals" onClick={() => this.calculate()}>=</button>
  
</div>
  </div>
  )};
};
 

  ReactDOM.render(<App/>, document.getElementById('app'));
  
