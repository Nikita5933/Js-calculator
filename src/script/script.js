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

// let currentOperation;
// let nextOperation;
// let currentOperand;
// let nextOperrand;
// let operands;
// let operations;

let currentOperand;
let nextOperrand;
let currentOperation;
let result = 0;

// if (currentOperation == '*') {
    // previousOperrand = ouputMain.value.match(/\d+[\*]/gm).join().substring(0,ouputMain.value.match(/\d+[\*]/gm).join().length - 1);
    // currentOperand = ouputMain.value.match(/[\*]\d+/gm).join().substring(1,ouputMain.value.match(/[\*]\d+/gm).join().length);
    // currentOperand = ouputMain.value.match(/\d+[\*]/gm).join().substring(0,ouputMain.value.match(/\d+[\*]/gm).join().length - 1) * ouputMain.value.match(/[\*]\d+/gm).join().substring(1,ouputMain.value.match(/[\*]\d+/gm).join().length)
// }
// console.log('888-333+33-54*67-234234-5345+434*55'.match(/\d+[\*]/gm));

equal.addEventListener('click', () => {
    if (ouputMain.value == 0) {
        ouputMain.value = 0;
        ouputSecond.value = 0;
    }
    ouputMain.value = result;
    // else  {
    //  operands = ouputMain.value.match(/[\d]+/gm);
    //  operations = ouputMain.value.match(/[\D]+/gm);
    //  currentOperand = +operands[0];
    //  nextOperrand = +operands[1];
    //  console.log(operands);
    //  console.log(operations);
    //  for (let i = 0; i < operands.length; i++) {
    //     if (operations[i] == '*') {
    //         nextOperrand = +operands[i + 1];
    //         currentOperand *= +nextOperrand;
    //         ouputMain.value = +currentOperand;
    //     }
    //     if (operations[i] == '/') {
    //         nextOperrand = +operands[i + 1];
    //         currentOperand /= nextOperrand;
    //         // console.log(currentOperand);
    //         ouputMain.value = currentOperand;
    //     }
    //     if (operations[i] == '-') {
    //         nextOperrand = +operands[i + 1];
    //         if(operations[i + 1] == '*') {
    //             nextOperrand = +operands[i + 1];
    //             nextOperrand *= operands[i + 2];
    //             // console.log(nextOperrand);
    //             i++;
    //         }
    //         if(operations[i + 1] == '/') {
    //             nextOperrand = +operands[i + 1];
    //             nextOperrand /= operands[i + 2];
    //             // console.log(nextOperrand);
    //             i++;
    //         }
    //         currentOperand -= operands[i + 1]
    //         // console.log(currentOperand);
    //         ouputMain.value = currentOperand;
    //     }
    //     if (operations[i] == '+') {
    //         nextOperrand = +operands[i + 1];
    //         if(operations[i + 1] == '*') {
    //             nextOperrand = +operands[i + 1];
    //             nextOperrand *= operands[i + 2];
    //             // console.log(currentOperand);
    //             // console.log(nextOperrand);
    //             i++;
    //         }
    //         if(operations[i + 1] == '/') {
    //             nextOperrand = +operands[i + 1];
    //             nextOperrand /= operands[i + 2];
    //             // console.log(nextOperrand);
    //             i++;
    //         }
    //         currentOperand += nextOperrand;
    //         // console.log(currentOperand);
    //         // console.log(nextOperrand);
    //         ouputMain.value = currentOperand;
    //     }
    //  }
    // }
})

