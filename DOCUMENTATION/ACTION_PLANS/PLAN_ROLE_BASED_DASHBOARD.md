# ACTION PLAN: Role-Based Dashboard (Admin/Client vs. Regular User)

This plan outlines the steps to differentiate the dashboard experience for a "main user" (admin/client) who hosts appointments and regular users who book them.

## Goal

- Identify a "main user" (admin/client) via their Appwrite User ID.
- **Main User Dashboard:**
    - Can create new appointments.
    - Sees a comprehensive list of **all appointments they host**, indicating if they are booked (and by whom) or available.
    - Can delete their own unbooked appointments.
- **Regular User Dashboard:**
    - Cannot create appointments.
    - Sees a list of **available appointments** to book.
    - Sees a list of **their own booked appointments**.
- Update UI components and data fetching logic accordingly.

## Prerequisites

- Need the Appwrite User ID of the "main user" (admin/client).
    - Provided: `6835776c00327c1049fe`

---

## Milestone 1: Main User Identification & Basic Dashboard Logic

- [x] **Task 1.1: Define Main User ID Constant**
    - [x] In `src/routes/dashboard/+page.svelte` (or a new config file if preferred, e.g., `src/lib/config.js`), define a constant for the main user's Appwrite ID. 
    - [x] Example: `const MAIN_HOST_USER_ID = '6835776c00327c1049fe';`
- [x] **Task 1.2: Conditional Logic in Dashboard Page**
    - [x] In `src/routes/dashboard/+page.svelte`:
        - [x] Create a reactive variable `isMainUser` based on whether `$currentUser.$id === MAIN_HOST_USER_ID`.
        - [x] Conditionally show/hide the `AppointmentForm` based on `isMainUser`.
- [x] **Task 1.3: Adapt `AppointmentList.svelte` for Admin View of Hosted Appointments**
    - [x] Modify `AppointmentList.svelte` when `listType` is `'hostedByMe'`:
        - [x] If an appointment `appt` is booked (`appt.isBooked`), display who it was booked by (`appt.bookedByUserName`) and when (`appt.bookedAt`).
        - [x] The delete button for `hostedByMe` should still only appear if `!appt.isBooked`.

---

## Milestone 2: Data Fetching and Display for Roles

- [x] **Task 2.1: Main User - Fetching Hosted Appointments**
    - [x] In `src/routes/dashboard/+page.svelte`:
        - [x] If `isMainUser` is true, the primary list to fetch and display will be `getAppointmentsHostedBy(MAIN_HOST_USER_ID)`. This list will be passed to an `AppointmentList` instance with `listType='hostedByMe'`.
        - [x] For the main user, the sections for "Available Appointments" (as a separate query) and "My Booked Appointments" (as a booker) might be hidden or not fetched to simplify their view, as their `hostedByMe` list will show availability and booking status of their own appointments.
- [x] **Task 2.2: Regular User - Fetching Relevant Appointments**
    - [x] In `src/routes/dashboard/+page.svelte`:
        - [x] If `isMainUser` is false, continue to fetch and display:
            - [x] `getAvailableAppointments()` passed to `AppointmentList` with `listType='available'`.
            - [x] `getAppointmentsBookedBy($currentUser.$id)` passed to `AppointmentList` with `listType='bookedByMe'`.
        - [x] The "My Hosted Appointments" section should be hidden for regular users if they are not intended to create appointments.
- [x] **Task 2.3: Adjust Dashboard Template Structure**
    - [x] In `src/routes/dashboard/+page.svelte`'s template:
        - [x] Use `{#if isMainUser}` and `{:else}` blocks to render different sets of `AppointmentList` components and section titles based on the user role.

---

## Milestone 3: Testing and Refinement

- [ ] **Task 3.1: Test Main User View**
    - [ ] Log in as the main user.
    - [ ] Verify the "Create Appointment" form is visible.
    - [ ] Verify the list shows all appointments hosted by the main user, with correct booking status and booker details displayed.
    - [ ] Verify delete functionality for unbooked appointments.
- [ ] **Task 3.2: Test Regular User View**
    - [ ] Log in as a regular user.
    - [ ] Verify the "Create Appointment" form is NOT visible.
    - [ ] Verify the "My Hosted Appointments" list is NOT visible.
    - [ ] Verify "Available Appointments" list shows correctly.
    - [ ] Verify "My Booked Appointments" list shows correctly.
    - [ ] Test booking an appointment and see it move to "My Booked Appointments" and disappear from "Available."
- [ ] **Task 3.3: Code Cleanup and Review**
    - [ ] Remove any temporary debug alerts/logs (like the one in `src/routes/+page.svelte`'s login function).
    - [ ] Review for clarity and efficiency.

--- 