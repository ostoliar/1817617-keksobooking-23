function randomNumber(from, to) {
  let message = document.querySelector('.notice__title');
  if (to <= from) {
    try { 
      if(to < from)  throw 'Переданное значение «до» меньшее, чем значение «от»';
      if(to === from) throw 'Переданное значение «до» равное значению «от».';
    }
    catch(err) {
      message.innerHTML = 'Переданное значение ' + err;
    }
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

randomNumber(9, 30);

function randomCoordinates(from, to, quantityAfterDecimal) {
  let message = document.querySelector('.notice__title');
  if (to <= from) {
    try { 
      if(to < from)  throw 'Переданное значение «до» меньшее, чем значение «от»';
      if(to === from) throw 'Переданное значение «до» равное значению «от».';
    }
    catch(err) {
      message.innerHTML = 'Переданное значение ' + err;
    }
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  const number = Math.random() * (to - from + 1) + from;
  const randomCoordinate = number.toFixed(quantityAfterDecimal);
  return randomCoordinate;
}

randomCoordinates(0, 9.8, 2);
