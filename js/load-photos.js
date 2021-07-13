

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('#avatar-image');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function loadImage(fileChooseElement, imageElement) {
  const file = fileChooseElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imageElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

fileChooserAvatar.addEventListener('change', () => {
  loadImage(fileChooserAvatar, previewAvatar);
});

const fileChooserApartmentPhotos = document.querySelector('.ad-form__upload input[type=file]');
const previewApartmentPhotos = document.querySelector('.ad-form__photo');

fileChooserApartmentPhotos.addEventListener('change', () => {
  const img = document.createElement('img');
  img.style.width = '70px';
  img.style.height = '70px';
  img.style.marginRight = '10px';
  previewApartmentPhotos.appendChild(img);
  previewApartmentPhotos.style.backgroundColor = '#f0f0ea';
  previewApartmentPhotos.style.width = '100%';

  loadImage(fileChooserApartmentPhotos, img);
});

export {fileChooserAvatar as fileChooser, previewAvatar as preview, FILE_TYPES, fileChooserApartmentPhotos, previewApartmentPhotos};
