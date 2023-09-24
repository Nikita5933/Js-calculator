
'use strict';

const numbers = document.querySelectorAll('.number');
const outputMain = document.querySelector('.output__second input');
const outputSecond = document.querySelector('.output__first input');
const output = document.querySelector('.output');
const acBtn = document.querySelector('.ac');
const cBtn = document.querySelector('.c');
const delBtn = document.querySelector('.del');
const dotBtn = document.querySelector('.dot');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const separateBtn = document.querySelector('.separate');
const multiplyBtn = document.querySelector('.multiply');
const equal = document.querySelector('.equal');
const squareBtn = document.querySelector('.square');
const sqrtBtn = document.querySelector('.sqrt');
const percent = document.querySelector('.percent');
const memoryPlus = document.querySelector('.memory__plus');
const memoryMinus = document.querySelector('.memory__minus');
const memoryResult = document.querySelector('.memory__result');
const memoryReset = document.querySelector('.memory__reset');

let result = 0;
let opFlag = false;
let equalFlag = false;
let dotFlag = false;
let sqFlag = false;
let sqrtFlag = false;
let memoryFlag = false;
let memoryRes = 0;

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
        console.log(11);
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

memoryPlus.addEventListener('click', () =>  {
    if (outputSecond.value.includes('=') || outputSecond.value.includes('sqr') || outputSecond.value.includes('√')) {
        outputSecond.value = 0;
        equalFlag = false;
    }
    memoryFlag = true;
    memoryRes += +outputMain.value;
    memoryResult.classList.remove('blur');
    memoryReset.classList.remove('blur');
    opFlag = true;
    equalFlag = true;
    dotFlag = true;
})

memoryMinus.addEventListener('click', () =>  {
    if (outputSecond.value.includes('=') || outputSecond.value.includes('sqr') || outputSecond.value.includes('√')) {
        outputSecond.value = 0;
        equalFlag = false;
    }
    memoryFlag = true;
    memoryRes -= +outputMain.value;
    memoryResult.classList.remove('blur');
    memoryReset.classList.remove('blur');
    opFlag = true;
    equalFlag = true;
})

memoryResult.addEventListener('click', () => {
    outputMain.value = round(memoryRes,12);
    result = memoryRes;
    opFlag = true;
    equalFlag = true;
    resizer(output,outputMain);
})

memoryReset.addEventListener('click', () => {
    memoryRes = 0;
    memoryFlag = false;
    opFlag = true;
    equalFlag = true;
    memoryFlag = false;
    memoryResult.classList.add('blur');
    memoryReset.classList.add('blur');
})


acBtn.addEventListener('click', () => {
    outputMain.value = 0;
    outputSecond.value = 0;
    result = 0;
    memoryRes = 0;
    opFlag = false;
    equalFlag = false;
    dotFlag = false;
    sqFlag = false;
    sqrtFlag = false;
    memoryResult.classList.add('blur');
    memoryReset.classList.add('blur');
    memoryFlag = false;
    resizer(output,outputMain);
});
cBtn.addEventListener('click', () => {
    outputMain.value = 0;
    outputSecond.value = 0;
    result = 0;
    opFlag = false;
    equalFlag = false;
    dotFlag = false;
    sqFlag = false;
    sqrtFlag = false;
    resizer(output,outputMain);
})

let sqrRes;
let sqrtRes;
equal.addEventListener('click', () => {
    outputMain.focus();
    if (outputSecond.value.match(/\s$/gm) == ' ' || sqFlag || sqrtFlag) {
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
        if (outputSecond.value.includes('sqr') && outputSecond.value.includes('√')) {
            if (outputSecond.value[outputSecond.value.length - 1] == '=') {
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrRes,12)} =`;
                equalFlag = true;
                sqFlag = false;
                sqrtFlag = false;
                resizer(output,outputMain);
                return;
            }
            sqrRes = +outputMain.value;
            equalFlag = true;
            sqFlag = false;
            outputSecond.value += ' ='
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
        };
        if(outputSecond.value.includes('sqr')) {
            sqrRes = +outputMain.value;
            equalFlag = true;
            sqFlag = false;
            outputSecond.value += ' ='
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
        }
        if (outputSecond.value.includes('√')) {
            sqrtRes = +outputMain.value;
            equalFlag = true;
            sqrtFlag = false;
            outputSecond.value += ' ='
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
        }
        outputSecond.value += +outputMain.value;
        outputSecond.value += ' ='
        outputMain.value = round(result,12);
        resizer(output,outputMain);
    } else if (outputSecond.value[outputSecond.value.length - 1] == '=') {
        if(outputSecond.value.includes('sqr')) {
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrRes,6)} =`;
            resizer(output,outputMain);
            return;
        }
        if(outputSecond.value.includes('√')) {
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${sqrtRes,15} =`;
            resizer(output,outputMain);
            return;
        }
        if(outputSecond.value.includes('.')) dotFlag = true;
        if (outputSecond.value.split(/\d+/gm).includes(' + ')){
            if(dotFlag) {
                result += +outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1];
                outputSecond.value = `${round((result - +(outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1])),12)} + ${+(outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1])} =`;
                outputMain.value = round(result,12);
                resizer(output,outputMain);
                return;
            }
            
            result += +outputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result - (outputSecond.value.split(/\D+/gm).filter(item => item != ''))[1]),12)} + ${+(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
        }
        if (outputSecond.value.split(/\d+/gm).includes(' - ')){
            if(dotFlag) {
            result -= +outputSecond.value.split(/ - | =/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result + +(outputSecond.value.split(/ - | =/gm).filter(item => item != '')[1])),12)} - ${+(outputSecond.value.split(/ - | =/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
            }
            result -= +outputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result + +(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])),12)} - ${+(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
        }
        if (outputSecond.value.split(/\d+/gm).includes(' / ')){
            if(outputSecond.value.includes('.')) dotFlag = true;
            if(dotFlag) {
            result /= +outputSecond.value.split(/ \/ | =/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result * +(outputSecond.value.split(/ \/ | =/gm).filter(item => item != '')[1])),12)} / ${+(outputSecond.value.split(/ \/ | =/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
            }
            result /= +outputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result * +(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])),12)} / ${+(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
        }
        if (outputSecond.value.split(/\d+/gm).includes(' * ')){
            if(outputSecond.value.includes('.')) dotFlag = true;
            if(dotFlag) {
            result *= +outputSecond.value.split(/ \* | =/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result / +(outputSecond.value.split(/ \* | =/gm).filter(item => item != '')[1])),12)} * ${+(outputSecond.value.split(/ \* | =/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
            resizer(output,outputMain);
            return;
            }
            resizer(output,outputMain);
            result *= +outputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
            outputSecond.value = `${round((result / +(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])),12)} * ${+(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
            outputMain.value = round(result,12);
        }
    }
    resizer(output,outputMain);
    sqrRes = 0;
})

