import { galleryItems } from "./gallery-items.js";
// Change code below this line
const container = document.querySelector(".gallery");
container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", onClick);

function onClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const currentPhoto = evt.target;
  const originalPhoto = currentPhoto.dataset.source;
  const descriptionPhoto = currentPhoto.alt;
  
  const instance = basicLightbox.create(`
     <div>
      <img src="${originalPhoto}" alt="${descriptionPhoto}" />
    </div>
`);
  instance.show();

  window.addEventListener("keydown", onKeyPress);
  function onKeyPress(evt) {
    if (evt.key === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onKeyPress);
    }
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}
