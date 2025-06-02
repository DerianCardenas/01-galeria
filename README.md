# My Photo Album - A Personal Gallery Project

Inspired by Google Photos, this project aims to create a personal space for organizing and viewing cherished memories.

## Current Stage

**Please Note:** This project is in its very early stages of development. It's primarily being built for portfolio purposes to showcase web development skills.

## Core Idea

The core idea is to provide a simple and intuitive interface for users to upload, manage, and view their personal photo collections.

## Current Features (LocalStorage Based)

*   **Photo Upload & Display:** Users can add photos which are then displayed in a gallery format.
*   **Gallery View:** Photos are presented in a responsive grid.
*   **Full-Screen Viewer:** Click on any photo to open it in a full-screen modal with navigation controls (next/previous).
*   **Tag Management:** Add, edit, and view tags associated with each photo to help with organization.
*   **Photo Deletion:** Remove photos from the gallery.

*All data, including images and tags, is currently stored using the browser's `localStorage`. This means data is specific to the current browser and not persistent across different devices or if browser data is cleared.*

## Future Vision & Ideas

This project serves as a foundation for several exciting features planned for the future:

*   **Remote Storage:**
    *   Connect to a personal remote server (e.g., a home PC setup).
    *   Integrate with cloud services like Firebase for more robust data persistence.
    *   Explore options for linking with Google Drive for storing non-critical files or backups.
*   **User Accounts:** Implement user registration and login for personalized galleries.
*   **Sharing Capabilities:** Allow users to share selected photos or albums with others.
*   **Advanced Search & Filtering:** Enhance search functionality based on tags, dates, etc.

## Technology Stack (So Far)

*   **Frontend:** Vue.js 3 (Composition API)
*   **Build Tool:** Vite
*   **Styling:** CSS (with potential for Tailwind CSS integration if not already present)
*   **Routing:** Vue Router
*   **Alerts:** SweetAlert2

## Basic Setup & Installation

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
This will typically start the application on `http://localhost:5173`.

---

Thank you for checking out this project!
