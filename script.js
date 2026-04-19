const degreesEl = document.getElementById('degrees');
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const resultEl = document.getElementById('result');
const btn = document.getElementById('convertBtn');
const err = document.getElementById('err');
const historyEl = document.getElementById('history');
const darkBtn = document.getElementById('darkBtn');

function showError(msg){
  err.textContent = msg;
  resultEl.textContent = '—';
}

function clearError(){
  err.textContent = '';
}

function convert(){
  clearError();

  const val = parseFloat(degreesEl.value);
  if(isNaN(val)){
    showError("Enter valid number");
    return;
  }

  let temp;

  // convert to celsius
  if(fromEl.value === "c") temp = val;
  else if(fromEl.value === "f") temp = (val - 32) * 5/9;
  else if(fromEl.value === "k") temp = val - 273.15;

  let final;

  // convert to target
  if(toEl.value === "c") final = temp;
  else if(toEl.value === "f") final = (temp * 9/5) + 32;
  else if(toEl.value === "k") final = temp + 273.15;

  final = final.toFixed(2);

  resultEl.textContent = final + "°";

  // history
  const li = document.createElement("li");
  li.textContent = `${val} ${fromEl.value.toUpperCase()} ➝ ${final} ${toEl.value.toUpperCase()}`;
  historyEl.prepend(li);
}

btn.addEventListener("click", convert);

// ENTER key support
degreesEl.addEventListener("keydown", e=>{
  if(e.key === "Enter") convert();
});

// DARK MODE
darkBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
}); 