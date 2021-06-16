const message = document.querySelector('.notice__title');

function showErrorMessage(err) {
  message.innerHTML = `Переданное значение ${err}`;
}

// function getRandomNumber(from, to) {
//   if (to < from) {
//     throw new Error("«до» меньшее, чем значение «от»");
//   }
//   if (to === from) {
//     throw new Error("«до» равное значению «от».");
//   }
//   const roundedFrom = Math.ceil(from);
//   const roundedTo = Math.floor(to);

//   return (
//     Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom
//   );
// }

function getRandomNumber(from, to) {
  if (to < from) {
    showErrorMessage('«до» меньшее, чем значение «от»');
    return -1;
  }
  if (to === from) {
    showErrorMessage('«до» равное значению «от».');
    return -1;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);

  return (
    Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom
  );
}

function getRandomCoordinates(from, to, quantityAfterDecimal) {
  if (to < from) {
    showErrorMessage('«до» меньшее, чем значение «от»');
    return -1;
  }
  if (to === from) {
    showErrorMessage('«до» равное значению «от».');
    return -1;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);
  const randomNumber = Math.random() * (roundedTo - roundedFrom) + roundedFrom;

  return randomNumber.toFixed(quantityAfterDecimal);
}

export {getRandomNumber, getRandomCoordinates};
