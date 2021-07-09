

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('#avatar-image');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {fileChooser, preview, FILE_TYPES };
