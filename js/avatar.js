

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('#avatar-image');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const fileChooserApartmentPhotos = document.querySelector('.ad-form__upload input[type=file]');
const previewApartmentPhotos = document.querySelector('.ad-form__photo');

fileChooserApartmentPhotos.addEventListener('change', () => {
  const img = document.createElement('img');
  img.style.width = '70px';
  img.style.height = '70px';
  img.style.marginRight = '10px';
  previewApartmentPhotos.appendChild(img);
  const file = fileChooserApartmentPhotos.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {fileChooserAvatar as fileChooser, previewAvatar as preview, FILE_TYPES, fileChooserApartmentPhotos, previewApartmentPhotos};
