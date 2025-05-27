# ACTION PLAN: Calendar & Appointment Booking System (Phase 1: Core Functionality)

This document outlines the steps to implement the fundamental functionality of the calendar and appointment booking system using SvelteKit and Appwrite.

## Goal

Implement and test core Appwrite interactions: storing/retrieving appointments, user auth, hosts creating appointments, and bookers viewing/booking appointments. No external Zoom/email integration in this phase.

## Appwrite Configuration Reference

- **Project ID:** `68357409002d8b46f512`
- **API Endpoint:** `https://fra.cloud.appwrite.io/v1`
- **Database ID:** `68357c7b00070f3dbade`
- **Appointments Collection ID:** `68357d08003a530aa17d`

---

## Milestone 1: Appwrite Backend Setup

- [x] **Task 1.1: Create Appwrite Database**
    - In the Appwrite Console, navigate to "Databases".
    - Create a new database if you don't have one already. Record its ID as `YOUR_DATABASE_ID`.
- [x] **Task 1.2: Create `appointments` Collection**
    - Within your database, create a new collection named `appointments`. Record its ID as `appointments_collection`.
    - Define Attributes:
        - [x] `title`: String (size: 255, not required)
        - [x] `description`: String (size: 10000, not required)
        - [x] `appointmentDateTime`: Datetime (required)
        - [x] `durationMinutes`: Integer (required)
        - [x] `hostUserId`: String (size: 255, required)
        - [x] `hostUserName`: String (size: 255, required)
        - [x] `isBooked`: Boolean (required, default: `false`)
        - [x] `bookedByUserId`: String (size: 255, not required)
        - [x] `bookedByUserName`: String (size: 255, not required)
        - [x] `bookedAt`: Datetime (not required)
        - [x] `zoomMeetingId`: String (size: 255, not required)
        - [x] `zoomJoinUrl`: String (size: 1024, not required)
        - [x] `zoomStartUrl`: String (size: 1024, not required)
    - Define Indexes (suggested for querying):
        - [x] Index on `appointmentDateTime`
        - [x] Index on `isBooked`
        - [x] Index on `hostUserId`
        - [x] Index on `bookedByUserId`
- [x] **Task 1.3: Set Collection Permissions for `appointments`**
    - Go to the "Settings" tab for the `appointments` collection.
    - Permissions:
        - Add Role: `users` (Authenticated Users)
            - [x] Read Documents: Granted
            - [x] Create Documents: Granted
            - [x] Update Documents: Granted
            - [x] Delete Documents: Granted (We will rely on document-level security or frontend logic to ensure users only delete/update their own items appropriately for this phase).

---

## Milestone 2: SvelteKit Frontend Setup for Appointments

- [x] **Task 2.1: Create Appwrite Database Helper Module**
    - Create `src/lib/appwrite_db.js`.
    - This module will export functions for interacting with the `appointments` collection.
    - [x] Add imports: `client` (from `../appwrite`), `Databases`, `ID`, `Query` from `appwrite`.
    - [x] Initialize `Databases` service: `const databases = new Databases(client);`
    - [x] Store `YOUR_DATABASE_ID` and `appointments_collection` ID (once known) as constants.
- [x] **Task 2.2: Update `src/routes/+page.svelte` (Auth Page)**
    - [x] Import `goto` from `$app/navigation`.
    - [x] Import `account` and `client` (or a store for user session) to check login status. (Now uses `currentUser` store)
    - [x] On successful login (in `login` function) and if user session is found on page load, redirect to `/dashboard` using `goto('/dashboard')`.
    - [x] Ensure `currentUser` store is populated/cleared correctly.
- [x] **Task 2.3: Create User Session Store**
    - Create `src/lib/stores/userStore.js` (or similar).
    - [x] Create a writable store `currentUser` initialized to `null`.
    - [x] In `src/routes/+layout.svelte` (or `app.html` if preferred for initial load):
        - Attempt to get the current Appwrite session (`account.get()`).
        - If successful, set `currentUser.set(sessionData)`.
        - If fails, set `currentUser.set(null)`.
    - Update `src/routes/+page.svelte` to use this store. (Covered by 2.2 changes)

---

## Milestone 3: Appointment Creation ("Host" Functionality)

- [x] **Task 3.1: Create `src/routes/dashboard/+page.svelte`**
    - [x] Basic structure with a welcome message.
    - [x] Placeholder sections for "Create Appointment", "Available Appointments", etc.
    - [x] Subscribe to `currentUser` store to get user details.
- [x] **Task 3.2: Create `src/lib/components/AppointmentForm.svelte`**
    - [x] Form with inputs for: `title`, `description`, `appointmentDateTime` (use `<input type="datetime-local">`), `durationMinutes`.
    - [x] "Create Appointment" button.
    - [x] Emit an event or call a prop function on submit with form data.
