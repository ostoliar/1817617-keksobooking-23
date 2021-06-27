const message = document.querySelector('.notice__title');

function showErrorMessage(err) {
  message.innerHTML = `Переданное значение ${err}`;
}

function getRandomNumber(from, to) {
  if (to < from) {
    return {
      error: true,
      msg: '«до» меньшее, чем значение «от»',
    };
  }
  if (to === from) {
    return {
      error: true,
      msg: '«до» равное значению «от».',
    };
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);
  const number = Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom;

  return {
    error: false,
    data: number,
  };
}

const result = getRandomNumber(1, 9);
if(result.error){
  showErrorMessage(result.msg);
}else{
  result.data;
}

function getRandomCoordinates(from, to, quantityAfterDecimal) {
  if (to < from) {
    return {
      error: true,
      msg: '«до» меньшее, чем значение «от»',
    };
  }
  if (to === from) {
    return {
      error: true,
      msg: '«до» равное значению «от».',
    };
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);
  const randomNumber = Math.random() * (roundedTo - roundedFrom) + roundedFrom;
  const coordinates =  randomNumber.toFixed(quantityAfterDecimal);

  return {
    error: false,
    data: coordinates,
  };
}

const resultCoordinates = getRandomCoordinates(4, 20);
if(resultCoordinates.error){
  showErrorMessage(resultCoordinates.msg);
}else{
  result.data;
}

export {getRandomNumber, getRandomCoordinates, result};
