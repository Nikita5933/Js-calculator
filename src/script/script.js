'use strict';

const keyboard = document.querySelector('[data-keyboard]');
const outputMain = document.querySelector('[data-input="second"]');
const outputSecond = document.querySelector('[data-input="first"]');
const output = document.querySelector('.output');
let sqrRes;
let sqrtRes;
let result = 0;
let memoryRes = 0;
let opFlag = false;
let equalFlag = false;
let dotFlag = false;
let sqFlag = false;
let sqrtFlag = false;
let memoryFlag = false;

function round(num, decimalPlaces = 0) {
    if (num < 0)
        return -round(-num, decimalPlaces);
    const p = Math.pow(10, decimalPlaces);
    const n = num * p;
    const f = n - Math.floor(n);
    const e = Number.EPSILON * n;
    resizer(output,outputMain);
    if (f >= .5 - e) {
        if ((Math.ceil(n) / p) >= 99999999999999) {
            return (Math.ceil(n) / p).toExponential(6);
        }
        return Math.ceil(n) / p;
    }
    return (Math.floor(n) / p);
}
function resetFunction() {
    outputMain.value = 0;
    outputSecond.value = 0;
    result = 0;
    opFlag = false;
    equalFlag = false;
    dotFlag = false;
    sqFlag = false;
    sqrtFlag = false;
}

function minusError() {
    if (result < 0) {
        resetFunction();
        outputMain.value = 'Minus error';
        return;
    }
}

function resizer(output,screen) {
    if (screen.value.length > 11) output.classList.add('number14');
    if (screen.value.length > 13) output.classList.add('number16');
    screen.value = screen.value.substring(0, 16);
    if (screen.value.length < 13) output.classList.remove('number14');
    if (screen.value.length < 15) output.classList.remove('number16');
    if (opFlag && !equalFlag) {
        output.classList.remove('number14')
        output.classList.remove('number16')
    }
}

