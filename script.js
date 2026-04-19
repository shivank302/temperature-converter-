// conversion logic and UI behaviour
(function(){
  const degreesEl = document.getElementById('degrees');
  const typeEl = document.getElementById('type');
  const resultEl = document.getElementById('result');
  const btn = document.getElementById('convertBtn');
  const err = document.getElementById('err');

  function showError(msg){
    err.textContent = msg;
    resultEl.textContent = '—';
  }

  function clearError(){
    err.textContent = '';
  }

  function format(n){
    // show up to 4 decimal places, but trim trailing zeros
    return parseFloat(n.toFixed(4)).toString();
  }

  btn.addEventListener('click', function(){
    clearError();
    const raw = degreesEl.value.trim();
    if(raw === ''){
      showError('Please enter a number');
      return;
    }
    const val = Number(raw);
    if(!isFinite(val)){
      showError('Please enter a valid number');
      return;
    }

    const from = typeEl.value; // 'fahrenheit' | 'celsius' | 'kelvin'
    let out = 0;
    let unit = '';

    if(from === 'fahrenheit'){
      // Fahrenheit -> Celsius
      out = (val - 32) * 5/9;
      unit = '°C';
    } else if(from === 'celsius'){
      // Celsius -> Fahrenheit
      out = (val * 9/5) + 32;
      unit = '°F';
    } else if(from === 'kelvin'){
      // Kelvin -> Celsius (matches original screenshot behavior)
      out = val - 273.15;
      unit = '°C';
    } else {
      showError('Unknown type');
      return;
    }

    resultEl.textContent = format(out) + ' ' + unit;
  });

  // allow Enter key to convert from keyboard
  degreesEl.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      btn.click();
    }
  });
})();
