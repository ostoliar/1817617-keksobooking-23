
function showErrorMessage(err){
  const message = document.querySelector('.notice__title');
  message.innerHTML = `Переданное значение ${  err.message}`;
}

function validate(from, to){
  try {
    if (to < from) {
      throw new Error('«до» меньшее, чем значение «от»');
    }
    if (to === from) {
      throw new Error('«до» равное значению «от».');
    }
    return true;
  } catch (err) {
    showErrorMessage(err);
    return false;
  }
}

function getRandomNumber(from, to) {
  if(!validate(from, to)){
    return;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);

  return Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom;
}

function getRandomCoordinates(from, to, quantityAfterDecimal) {
  if(!validate(from, to)){
    return;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);
  const randomNumber = Math.random() * (roundedTo - roundedFrom + 1) + roundedFrom;
  return randomNumber.toFixed(quantityAfterDecimal);
}

getRandomNumber(9, 30);
getRandomCoordinates(0, 9.8, 2);
