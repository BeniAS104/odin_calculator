const previousScreen = document.querySelector('.previous');
const currentScreen = document.querySelector('.current');
const clearButton = document.querySelector('.clear');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percent');
const equalButton = document.querySelector('.equal');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace'); 

let operator = '';
let previousValue = '';
let currentValue = '0';

// handle numbers being clicked
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        handleNumber(button.textContent);
        currentScreen.textContent = currentValue;
    });
    
});

function handleNumber(number) {
    if (currentValue === '0' || currentValue === '') {
        currentValue = number;
    } else {
        currentValue += number;
    }
}

// handle operators 
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        handleOperator(button.textContent);
        previousScreen.textContent = `${previousValue} ${operator}`;
        currentScreen.textContent = currentValue;
    });
});

function handleOperator(op) {
    if (currentValue === '') return;
    if (previousValue !== '') {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
    }
    currentValue = result.toString();
    currentScreen.textContent = currentValue;
    previousValue = '';
    previousScreen.textContent = '';
    operator = '';
}


// function button handlers section


// handle equal button
equalButton.addEventListener('click', () => {
  if (currentValue === '' || previousValue === '') return;
  calculate();
 
});

// handle clear button 
clearButton.addEventListener('click', () => {
    previousValue = '';
    currentValue = '0';
    operator = '';
    previousScreen.textContent = '';
    currentScreen.textContent = currentValue;
});

// handle +/- button
signButton.addEventListener('click', () => {
    currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : `-${currentValue}`;
    currentScreen.textContent = currentValue;
});

// handle % button
percentButton.addEventListener('click', () => {
    currentValue = (parseFloat(currentValue) / 100).toString();
    currentScreen.textContent = currentValue;
});


// handle decimal (.) button
decimalButton.addEventListener('click', () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        currentScreen.textContent = currentValue;
    }
});

// handle backspace button
backspaceButton.addEventListener('click', () => {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1); // Remove the last character
    } else {
        currentValue = '0'; 
    }
    currentScreen.textContent = currentValue;
});
