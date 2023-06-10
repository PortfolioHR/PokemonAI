const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const enlargedImage = document.getElementById("enlarged-image");

const imageFilenames = Array.from({ length: 151 }, (_, i) => `${i + 1}.png`);

imageFilenames.forEach((filename, index) => {
  const image = document.createElement("img");
  image.src = "images/" + filename;
  image.classList.add("thumbnail");

  image.addEventListener("click", () => {
    showEnlargedView(image.src, index); // Pass the thumbnail source and index
  });

  gallery.appendChild(image);
});

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  if (overlay.style.display === "flex") {
    if (event.key === "ArrowLeft") {
      showPreviousImage();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    } else if (event.key === "Escape") {
      minimizeEnlargedView();
    }
  }
}


let currentImageIndex = 0;

function showEnlargedView(imageSrc, thumbnailIndex) {

  currentImageIndex = thumbnailIndex; // Update the current index with the selected thumbnail index

  enlargedImage.src = imageSrc;
  overlay.style.display = "flex";


  // Create a close button element
  const closeButton = document.createElement("div");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "x";

  // Add a click event listener to the close button to close the enlarged image
  closeButton.addEventListener("click", minimizeEnlargedView);

  // Append the close button to the enlarged image container
  const enlargedImageContainer = document.getElementById("enlarged-image-container");
  enlargedImageContainer.appendChild(closeButton);

}

function minimizeEnlargedView() {
  overlay.style.display = "none";

  // Remove the click event listener from the overlay
  overlay.removeEventListener("click", minimizeEnlargedView);

  // Remove the close button from the enlarged image container
  const closeButton = document.querySelector(".close-button");
  if (closeButton) {
    closeButton.remove();
  }
}






const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

previousButton.addEventListener("click", showPreviousImage);
nextButton.addEventListener("click", showNextImage);

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + imageFilenames.length) % imageFilenames.length;
  const previousImageSrc = "images/" + imageFilenames[currentImageIndex];
  enlargedImage.src = previousImageSrc;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % imageFilenames.length;
  const nextImageSrc = "images/" + imageFilenames[currentImageIndex];
  enlargedImage.src = nextImageSrc;
}
