

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('#avatar-image');
const fileChooserApartmentPhotos = document.querySelector('.ad-form__upload input[type=file]');
const previewApartmentPhotos = document.querySelector('.ad-form__photo');

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

function createImageElement() {
  const img = document.createElement('img');
  img.classList.add('user-photo');
  img.style.width = '70px';
  img.style.height = '70px';
  img.style.marginRight = '10px';
  previewApartmentPhotos.appendChild(img);
  previewApartmentPhotos.style.backgroundColor = '#f0f0ea';
  previewApartmentPhotos.style.width = '100%';
  return img;
}

export function initialize() {
  fileChooserAvatar.addEventListener('change', () => {
    loadImage(fileChooserAvatar, previewAvatar);
  });
  fileChooserApartmentPhotos.addEventListener('change', () => {
    const img = createImageElement();
    loadImage(fileChooserApartmentPhotos, img);
  });
}


