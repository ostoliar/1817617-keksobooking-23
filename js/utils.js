const alertSyles = {
  zIndex: 100,
  position: 'absolute',
  left: 0,
  top: '700px',
  right: 0,
  padding: '100px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor : '#ffaa99',
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export function showAlert(message) {
  const alertContainer = document.createElement('div');

  for (const [key, value] of Object.entries(alertSyles)) {
    alertContainer.style[key] = value;
  }
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}


export { isEscEvent };
