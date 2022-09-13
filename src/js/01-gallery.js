// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imageGalleryEl = document.querySelector('.gallery');

const makeGalleryItem = ({ preview, original, description } = {}) => {
  return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
};

const galleryItemsArr = galleryItems.map(makeGalleryItem);
// const galleryItemsArr = galleryItems.map(el => {
//   return makeGalleryItem(el);
// });

imageGalleryEl.innerHTML = galleryItemsArr.join('');
// console.log(galleryItemsArr.join(''));

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
