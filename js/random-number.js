export const getRandomNumber = (from, to) => {
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
  return Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom;

};

export const getRandomCoordinates = (from, to, quantityAfterDecimal) => {
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
};
