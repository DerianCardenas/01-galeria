<template>
  <div class="p-6 sm:p-10 bg-gallery-bg min-h-full"> <!-- Main background -->
    <div class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl">
      <h3 class="text-3xl font-semibold text-textPrimary mb-8 border-b border-neutral-300 pb-4">
        Profile Information
      </h3>

      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Profile Picture Section -->
        <div class="flex flex-col items-center md:w-1/3 w-full">
          <img
            :src="imgSrc"
            class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            alt="Profile Picture"
          >
          <button
            v-if="!editUser"
            @click="editUser = true"
            class="mt-4 text-primary border border-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors"
          >
            Edit Profile
          </button>
          <button
            v-if="editUser"
            @click="editUser = false; resetEditFields();"
            class="mt-4 text-neutral-700 border border-neutral-700 hover:bg-neutral-700 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors"
          >
            Cancel Edit
          </button>
        </div>

        <!-- Current Data Display -->
        <div class="md:w-2/3 w-full space-y-4">
          <div>
            <label class="block text-sm font-medium text-textSecondary mb-1">Username:</label>
            <input class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-neutral-100 text-textPrimary cursor-not-allowed" disabled :value="data.username" type="text">
          </div>
          <div>
            <label class="block text-sm font-medium text-textSecondary mb-1">Password:</label>
            <div class="relative">
              <input class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-neutral-100 text-textPrimary pr-10 cursor-not-allowed" disabled :value="data.password" :type="passwordFieldTypeCurrent">
               <button type="button" @click="togglePasswordVisibility('current')" class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-neutral-500 hover:text-primary">
                  {{ passwordFieldTypeCurrent === 'password' ? 'Show' : 'Hide' }}
                </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-textSecondary mb-1">Account Created:</label>
            <input class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-neutral-100 text-textPrimary cursor-not-allowed" disabled :value="data.created_at" type="text">
          </div>
           <div v-if="data.edited_at">
            <label class="block text-sm font-medium text-textSecondary mb-1">Last Updated:</label>
            <input class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-neutral-100 text-textPrimary cursor-not-allowed" disabled :value="data.edited_at" type="text">
          </div>
        </div>
      </div>

      <!-- Edit User Data Section -->
      <div v-if="editUser" class="mt-10 border-t border-neutral-300 pt-8">
        <h4 class="text-2xl font-semibold text-textPrimary mb-6">Edit Your Details</h4>
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- New Profile Picture Upload -->
          <div class="lg:w-1/3 text-center">
            <img :src="newPfp || imgSrc" alt="New profile picture preview" class="mx-auto w-40 h-40 rounded-full object-cover shadow-md border-4 border-neutral-200 mb-4">
            <label for="pfpUpload" class="cursor-pointer bg-secondary text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
              Change Photo
            </label>
            <input type="file" id="pfpUpload" class="hidden" @change="handleFileInputChange" accept="image/*">
            <p class="text-xs text-neutral-500 mt-2">Max file size: 1MB (approx)</p>
          </div>

          <!-- New Username and Password Fields -->
          <div class="lg:w-2/3 space-y-6">
            <div>
              <label for="newUsername" class="block text-sm font-medium text-textSecondary mb-1">New Username:</label>
              <input id="newUsername" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-textPrimary focus:ring-2 focus:ring-primary focus:border-transparent" v-model="newUsername" type="text" placeholder="Enter new username (optional)">
            </div>
            <div>
              <label for="newPassword" class="block text-sm font-medium text-textSecondary mb-1">New Password:</label>
              <div class="relative">
                <input id="newPassword" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-textPrimary pr-10 focus:ring-2 focus:ring-primary focus:border-transparent" v-model="newPassword" :type="passwordFieldTypeNew1" placeholder="Enter new password (optional)">
                <button type="button" @click="togglePasswordVisibility('new1')" class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-neutral-500 hover:text-primary">
                  {{ passwordFieldTypeNew1 === 'password' ? 'Show' : 'Hide' }}
                </button>
              </div>
            </div>
            <div>
              <label for="newPassword2" class="block text-sm font-medium text-textSecondary mb-1">Confirm New Password:
                <span v-if="newPassword !== newPassword2 && newPassword2 !== ''" class="text-danger text-xs ml-2">Passwords do not match</span>
              </label>
              <div class="relative">
                <input id="newPassword2" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-textPrimary pr-10 focus:ring-2 focus:ring-primary focus:border-transparent" v-model="newPassword2" :type="passwordFieldTypeNew2" placeholder="Confirm new password">
                 <button type="button" @click="togglePasswordVisibility('new2')" class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-neutral-500 hover:text-primary">
                  {{ passwordFieldTypeNew2 === 'password' ? 'Show' : 'Hide' }}
                </button>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button
                :disabled="!blockSave"
                @click="openModal"
                class="font-semibold py-2.5 px-6 rounded-lg shadow transition-colors"
                :class="blockSave ? 'bg-success text-white hover:bg-opacity-90' : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue"
import Swal from 'sweetalert2'; // Removed /dist/sweetalert2 as it's often not needed
import {useRouter} from "vue-router"

