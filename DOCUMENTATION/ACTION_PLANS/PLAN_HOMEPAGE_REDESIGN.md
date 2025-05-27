# ACTION PLAN: Homepage Redesign & Enhanced User Experience

This plan outlines the steps to transform the current login page (`src/routes/+page.svelte`) into a proper homepage with placeholder website content, integrate login/registration functionality smoothly, and ensure a clear user flow to the dashboard.

## Goal

- The route `/` will serve as a general website landing page with placeholder content.
- Login/Registration functionality will be seamlessly integrated into the homepage design on `/`.
- The global navigation bar (from `+layout.svelte`) will continue to be the primary indicator of login status and the gateway to the dashboard for logged-in users or the login section for logged-out users.
- Ensure the homepage (`/`) loads its content immediately, without displaying "Loading user information..." messages. This message is acceptable only for protected routes like `/dashboard` if a session is being verified or before redirection.

---

## Milestone 1: Homepage Structure & Login Form Integration

- [ ] **Task 1.1: Restructure `src/routes/+page.svelte` for Homepage Content**
    - [ ] Keep the existing `<script>` section containing login/registration logic.
    - [ ] Wrap the existing login form (`<div class="container">...</div>`) in a specific section (e.g., `<section id="auth-section">`).
    - [ ] Add new HTML sections above and/or below the auth section to serve as placeholders for typical homepage content:
        - Example: `<section id="hero"><h1>Welcome to JOMA Appointments!</h1>...</section>`
        - Example: `<section id="features"><p>Placeholder for features...</p></section>`
        - Example: `<section id="about"><p>Placeholder for about us...</p></section>`
    - [ ] Remove the standalone paragraph `<p>Please log in or register.</p>` as the form's context will be part of the larger page.
- [ ] **Task 1.2: Initial Styling for New Homepage Layout**
    - [ ] In `<style>` of `src/routes/+page.svelte`:
        - Adjust existing styles for `.container` (now within `#auth-section`) if needed, or make them specific to `#auth-section .container`.
        - Remove or adjust `:global(body)` styles from `+page.svelte` if they are overly restrictive for a multi-section homepage (e.g., `display:flex` on body). The `margin: 0; background-color: #f0f2f5;` from the old `:global(body)` is likely fine to keep if applied generally in `app.html` or `+layout.svelte`, or can be scoped locally. For now, we'll assume the one in `+page.svelte` might need to be less specific.
        - Add basic placeholder styling for new sections (`#hero`, `#features`, `#about`) for visual separation (e.g., padding, background colors).

---

## Milestone 2: User Flow and Experience Refinement

- [ ] **Task 2.1: Verify Homepage Content Visibility**
    - [ ] Test loading `/` when logged out and logged in.
    - [ ] Confirm that the new homepage sections (hero, features, etc.) are displayed immediately and are not hidden behind any "Loading user information..." messages.
- [ ] **Task 2.2: Confirm Login/Registration Functionality**
    - [ ] Test the login and registration process using the form now integrated into the homepage.
    - [ ] Ensure successful login/registration still correctly redirects to `/dashboard`.
    - [ ] Verify the global navigation bar in `+layout.svelte` updates the user's status and links correctly.
- [ ] **Task 2.3: Verify Dashboard Loading Behavior**
    - [ ] When logged out, attempting to access `/dashboard` directly should show the "Loading user information or redirecting..." message *briefly* before redirecting to `/` (the new homepage).
    - [ ] When logged in, `/dashboard` should load, showing "Loading appointments..." if data fetching takes time, but not get stuck on "Loading user information...".

--- 