import { ref, computed } from 'vue';
import Swal from 'sweetalert2';

export function usePhotoGallery(initialImagenes, initialImgDetails, router) {
  const showModal = ref(false);
  const currentImage = ref('');
  const currentImageIndex = ref(0);
  const imagenes = ref(initialImagenes);
  const imgDetails = ref(initialImgDetails);
  const imageTags = ref([]); // These are the tags for the CURRENTLY VIEWED image
  const addTags = ref(false);
  const newTags = ref([]); // Should be an array for v-for in HomeView template

  const _updateCurrentImageDetails = () => {
    if (imagenes.value.length > 0 && currentImageIndex.value >= 0 && currentImageIndex.value < imagenes.value.length) {
      currentImage.value = imagenes.value[currentImageIndex.value];
      // Ensure imgDetails has an entry for the current image index
      if (!imgDetails.value[currentImageIndex.value]) {
        imgDetails.value[currentImageIndex.value] = { tags: [] };
      }
      imageTags.value = imgDetails.value[currentImageIndex.value]?.tags || [];
    } else {
      currentImage.value = '';
      imageTags.value = [];
    }
  };

  const showNextImage = () => {
    if (currentImageIndex.value < imagenes.value.length - 1) {
      currentImageIndex.value++;
    } else {
      currentImageIndex.value = 0; // Loop to the first image
    }
    _updateCurrentImageDetails();
  };

  const showPreviousImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--;
    } else {
      currentImageIndex.value = imagenes.value.length - 1; // Loop to the last image
    }
    _updateCurrentImageDetails();
  };

  const showImageFullScreen = (image, index) => {
    currentImageIndex.value = index;
    _updateCurrentImageDetails(); // This will set currentImage and imageTags
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  };

  const hideImageFullScreen = () => {
    showModal.value = false;
    document.body.style.overflow = 'auto';
  };

  const editTags = () => {
    newTags.value = [];
    const currentTags = imgDetails.value[currentImageIndex.value]?.tags || [];
    for (let i = 0; i < 3; i++) { // Replicate original behavior of 3 input fields
      newTags.value.push(currentTags[i] || '');
    }
    addTags.value = true;
  };

  const saveTags = () => {
    const tagsToSave = newTags.value.map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (!imgDetails.value[currentImageIndex.value]) {
      imgDetails.value[currentImageIndex.value] = { tags: [] };
    }
    imgDetails.value[currentImageIndex.value].tags = tagsToSave;

    // Update localStorage for 'imgDetails' and the composite 'user' object
    // This assumes HomeView relies on "user" for initial load.
    const userObject = JSON.parse(localStorage.getItem('user')) || { imagenes: imagenes.value, detalles: [] };
    userObject.detalles = imgDetails.value;
    localStorage.setItem('user', JSON.stringify(userObject));
    // Also update imgDetails separately if it's used directly elsewhere, though "user" should be the main source.
    localStorage.setItem('imgDetails', JSON.stringify(imgDetails.value));


    imageTags.value = [...tagsToSave]; // Update the reactive imageTags for the view
    addTags.value = false;
    newTags.value = [];
  };

  const deletePhoto = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        imagenes.value.splice(currentImageIndex.value, 1);
        imgDetails.value.splice(currentImageIndex.value, 1);

        // Update localStorage: save the modified imagenes and imgDetails under the 'user' key
        const updatedUser = { imagenes: imagenes.value, detalles: imgDetails.value };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Remove standalone imgDetails if "user" is the sole source of truth.
        // For now, let's keep it for safety, but ideally, it's managed via "user".
        localStorage.setItem('imgDetails', JSON.stringify(imgDetails.value));


        Swal.fire(
          '¡Borrado!',
          'Tu foto ha sido eliminada.',
          'success'
        );
        hideImageFullScreen();

        if (imagenes.value.length === 0) {
          currentImage.value = '';
          imageTags.value = [];
          router.push('/'); // Navigate away if no images left
        } else {
          // Adjust index if the deleted image was the last one
          if (currentImageIndex.value >= imagenes.value.length) {
            currentImageIndex.value = imagenes.value.length - 1;
          }
          _updateCurrentImageDetails(); // Show the new current image (or previous if last was deleted)
        }
      }
    });
  };

  // Initial setup of current image details when the composable is first used
  if (imagenes.value.length > 0) {
    _updateCurrentImageDetails();
  }

  return {
    showModal,
    currentImage,
    currentImageIndex, // Mainly for internal logic, view might not need it directly
    imagenes,
    imgDetails, // Expose for potential direct use or watching in parent
    imageTags, // Tags for the current image, for display
    addTags, // Boolean to toggle tag editing UI
    newTags, // Array bound to tag input fields
    showNextImage,
    showPreviousImage,
    showImageFullScreen,
    hideImageFullScreen,
    editTags,
    saveTags,
    deletePhoto,
  };
}