dotBtn.addEventListener('click', () => {
    ouputMain.value += '.';
})
acBtn.addEventListener('click', () => {
    ouputMain.value = 0;
    ouputSecond.value = 0;
    result = 0;
});
cBtn.addEventListener('click', () => {
    ouputMain.value = 0;
    ouputSecond.value = 0;
    result = 0;
})
delBtn.addEventListener('click', () => {
     if (ouputMain.value.length == 1) {
        ouputMain.value = 0;
        ouputSecond.value = 0;
    } else {
        ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    }
    ouputMain.focus();
});
plusBtn.addEventListener('click', () => {
    if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
        ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    } else if (ouputMain.value.match(/[\D]+$/gm) != ouputMain.value.match(/[\d]+$/gm)){
        result += +ouputMain.value.match(/[\d]+$/gm);
    }
    currentOperation = '+';
    // currentOperand = +ouputMain.value;
    // nextOperrand = +ouputMain.value.match(/[\d]+$/gm);
    console.log(result);
    ouputMain.value += '+';
    ouputSecond.value = result;
    ouputMain.focus();
})
minusBtn.addEventListener('click', () => {
    if(!currentOperation) {
        result = +ouputMain.value.match(/[\d]+$/gm)
        ouputSecond.value = result;
        console.log(111);
    }
    if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
        ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    } else if ((ouputMain.value.match(/[\D]+$/gm) != ouputMain.value.match(/[\d]+$/gm) && currentOperation != undefined)){
        console.log(currentOperation);
        result -= +ouputMain.value.match(/[\d]+$/gm);
        console.log(32);
    }
    currentOperation = '-';
    nextOperrand = +ouputMain.value.match(/[\d]+$/gm);
    console.log(currentOperation);
    ouputMain.value += '-';
    ouputSecond.value = result;
    ouputMain.focus();
})
separateBtn.addEventListener('click', () => {
    if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
        ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1)
    }
    currentOperation = '-';
    ouputMain.value += '/';
    ouputMain.focus();
})
multiplyBtn.addEventListener('click', () => {
    if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
        ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    }
    currentOperation = '*';
    ouputMain.value += '*';
    ouputMain.focus();
})


