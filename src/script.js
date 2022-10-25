// theme

const checked = document.querySelector('.checkbox')
const stateCheckbox = document.querySelector('.theme__checkbox')
const btns = document.querySelectorAll('.calc-btn')
const btnsBackground = document.querySelector('.calc__btns')
const body = document.querySelector('body')
const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')

const styleBtnThemeOne = {
   color: "hsl(221, 14%, 31%)",
   background: "hsl(30, 25%, 89%)",
   boxShadow: "0 5px hsl(28, 16%, 65%)",
   blue: {
      color: "hsl(0, 0%, 100%)",
      background: "hsl(225, 21%, 49%)" ,
      boxShadow: "0 5px hsl(224, 28%, 35%)"
   },
   red: {
      color: "hsl(0, 0%, 100%)",
      background: "hsl(6, 63%, 50%)",
      boxShadow: "0 5px hsl(6, 70%, 34%)"
   }
};

const styleBtnThemeTwo = {
   color: "hsl(60, 10%, 19%)",
   background: "hsl(45, 7%, 89%)",
   boxShadow: "0 5px hsl(35, 11%, 61%)",
   blue: {
      color: "",
      background: "hsl(185, 42%, 37%)" ,
      boxShadow: "0 5px hsl(185, 58%, 25%)"
   },
   red: {
      color: "hsl(221, 14%, 31%)",
      background: "hsl(25, 98%, 40%)",
      boxShadow: "0 5px hsl(25, 99%, 27%)"
   }
};

const styleBtnThemeThree = {
   color: "hsl(52, 100%, 62%)",
   background: "hsl(268, 47%, 21%)",
   boxShadow: "0 5px hsl(290, 70%, 36%)",
   blue: {
      color: "hsl(0, 0%, 100%)",
      background: "hsl(281, 89%, 26%)" ,
      boxShadow: "0 5px hsl(285, 91%, 52%)"
   },
   red: {
      color: "hsl(198, 20%, 13%)",
      background: "hsl(176, 100%, 44%)",
      boxShadow: "0 5px hsl(177, 92%, 70%)"
   }
};

const changeBtnStyle = (btn, obj) => {
   if(btn.classList.contains('blue')){
      btn.style.color = obj.blue.color;
      btn.style.background = obj.blue.background;
      btn.style.boxShadow = obj.blue.boxShadow;
   }
   else if(btn.classList.contains('red')){
      btn.style.color = obj.red.color;
      btn.style.background = obj.red.background;
      btn.style.boxShadow = obj.red.boxShadow;
   } else{
      btn.style.color = obj.color;
      btn.style.background = obj.background;
      btn.style.boxShadow = obj.boxShadow;
   }
}

checked.onclick = () => {
   Number.parseInt(stateCheckbox.getAttribute('value')) === 3 ? stateCheckbox.setAttribute('value', 1) :
   stateCheckbox.setAttribute('value', Number.parseInt(stateCheckbox.getAttribute('value'))+1)
   
   switch (stateCheckbox.getAttribute('value')) {
      case "1":
         checked.classList.remove('state-3')
         checked.classList.add('state-1')
         body.style.background = "hsl(222, 26%, 31%)"
         screen.style.background = "hsl(224, 36%, 15%)"
         calculator.style.color = "hsl(0, 0%, 100%)"
         btnsBackground.style.background = "hsl(223, 31%, 20%)"
         stateCheckbox.style.background = "hsl(223, 31%, 20%)"
         btns.forEach(btn => changeBtnStyle(btn, styleBtnThemeOne))
         break;
      case "2":
         checked.classList.remove('state-1')
         checked.classList.add('state-2')
         body.style.background = "hsl(0, 0%, 90%)"
         screen.style.background = "hsl(0, 0%, 93%)"
         calculator.style.color = "hsl(60, 10%, 19%)"
         btnsBackground.style.background = "hsl(0, 5%, 81%)"
         stateCheckbox.style.background = "hsl(0, 5%, 81%)"
         btns.forEach(btn => changeBtnStyle(btn, styleBtnThemeTwo))
         break;

      case "3":
         checked.classList.remove('state-2')
         checked.classList.add('state-3')
         body.style.background = "hsl(268, 75%, 9%)"
         screen.style.background = "hsl(268, 71%, 12%)"
         calculator.style.color = "hsl(52, 100%, 62%)"
         btnsBackground.style.background = "hsl(268, 71%, 12%)"
         stateCheckbox.style.background = "hsl(268, 71%, 12%)"
         btns.forEach(btn => changeBtnStyle(btn, styleBtnThemeThree))
         break;
      default:
         break;
   }
}

// calcuclator

let runninTotal = 0
let buffer = "0"
let previousOperator;

const btnClick = (value) => {
   isNaN(value) && value !== '.' ? handleSymbol(value) : handleNumber(value)
   screen.textContent = buffer
}

const handleSymbol = (symbol) => {
   switch (symbol) {
      case 'reset':
         buffer = '0';
         runninTotal = 0;
         break;
      case '=':
         if(previousOperator === null) return
         flushOperation(parseFloat(buffer))
         previousOperator = null
         buffer = runninTotal
         runninTotal = 0
         break;
      case 'del':
         if(typeof(buffer) === 'string'){
            buffer = buffer.length === 1 ? '0' : buffer.substring(0, buffer.length - 1);
         }
         else{
            buffer = document.querySelector('.screen').textContent
            buffer = buffer.length === 1 ? '0' : buffer.substring(0, buffer.length - 1);
         }
         break;
      case '+':
      case '-':
      case '/':
      case '×':
         handleMath(symbol)
         break;
      default:
         break;
   }
}

const handleMath = (symbol) => {
   if(buffer === '0') return
   const floatBuffer = parseFloat(buffer)
   runninTotal === 0 ? runninTotal = floatBuffer : flushOperation(floatBuffer)
   previousOperator = symbol;
   buffer = '0';
}

const flushOperation = (floatBuffer) => {
   if(previousOperator === "+") runninTotal += floatBuffer
   else if(previousOperator === "-") runninTotal -= floatBuffer
   else if(previousOperator === "/") runninTotal /= floatBuffer
   else if(previousOperator === "×") runninTotal *= floatBuffer
}

const handleNumber = (numberString) => {
   buffer = screen.textContent
   if(numberString === '.'){
      if(buffer.includes('.')) return
      else buffer += numberString
   }
   else{
      buffer === '0' ? buffer = numberString : buffer += numberString
   }
   
}

const init = () => {
   document.querySelector('.calc__btns').onclick = (e) => {
      btnClick(e.target.textContent)
   }
}

init()