keyboard.addEventListener('click', (e) => {
    const target = e.target;
    if (outputMain.value === 'Minus error') {
        outputMain.value = 0;
    }
    if (target.dataset.type === 'number') {
        if (dotFlag && !opFlag) {
            outputMain.value += target.dataset.marker;
            equalFlag = false;
            opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = target.dataset.marker;
            if (outputSecond.value.includes('=')) {
                outputSecond.value = 0;
                result = 0;
                sqrRes = 0;
                sqrtRes = 0;
            }
        } else if (outputMain.value != 0) {
            outputMain.value += target.dataset.marker;
        }
    } else if (target.dataset.type === 'memory') {
        if (target.dataset.marker === "mPlus") {
            if (outputSecond.value.includes('=') || outputSecond.value.includes('sqr') || outputSecond.value.includes('√')) {
                outputSecond.value = 0;
                equalFlag = false;
            }
            memoryFlag = true;
            memoryRes += +outputMain.value;
            document.querySelector('[data-marker="mResult"]').classList.remove('blur');
            document.querySelector('[data-marker="mReset"]').classList.remove('blur');
            opFlag = true;
            equalFlag = true;
            dotFlag = true;
        } else if (target.dataset.marker === "mMinus") {
            if (outputSecond.value.includes('=') || outputSecond.value.includes('sqr') || outputSecond.value.includes('√')) {
                outputSecond.value = 0;
                equalFlag = false;
            }
            memoryFlag = true;
            memoryRes -= +outputMain.value;
            document.querySelector('[data-marker="mResult"]').classList.remove('blur');
            document.querySelector('[data-marker="mReset"]').classList.remove('blur');
            opFlag = true;
            equalFlag = true;
        } else if (target.dataset.marker === "mReset") {
            memoryRes = 0;
            memoryFlag = false;
            opFlag = true;
            equalFlag = true;
            memoryFlag = false;
            document.querySelector('[data-marker="mResult"]').classList.add('blur');
            document.querySelector('[data-marker="mReset"]').classList.add('blur');
        } else if (target.dataset.marker === "mResult") {
            outputMain.value = round(memoryRes,12);
            result = memoryRes;
            opFlag = true;
            equalFlag = true;
        }
    } else if (target.dataset.type === 'reset') {
        if (target.dataset.marker === "resetAll") {
            resetFunction();
            memoryRes = 0;
            document.querySelector('[data-marker="mResult"]').classList.add('blur');
            document.querySelector('[data-marker="mReset"]').classList.add('blur');
            memoryFlag = false;
        } else if (target.dataset.marker === "reset") {
           resetFunction();
        } else if (target.dataset.marker === "del") {
            if (outputMain.value.length == 1) {
                outputMain.value = 0;
                } else if (equalFlag) {
                    outputMain.value = 0;
                    outputSecond.value = 0;
                    result = 0;
                    equalFlag = false;
                } else {
                    outputMain.value = outputMain.value.substring(0, outputMain.value.length - 1);
                }
        }
    } else if (target.dataset.type === 'dot') {
    dotFlag = true;
    if (outputMain.value == 0 && !outputMain.value.match(/\./gm)) {
        outputMain.value += '.';
    } else if (sqFlag || sqrtFlag || !outputMain.value.match(/\./gm) && equalFlag && opFlag || memoryFlag) {
        equalFlag = false;
        opFlag = false;
        sqFlag = false;
        sqrtFlag = false;
        outputMain.value = '0.';
    } else if (result != 0 && opFlag && equalFlag) {
        opFlag = false;
        outputMain.value = '0.';
    } else if (!equalFlag && !opFlag && !outputMain.value.match(/\./gm)) {
        outputMain.value += '.';  
    } else if (equalFlag && !opFlag && !outputMain.value.match(/\./gm)) {
        resetFunction();
        dotFlag = true;
        outputMain.value = '0.';
    }
    } else if (target.dataset.type === 'function') {
        if (target.dataset.marker === "division") {
            if (result < 0) {
                minusError();
                return;
            }
            opFlag = true;
            if (memoryFlag && result == 0) result = +outputMain.value;
            if (!equalFlag) {
                if (outputSecond.value == 0) {
                    outputSecond.value = +outputMain.value;
                    result = +outputMain.value;      
                    equalFlag = true;
                    sqFlag = false;
                    sqrtFlag = false;
                    outputSecond.value = round(result,12);
                    outputMain.value = round(result,12);
                    outputSecond.value += ' / ';
                    outputMain.focus();
                    return;
                }
                if (outputSecond.value.includes('*')) {
                    result *= +outputMain.value;
                    result *= +outputMain.value;
                }
                if (outputSecond.value.includes('-')) {
                    result -= +outputMain.value;
                    result *= +outputMain.value;
                }
                if (outputSecond.value.includes(' + ')) {
                    result += +outputMain.value;
                    result *= +outputMain.value ;
                }
                result = result == 0 ? +outputMain.value : result /= +outputMain.value;
            }
            equalFlag = true;
            sqFlag = false;
            sqrtFlag = false;
            outputSecond.value = round(result,12);
            outputMain.value = round(result,12);
            outputSecond.value += ' / ';
        } else if (target.dataset.marker === "percentage") {
            if (result < 0) {
                minusError();
                return;
            }
            if (outputSecond.value.includes('=')) {
                let t = +outputMain.value;
                resetFunction();
                outputMain.value =  round(((t / 100) * t),2);
                opFlag = true;
                return;
            }
            outputMain.value =  round(((+outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[0] / 100) * +outputMain.value),2);
        } else if (target.dataset.marker === "squareRoot") {
            if (result < 0) {
                minusError();
                return;
            }
            if (outputSecond.value == '0') {
                sqrtFlag = true;
                outputSecond.value = `√(${outputMain.value})`;
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                return;
            }
            if (outputSecond.value.includes('=')) {
                let t = result;
                resetFunction();
                sqFlag = true;
                outputSecond.value = `√(${t})`;
                outputMain.value = round(Math.sqrt(t, 2),6);
                return;
            }
            if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.|]+)/gm)[1][1]} √(${outputSecond.value.split(/([^\d|.|]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.|]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
                return;
            }
            if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]}${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
                return; 
            }
            sqrtFlag = true;
            if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
                if (outputSecond.value.includes('sqr')) {
                    outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                    outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]}${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}${outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]}))`;
                    return;
                }
                outputSecond.value += `√(${outputMain.value})`;
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                return;
            }
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            outputSecond.value = `√(${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
        } else if (target.dataset.marker === "square") {
            if (result < 0) {
                minusError();
                return;
            }
            if (outputSecond.value == '0') {
                sqFlag = true;
                outputSecond.value = `sqr(${outputMain.value})`;
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                return;
            }
            if (outputSecond.value.includes('=')) {
                let t = result;
                resetFunction();
                sqFlag = true;
                outputSecond.value = `sqr(${t})`;
                outputMain.value = round(Math.pow(t, 2),6);
                return;
            }
            if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.|]+)/gm)[1][1]} sqr(${outputSecond.value.split(/([^\d|.|]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.|]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
                return;
            }
            if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);;
                outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]}${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}sqr(${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
                return; 
            }
            sqFlag = true;
            if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputSecond.value += `sqr(${outputMain.value})`;
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                return
            }
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);
            outputSecond.value = `sqr(${outputSecond.value.split(/([^\d|.|]+)/gm)[1]}${outputSecond.value.split(/([^\d|.|]+)/gm)[2]}${outputSecond.value.split(/([^\d|.|]+)/gm)[3]})`;
        } else if (target.dataset.marker === "multiplication") {
            if (result < 0) {
                minusError();
                return;
            }
            opFlag = true;
            if (memoryFlag && result == 0) result = +outputMain.value;
            if (!equalFlag) {
                if (outputSecond.value == 0) {
                    outputSecond.value = +outputMain.value;
                    result = +outputMain.value;      
                    equalFlag = true;
                    sqFlag = false;
                    sqrtFlag = false;
                    outputSecond.value = round(result,12);
                    outputMain.value = round(result,12);
                    outputSecond.value += ' * ';
                    outputMain.focus();
                    return;
                }
                if (outputSecond.value.includes('/')) {
                    result /= +outputMain.value;
                    result /= +outputMain.value;
                }
                if (outputSecond.value.includes('-')) {
                    result -= +outputMain.value;
                    result /= +outputMain.value;
                }
                if (outputSecond.value.includes(' + ')) {
                    result += +outputMain.value;
                    result /= +outputMain.value ;
                }
                result = result == 0 ? 1 * +outputMain.value : result *= +outputMain.value;
                
            }
            equalFlag = true;
            sqFlag = false;
            sqrtFlag = false;
            outputSecond.value = round(result,12);
            outputMain.value = round(result,12);
            outputSecond.value += ' * ';
        } else if (target.dataset.marker === "addition") {
            if (result < 0) {
                minusError();
                return;
            }
            opFlag = true;
            if (memoryFlag && result == 0) result = +outputMain.value;
            if (!equalFlag) {
                if (outputSecond.value == 0) {
                    outputSecond.value = +outputMain.value;
                }
                if (outputSecond.value.includes('*')) {
                    result *= +outputMain.value;
                    result -= +outputMain.value;
                }
                if (outputSecond.value.includes('/')) {
                    result /= +outputMain.value;
                    result -= +outputMain.value;
                }
                if (outputSecond.value.includes('-')) {
                    result -= +outputMain.value * 2;
                }
                result += +outputMain.value;
            } 
            equalFlag = true;
            sqFlag = false;
            sqrtFlag = false;
            outputSecond.value = round(result,12);
            outputMain.value = round(result,12);
            outputSecond.value += ' + ';
        } else if (target.dataset.marker === "subtraction") {
            if (result < 0) {
                minusError();
                return;
            }
            opFlag = true;
            if (memoryFlag && result == 0) result = +outputMain.value;
            if (!equalFlag) {
                if (outputSecond.value == 0) {
                    outputSecond.value = +outputMain.value;
                    result = +outputMain.value;      
                    equalFlag = true;
                    sqFlag = false;
                    sqrtFlag = false;
                    outputSecond.value = round(result,12);
                    outputMain.value = round(result,12);
                    outputSecond.value += ' - ';
                    outputMain.focus();
                    return;
                }
                if (outputSecond.value.includes('*')) {
                    result *= +outputMain.value;
                    result += +outputMain.value;
                }
                if (outputSecond.value.includes('/')) {
                    result /= +outputMain.value;
                    result += +outputMain.value;
                }
                if (outputSecond.value.includes(' + ')) {
                    result += +outputMain.value * 2;
                }
                result = result == 0 ? +outputMain.value : result -= +outputMain.value;
            }
            equalFlag = true;
            sqFlag = false;
            sqrtFlag = false;
            outputSecond.value = round(result,12);
            outputMain.value = round(result,12);
            outputSecond.value += ' - ';
        } else if (target.dataset.marker === "calculate") {
            if ((!equalFlag && outputSecond.value != '0') || sqFlag || sqrtFlag) {
                if (outputSecond.value.includes(' + ')){
                    equalFlag = true;
                    result += +outputMain.value;
                }
                if (outputSecond.value.includes('-')) {
                    equalFlag = true;
                    result -= +outputMain.value;
                }
                if (outputSecond.value.includes('/')) {
                    equalFlag = true;
                    result /= +outputMain.value;
                }
                if (outputSecond.value.includes('*')) {
                    equalFlag = true;
                    result *= +outputMain.value;
                }
                if (outputSecond.value.includes('sqr')) {
                    if (outputSecond.value.includes('√')) {
                        if (outputSecond.value.includes('=')) {
                            outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.|]+)/gm)[1][1]} ${round(sqrRes,12)} =`;
                            equalFlag = true;
                            sqFlag = false;
                            sqrtFlag = false;
                            return;
                        }
                        if (!opFlag && result == 0) {
                            return;
                        }
                        sqrRes = +outputMain.value;
                        equalFlag = true;
                        sqrtFlag = false;
                        outputSecond.value += ' ='
                        outputMain.value = round(result,12);
                        return;
                    }
                    if (!opFlag && result == 0) {
                        return;
                    }
                    sqrRes = +outputMain.value;
                    equalFlag = true;
                    sqFlag = false;
                    outputSecond.value += ' ='
                    outputMain.value = round(result,12);
                    return;
                };
               
                if (outputSecond.value.includes('√')) {
                    if (!opFlag && result == 0) {
                        return;
                    }
                    sqrtRes = +outputMain.value;
                    equalFlag = true;
                    sqrtFlag = false;
                    outputSecond.value += ' ='
                    outputMain.value = round(result,12);
                    return;
                }
               
                outputSecond.value += +outputMain.value;
                outputSecond.value += ' ='
                outputMain.value = round(result,12);
            } else if (equalFlag) {
                if(outputSecond.value.includes('sqr')) {
                    outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrRes,6)} =`;
                    return;
                }
                if(outputSecond.value.includes('√')) { 
                    outputSecond.value = `${outputSecond.value.split(/([^\d|.|]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.|]+)/gm)[1][1]} ${round(sqrtRes,12)} =`;
                    return;
                }
                if (outputSecond.value.includes(' + ')){
                    if (opFlag) {
                        result += +outputMain.value;
                        outputSecond.value = `${round(result - outputMain.value,12)} + ${+(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result += +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2];
                    outputSecond.value = `${round((result - +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2]),12)} + ${round(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2],12)} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('-')){
                    if (opFlag) {
                        result -= +outputMain.value;
                        outputSecond.value = `${round(result + outputMain.value,12)} - ${+(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result -= +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2];
                    outputSecond.value = `${round((result + +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2]),12)} - ${round(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2],12)} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('/')){
                    if (opFlag) {
                        result /= +outputMain.value;
                        outputSecond.value = `${round(result * outputMain.value,12)} / ${+(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result /= +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2];
                    outputSecond.value = `${round((result * +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2]),12)} / ${round(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2],12)} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('*')){
                    if (opFlag) {
                        result *= +outputMain.value;
                        outputSecond.value = `${round(result / outputMain.value,12)} * ${+(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result *= +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2];
                    outputSecond.value = `${round((result / +outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2]),12)} * ${round(outputSecond.value.split(/([^\d|.|]+ | [^e])/gm)[2],12)} =`;
                    outputMain.value = round(result,12);
                }
            }
            sqrRes = 0;
            sqrtRes = 0;
        } 
    }
    outputMain.focus();
    resizer(output,outputMain);
})