numbers.forEach(item => {
    item.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('number__nine')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                    ouputMain.value += 9;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 9;
            } else if (ouputMain.value == 0) {
                ouputMain.value = 9;
            }
            ouputMain.focus();
        } else if (target.classList.contains('number__eight')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 8;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 8;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 8;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__seven')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 7;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 7;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 7;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__six')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 6;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 6;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 6;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__five')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 5;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 5;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 5;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__four')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 4;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 4;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 4;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__three')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 3;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 3;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 3;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__two')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                ouputMain.value += 2;
        } else if (ouputMain.value != 0) {
            ouputMain.value += 2;
        } else if (ouputMain.value == 0) {
            ouputMain.value = 2;
        }
            ouputMain.focus();
        } else if (target.classList.contains('number__one')) {
            if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
                    ouputMain.value += 1;
            } else if (ouputMain.value != 0) {
                ouputMain.value += 1;
            } else if (ouputMain.value == 0) {
                ouputMain.value = 1;
            }
            ouputMain.focus();
        } else if (target.classList.contains('number__zero')) {
            if (ouputMain.value == 0) {
                ouputMain.value = 0;
            } else if (ouputMain.value !== 0) {
                ouputMain.value += 0;
            }
            ouputMain.focus();
        }
    })
    })

    ////////////////////////////
    // 'use strict';

    // const numbers = document.querySelectorAll('.number');
    // const ouputMain = document.querySelector('.output__second input');
    // const ouputSecond = document.querySelector('.output__first input');
    // const acBtn = document.querySelector('.ac');
    // const cBtn = document.querySelector('.c');
    // const delBtn = document.querySelector('.del');
    // const dotBtn = document.querySelector('.dot');
    // const plusBtn = document.querySelector('.plus');
    // const minusBtn = document.querySelector('.minus');
    // const separateBtn = document.querySelector('.separate');
    // const multiplyBtn = document.querySelector('.multiply');
    // const equal = document.querySelector('.equal');
    
    // let currentOperation;
    // let nextOperation;
    // let currentOperand;
    // let nextOperrand;
    // let operands;
    // let operations;
    
    // // if (currentOperation == '*') {
    //     // previousOperrand = ouputMain.value.match(/\d+[\*]/gm).join().substring(0,ouputMain.value.match(/\d+[\*]/gm).join().length - 1);
    //     // currentOperand = ouputMain.value.match(/[\*]\d+/gm).join().substring(1,ouputMain.value.match(/[\*]\d+/gm).join().length);
    //     // currentOperand = ouputMain.value.match(/\d+[\*]/gm).join().substring(0,ouputMain.value.match(/\d+[\*]/gm).join().length - 1) * ouputMain.value.match(/[\*]\d+/gm).join().substring(1,ouputMain.value.match(/[\*]\d+/gm).join().length)
    // // }
    // // console.log('888-333+33-54*67-234234-5345+434*55'.match(/\d+[\*]/gm));
    
    // equal.addEventListener('click', () => {
    //     if (ouputMain.value == 0) {
    //         ouputMain.value = 0;
    //         ouputSecond.value = 0;
    //     } else  {
    //      operands = ouputMain.value.match(/[\d]+/gm);
    //      operations = ouputMain.value.match(/[\D]+/gm);
    //      currentOperand = +operands[0];
    //      nextOperrand = +operands[1];
    //      console.log(operands);
    //      console.log(operations);
    //      for (let i = 0; i < operands.length; i++) {
    //         if (operations[i] == '*') {
    //             nextOperrand = +operands[i + 1];
    //             currentOperand *= +nextOperrand;
    //             ouputMain.value = +currentOperand;
    //         }
    //         if (operations[i] == '/') {
    //             nextOperrand = +operands[i + 1];
    //             currentOperand /= nextOperrand;
    //             // console.log(currentOperand);
    //             ouputMain.value = currentOperand;
    //         }
    //         if (operations[i] == '-') {
    //             nextOperrand = +operands[i + 1];
    //             if(operations[i + 1] == '*') {
    //                 nextOperrand = +operands[i + 1];
    //                 nextOperrand *= operands[i + 2];
    //                 // console.log(nextOperrand);
    //                 i++;
    //             }
    //             if(operations[i + 1] == '/') {
    //                 nextOperrand = +operands[i + 1];
    //                 nextOperrand /= operands[i + 2];
    //                 // console.log(nextOperrand);
    //                 i++;
    //             }
    //             currentOperand -= operands[i + 1]
    //             // console.log(currentOperand);
    //             ouputMain.value = currentOperand;
    //         }
    //         if (operations[i] == '+') {
    //             nextOperrand = +operands[i + 1];
    //             if(operations[i + 1] == '*') {
    //                 nextOperrand = +operands[i + 1];
    //                 nextOperrand *= operands[i + 2];
    //                 // console.log(currentOperand);
    //                 // console.log(nextOperrand);
    //                 i++;
    //             }
    //             if(operations[i + 1] == '/') {
    //                 nextOperrand = +operands[i + 1];
    //                 nextOperrand /= operands[i + 2];
    //                 // console.log(nextOperrand);
    //                 i++;
    //             }
    //             currentOperand += nextOperrand;
    //             // console.log(currentOperand);
    //             // console.log(nextOperrand);
    //             ouputMain.value = currentOperand;
    //         }
    //      }
    //     }
       
    
    // })
    
    // dotBtn.addEventListener('click', () => {
    //     ouputMain.value += '.';
    //     ouputSecond.value += '.';
    // })
    // acBtn.addEventListener('click', () => {
    //     ouputMain.value = 0;
    //     ouputSecond.value = 0;
    // });
    // cBtn.addEventListener('click', () => {
    //     ouputMain.value = 0;
    //     ouputSecond.value = 0;
    // })
    // delBtn.addEventListener('click', () => {
    //      if (ouputMain.value.length == 1) {
    //         ouputMain.value = 0;
    //         ouputSecond.value = 0;
    //     } else {
    //         ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    //         ouputSecond.value = ouputSecond.value.substring(0, ouputSecond.value.length - 1);
    //     }
    //     ouputMain.focus();
    // });
    // plusBtn.addEventListener('click', () => {
    //     if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
    //         ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    //         ouputSecond.value = ouputSecond.value.substring(0, ouputSecond.value.length - 1);
    //     }
    //     currentOperation = '+';
    //     ouputMain.value += '+';
    //     ouputSecond.value += '+';
    //     ouputMain.focus();
    // })
    // minusBtn.addEventListener('click', () => {
    //     if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
    //         ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    //         ouputSecond.value = ouputSecond.value.substring(0, ouputSecond.value.length - 1);
    //     }
    //     currentOperation = '-';
    //     ouputMain.value += '-';
    //     ouputSecond.value += '-';
    //     ouputMain.focus();
    // })
    // separateBtn.addEventListener('click', () => {
    //     if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
    //         ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    //         ouputSecond.value = ouputSecond.value.substring(0, ouputSecond.value.length - 1);
    //     }
    //     currentOperation = '-';
    //     ouputMain.value += '/';
    //     ouputSecond.value += '/';
    //     ouputMain.focus();
    // })
    // multiplyBtn.addEventListener('click', () => {
    //     if (ouputMain.value.match(/[\+\-\*\/]$/gm)) {
    //         ouputMain.value = ouputMain.value.substring(0, ouputMain.value.length - 1);
    //         ouputSecond.value = ouputSecond.value.substring(0, ouputSecond.value.length - 1);
    //     }
    //     currentOperation = '*';
    //     ouputMain.value += '*';
    //     ouputSecond.value += '*';
    //     ouputMain.focus();
    // })
    
    
    // numbers.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         const target = e.target;
    //         if (target.classList.contains('number__nine')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                     ouputMain.value += 9;
    //                     ouputSecond.value += 9;
    //             } else if (ouputMain.value != 0) {
    //                 ouputMain.value += 9;
    //                 ouputSecond.value += 9;
    //             } else if (ouputMain.value == 0) {
    //                 ouputMain.value = 9;
    //                 ouputSecond.value = 9;
    //             }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__eight')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 8;
    //                 ouputSecond.value += 8;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 8;
    //             ouputSecond.value += 8;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 8;
    //             ouputSecond.value = 8;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__seven')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 7;
    //                 ouputSecond.value += 7;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 7;
    //             ouputSecond.value += 7;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 7;
    //             ouputSecond.value = 7;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__six')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 6;
    //                 ouputSecond.value += 6;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 6;
    //             ouputSecond.value += 6;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 6;
    //             ouputSecond.value = 6;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__five')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 5;
    //                 ouputSecond.value += 5;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 5;
    //             ouputSecond.value += 5;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 5;
    //             ouputSecond.value = 5;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__four')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 4;
    //                 ouputSecond.value += 4;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 4;
    //             ouputSecond.value += 4;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 4;
    //             ouputSecond.value = 4;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__three')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 3;
    //                 ouputSecond.value += 3;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 3;
    //             ouputSecond.value += 3;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 3;
    //             ouputSecond.value = 3;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__two')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                 ouputMain.value += 2;
    //                 ouputSecond.value += 2;
    //         } else if (ouputMain.value != 0) {
    //             ouputMain.value += 2;
    //             ouputSecond.value += 2;
    //         } else if (ouputMain.value == 0) {
    //             ouputMain.value = 2;
    //             ouputSecond.value = 2;
    //         }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__one')) {
    //             if (ouputMain.value == 0 && ouputMain.value[ouputMain.value.length - 1] == '.') {
    //                     ouputMain.value += 1;
    //                     ouputSecond.value += 1;
    //             } else if (ouputMain.value != 0) {
    //                 ouputMain.value += 1;
    //                 ouputSecond.value += 1;
    //             } else if (ouputMain.value == 0) {
    //                 ouputMain.value = 1;
    //                 ouputSecond.value = 1;
    //             }
    //             ouputMain.focus();
    //         } else if (target.classList.contains('number__zero')) {
    //             if (ouputMain.value == 0) {
    //                 ouputMain.value = 0;
    //                 ouputSecond.value = 0;
    //             } else if (ouputMain.value !== 0) {
    //                 ouputMain.value += 0;
    //                 ouputSecond.value += 0;
    //             }
    //             ouputMain.focus();
    //         }
    //     })
    //     })