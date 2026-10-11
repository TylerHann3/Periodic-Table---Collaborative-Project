const calculator = document.getElementById('calculator');
const toggleButton = document.getElementById('calculator-toggle');
const resultDisplay = document.getElementById('display');
const keys = document.getElementById('keys');

let expression = '';
let lastResult = null;

function formatExpression(value) {
    return value.replaceAll('*', '×').replaceAll('/', '÷').replaceAll('sqrt(', '√(');
}

function formatNumber(value) {
    if (!Number.isFinite(value)) throw new Error('Math error');
    return Number(value.toPrecision(12)).toString();
}

// This function takes in the expression and calculates it, while also checking for errors and stuff
function calculateExpression(source) {
    const input = source.replace(/\s/g, '');
    const tokens = input.match(/sqrt|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|[()+\-*/^]/g) || [];
    if (!input || tokens.join('') !== input) throw new Error('Invalid expression');

    let position = 0;
    const peek = () => tokens[position];
    const take = () => tokens[position++];
    // this function does bracket stuff and square root stuff while also checking for the errors if the stuff was misinputted
    function primary() {
        const token = take();
        if (token === '(' || token === 'sqrt') {
            if (token === 'sqrt' && take() !== '(') throw new Error('Invalid square root');
            const value = addition();
            if (take() !== ')') throw new Error('Missing closing bracket');
            if (token === 'sqrt') {
                if (value < 0) throw new Error('Invalid square root');
                return Math.sqrt(value);
            }
            return value;
        }
        if (token === undefined) throw new Error('Incomplete expression');
        const value = Number(token);
        if (!Number.isFinite(value)) throw new Error('Invalid number');
        return value;
    }
    // this function handles exponentiation, allowing for equations like 2^3 (if needed of course)
    function power() {
        const value = primary();
        return peek() === '^' ? (take(), value ** unary()) : value;
    }
    // this function handles unary operators, allowing for stuff and numbers like -5 or +3 cuz negatives are a thing
    function unary() {
        if (peek() === '+') return (take(), unary());
        if (peek() === '-') return (take(), -unary());
        return power();
    }
    // bro this is just multiplication  and division bro i dont need to explain this
    function multiplication() {
        let value = unary();
        while (peek() === '*' || peek() === '/' || peek() === '(' || /^\d|\./.test(peek() || '')) {
            const operator = peek();
            if (operator === '*' || operator === '/') take();
            const right = unary();
            if (operator === '/' && right === 0) throw new Error('Cannot divide by zero');
            value = operator === '/' ? value / right : value * right;
        }
        return value;
    }
    // plus and minus 
    function addition() {
        let value = multiplication();
        while (peek() === '+' || peek() === '-') {
            const operator = take();
            const right = multiplication();
            value = operator === '+' ? value + right : value - right;
        }
        return value;
    }

    const result = addition();
    if (position !== tokens.length) throw new Error('Invalid expression');
    return result;
}
// this function shows the whats been inputted into the display and if theres nothing it shows 0
function showExpression() {
    resultDisplay.textContent = expression ? formatExpression(expression) : '0';
}
// clears the display
function clearDisplay() {
    expression = '';
    lastResult = null;
    showExpression();
}
// this function appends the inputted value to the display and if theres a last result it formats it and shows it
function appendToDisplay(value) {
    if (lastResult !== null) {
        expression = /^[+\-*/^]$/.test(value) || value === '^2'
            ? formatNumber(lastResult)
            : '';
        lastResult = null;
    }
    expression += value;
    showExpression();
}
// this function does the backspace button (removes the last character/number) and if theres no last character it clears the display
function backspace() {
    if (lastResult !== null) {
        clearDisplay();
        return;
    }
    expression = expression.slice(0, -1);
    showExpression();
}
// this function calculates the numbers the user inputs and if theres an error it shows the error message
function calculate() {
    try {
        lastResult = calculateExpression(expression);
        resultDisplay.textContent = formatNumber(lastResult);
    } catch (error) {
        lastResult = null;
        resultDisplay.textContent = error.message;
    }
}
// this function closes the calculator and shows the button to respawn it
function closeCalculator() {
    calculator.hidden = true;
    toggleButton.hidden = false;
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.focus();
}

toggleButton.addEventListener('click', () => {
    calculator.hidden = false;
    toggleButton.hidden = true;
    toggleButton.setAttribute('aria-expanded', 'true');
});

document.getElementById('calculator-close').addEventListener('click', closeCalculator);

keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const { action, value } = button.dataset;
    if (action === 'calculate') calculate();
    else if (action === 'clear') clearDisplay();
    else if (action === 'backspace') backspace();
    else if (value !== undefined) appendToDisplay(value);
});

document.addEventListener('keydown', (event) => {
    if (calculator.hidden) return;
    if (event.key === 'Escape') closeCalculator();
    else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Backspace') backspace();
    else if (event.key === 'Delete') clearDisplay();
    else if (/^[0-9.+\-*/^()]$/.test(event.key)) appendToDisplay(event.key);
});