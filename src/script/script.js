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
    
    let result = 0;
    let opFlag = false;
    let equalFlag = false;
    let dotFlag = false;
    let sqFlag = false;
    let sqrtFlag = false;

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
       }   

    function smaller(output,screen) {
        if (screen.value.length > 11) output.classList.add('number14');
        if (screen.value.length > 13) output.classList.add('number16');
        if (screen.value.length >= 16) screen.value = screen.value.substring(0, screen.value.length - 1);
    }
    function bigger(output,screen) {
        if (screen.value.length < 13) output.classList.remove('number14');
        if (screen.value.length < 15) output.classList.remove('number16');
        if (opFlag) {
            output.classList.remove('number14')
            output.classList.remove('number16')
        }
    }
    
    acBtn.addEventListener('click', () => {
        outputMain.value = 0;
        outputSecond.value = 0;
        result = 0;
        opFlag = false;
        equalFlag = false;
        dotFlag = false;
        sqFlag = false;
        sqrtFlag = false;
        bigger(output,outputMain);
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
        bigger(output,outputMain);
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
                    return;
                }
                sqrRes = +outputMain.value;
                equalFlag = true;
                sqFlag = false;
                outputSecond.value += ' ='
                outputMain.value = round(result,12);
                return;
            };
            if(outputSecond.value.includes('sqr')) {
                sqrRes = +outputMain.value;
                equalFlag = true;
                sqFlag = false;
                outputSecond.value += ' ='
                outputMain.value = round(result,12);
                return;
            }
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
        } else if (outputSecond.value[outputSecond.value.length - 1] == '=') {
            if(outputSecond.value.includes('sqr')) {
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${round(sqrRes,6)} =`;
                return;
            }
            if(outputSecond.value.includes('√')) {
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} ${sqrtRes,15} =`;
                return;
            }
            if(outputSecond.value.includes('.')) dotFlag = true;
            if (outputSecond.value.split(/\d+/gm).includes(' + ')){
                if(dotFlag) {
                    result += +outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1];
                    outputSecond.value = `${round((result - +(outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1])),12)} + ${+(outputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1])} =`;
                    outputMain.value = round(result,12);
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
                return;
                }
                result *= +outputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
                outputSecond.value = `${round((result / +(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])),12)} * ${+(outputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
                outputMain.value = round(result,12);
            }
        }
        sqrRes = 0;
    })
    
    dotBtn.addEventListener('click', () => {
        smaller(output,outputMain);
        bigger(output,outputMain);
        dotFlag = true;
       if (outputMain.value == 0 && !outputMain.value.match(/\./gm)) {
            outputMain.value += '.';
       } else if (sqFlag || sqrtFlag || !outputMain.value.match(/\./gm) && equalFlag && opFlag) {
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
    })
    delBtn.addEventListener('click', () => {
         if (outputMain.value.length == 1) {
            outputMain.value = 0;
        } else {
            outputMain.value = outputMain.value.substring(0, outputMain.value.length - 1);
        }
        outputMain.focus();
        bigger(output,outputMain);
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
    })
    multiplyBtn.addEventListener('click', () => {
        opFlag = true;
        bigger(output,outputMain);
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
    })
    squareBtn.addEventListener('click', () => {
        if (outputSecond.value == '0') {
            sqFlag = true;
            outputSecond.value = `sqr(${outputMain.value})`;
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);
            return;
        }
        if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
            return;
        }
        if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);;
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
            return; 
        }
        sqFlag = true;
        if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
            outputSecond.value += `sqr(${outputMain.value})`;
            outputMain.value = round(Math.pow(+outputMain.value, 2),6);
            return
        }
        
        outputMain.value = round(Math.pow(+outputMain.value, 2),6);
        outputSecond.value = `sqr(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
    });
    sqrtBtn.addEventListener('click', () => {
        if (outputSecond.value == '0') {
            sqrtFlag = true;
            outputSecond.value = `√(${outputMain.value})`;
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            return;
        }
        if (sqFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]} ${outputSecond.value.split(/([^\d|.]+)/gm)[1][1]} √(${outputSecond.value.split(/([^\d|.]+)/gm)[1].slice(3,outputSecond.value.split(/([^\d|.]+)/gm[1]).join('').length -  1)}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
            return;
        }
        if (sqrtFlag && outputSecond.value.match(/\+|\-|\*|\//gm)) {
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
            return; 
        }
        sqrtFlag = true;
        if (outputSecond.value.match(/\+|\-|\*|\//gm)) {
            if (outputSecond.value.includes('sqr')) {
                outputMain.value =  round(Math.sqrt(+outputMain.value),15);
                outputSecond.value = `${outputSecond.value.split(/([^\d|.]+)/gm)[0]}${outputSecond.value.split(/([^\d|.]+)/gm)[1]}√(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]}))`;
                return;
            }
            outputSecond.value += `√(${outputMain.value})`;
            outputMain.value =  round(Math.sqrt(+outputMain.value),15);
            return;
        }
        outputMain.value =  round(Math.sqrt(+outputMain.value),15);
        outputSecond.value = `√(${outputSecond.value.split(/([^\d|.]+)/gm)[1]}${outputSecond.value.split(/([^\d|.]+)/gm)[2]}${outputSecond.value.split(/([^\d|.]+)/gm)[3]})`;
    })
    percent.addEventListener('click', () => {
        outputMain.value =  round(((+outputSecond.value.split(/([^\d|.]+)/gm)[0] / 100) * +outputMain.value),2);
    })
    
    numbers.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.target;
            smaller(output,outputMain);
            bigger(output,outputMain);
            if (target.classList.contains('number__nine')) {
                if (outputMain.value.match(/\./gm) && !opFlag) {
                    outputMain.value += 9;
                    equalFlag = false;
                    opFlag = false;
            } else if (outputMain.value == 0 || equalFlag || opFlag || sqFlag || sqrtFlag) {
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
        })
        })