- [x] **Task 3.3: Implement Appointment Creation Logic in `appwrite_db.js`**
    - [x] `createAppointment(appointmentData, hostUser)` function:
        - Takes `appointmentData` (title, description, dateTime, duration) and `hostUser` (from `currentUser` store).
        - Constructs the document payload including `hostUserId: hostUser.$id`, `hostUserName: hostUser.name`.
        - Calls `databases.createDocument(...)` for the `appointments` collection.
        - Returns the created document or throws an error.
- [x] **Task 3.4: Integrate Form in `dashboard/+page.svelte`**
    - [x] Import and use `AppointmentForm.svelte`.
    - [x] Handle the submit event:
        - Get current user from `currentUser` store.
        - Call `createAppointment` from `appwrite_db.js`.
        - Provide user feedback (success/error message).
        - (Optional) Refresh list of hosted appointments.

---

## Milestone 4: Viewing Appointments

- [ ] **Task 4.1: Create `src/lib/components/AppointmentList.svelte`**
    - [ ] Prop: `appointments` (array of appointment documents).
    - [ ] Prop: `listType` (e.g., "available", "bookedByMe", "hostedByMe", "all") to conditionally render action buttons or details.
    - [ ] Displays appointments in a list or cards.
    - [ ] For "available" appointments, show a "Book" button.
    - [ ] For "hostedByMe" appointments, show "Edit"/"Delete" buttons (Delete for this phase).
    - [ ] For "bookedByMe" appointments, show details and maybe a "Cancel Booking" button (future).
- [ ] **Task 4.2: Implement Appointment Fetching Logic in `appwrite_db.js`**
    - [ ] `getAvailableAppointments()`:
        - `databases.listDocuments(...)` with `Query.equal('isBooked', false)`, `Query.orderDesc('appointmentDateTime')`.
    - [ ] `getAppointmentsHostedBy(userId)`:
        - `databases.listDocuments(...)` with `Query.equal('hostUserId', userId)`, `Query.orderDesc('appointmentDateTime')`.
    - [ ] `getAppointmentsBookedBy(userId)`:
        - `databases.listDocuments(...)` with `Query.equal('bookedByUserId', userId)`, `Query.orderDesc('appointmentDateTime')`.
- [ ] **Task 4.3: Display Appointments in `dashboard/+page.svelte`**
    - [ ] On page load (e.g., in `onMount`), fetch different lists of appointments using functions from `appwrite_db.js`.
        - Need `currentUser.$id` for hosted/booked lists.
    - [ ] Store these lists in local Svelte state (e.g., `availableAppointments`, `myHostedAppointments`, `myBookedAppointments`).
    - [ ] Pass these lists to instances of `AppointmentList.svelte`.

---

## Milestone 5: Booking Appointments ("Booker" Functionality)

- [ ] **Task 5.1: Implement Appointment Booking Logic in `appwrite_db.js`**
    - [ ] `bookAppointment(appointmentId, bookerUser)` function:
        - Takes `appointmentId` and `bookerUser` (from `currentUser` store).
        - Data to update: `isBooked: true`, `bookedByUserId: bookerUser.$id`, `bookedByUserName: bookerUser.name`, `bookedAt: new Date().toISOString()`.
        - Calls `databases.updateDocument(...)`.
        - Ensure it only books if `isBooked` is currently `false` (either via Appwrite security rules later or a read-before-write check, though the latter has race conditions. For now, a simple update).
- [ ] **Task 5.2: Add "Book" Functionality to `AppointmentList.svelte`**
    - When `listType` is "available", the "Book" button for an appointment should:
        - Get current user from `currentUser` store.
        - Call `bookAppointment(appointment.$id, currentUser)`.
        - Provide user feedback.
        - Refresh relevant appointment lists (available, my booked).
- [ ] **Task 5.3: Implement Appointment Deletion Logic (for "Host") in `appwrite_db.js`**
    - [ ] `deleteAppointment(appointmentId, hostUserId)`:
        - Before calling `databases.deleteDocument(...)`, ideally verify `hostUserId` matches the document's `hostUserId`. For this phase, ensure the call is made from a context where `hostUserId` is confirmed.
        - (Future: Appwrite document-level security can enforce this).
- [ ] **Task 5.4: Add "Delete" Functionality to `AppointmentList.svelte`**
    - When `listType` is "hostedByMe" and appointment is NOT booked:
        - "Delete" button calls `deleteAppointment(appointment.$id, currentUser.$id)`.
        - Provide user feedback.
        - Refresh hosted appointments list.

---

## Documentation & Refinement

- [ ] Review and refine Appwrite collection permissions for more granular security (post-Phase 1).
- [ ] Add more robust error handling and user feedback.
- [ ] Consider UI/UX improvements (styling, date/time pickers, calendar view components).

Please provide your Appwrite **Database ID** when you're ready to start Milestone 1.
This plan will be updated as we progress. 