const router = useRouter();
const editUser = ref(false);
const data = JSON.parse(localStorage.getItem("user")) || { username: 'Guest', password: '', pfp: '', created_at: 'N/A', imagenes: [], detalles: [] }; // Fallback for data

const defaultPfp = "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";
const imgSrc = ref(data.pfp || defaultPfp);
const newPfp = ref(""); // Stores base64 of new PFP for preview

const newUsername = ref("");
const newPassword = ref("");
const newPassword2 = ref("");

const passwordFieldTypeCurrent = ref('password');
const passwordFieldTypeNew1 = ref('password');
const passwordFieldTypeNew2 = ref('password');

const togglePasswordVisibility = (field) => {
  if (field === 'current') {
    passwordFieldTypeCurrent.value = passwordFieldTypeCurrent.value === 'password' ? 'text' : 'password';
  } else if (field === 'new1') {
    passwordFieldTypeNew1.value = passwordFieldTypeNew1.value === 'password' ? 'text' : 'password';
  } else if (field === 'new2') {
    passwordFieldTypeNew2.value = passwordFieldTypeNew2.value === 'password' ? 'text' : 'password';
  }
};

const resetEditFields = () => {
    newUsername.value = "";
    newPassword.value = "";
    newPassword2.value = "";
    newPfp.value = ""; // Clear preview
    // Reset password field types if they were changed to 'text'
    passwordFieldTypeNew1.value = 'password';
    passwordFieldTypeNew2.value = 'password';
};

const blockSave = computed( () => {
    // Condition for enabling save:
    // 1. At least one field (newUsername, newPfp) is changed OR newPassword is valid and confirmed.
    // 2. If newPassword is provided, it must match newPassword2.
    const pfpChanged = newPfp.value !== "";
    const usernameChanged = newUsername.value !== "" && newUsername.value !== data.username;

    const passwordValidAndConfirmed = newPassword.value !== "" && newPassword.value === newPassword2.value;
    const passwordFieldsEmpty = newPassword.value === "" && newPassword2.value === "";

    if (!passwordFieldsEmpty && newPassword.value !== newPassword2.value) {
        return false; // Passwords provided but don't match
    }

    return pfpChanged || usernameChanged || passwordValidAndConfirmed;
});


const handleFileInputChange =(event)=> {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
        newPfp.value = reader.result; // For preview
    };
    reader.readAsDataURL(file);
  }
}

const openModal = () => {
    if (!blockSave.value) return; // Should not happen if button is disabled, but as a safeguard

    Swal.fire({
        title: 'Update Profile?',
        text: "Are you sure you want to save these changes?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981', // Tailwind's green-500 (success color)
        cancelButtonColor: '#6B7280',  // Tailwind's gray-500 (neutral-500)
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel',
        // Tailwind classes can be used here if Swal's default HTML structure is targeted by global styles or specific plugin
        // customClass: {
        //   confirmButton: '...',
        //   cancelButton: '...'
        // }
        }).then((result) => {
        if (result.isConfirmed) {
            saveData();
        }
    })
}
const saveData = () => {
        const date = new Date().toLocaleDateString();
        let userEdited = { ...data }; // Clone existing data

        if (newUsername.value.trim() !== "" && newUsername.value.trim() !== data.username) {
            // Important: If username changes, the key in localStorage also needs to change.
            // This means removing the old key and setting the new one.
            // This logic can be complex if other parts of app rely on 'user' item being the *current* user.
            // For simplicity here, we assume 'user' in localStorage is the source of truth for current session.
            // And individual items like `localStorage.getItem(username.value)` are for login check.

            // If changing username, remove old record if it exists
            if (localStorage.getItem(data.username) && data.username !== newUsername.value.trim()) {
                 localStorage.removeItem(data.username);
            }
            userEdited.username = newUsername.value.trim();
        }

        if (newPassword.value !== "" && newPassword.value === newPassword2.value) {
            userEdited.password = newPassword.value;
        }

        if (newPfp.value !== "") {
            userEdited.pfp = newPfp.value;
        }

        userEdited.edited_at = date;

        try {
            // Save under new username key (if changed) or old one
            localStorage.setItem(userEdited.username, JSON.stringify(userEdited));
            // Update the general 'user' session item
            localStorage.setItem("user", JSON.stringify(userEdited));

            Swal.fire('Success!', 'Your profile has been updated.', 'success');
            editUser.value = false; // Exit edit mode
            router.go(0); // Reload to reflect changes, especially if username (key) changed
        } catch (e) {
            console.error("Error saving to localStorage:", e);
            let errorMessage = "Could not update profile. Storage might be full.";
            if (e.name === 'QuotaExceededError' || (e.message && e.message.toLowerCase().includes('quota'))) {
                errorMessage = "Profile picture might be too large or storage is full.";
            }
            Swal.fire({
                title: 'Update Failed',
                text: errorMessage,
                icon: 'error',
            });
        }
}
</script>

<style scoped>
/* All old scoped styles are removed. Tailwind utility classes are used directly in the template. */
/* The fadeIn animation from the old style is not directly replicated here but can be added with Tailwind's animation utilities if needed. */
</style>
