i = 1;
  // set the initial value
var timer = function onTimer() {
  i++;
  if (i === 90000) {
    alert('Your time has expired!');
    
  }
  else {
    setTimeout(onTimer);
  }
}
  timer();