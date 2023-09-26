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
    return (f >= .5 - e) ? Math.ceil(n) / p : Math.floor(n) / p;
}

function resizer(output,screen) {
    if (screen.value.length > 11) output.classList.add('number14');
    if (screen.value.length > 13) output.classList.add('number16');
    if (screen.value > 9999999999999999) {
        opFlag = true;
        equalFlag = true;
        dotFlag = false;
        sqFlag = false;
        sqrtFlag = false;
        outputSecond.value = '0';
        screen.value = 'Error';
        result = 0;
        }
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
            outputMain.value = 0;
            outputSecond.value = 0;
            result = 0;
            memoryRes = 0;
            opFlag = false;
            equalFlag = false;
            dotFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            document.querySelector('[data-marker="mResult"]').classList.add('blur');
            document.querySelector('[data-marker="mReset"]').classList.add('blur');
            memoryFlag = false;
        } else if (target.dataset.marker === "reset") {
            outputMain.value = 0;
            outputSecond.value = 0;
            result = 0;
            opFlag = false;
            equalFlag = false;
            dotFlag = false;
            sqFlag = false;
            sqrtFlag = false;
        } else if (target.dataset.marker === "del") {
            if (outputMain.value.length == 1) {
                outputMain.value = 0;
                } else if (equalFlag) {
                    outputMain.value = 0;
                    outputSecond.value = 0;
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
        outputMain.value = '0.';
    }
    } else if (target.dataset.type === 'function') {
        if (target.dataset.marker === "division") {
            opFlag = true;
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
                    resizer(output,outputMain);
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
                if (outputSecond.value.includes('+')) {
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
            outputMain.value =  round(((+outputSecond.value.split(/([^\d|.]+)/gm)[0] / 100) * +outputMain.value),2);
        } else if (target.dataset.marker === "squareRoot") {
            if (outputSecond.value == '0') {
                sqrtFlag = true;
                outputSecond.value = `√(${outputMain.value})`;
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                resizer(output,outputMain);
                return;
            }
            if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} √(${outputSecond.value.split(/([^\d|.]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
                resizer(output,outputMain);
                return;
            }
            if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
                resizer(output,outputMain);
                return; 
            }
            sqrtFlag = true;
            if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
                if (outputSecond.value.includes('sqr')) {
                    outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                    outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]}))`;
                    resizer(output,outputMain);
                    return;
                }
                outputSecond.value += `√(${outputMain.value})`;
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                resizer(output,outputMain);
                return;
            }
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            outputSecond.value = `√(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
        } else if (target.dataset.marker === "square") {
            if (outputSecond.value == '0') {
                sqFlag = true;
                outputSecond.value = `sqr(${outputMain.value})`;
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                resizer(output,outputMain);
                return;
            }
            if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
                resizer(output,outputMain);
                return;
            }
            if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);;
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
                resizer(output,outputMain);
                return; 
            }
            sqFlag = true;
            if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
                outputSecond.value += `sqr(${outputMain.value})`;
                outputMain.value = round(Math.pow(+outputMain.value, 2),6);
                resizer(output,outputMain);
                return
            }
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);
            outputSecond.value = `sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
        } else if (target.dataset.marker === "multiplication") {
            opFlag = true;
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
                    resizer(output,outputMain);
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
                if (outputSecond.value.includes('+')) {
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
            opFlag = true;
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
            opFlag = true;
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
                    resizer(output,outputMain);
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
                if (outputSecond.value.includes('+')) {
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
                if (outputSecond.value.includes('+')){
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
                            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrRes,12)} =`;
                            equalFlag = true;
                            sqFlag = false;
                            sqrtFlag = false;
                            return;
                        }
                        sqrRes = +outputMain.value;
                        equalFlag = true;
                        sqFlag = false;
                        outputSecond.value += ' ='
                        outputMain.value = round(result,12);
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
                    outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrtRes,12)} =`;
                    return;
                }
                if (outputSecond.value.includes('+')){
                    if (opFlag) {
                        result += +outputMain.value;
                        outputSecond.value = `${round(result - outputMain.value,12)} + ${+(outputSecond.value.split(/([^\d|.]+)/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.]+)/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result += +outputSecond.value.split(/([^\d|.]+)/gm)[2];
                    outputSecond.value = `${round((result - +outputSecond.value.split(/([^\d|.]+)/gm)[2]),12)} + ${+outputSecond.value.split(/([^\d|.]+)/gm)[2]} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('-')){
                    if (opFlag) {
                        result -= +outputMain.value;
                        outputSecond.value = `${round(result + outputMain.value,12)} - ${+(outputSecond.value.split(/([^\d|.]+)/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.]+)/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result -= +outputSecond.value.split(/([^\d|.]+)/gm)[2];
                    outputSecond.value = `${round((result + +outputSecond.value.split(/([^\d|.]+)/gm)[2]),12)} - ${+outputSecond.value.split(/([^\d|.]+)/gm)[2]} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('/')){
                    if (opFlag) {
                        result /= +outputMain.value;
                        outputSecond.value = `${round(result * outputMain.value,12)} / ${+(outputSecond.value.split(/([^\d|.]+)/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.]+)/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result /= +outputSecond.value.split(/([^\d|.]+)/gm)[2];
                    outputSecond.value = `${round((result * +outputSecond.value.split(/([^\d|.]+)/gm)[2]),12)} / ${+outputSecond.value.split(/([^\d|.]+)/gm)[2]} =`;
                    outputMain.value = round(result,12);
                }
                if (outputSecond.value.includes('*')){
                    if (opFlag) {
                        result *= +outputMain.value;
                        outputSecond.value = `${round(result / outputMain.value,12)} * ${+(outputSecond.value.split(/([^\d|.]+)/gm)[2] == '' ? +outputMain.value : outputSecond.value.split(/([^\d|.]+)/gm)[2])} =`;
                        outputMain.value = round(result,12);
                        opFlag = false;
                        return;
                    }
                    result *= +outputSecond.value.split(/([^\d|.]+)/gm)[2];
                    outputSecond.value = `${round((result / +outputSecond.value.split(/([^\d|.]+)/gm)[2]),12)} * ${+outputSecond.value.split(/([^\d|.]+)/gm)[2]} =`;
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