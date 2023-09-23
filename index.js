const digitsBtns = document.querySelectorAll('.main-btn');
const operatorsBtns = document.querySelectorAll('.main-op-btn');
const textarea = document.getElementById('calculus-textarea');
const btns = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.C');
const equalBtn = document.querySelector('.equal');
const delBtn = document.querySelector('.del-btn');
const piece = document.querySelectorAll('.piece');
const test = document.querySelector('.test');
const body = document.body;
const digitsContainer = document.querySelector('.digits-container');
const firstRankOperators = ['x', '/'];
const secondRankOperators = ['+', '-'];

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '/', '%', '+/-'];

let firstTerm = '', secondTerm = '', realTimeTerm = '';
let firstOperator = '', secondOperator = '', realTimeOperator = '';
let productResult = '', storeResult = 0;
let clickedOperator = false, reverseOperator = '', secondRankOperator = '', pressedEqual = false;
let result = 0, modified = 0;
let counter = 0, bracketsCounter = 0;
textarea.textContent === '';

for (let i = 0; i < piece.length; i++) {
    piece[i].addEventListener('click', start);
}

for(let i=0; i<btns.length; i++) {
    btns[i].addEventListener('click', otherFunctionalities);
}

function otherFunctionalities(e) {
    if(e.currentTarget.classList.contains('del-btn')) {
        deleteCharacters();
    }
    if(e.currentTarget.children[0].classList.contains('ri-time-line')) {
        digitsContainer.classList.toggle('digits-container-disappearing');
    }
}

function start(e) {
    if (digits.includes(e.currentTarget.textContent) || e.currentTarget.textContent === '.') {
        createAndDisplayNums(e);
    }
    
    if (operators.includes(e.currentTarget.textContent)) {
        if(e.currentTarget.textContent === '%') {
            let newNumber = '0.' + result;
            newNumber = parseFloat(newNumber).toFixed(5);
            textarea.value = newNumber;
            result = newNumber;
        }
        if(e.currentTarget.textContent === '+/-') {
            let newNumber = textarea.value;
            newNumber = parseFloat(newNumber) * (-1);
            console.log(newNumber);
            result = newNumber;
            textarea.value = result;
            clickedOperator = false;
            counter = 0;
        }
        else
            calculator(e);
    }
    if (e.currentTarget.textContent === 'C') {
        reset();
    }
    if (e.currentTarget.textContent === '=') {
        equality();
    }
}

function createAndDisplayNums(e) {
    // verifyKeys();
    clickedOperator = false;
    if (textarea.textContent === "0") {
        realTimeTerm = e.currentTarget.textContent;
    }
    else {
        realTimeTerm += e.currentTarget.textContent;
    }
    textarea.value = realTimeTerm;
}

function calculator(e) {
    counter++;
    if (clickedOperator === true || realTimeTerm === '') {
        alert('abusive clicking! push the C button in order to reset the calculator');
    }
    else {
        clickedOperator = true;
    }
    realTimeOperator = e.currentTarget.textContent;
    switch(counter) {
        case 1 :
            if (pressedEqual === false){
                firstTerm = realTimeTerm;
            }
            else {
                firstTerm = result;
            }
            productResult = '';
            firstOperator = realTimeOperator;
            result = parseFloat(firstTerm);
            break;
        
        case 2:
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;
            if (firstRankOperators.includes(secondOperator)) {
                if (secondRankOperators.includes(firstOperator)) {
                    productResult = parseFloat(secondTerm);
                    secondRankOperator = firstOperator;
                }
                else {
                    operation(secondTerm, firstOperator);
                }
            }
            else {
                operation(secondTerm, firstOperator);
            }
            break;

        default:
            firstTerm = secondTerm;
            firstOperator = secondOperator;
            secondTerm = realTimeTerm;
            secondOperator = realTimeOperator;

            if (firstRankOperators.includes(secondOperator)) {
                if (firstRankOperators.includes(firstOperator)) {
                    if (secondRankOperator !== '') {
                        storeResult = result;
                        operation(secondTerm, firstOperator);
                        result = storeResult;
                    }
                    else {
                        operation(secondTerm, firstOperator);
                    }
                }
            }
            if (firstRankOperators.includes(firstOperator)) {
                if (secondRankOperators.includes(secondOperator)) {
                    storeResult = result;
                    operation(secondTerm, firstOperator);
                    result = storeResult;
                    operation(productResult, secondRankOperator);
                    productResult = 0;
                    secondRankOperator = '';
                }
            }
            if (secondRankOperators.includes(firstOperator)) {
                if (firstRankOperators.includes(secondOperator)) {
                    productResult = 1;
                    secondRankOperator = firstOperator;
                    storeResult = result;
                    operation(secondTerm, secondOperator);
                    result = storeResult;
                }
            }
            if (secondRankOperators.includes(firstOperator)) {
                if (secondRankOperators.includes(secondOperator)) {
                    operation(secondTerm, firstOperator);
                }
            }
            break;
    }
    realTimeTerm = '';
}

function deleteCharacters() {
    let itemToDelete = textarea.value;
    if (itemToDelete.length === 1) {
        itemToDelete = "";
    }
    else {
        itemToDelete = itemToDelete.slice(0, -1);
    }
    textarea.value = itemToDelete;
    result = parseFloat(itemToDelete);
}

function equality() {
    if(realTimeOperator === '') {
        result = parseFloat(realTimeTerm).toFixed(5);
        textarea.value = result;
        counter = 0;
        return;
    }
    pressedEqual = true;
    if (counter) {
        if (firstRankOperators.includes(realTimeOperator) && productResult !== '') {
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
    textarea.value = parseFloat(result).toFixed(5);
    counter = 0;
}

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
            if (typeof (productResult) !== 'string')
                productResult = productResult * parseFloat(first);
            break;
        case '/':

            result /= parseFloat(first);
            if (typeof (productResult) !== 'string')
                productResult = productResult / parseFloat(first);
            break;
        default:
            break;
    }
}

function reset() {
    textarea.value = '';
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
