    'use strict';

    const numbers = document.querySelectorAll('.number');
    const ouputMain = document.querySelector('.output__second input');
    const ouputSecond = document.querySelector('.output__first input');
    const acBtn = document.querySelector('.ac');
    const cBtn = document.querySelector('.c');
    const delBtn = document.querySelector('.del');
    const dotBtn = document.querySelector('.dot');
    const plusBtn = document.querySelector('.plus');
    const minusBtn = document.querySelector('.minus');
    const separateBtn = document.querySelector('.separate');
    const multiplyBtn = document.querySelector('.multiply');
    const equal = document.querySelector('.equal');
    
    let result = 0;
    let opFlag = false;
    let equalFlag = false;
    let dotFlag = false;
    
    acBtn.addEventListener('click', () => {
        ouputMain.value = 0;
        ouputSecond.value = 0;
        result = 0;
        opFlag = false;
        equalFlag = false;
        dotFlag = false;
    });
    cBtn.addEventListener('click', () => {
        ouputMain.value = 0;
        ouputSecond.value = 0;
        result = 0;
        opFlag = false;
        equalFlag = false;
        dotFlag = false;
    })
    
    
    equal.addEventListener('click', () => {
        ouputMain.focus();
        if (ouputSecond.value.match(/\s$/gm) == ' ') {
            if (ouputSecond.value[ouputSecond.value.length - 2] == '+'){
                result.toFixed(12)
                equalFlag = true;
                result += +ouputMain.value;
                ouputSecond.value += +ouputMain.value;
                ouputSecond.value += ' ='
                ouputMain.value = +result.toFixed(12);
            }
            if (ouputSecond.value[ouputSecond.value.length - 2] == '-') {
                equalFlag = true;
                result -= +ouputMain.value;
                ouputSecond.value += +ouputMain.value;
                ouputSecond.value += ' ='
                ouputMain.value = +result.toFixed(12);
            }
        } else if (ouputSecond.value[ouputSecond.value.length - 1] == '=' ) {
            
            if (ouputSecond.value.split(/\d+/gm).includes(' + ')){
                if(dotFlag) {
                    result = +result.toFixed(12) + +ouputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1];
                    ouputSecond.value = `${+((+result.toFixed(12)) - +(ouputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1]))} + ${+(ouputSecond.value.split(/ \+ | =/gm).filter(item => item != '')[1])} =`;
                    ouputMain.value = +result.toFixed(12);
                    return;
                    }
                result = +result.toFixed(12) + +ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
                ouputSecond.value = `${+((+result.toFixed(12)) - ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1]).toFixed(12)} + ${+(ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
                ouputMain.value = +result.toFixed(12);
            }
            if (ouputSecond.value.split(/\d+/gm).includes(' - ')){
                if(dotFlag) {
                result = +result.toFixed(12) - +ouputSecond.value.split(/ - | =/gm).filter(item => item != '')[1];
                ouputSecond.value = `${+((+result.toFixed(12)) + +(ouputSecond.value.split(/ - | =/gm).filter(item => item != '')[1]))} - ${+(ouputSecond.value.split(/ - | =/gm).filter(item => item != '')[1])} =`;
                ouputMain.value = +result.toFixed(12);
                return;
                }
                result = +result.toFixed(12) - +ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1];
                ouputSecond.value = `${+((+result.toFixed(12)) + +(ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1]))} - ${+(ouputSecond.value.split(/\D+/gm).filter(item => item != '')[1])} =`;
                ouputMain.value = +result.toFixed(12);
                
            }
        } 
    })
    
    dotBtn.addEventListener('click', () => {
        dotFlag = true;
       if (ouputMain.value == 0 && !ouputMain.value.match(/\./gm)) {
            ouputMain.value += '.';
       } else if (!ouputMain.value.match(/\./gm) && equalFlag && opFlag) {
            equalFlag = false;
            opFlag = false;
            ouputMain.value = '0.';
        } else if (result != 0 && opFlag && equalFlag) {
            opFlag = false;
            ouputMain.value = '0.';
        } else if (!equalFlag && !opFlag && !ouputMain.value.match(/\./gm)) {
            ouputMain.value += '.';  
        } else if (equalFlag && !opFlag && !ouputMain.value.match(/\./gm)) {
            ouputMain.value = '0.';
        }
        ouputMain.focus();
    })
    delBtn.addEventListener('click', () => {
         if (ouputMain.value.length == 1) {
            ouputMain.value = 0;
        } else {
            ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
        }
        ouputMain.focus();
    });
    plusBtn.addEventListener('click', () => {
        if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
            ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
        }
        opFlag = true;
        if (!equalFlag) {
            if (ouputSecond.value == 0) {
                ouputSecond.value = +ouputMain.value; 
            }
            result += +ouputMain.value;
        }
        if(ouputSecond.value.match(/\D$/gm)) {
        }
        equalFlag = true;
        ouputSecond.value = +result.toFixed(12);
        ouputMain.value = +result.toFixed(12);
        ouputSecond.value += ' + ';
        ouputMain.focus();
    })
    minusBtn.addEventListener('click', () => {
        if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
            ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
        }
        opFlag = true;
        if (!equalFlag) {
            if (ouputSecond.value == 0) {
                ouputSecond.value = +ouputMain.value;
            }
            result += +ouputMain.value;
        }
        if(ouputSecond.value.match(/\D$/gm)) {
        }
        equalFlag = true;
        ouputSecond.value = +result.toFixed(12);
        ouputMain.value = +result.toFixed(12);
        ouputSecond.value += ' - ';
        ouputMain.focus();
    })
    separateBtn.addEventListener('click', () => {
        if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
            ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
        }
        ouputMain.value += '/';
        ouputMain.focus();
    })
    multiplyBtn.addEventListener('click', () => {
        if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
            ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
        }
        ouputMain.value += '*';
        ouputMain.focus();
    })
    
    
    numbers.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('number__nine')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 9;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 9;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 9;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__eight')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 8;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 8;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 8;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__seven')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 7;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 7;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 7;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__six')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 6;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 6;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 6;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__five')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 5;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 5;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 5;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__four')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 4;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 4;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 4;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__three')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 3;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 3;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 3;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__two')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 2;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 2;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 2;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__one')) {
                if (ouputMain.value.match(/\./gm) && !opFlag) {
                    ouputMain.value += 1;
                    equalFlag = false;
                    opFlag = false;
            } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                equalFlag = false;
                opFlag = false;
                ouputMain.value = 1;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 1;
            }
                ouputMain.focus();
            } else if (target.classList.contains('number__zero')) {
                if(ouputMain.value.match(/\./gm) && !opFlag){
                    ouputMain.value += 0;
                    equalFlag = false;
                    opFlag = false;
                } else if (ouputMain.value == 0 || equalFlag || opFlag) {
                    equalFlag = false;
                    opFlag = false;
                    ouputMain.value = 0;
                } else if (ouputMain.value !== 0) {
                    ouputMain.value += 0;
                }
                ouputMain.focus();
            }
        })
        })
