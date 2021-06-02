function randomNumber(from, to) {
  if (to <= from) {
    alert(
      "Переданное значение «до» меньшее, чем значение «от», или равное ему."
    );
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

console.log(randomNumber(9, 30));

function randomCoordinates(from, to, quantityAfterDecimal) {
  if (to < from) {
    alert("Переданное значение «до» меньшее, чем значение «от».");
  }
  if (to === from) {
    alert("Переданное значение «до» равное значению «от».");
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  let number = Math.random() * (to - from + 1) + from;
  let randomCoordinate = number.toFixed(quantityAfterDecimal);
  return randomCoordinate;
}

console.log(randomCoordinates(0, 9.8, 2));
