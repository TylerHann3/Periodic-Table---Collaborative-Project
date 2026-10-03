const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function appendToDisplay(input) {
    display.value += input;
    display.scrollLeft = display.scrollWidth;
}
function clearDisplay() {
    display.value = '';
    display.scrollLeft = display.scrollWidth;
}
function calculate() {
    try{
        display.value = eval(display.value);
    }
    catch (error) {
        display.value = 'Error';
}
}