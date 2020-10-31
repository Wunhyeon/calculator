//TO DO : 맥 키코드 검색하기(esc, tap, 백스페이스 등), 입력된 숫자 백스페이스로 지울 수 있게하기, 엔터까지 눌러서 계산된 다음에 숫자 누르면 어떻게 해야할지.(실제 계산기에서도 이게 뭔지 모르겠음)

var firstNum, operator, previousKey, previousNum, num1, num2;
// 위의 전역변수를 잘 활용하여, 계산기를 구현합니다.

const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const display = document.querySelector('.calculator__display'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
// ! 위 코드(Line 1 - 6)는 수정하지 마세요.

function calculate(n1, operator, n2) {
 
  let result = '';
  let firstNumber = Number(n1);
  let secondNumber = Number(n2);
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  if(operator === '+'){
    result = firstNumber + secondNumber;
  } else if(operator === '-'){
    result = firstNumber - secondNumber;
  } else if(operator === '*'){
    result = firstNumber * secondNumber;
  } else if(operator === '/'){
    result = firstNumber/secondNumber;
  }

  num1 = result;  
  num2 = undefined; 

  

  return result;
}

  

buttons.addEventListener('click', calcEvent);
document.addEventListener('keypress', calcEvent);


function keyEvent(event){
  console.log(event);
}


function calcEvent(event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.
  let target, action, buttonContent;
  
  if(event.type === 'click'){
    console.log("haha");
    target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
    action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
    buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  }else if(event.type === 'keypress'){
    console.log("keypress");
    if(event.key === "1" || event.key ==="2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9"){
      action = "number";
      buttonContent = event.key;
    }else if(event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/"){
      action = "operator";
      buttonContent = event.key;
    }else if(event.key === "Enter"){
      action = "calculate";
    }else if(event.key === "escape"){
      action = "clear";
    }else if(event.key === '.'){
      action = "decimal";
    }
  }
  
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  console.log("target : " + target);
  console.log("action : " + action);
  console.log("buttonContent : " + buttonContent);

  if (action !== undefined) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.

      console.log('숫자 ' + buttonContent + ' 버튼');
      
      if(display.textContent === '0' || previousKey === 'operator'){
        display.textContent = buttonContent;
      }else {
        display.textContent += buttonContent;
      }
      previousKey = 'number';
    }

    if (action === 'operator') {

      console.log('연산자 ' + buttonContent + ' 버튼');
      
      console.log('num2 : ', num2);
      if(num2 === undefined && num1 !== undefined ){

        num2 = display.textContent;
      }
      
      if(num1 === undefined){
        num1 = display.textContent;
      }
      
      
      if(num2 !== undefined){
        calculate(num1, operator, num2);
      }

      operator = buttonContent;
      previousKey = 'operator';

    }

    

    if (action === 'decimal') {
      console.log('소수점 버튼');

      if(!display.textContent.includes('.')){
        display.textContent += '.';
      }

      if(previousKey === 'operator'){
        display.textContent = '0.';
      }

      previousKey = 'decimal';
    }

    if (action === 'clear') {
      console.log('초기화 버튼');
      previousKey = 'clear';
      num1 = undefined;
      num2 = undefined;
      operator = undefined;
      display.textContent = 0;
    }

    if (action === 'calculate') {
      let total;
      console.log('계산 버튼');
      

      if(previousKey !== 'calculate'){

        previousNum = display.textContent;
        total = calculate(num1, operator, display.textContent);

      }else{
        
        total = calculate(num1, operator, previousNum);
      }
      
      display.textContent = total;
      previousKey = 'calculate';
    }
  }
}



