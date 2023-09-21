const digitsBtns = document.querySelectorAll('.main-btn');
const operatorsBtns = document.querySelectorAll('.main-op-btn');
const textarea = document.getElementById('calculus-textarea');
const delBtn = document.querySelector('.del-btn');
const resetBtn = document.querySelector('.C');
const equalBtn = document.querySelector('.equal');
const piece = document.querySelectorAll('.piece');

const firstRankOperators = ['x', '/'];
const secondRankOperators = ['+', '-'];
const letterKeys = "abcdefghijklmnopqrstuvwxyz";

let firstTerm = '', secondTerm = '', realTimeTerm = '';
let firstOperator = '', secondOperator = '', realTimeOperator = '';
let productResult = 1, divideResult = 1, storeResult = 0;
let lastTerm = '';
let clickedOperator = false, reverseOperator = '';
let result = 0;
let counter = 0;
textarea.textContent === '';

for (let j = 0; j < piece.length; j++) {
    piece[j].addEventListener('click', verifyKeys);
}

function verifyKeys() {
    for (let i = 0; i < textarea.textContent.length; i++) {
        if (letterKeys.includes(textarea.textContent[i])) {
            alert('you inserted wrong keys');
            textarea.textContent = '';
            break;
        }
    }
}

//creating numbers 

for (let i = 0; i < digitsBtns.length; i++) {
    digitsBtns[i].addEventListener('click', (event) => {
        clickedOperator = false;
        if (textarea.textContent === "0") {
            realTimeTerm = digitsBtns[i].textContent;
        }
        else {
            realTimeTerm += digitsBtns[i].textContent;
        }
        textarea.textContent = realTimeTerm;
    })
}
for (let i = 0; i < operatorsBtns.length; i++) {

    if (operatorsBtns[i].textContent === 'C') {
        continue;
    }

    operatorsBtns[i].addEventListener('click', () => {
        counter++;
        if (clickedOperator === true || realTimeTerm === '') {
            alert('abusive clicking! push the C button in order to reset the calculator');
        }
        else {
            clickedOperator = true;
        }
        realTimeOperator = operatorsBtns[i].textContent;

        if (counter == 1) {
            firstTerm = realTimeTerm;
            firstOperator = realTimeOperator;
            result = parseFloat(firstTerm);
        }
        else if (counter == 2) {
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;
            if (firstRankOperators.includes(secondOperator)) {
                if (secondRankOperators.includes(firstOperator)) {
                    storeResult = result;
                    productResult = secondTerm;
                    result = storeResult;
                }
            }
            operation(secondTerm, firstOperator);
        }
        else {

            if (firstRankOperators.includes(secondOperator)) {
                if (secondRankOperators.includes(firstOperator)) {
                    //         firstRankResult = operation(secondTerm, realTimeTerm, secondOperator);
                    //         secondOperator = realTimeOperator;
                    //     }
                    // }
                    // if(firstRankOperators.includes(firstOperator) && firstRankOperators.includes(secondOperator)) {
                    //     result = operation(firstTerm, secondTerm, firstOperator);
                    //     result = operation(result, realTimeTerm, secondOperator);
                    // 
                }
            }
            firstTerm = secondTerm;
            firstOperator = secondOperator;
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;
            operation(secondTerm, firstOperator);
        }
        realTimeTerm = '';
        // console.log('firstTerm = ', firstTerm , 'secondTerm = ', secondTerm);
        // console.log('firstOperator = ', firstOperator , 'secondOperator = ', secondOperator);
        // console.log(`Real time result is ${result} and counter is ${counter}`);
    })
}

delBtn.addEventListener('click', () => {
    console.log(result);
    result = result.toString();
    if (result.length === 1) {
        result = "";
    }
    else {
        result = result.slice(0, -1);
    }
    textarea.textContent = result;
})

resetBtn.addEventListener('click', reset);

equalBtn.addEventListener('click', (e) => {
    if (counter) {
        operation(realTimeTerm, realTimeOperator);
    }
    textarea.textContent = result;

    if (realTimeOperator === '+') reverseOperator = '-';
    if (realTimeOperator === '-') reverseOperator = '+';
    if (realTimeOperator === 'x') reverseOperator = '/';
    if (realTimeOperator === '/') reverseOperator = 'x';

    operation(realTimeTerm, reverseOperator);
})


function operation(first, operator) {
    switch (operator) {
        case '+':

            result += parseFloat(first);
            break;
        case '-':

            result -= parseFloat(first);
            break;
        case 'x':

            result = result * parseFloat(first);
            productResult = productResult * parseFloat(first);
            break;
        case '/':

            result /= parseFloat(first);
            divideResult = divideResult / parseFloat(first);
            break;
        default:
            break;
    }
}

function reset() {
    textarea.textContent = '';
    result = 0;
    realTimeTerm = '';
    realTimeOperator = '';
    firstTerm = '';
    secondTerm = '';
    firstOperator = '';
    secondOperator = '';
    counter = 0;
}