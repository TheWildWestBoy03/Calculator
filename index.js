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
let productResult = '', storeResult = 0;
let lastTerm = '';
let clickedOperator = false, reverseOperator = '', secondRankOperator = '', pressedEqual = false;
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
            if(pressedEqual === false)
                firstTerm = realTimeTerm;
            else {
                firstTerm = result;
            }
            
            firstOperator = realTimeOperator;
            console.log(`first term is ${firstTerm}`);
            result = parseFloat(firstTerm);
        }
        else if (counter == 2) {
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;
            if (firstRankOperators.includes(secondOperator)) {
                if (secondRankOperators.includes(firstOperator)) {
                    productResult = parseFloat(secondTerm);
                    console.log(`Initial productResult is ${productResult} and last result is ${result}`);
                    secondRankOperator = firstOperator;
                    console.log('trebuie sa rezolvam operatiile de rank superior');
                }
                else {
                    operation(secondTerm, firstOperator);
                }
            }
            else {
                operation(secondTerm, firstOperator);
            }
            
        }
        else {
            firstTerm = secondTerm;
            firstOperator = secondOperator;
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;

            if (firstRankOperators.includes(secondOperator)) {
                if(firstRankOperators.includes(firstOperator)) {
                    if(secondRankOperator !== '') {
                        storeResult = result;
                        operation(secondTerm, firstOperator);
                        result = storeResult;
                        console.log(`productResult is ${productResult} so far and result should not change ${result}`);
                    }
                    else {
                        operation(secondTerm, firstOperator);
                    }
                }
            }
            if(firstRankOperators.includes(firstOperator)) {
                if(secondRankOperators.includes(secondOperator)){
                    storeResult = result;
                    operation(secondTerm, firstOperator);
                    result = storeResult;
                    console.log(`result is ${result} and productResult is ${productResult}`);
                    operation(productResult, secondRankOperator);
                    productResult = 0;
                    console.log(`final result is ${result}`);
                    console.log('iesim din sir');
                    secondRankOperator = '';
                }
            }
            if (secondRankOperators.includes(firstOperator)) {
                if(firstRankOperators.includes(secondOperator)) {
                    productResult = 1;
                    secondRankOperator = firstOperator;
                    storeResult = result;
                    operation(secondTerm, secondOperator);
                    result = storeResult;
                }
            }
            if(secondRankOperators.includes(firstOperator)) {
                if(secondRankOperator.includes(secondOperator)){
                    operation(secondTerm, firstOperator);
                }
            }
            
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
    console.log(result);
    pressedEqual = true;
    if (counter) {
        console.log(firstRankOperators.includes(realTimeOperator));
        if(firstRankOperators.includes(realTimeOperator) && productResult !== '') {
            storeResult = result;
            operation(realTimeTerm, realTimeOperator);
            result = storeResult;
            operation(productResult, secondRankOperator);
            productResult = '';
        }
        else {
            operation(realTimeTerm, realTimeOperator);
        }
    }
    secondRankOperator = '';
    textarea.textContent = result;

    console.log(result);
    // if (realTimeOperator === '+') reverseOperator = '-';
    // if (realTimeOperator === '-') reverseOperator = '+';
    // if (realTimeOperator === 'x') reverseOperator = '/';
    // if (realTimeOperator === '/') reverseOperator = 'x';
    // operation(realTimeTerm, reverseOperator);

    counter = 0;
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
            productResult = productResult / parseFloat(first);
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
    pressedEqual = false;
    clickedOperator = false;
}