dotBtn.addEventListener('click', () => {
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
    outputMain.focus();
    resizer(output,outputMain);
})
delBtn.addEventListener('click', () => {
        if (outputMain.value.length == 1) {
        outputMain.value = 0;
    } else {
        outputMain.value = outputMain.value.substring(0, outputMain.value.length - 1);
    }
    outputMain.focus();
    resizer(output,outputMain);
});
plusBtn.addEventListener('click', () => {
    opFlag = true;
    if (!equalFlag) {
        if (outputSecond.value == 0) {
            outputSecond.value = +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '*') {
            result *= +outputMain.value;
            result -= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '/') {
            result /= +outputMain.value;
            result -= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '-') {
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
    outputMain.focus();
    resizer(output,outputMain);
})
minusBtn.addEventListener('click', () => {
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
        if (outputSecond.value[outputSecond.value.length-2] == '*') {
            result *= +outputMain.value;
            result += +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '/') {
            result /= +outputMain.value;
            result += +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '+') {
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
    outputMain.focus();
    resizer(output,outputMain);
})
separateBtn.addEventListener('click', () => {
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
        if (outputSecond.value[outputSecond.value.length-2] == '*') {
            result *= +outputMain.value;
            result *= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '-') {
            result -= +outputMain.value;
            result *= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '+') {
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
    outputMain.focus();
    resizer(output,outputMain);
})
multiplyBtn.addEventListener('click', () => {
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
        if (outputSecond.value[outputSecond.value.length-2] == '/') {
            result /= +outputMain.value;
            result /= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '-') {
            result -= +outputMain.value;
            result /= +outputMain.value;
        }
        if (outputSecond.value[outputSecond.value.length-2] == '+') {
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
    outputMain.focus();
    resizer(output,outputMain);
})
squareBtn.addEventListener('click', () => {
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
    resizer(output,outputMain);
    outputMain.value = round(Math.pow(+outputMain.value, 2),6);
    outputSecond.value = `sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
});
sqrtBtn.addEventListener('click', () => {
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
    resizer(output,outputMain);
})
percent.addEventListener('click', () => {
    outputMain.value =  round(((+outputSecond.value.split(/([^\d|.]+)/gm)[0] / 100) * +outputMain.value),2);
    resizer(output,outputMain);
})

numbers.forEach(item => {
    item.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('number__nine')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 9;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 9;
        } else if (outputMain.value != 0) {
            outputMain.value += 9;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__eight')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 8;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 8;
        } else if (outputMain.value != 0) {
            outputMain.value += 8;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__seven')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 7;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 7;
        } else if (outputMain.value != 0) {
            outputMain.value += 7;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__six')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 6;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 6;
        } else if (outputMain.value != 0) {
            outputMain.value += 6;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__five')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 5;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 5;
        } else if (outputMain.value != 0) {
            outputMain.value += 5;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__four')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 4;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 4;
        } else if (outputMain.value != 0) {
            outputMain.value += 4;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__three')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 3;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 3;
        } else if (outputMain.value != 0) {
            outputMain.value += 3;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__two')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 2;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 2;
        } else if (outputMain.value != 0) {
            outputMain.value += 2;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__one')) {
            if (outputMain.value.match(/\./gm) && !opFlag) {
                outputMain.value += 1;
                equalFlag = false;
                opFlag = false;
        } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
            memoryFlag = false;
            equalFlag = false;
            opFlag = false;
            sqFlag = false;
            sqrtFlag = false;
            outputMain.value = 1;
        } else if (outputMain.value != 0) {
            outputMain.value += 1;
        }
            outputMain.focus();
        } else if (target.classList.contains('number__zero')) {
            if(outputMain.value.match(/\./gm) && !opFlag){
                outputMain.value += 0;
                equalFlag = false;
                opFlag = false;
            } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
                memoryFlag = false;
                equalFlag = false;
                opFlag = false;
                sqFlag = false;
                sqrtFlag = false;
                outputMain.value = 0;
            } else if (outputMain.value !== 0) {
                outputMain.value += 0;
            }
            outputMain.focus();
        }
        resizer(output,outputMain);
    })
    })
