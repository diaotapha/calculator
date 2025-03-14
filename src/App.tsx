import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [previousOperand, setPreviousOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('0');
  const [operation, setOperation] = useState('');

  const clear = () => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation('');
  };

  const deleteNumber = () => {
    if (currentOperand === '0') return;
    const newNumber = currentOperand.slice(0, -1);
    setCurrentOperand(newNumber === '' ? '0' : newNumber);
  };

  const appendNumber = (number: string) => {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  };

  const chooseOperation = (op: string) => {
    if (currentOperand === '0') return;
    if (previousOperand !== '') {
      compute();
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('0');
  };

  const compute = () => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '%':
        computation = (prev * current) / 100;
        break;
      default:
        return;
    }

    setCurrentOperand(computation.toString());
    setOperation('');
    setPreviousOperand('');
  };

  const handleKeyboardInput = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
      appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
      chooseOperation(e.key);
    } else if (e.key === '*') {
      chooseOperation('×');
    } else if (e.key === '/') {
      e.preventDefault();
      chooseOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      compute();
    } else if (e.key === 'Backspace') {
      deleteNumber();
    } else if (e.key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [currentOperand, previousOperand, operation]);

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <div className="buttons-grid">
          <button className="button clear span-two" onClick={clear}>AC</button>
          <button className="button delete" onClick={deleteNumber}>DEL</button>
          <button className="button operator" onClick={() => chooseOperation('÷')}>÷</button>
          <button className="button" onClick={() => appendNumber('7')}>7</button>
          <button className="button" onClick={() => appendNumber('8')}>8</button>
          <button className="button" onClick={() => appendNumber('9')}>9</button>
          <button className="button operator" onClick={() => chooseOperation('×')}>×</button>
          <button className="button" onClick={() => appendNumber('4')}>4</button>
          <button className="button" onClick={() => appendNumber('5')}>5</button>
          <button className="button" onClick={() => appendNumber('6')}>6</button>
          <button className="button operator" onClick={() => chooseOperation('-')}>-</button>
          <button className="button" onClick={() => appendNumber('1')}>1</button>
          <button className="button" onClick={() => appendNumber('2')}>2</button>
          <button className="button" onClick={() => appendNumber('3')}>3</button>
          <button className="button operator" onClick={() => chooseOperation('+')}>+</button>
          <button className="button" onClick={() => appendNumber('0')}>0</button>
          <button className="button" onClick={() => appendNumber('.')}>.</button>
          <button className="button operator" onClick={() => chooseOperation('%')}>%</button>
          <button className="button equals" onClick={compute}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
