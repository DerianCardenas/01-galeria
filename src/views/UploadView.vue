<template>
  <div class="p-6 sm:p-10 bg-gallery-bg min-h-full">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-semibold text-textPrimary mb-8">Upload Your Photos</h1>

      <div
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        class="border-4 border-dashed rounded-lg p-8 sm:p-12 text-center transition-colors duration-200 ease-in-out"
        :class="{ 'border-primary bg-blue-50': isDragging, 'border-neutral-300 hover:border-primary': !isDragging }"
      >
        <input
          type="file"
          multiple
          @change="onFileSelect"
          ref="fileInput"
          class="hidden"
          accept="image/png, image/jpeg, image/gif"
        />

        <div class="mb-6">
          <svg class="mx-auto h-16 w-16 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        <p class="mb-3 text-xl font-semibold text-textPrimary">
          Drag & drop your photos here
        </p>
        <p class="mb-6 text-sm text-textSecondary">
          or
        </p>

        <button
          @click="triggerFileInput"
          class="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all transform hover:scale-105"
        >
          Browse Files
        </button>

        <p v-if="selectedFiles.length > 0" class="mt-6 text-sm text-neutral-600">
          {{ selectedFiles.length }} file(s) selected. Click "Start Upload" to proceed.
        </p>
        <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
            <div class="w-full bg-neutral-200 rounded-full h-2.5">
                <div class="bg-secondary h-2.5 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
            </div>
            <p class="text-sm text-textSecondary mt-1">{{ uploadProgress }}%</p>
        </div>
      </div>

      <div v-if="selectedFiles.length > 0" class="mt-8 text-center">
        <button
          @click="startUpload"
          :disabled="isUploading"
          class="bg-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isUploading">Uploading...</span>
          <span v-else>Start Upload</span>
        </button>
      </div>
      
      <div v-if="uploadedFiles.length > 0" class="mt-8">
        <h3 class="text-xl font-semibold text-textPrimary mb-4">Uploaded Successfully:</h3>
        <ul class="list-disc list-inside text-green-600">
          <li v-for="file in uploadedFiles" :key="file.name">{{ file.name }}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const fileInput = ref(null); // Reference to the hidden file input
const selectedFiles = ref([]);
const uploadedFiles = ref([]);
const isDragging = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0); // Percentage for upload progress
const router = useRouter();

const triggerFileInput = () => {
  fileInput.value.click(); // Programmatically click the hidden file input
};

const handleFiles = (files) => {
  // Basic validation: ensure they are images and not too many/large (optional)
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    Swal.fire('No Images Selected', 'Please select image files (PNG, JPG, GIF).', 'warning');
    return;
  }
  selectedFiles.value = [...selectedFiles.value, ...imageFiles];
  // Clear the input value to allow selecting the same file again if needed
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const onFileSelect = (event) => {
  handleFiles(event.target.files);
};

const onDragOver = (event) => {
  isDragging.value = true;
};

const onDragLeave = (event) => {
  isDragging.value = false;
};

const onDrop = (event) => {
  isDragging.value = false;
  handleFiles(event.dataTransfer.files);
};

const startUpload = async () => {
  if (selectedFiles.value.length === 0) {
    Swal.fire('No Files', 'Please select files to upload.', 'info');
    return;
  }

  isUploading.value = true;
  uploadProgress.value = 0; // Reset progress

  // Simulate upload process for each file
  // In a real app, this would involve sending files to a server
  const userString = localStorage.getItem("user"); // Get user string
  if (!userString) {
    Swal.fire('Error', 'User data not found. Please log in.', 'error');
    isUploading.value = false;
    return;
  }
  
  let user;
  try {
    user = JSON.parse(userString);
  } catch (e) {
    Swal.fire('Error', 'Failed to parse user data. Data might be corrupted.', 'error');
    isUploading.value = false;
    return;
  }


  if (!user.imagenes) user.imagenes = [];
  if (!user.detalles) user.detalles = [];

  const totalFiles = selectedFiles.value.length;
  let filesProcessed = 0;

  for (const file of selectedFiles.value) {
    try {
      // Simulate reading file as base64 (as per existing logic if it was doing that)
      const reader = new FileReader();
      reader.onload = (e) => {
        user.imagenes.push(e.target.result);
        user.detalles.push({ name: file.name, tags: [], originalName: file.name, type: file.type });
        uploadedFiles.value.push({ name: file.name }); // Add to successfully uploaded list

        filesProcessed++;
        uploadProgress.value = Math.round((filesProcessed / totalFiles) * 100);

        if (filesProcessed === totalFiles) {
          localStorage.setItem('user', JSON.stringify(user));
          // Assuming username is available in user object for the second localStorage item
          if (user.username) {
            localStorage.setItem(user.username, JSON.stringify(user));
          } else {
            // Fallback or error if username is not available but was expected
            console.warn("Username not found in user object, cannot save to user.username key");
          }

          Swal.fire('Upload Complete!', `${uploadedFiles.value.length} photos uploaded successfully.`, 'success');
          isUploading.value = false;
          selectedFiles.value = []; // Clear selection
          uploadProgress.value = 100; // Mark as complete
          // Optionally navigate away or reset further
          setTimeout(() => {
             uploadProgress.value = 0; // Reset progress bar after a delay
             uploadedFiles.value = []; // Clear uploaded files list for next batch
             router.push('/home'); // Navigate to home after resetting UI elements
          }, 2000);
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        Swal.fire('File Read Error', `Could not read file ${file.name}.`, 'error');
        filesProcessed++; // Count as processed to not stall progress
        if (filesProcessed === totalFiles) {
          // Potentially save whatever was processed successfully up to this point
          localStorage.setItem('user', JSON.stringify(user));
          if (user.username) localStorage.setItem(user.username, JSON.stringify(user));
          isUploading.value = false; // Stop upload process
          // Do not clear selectedFiles so user can see what failed or retry
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error for file:", file.name, error);
      Swal.fire('Upload Failed', `Could not upload ${file.name}.`, 'error');
      filesProcessed++; // Count as processed
       if (filesProcessed === totalFiles) {
          localStorage.setItem('user', JSON.stringify(user));
          if (user.username) localStorage.setItem(user.username, JSON.stringify(user));
          isUploading.value = false;
       }
    }
  }
   if (totalFiles === 0) { // Should not happen if validated before, but as safeguard
      isUploading.value = false;
  }
};

</script>

<style scoped>
/* Add any specific scoped styles if needed, though prefer Tailwind utilities */
/* Example: if you need a very specific animation or transition for the drop zone */
</style>