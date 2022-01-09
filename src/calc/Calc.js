import React, {Component} from 'react';
import Button from './components/Button'
import './styles/styles.css'

// Calc Component
class Calc extends Component{
    constructor(props){
        super(props);
        // Initializing state 
        this.state = {
            current: "0",
            previous: [],
            nextIsReset: false,
            result: ""
        }
    }

    // For clear input
    reset = () => {
        this.setState({current: "0", 
                       previous: [],
                       nextIsReset: false,
                       result: ""})
    }

    // For adding symbol and digit in input
    addToCurrent = (symbol) => {
        let {previous} = this.state;

        // for / * - +
        if(["/", "*", "-", "+"].indexOf(symbol) > -1){
          previous.push(this.state.current + symbol);
          this.setState({previous, current:"", nextIsReset: true, result: eval(String(previous.join("")).substring(0,previous.join("").length-1))});
        }else{
          // 1 digit number
          if((this.state.current == "0" && symbol !== ".") || this.state.nextIsReset){
            this.setState({current: symbol, nextIsReset: false, result: eval(String(previous.join("") + symbol))});
          }
          else{
            // 2 digit number
            this.setState({current: this.state.current + symbol, result: eval(String(previous.join("") + this.state.current + symbol))});
          }
        }
        ;
    }

    // Calculate
    calculate = (symbol) => {
      let {current, previous} = this.state;
      if(previous.length > 0){
        current = eval(String(previous.join("") + current));
        this.setState({current, previous: [], result: current, nextIsReset: false});
      }
    }

  render(){
    // Buttons
    const buttons = [
        {symbol: 'C', cols: 3, action: this.reset},
        {symbol: '/', cols: 1, action: this.addToCurrent},
        {symbol: '7', cols: 1, action: this.addToCurrent},
        {symbol: '8', cols: 1, action: this.addToCurrent},
        {symbol: '9', cols: 1, action: this.addToCurrent},
        {symbol: '*', cols: 1, action: this.addToCurrent},
        {symbol: '4', cols: 1, action: this.addToCurrent},
        {symbol: '5', cols: 1, action: this.addToCurrent},
        {symbol: '6', cols: 1, action: this.addToCurrent},
        {symbol: '-', cols: 1, action: this.addToCurrent},
        {symbol: '1', cols: 1, action: this.addToCurrent},
        {symbol: '2', cols: 1, action: this.addToCurrent},
        {symbol: '3', cols: 1, action: this.addToCurrent},
        {symbol: '+', cols: 1, action: this.addToCurrent},
        {symbol: '0', cols: 2, action: this.addToCurrent},
        {symbol: '.', cols: 1, action: this.addToCurrent},
        {symbol: '=', cols: 1, action: this.calculate},
    ]
    return (
      <div className='Calc'>
        <h2 className='heading'>BASIC CALCULATOR</h2>
        <div className="calc-result">
          {this.state.result !== "" ?
            <div className='float-previous'> Result :  {this.state.result}</div>
          : null}
          <input className='result' type='text' value={this.state.previous.length >= 1 ? String(this.state.previous.join("") + this.state.current): this.state.current}/>
        </div>
        {buttons.map((btn, i) => {
            return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}
      </div>
    )
  }
}

export default Calc;
