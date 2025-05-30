# Membership Platform Enhancement Plan

## 1. Project Goal

Transform the existing SvelteKit application into a comprehensive membership webpage with enhanced appointment booking, a dedicated documentation page, and an online course video section, all built upon a strict component-driven architecture.

## 2. Current State Issues

*   `+page.svelte` files (especially `dashboard/+page.svelte`) contain excessive logic and UI rendering, violating the component-driven principle.
*   Lack of a clear structure for adding new, large features like documentation and courses in a modular way.

## 3. Target State & Architecture

*   `+page.svelte` files act as thin wrappers/routers.
*   All significant UI and logic are encapsulated in `src/lib/components/`.
*   Appwrite backend for new data models (documentation, courses).

## 4. Appwrite Setup for New Features

Before starting Svelte development for new features, create the following collections in your Appwrite project. Replace `YOUR_APPWRITE_DATABASE_ID` with your actual Database ID.

**Important:** For each collection, define appropriate permissions.
    *   **Public read access** is likely needed for articles and course lists/details.
    *   **Admin/Host write access** for creating/updating content.

1.  **Collection: `DocumentationArticles`**
    *   Collection ID (e.g., `documentation_articles`): `YOUR_COLLECTION_ID_DOCS`
    *   Attributes:
        *   `title` (String, required)
        *   `slug` (String, required, unique - e.g., "my-first-article")
        *   `content` (String, required, Markdown or HTML)
        *   `category` (String, optional)
        *   `authorName` (String, optional)
        *   `publishedAt` (Datetime, optional)
        *   `isPublished` (Boolean, default: false)

2.  **Collection: `Courses`**
    *   Collection ID (e.g., `courses`): `YOUR_COLLECTION_ID_COURSES`
    *   Attributes:
        *   `title` (String, required)
        *   `slug` (String, required, unique - e.g., "sveltek_basics_course")
        *   `description` (String, required)
        *   `thumbnailUrl` (String, optional)
        *   `instructorName` (String, optional)
        *   `isPublished` (Boolean, default: false)

3.  **Collection: `CourseModules`**
    *   Collection ID (e.g., `course_modules`): `YOUR_COLLECTION_ID_MODULES`
    *   Attributes:
        *   `courseId` (String, required, consider creating a relationship to `Courses` collection)
        *   `title` (String, required)
        *   `order` (Integer, required, for sequencing)

4.  **Collection: `CourseVideos` (or Lessons)**
    *   Collection ID (e.g., `course_videos`): `YOUR_COLLECTION_ID_VIDEOS`
    *   Attributes:
        *   `moduleId` (String, required, consider creating a relationship to `CourseModules` collection)
        *   `title` (String, required)
        *   `videoUrl` (String, required - e.g., YouTube embed URL, Vimeo ID, or self-hosted file URL)
        *   `description` (String, optional)
        *   `durationMinutes` (Integer, optional)
        *   `order` (Integer, required, for sequencing within a module)

## 5. Execution Plan: Milestones & Tasks

### Milestone 1: Refactor Dashboard & Core Structure

**Goal:** Establish the component-driven pattern by refactoring the existing dashboard.
**Status: [COMPLETED]** - All tasks finished, and critical 500 Internal Server Error on dashboard hard refresh resolved.

*   **Task 1.1: Create Dashboard View Components**
    *   `[X]` Create `src/lib/components/dashboard/HostDashboardView.svelte`
        *   This component will encapsulate the specific layout and child components for the host user.
        *   It will receive `allMyHostedAppointments`, `dataLoaded`, `fetchError` as props.
        *   It will contain the `StatsHistoryCard`, `AppointmentsCard` (configured for hosted), and `BookingManagementCard` (configured for creation).
```html
<!-- src/lib/components/dashboard/HostDashboardView.svelte -->
<script>
    export let allMyHostedAppointments;
    export let dataLoaded;
    export let fetchError;
    // Potentially other props like currentUser, showCreateFormState, etc.
    // Event dispatchers for actions like toggleCreateForm, submitAppointment, deleteAppointment

    import StatsHistoryCard from './StatsHistoryCard.svelte';
    import AppointmentsCard from './AppointmentsCard.svelte';
    import BookingManagementCard from './BookingManagementCard.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function forwardEvent(event) {
        dispatch(event.type, event.detail);
    }
</script>

{#if fetchError}
    <p class="text-red-500 bg-red-100 p-3 rounded-md">{fetchError}</p>
{/if}

{#if !dataLoaded && !fetchError}
    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard data...</p>
{:else if dataLoaded}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
            <StatsHistoryCard
                isMainUser={true}
                bind:dataLoaded
                bind:fetchError
                bind:allMyHostedAppointments
            />
        </div>
        <AppointmentsCard
            isMainUser={true}
            bind:dataLoaded
            bind:fetchError
            appointments={allMyHostedAppointments}
            listType="hostedByMe"
            on:deleteAppointment={forwardEvent}
        />
        <BookingManagementCard
            isMainUser={true}
            bind:dataLoaded
            bind:fetchError
            availableAppointments={[]} /* Or pass relevant data if needed */
            showCreateFormState={$$props.showCreateFormState} /* Assuming passed from parent */
            on:toggleCreateForm={forwardEvent}
            on:submitAppointment={forwardEvent}
        />
    </div>
{:else if !fetchError}
    <p class="text-white">No data loaded and no error.</p>
{/if}

```
    *   `[X]` Create `src/lib/components/dashboard/ClientDashboardView.svelte`
        *   This component will encapsulate the specific layout and child components for the client user.
        *   It will receive `myBookedAppointments`, `availableAppointments`, `dataLoaded`, `fetchError` as props.
        *   It will contain `AppointmentsCard` (configured for booked) and `BookingManagementCard` (configured for booking).
```html
<!-- src/lib/components/dashboard/ClientDashboardView.svelte -->
<script>
    export let myBookedAppointments;
    export let availableAppointments;
    export let dataLoaded;
    export let fetchError;
    // Potentially other props like currentUser
    // Event dispatchers for actions like bookAppointment, deleteAppointment (for their own bookings)

    import AppointmentsCard from './AppointmentsCard.svelte';
    import BookingManagementCard from './BookingManagementCard.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function forwardEvent(event) {
        dispatch(event.type, event.detail);
    }
</script>

{#if fetchError}
    <p class="text-red-500 bg-red-100 p-3 rounded-md">{fetchError}</p>
{/if}

{#if !dataLoaded && !fetchError}
    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard data...</p>
{:else if dataLoaded}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <!-- Client might not have StatsHistoryCard or it's a different version -->
        <AppointmentsCard
            isMainUser={false}
            bind:dataLoaded
            bind:fetchError
            appointments={myBookedAppointments}
            listType="bookedByMe"
            on:deleteAppointment={forwardEvent} /* If clients can cancel their bookings */
        />
        <BookingManagementCard
            isMainUser={false}
            bind:dataLoaded
            bind:fetchError
            bind:availableAppointments
            showCreateFormState={false} /* Clients don't create appointments */
            on:bookAppointment={forwardEvent}
        />
    </div>
{:else if !fetchError}
    <p class="text-white">No data loaded and no error.</p>
{/if}
```

*   **Task 1.2: Refactor `src/routes/dashboard/+page.svelte`**
    *   `[X]` Modify the script section to primarily handle:
        *   User authentication check (redirect if not logged in).
        *   Determining `isMainUser`.
        *   Calling `fetchAllAppointments` (this logic can remain but could also be moved to `+page.server.js` eventually).
        *   Managing `showCreateForm` state if it controls aspects of both host/client views or if `BookingManagementCard`'s internal state isn't sufficient.
        *   Event handlers (`handleAppointmentSubmit`, `handleBookAppointment`, etc.) will receive events from `HostDashboardView` or `ClientDashboardView`.
    *   `[X]` Modify the template section to:
        *   Render `HostDashboardView` or `ClientDashboardView` based on `isMainUser`.
        *   Pass all necessary props and bind event handlers.
```html
<!-- src/routes/dashboard/+page.svelte (Refactored Excerpt) -->
<script>
    import { currentUser } from '$lib/stores/userStore';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import backgroundImage from '$lib/images/stone.jpg';
    import {
        createAppointment,
        getAvailableAppointments,
        getAppointmentsHostedBy,
        getAppointmentsBookedBy,
        bookAppointment,
        deleteAppointment
    } from '$lib/appwrite_db.js';

    import HostDashboardView from '$lib/components/dashboard/HostDashboardView.svelte';
    import ClientDashboardView from '$lib/components/dashboard/ClientDashboardView.svelte';

    const MAIN_HOST_USER_ID = '6835776c00327c1049fe';
    let isMainUser = false;

    let allMyHostedAppointments = [];
    let availableAppointments = [];
    let myBookedAppointments = [];
    let fetchError = '';
    let creationStatus = '';
    
    let showCreateForm = false; 
    let dataLoaded = false;
    let isLoadingPage = true;
    let previousUserId = null;

    $: {
        if ($currentUser && $currentUser.$id) {
            isMainUser = $currentUser.$id === MAIN_HOST_USER_ID;
        } else {
            isMainUser = false;
        }
    }

    async function fetchAllAppointments(source = 'unknown') {
        // console.log(`fetchAllAppointments called from: ${source}. Current user:`, $currentUser ? $currentUser.$id : 'No user');
        if (!$currentUser || !$currentUser.$id) {
            dataLoaded = false;
            // console.log('fetchAllAppointments: No current user or user ID, returning.');
            return;
        }
        fetchError = '';
        isLoadingPage = true; // Show loading when fetching
        try {
            if (isMainUser) {
                const hostedAppointmentsResult = await getAppointmentsHostedBy(MAIN_HOST_USER_ID);
                allMyHostedAppointments = hostedAppointmentsResult;
                availableAppointments = []; // Clear data not relevant to host
                myBookedAppointments = [];
            } else {
                const [available, booked] = await Promise.all([
                    getAvailableAppointments(), 
                    getAppointmentsBookedBy($currentUser.$id)
                ]);
                availableAppointments = available;
                myBookedAppointments = booked;
                allMyHostedAppointments = []; // Clear data not relevant to client
            }
            dataLoaded = true;
        } catch (err) {
            // console.error("Dashboard: Error fetching role-specific appointments:", err); 
            fetchError = "Failed to load appointments: " + err.message;
            dataLoaded = false; 
        } finally {
            isLoadingPage = false;
        }
    }
    
    onMount(() => {
        if ($currentUser && $currentUser.$id) {
            isLoadingPage = false; // Initial check, might be true again during fetch
            if (!dataLoaded) {
                fetchAllAppointments('onMount');
            }
        } else if ($currentUser === null) {
            goto('/');
        }
    });

    $: { // Main reactive block for user changes
        if (typeof window !== 'undefined') { 
            if ($currentUser && $currentUser.$id) {
                if (isLoadingPage && !dataLoaded) { // If user resolved while page was initially loading
                    // This condition might need refinement to avoid multiple fetches
                }
                if (previousUserId !== $currentUser.$id) {
                    dataLoaded = false; // Reset for new user
                    previousUserId = $currentUser.$id;
                    isMainUser = $currentUser.$id === MAIN_HOST_USER_ID; // Recalculate role for new user
                    fetchAllAppointments('currentUser changed - new ID');
                } else if (!dataLoaded) { // Same user, but data wasn't loaded (e.g. navigated back)
                    fetchAllAppointments('currentUser resolved - no data');
                }
                // isLoadingPage should be false after fetchAllAppointments completes or if user was already resolved
                // The isLoadingPage = false was previously inside the fetchAllAppointments.
            } else if ($currentUser === null) { // Logout
                if (previousUserId !== null) {
                    dataLoaded = false;
                    previousUserId = null;
                    isMainUser = false;
                    allMyHostedAppointments = [];
                    availableAppointments = [];
                    myBookedAppointments = [];
                }
                if (window.location.pathname.startsWith('/dashboard')) {
                     goto('/');
                }
            }
        }
    }
    
    // Event Handlers (to be connected to HostDashboardView/ClientDashboardView)
    async function handleAppointmentSubmit(event) {
        if (!isMainUser || !$currentUser || !$currentUser.$id) { 
            creationStatus = 'Error: Only the main host can create appointments.';
            return;
        }
        creationStatus = 'Creating appointment...';
        try {
            const newAppointment = await createAppointment(event.detail, $currentUser);
            creationStatus = `Successfully created: ${newAppointment.title || 'Appointment'}`;
            await fetchAllAppointments('after submitAppointment'); 
            showCreateForm = false;
        } catch (error) {
            creationStatus = `Error creating appointment: ${error.message}`;
        }
    }

    async function handleBookAppointment(event) {
        const appointmentId = event.detail;
        // ... (existing logic)
        creationStatus = `Booking appointment ${appointmentId}...`;
        try {
            await bookAppointment(appointmentId, $currentUser);
            creationStatus = `Successfully booked appointment ${appointmentId}!`;
            await fetchAllAppointments('after bookAppointment');
        } catch (error) {
            // ... (existing logic)
            creationStatus = `Error booking appointment: ${error.message}`;
        }
    }

    async function handleDeleteAppointment(event) {
        const appointmentId = event.detail;
        // ... (existing logic)
        creationStatus = `Deleting appointment ${appointmentId}...`;
        try {
            await deleteAppointment(appointmentId);
            creationStatus = `Successfully deleted appointment ${appointmentId}.`;
            await fetchAllAppointments('after deleteAppointment');
        } catch (error) {
            // ... (existing logic)
            creationStatus = `Error deleting: ${error.message}`;
        }
    }

    function toggleShowCreateForm() {
        showCreateForm = !showCreateForm;
    }

</script>

<svelte:head>
    <title>Dashboard - Network 3.0</title>
</svelte:head>

<div class="relative min-h-screen w-full">
    <div class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0" style="background-image: url({backgroundImage});"></div>

    <div class="relative z-10 min-h-screen text-stone-800 p-4 sm:p-6 lg:p-8">
        {#if isLoadingPage && !$currentUser && typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')}
             <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading user information...</p>
            </div>
        {:else if $currentUser}
            <header class="mb-6 sm:mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
                    Welcome, {$currentUser.name || $currentUser.email.split('@')[0]}!
                </h1>
                <p class="text-sm font-semibold drop-shadow-sm {isMainUser ? 'text-emerald-300' : 'text-sky-300'}">
                    {isMainUser ? 'Host Dashboard' : 'Client Dashboard'}
                </p>
            </header>

            {#if isLoadingPage && dataLoaded === false } <!--  Show loading message specifically when fetching for a logged-in user -->
                 <div class="flex justify-center items-center min-h-[calc(50vh)]">
                    <p class="text-xl text-white bg-black/30 p-3 rounded-md">Fetching dashboard data...</p>
                </div>
            {:else if isMainUser}
                <HostDashboardView 
                    bind:allMyHostedAppointments
                    bind:dataLoaded
                    bind:fetchError
                    showCreateFormState={showCreateForm}
                    on:toggleCreateForm={toggleShowCreateForm}
                    on:submitAppointment={handleAppointmentSubmit}
                    on:deleteAppointment={handleDeleteAppointment}
                />
            {:else}
                <ClientDashboardView
                    bind:myBookedAppointments
                    bind:availableAppointments
                    bind:dataLoaded
                    bind:fetchError
                    on:bookAppointment={handleBookAppointment}
                    on:deleteAppointment={handleDeleteAppointment} /* If clients can cancel */
                />
            {/if}
            
            {#if creationStatus}
                <div class="fixed bottom-6 right-6 p-4 rounded-lg shadow-xl text-sm
                            bg-opacity-90 backdrop-blur-md border
                            {creationStatus.toLowerCase().startsWith('error:') ? 'bg-red-100 border-red-300 text-red-800' : 
                            creationStatus.toLowerCase().startsWith('successfully') ? 'bg-green-100 border-green-300 text-green-800' : 
                            'bg-blue-100 border-blue-300 text-blue-800'}">
                    <p>{creationStatus}</p>
                </div>
            {/if}

        {:else if !$currentUser && (typeof window === 'undefined' || window.location.pathname.startsWith('/dashboard'))}
            <!-- Initial state before $currentUser is resolved, or if user becomes null on dashboard -->
            <!-- This state is tricky; often a brief "Loading..." or redirect handles it. -->
            <!-- The redirect is handled in the reactive block. -->
             <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Verifying session...</p>
            </div>
        {:else}
             <div class="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <p class="text-xl text-white bg-black/30 p-3 rounded-md">Loading dashboard state...</p>
            </div>
        {/if}
    </div>
</div>
```
    *   `[ ]` Test thoroughly for both host and client users. Ensure all existing dashboard functionality works as before.

### Milestone 2: Implement Service Layer for Appwrite Interactions

**Goal:** Abstract Appwrite SDK calls into a reusable service layer.
**Status: [COMPLETED]** - Core service created and existing codebase refactored.

*   **Task 2.1: Create `src/lib/services/appwriteService.js`**
    *   `[X]` Define Appwrite client, account, and databases instances using environment variables.
    *   `[X]` Consolidate user authentication functions (login, logout, signup, getCurrentUser).
    *   `[X]` Consolidate CRUD operations for Appointments.

*   **Task 2.2: Update Codebase to Use `appwriteService`**
    *   `[X]` Refactor `src/routes/+page.svelte` (Login/Registration) to use `appwriteService`.
    *   `[X]` Refactor `src/routes/+layout.svelte` (User session) to use `appwriteService`.
    *   `[X]` Refactor `src/routes/dashboard/+page.svelte` (Dashboard data fetching and actions) to use `appwriteService`.
    *   `[X]` Verify and remove old imports from `appwrite.js` and `appwrite_db.js`.

*   **Task 2.3: Delete Old Appwrite Files**
    *   `[X]` Delete `src/lib/appwrite.js`.
    *   `[X]` Delete `src/lib/appwrite_db.js`.

*   **Task 2.4: Add Service Functions for New Collections (Future)**
    *   `[ ]` Add functions for DocumentationArticles CRUD.
    *   `[ ]` Add functions for Courses, CourseModules, CourseVideos CRUD.

### Milestone 3: Implement Documentation Feature

**Goal:** Implement the documentation knowledge base.

*   **Task 2.1: Create Directory Structure**
    *   `[ ]` Create directory `src/lib/components/documentation/`.
    *   `[ ]` Create directory `src/routes/documentation/`.

*   **Task 2.2: Appwrite Service for Documentation**
    *   `[ ]` Create `src/lib/appwrite_docs.js` (or add to `appwrite_db.js`).
```javascript
// src/lib/appwrite_docs.js
import { databases, ID, Query } from "./appwrite"; // Assuming appwrite.js is in $lib

const DATABASE_ID = 'YOUR_APPWRITE_DATABASE_ID'; // Replace with your Database ID
const ARTICLES_COLLECTION_ID = 'YOUR_COLLECTION_ID_DOCS'; // Replace with your Collection ID

export async function listDocumentationArticles(limit = 25, offset = 0) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            ARTICLES_COLLECTION_ID,
            [
                Query.equal('isPublished', true),
                Query.orderDesc('publishedAt'), // or orderAsc by title, etc.
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to list documentation articles:", error);
        throw error;
    }
}

export async function getDocumentationArticleBySlug(slug) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            ARTICLES_COLLECTION_ID,
            [
                Query.equal("slug", slug),
                Query.equal('isPublished', true),
                Query.limit(1)
            ]
        );
        if (response.documents.length > 0) {
            return response.documents[0];
        } else {
            throw new Error("Article not found or not published.");
        }
    } catch (error) {
        console.error(`Failed to get article by slug ${slug}:`, error);
        throw error;
    }
}

// Add create, update, delete functions if you plan to manage articles from the app
// export async function createArticle(articleData, userId) { ... }
```

*   **Task 2.3: Documentation Listing Components**
    *   `[ ]` Create `src/lib/components/documentation/ArticleListItem.svelte`
```html
<!-- src/lib/components/documentation/ArticleListItem.svelte -->
<script>
    export let article; // { title, slug, category, authorName, publishedAt }
</script>

<div class="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-md">
    <a href={`/documentation/${article.slug}`} class="block">
        <h3 class="text-xl font-semibold text-sky-700 hover:text-sky-900">{article.title}</h3>
        {#if article.category}
            <p class="text-sm text-gray-600 mt-1">Category: {article.category}</p>
        {/if}
        {#if article.authorName}
            <p class="text-sm text-gray-500 mt-1">By: {article.authorName}</p>
        {/if}
        {#if article.publishedAt}
            <p class="text-xs text-gray-400 mt-2">
                Published: {new Date(article.publishedAt).toLocaleDateString()}
            </p>
        {/if}
    </a>
</div>
```
    *   `[ ]` Create `src/lib/components/documentation/DocumentationOverview.svelte`
```html
<!-- src/lib/components/documentation/DocumentationOverview.svelte -->
<script>
    export let articles = []; // Passed as prop from +page.svelte or +page.server.js
</script>

<div class="space-y-6">
    {#if articles.length > 0}
        {#each articles as article (article.$id)}
            <ArticleListItem {article} />
        {/each}
    {:else}
        <p class="text-center text-gray-500 py-10">No documentation articles found.</p>
    {/if}
</div>
```

*   **Task 2.4: Documentation Listing Page (`+page.svelte`)**
    *   `[ ]` Create `src/routes/documentation/+page.svelte`
```html
<!-- src/routes/documentation/+page.svelte -->
<script>
    import DocumentationOverview from '$lib/components/documentation/DocumentationOverview.svelte';
    import { listDocumentationArticles } from '$lib/appwrite_docs.js';
    import { onMount } from 'svelte';

    let articles = [];
    let isLoading = true;
    let error = null;

    onMount(async () => {
        try {
            articles = await listDocumentationArticles();
        } catch (e) {
            error = e.message;
        } finally {
            isLoading = false;
        }
    });
</script>

<svelte:head>
    <title>Documentation - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-white drop-shadow-md">Documentation</h1>

    {#if isLoading}
        <p class="text-center text-gray-300">Loading articles...</p>
    {:else if error}
        <p class="text-center text-red-400 bg-red-100 p-3 rounded">Error loading articles: {error}</p>
    {:else}
        <DocumentationOverview {articles} />
    {/if}
</div>
```
    *   Alternatively, use `+page.server.js` to load data:
    *   `[ ]` (Optional) Create `src/routes/documentation/+page.server.js`
```javascript
// src/routes/documentation/+page.server.js
import { listDocumentationArticles } from '$lib/appwrite_docs.js'; // Adjust path if appwrite_docs.js is not directly in lib

export async function load() {
    try {
        const articles = await listDocumentationArticles();
        return {
            articles
        };
    } catch (error) {
        console.error("Error loading articles in +page.server.js:", error);
        return {
            articles: [],
            error: "Failed to load articles."
        };
    }
}
```
    *   And modify `src/routes/documentation/+page.svelte` to use the loaded data:
```html
<!-- src/routes/documentation/+page.svelte (with +page.server.js) -->
<script>
    import DocumentationOverview from '$lib/components/documentation/DocumentationOverview.svelte';
    export let data; // Provided by +page.server.js
</script>

<svelte:head>
    <title>Documentation - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-white drop-shadow-md">Documentation</h1>

    {#if data.error}
        <p class="text-center text-red-400 bg-red-100 p-3 rounded">Error: {data.error}</p>
    {:else if data.articles && data.articles.length > 0}
        <DocumentationOverview articles={data.articles} />
    {:else}
        <p class="text-center text-gray-300">No documentation articles found.</p>
    {/if}
</div>
```

*   **Task 2.5: Documentation Article View Component**
    *   `[ ]` Create `src/lib/components/documentation/ArticleView.svelte`.
        *   This will take an `article` object as a prop.
        *   It needs to render Markdown content. You might need a Markdown library (e.g., `marked`) or render HTML if content is stored as HTML.
```html
<!-- src/lib/components/documentation/ArticleView.svelte -->
<script>
    export let article; // { title, content, authorName, publishedAt, category }
    // For Markdown rendering, you might need:
    // import { marked } from 'marked'; // Install via npm/yarn
    // $: htmlContent = article && article.content ? marked(article.content) : '';
    // Or if content is already HTML:
    $: htmlContent = article ? article.content : '';
</script>

<article class="prose lg:prose-xl max-w-none p-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg">
    <header class="mb-6 pb-4 border-b">
        <h1 class="text-4xl font-bold text-gray-800">{article.title}</h1>
        <div class="mt-2 text-sm text-gray-500">
            {#if article.authorName}<span>By {article.authorName}</span>{/if}
            {#if article.publishedAt}<span class="ml-2">Published: {new Date(article.publishedAt).toLocaleDateString()}</span>{/if}
            {#if article.category}<span class="ml-2">Category: {article.category}</span>{/if}
        </div>
    </header>
    
    <!-- Render Markdown/HTML content -->
    {@html htmlContent}

</article>

<style>
    /* Add Tailwind's typography plugin if not already set up for .prose styles */
    /* @tailwind base; @tailwind components; @tailwind utilities; @tailwind variants; */
</style>
```

*   **Task 2.6: Documentation Article Page (`[slug]/+page.svelte`)**
    *   `[ ]` Create `src/routes/documentation/[slug]/+page.svelte` (or `[article_id]`)
```html
<!-- src/routes/documentation/[slug]/+page.svelte -->
<script>
    import ArticleView from '$lib/components/documentation/ArticleView.svelte';
    export let data; // From +page.server.js
</script>

<svelte:head>
    <title>{data.article ? data.article.title : 'Article'} - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    {#if data.error}
        <p class="text-center text-red-500 bg-red-100 p-4 rounded-md">Error: {data.error}</p>
    {:else if data.article}
        <ArticleView article={data.article} />
    {:else}
        <p class="text-center text-gray-400">Article not found.</p>
    {/if}
    <div class="mt-8 text-center">
        <a href="/documentation" class="text-sky-500 hover:text-sky-700 hover:underline">&larr; Back to Documentation</a>
    </div>
</div>
```
    *   `[ ]` Create `src/routes/documentation/[slug]/+page.server.js`
```javascript
// src/routes/documentation/[slug]/+page.server.js
import { getDocumentationArticleBySlug } from '$lib/appwrite_docs.js'; // Adjust path
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const article = await getDocumentationArticleBySlug(params.slug);
        if (article) {
            return {
                article
            };
        }
        throw error(404, 'Article not found');
    } catch (err) {
        console.error(`Error loading article ${params.slug}:`, err);
        // Differentiate between "not found" and other server errors if possible
        if (err.status === 404 || err.message?.includes("not found")) {
            throw error(404, 'Article not found');
        }
        throw error(500, 'Failed to load article');
    }
}
```
*   `[ ]` Test Documentation: Create sample articles in Appwrite. Navigate listing and individual articles. Check Markdown rendering.

### Milestone 3: Online Course Video Section

**Goal:** Implement the online course functionality with video playback.

*   **Task 3.1: Create Directory Structure**
    *   `[ ]` Create directory `src/lib/components/courses/`.
    *   `[ ]` Create directory `src/routes/courses/`.

*   **Task 3.2: Appwrite Service for Courses**
    *   `[ ]` Create `src/lib/appwrite_courses.js` (or add to `appwrite_db.js`).
```javascript
// src/lib/appwrite_courses.js
import { databases, ID, Query } from "./appwrite";

const DATABASE_ID = 'YOUR_APPWRITE_DATABASE_ID';
const COURSES_COLLECTION_ID = 'YOUR_COLLECTION_ID_COURSES';
const MODULES_COLLECTION_ID = 'YOUR_COLLECTION_ID_MODULES';
const VIDEOS_COLLECTION_ID = 'YOUR_COLLECTION_ID_VIDEOS';

export async function listPublishedCourses(limit = 25, offset = 0) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COURSES_COLLECTION_ID,
            [
                Query.equal('isPublished', true),
                Query.orderAsc('title'), // or by creation date, etc.
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to list courses:", error);
        throw error;
    }
}

export async function getCourseDetailsBySlug(slug) {
    try {
        // 1. Fetch Course by slug
        const courseResponse = await databases.listDocuments(
            DATABASE_ID,
            COURSES_COLLECTION_ID,
            [Query.equal("slug", slug), Query.equal('isPublished', true), Query.limit(1)]
        );

        if (courseResponse.documents.length === 0) {
            throw new Error("Course not found or not published.");
        }
        const course = courseResponse.documents[0];

        // 2. Fetch Modules for this Course
        const modulesResponse = await databases.listDocuments(
            DATABASE_ID,
            MODULES_COLLECTION_ID,
            [Query.equal("courseId", course.$id), Query.orderAsc("order")]
        );
        const modules = modulesResponse.documents;

        // 3. Fetch Videos for each Module
        const modulesWithVideos = await Promise.all(
            modules.map(async (module) => {
                const videosResponse = await databases.listDocuments(
                    DATABASE_ID,
                    VIDEOS_COLLECTION_ID,
                    [Query.equal("moduleId", module.$id), Query.orderAsc("order")]
                );
                return { ...module, videos: videosResponse.documents };
            })
        );
        
        return { ...course, modules: modulesWithVideos };

    } catch (error) {
        console.error(`Failed to get course details for slug ${slug}:`, error);
        throw error;
    }
}
// Add create/update/delete functions for courses, modules, videos for admin panel if needed
```

*   **Task 3.3: Course Listing Components**
    *   `[ ]` Create `src/lib/components/courses/CourseListItem.svelte`
```html
<!-- src/lib/components/courses/CourseListItem.svelte -->
<script>
    export let course; // { title, slug, description, thumbnailUrl, instructorName }
</script>

<a href={`/courses/${course.slug}`} class="block p-4 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-md">
    {#if course.thumbnailUrl}
        <img src={course.thumbnailUrl} alt={`Thumbnail for ${course.title}`} class="w-full h-48 object-cover rounded-md mb-3">
    {/if}
    <h3 class="text-xl font-semibold text-indigo-700 hover:text-indigo-900">{course.title}</h3>
    <p class="text-sm text-gray-600 mt-1 line-clamp-3">{course.description}</p>
    {#if course.instructorName}
        <p class="text-xs text-gray-500 mt-2">By: {course.instructorName}</p>
    {/if}
</a>
```
    *   `[ ]` Create `src/lib/components/courses/CourseOverview.svelte`
```html
<!-- src/lib/components/courses/CourseOverview.svelte -->
<script>
    export let courses = [];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#if courses.length > 0}
        {#each courses as course (course.$id)}
            <CourseListItem {course} />
        {/each}
    {:else}
        <p class="col-span-full text-center text-gray-500 py-10">No courses available at the moment.</p>
    {/if}
</div>
```

*   **Task 3.4: Course Listing Page (`+page.svelte` & `+page.server.js`)**
    *   `[ ]` Create `src/routes/courses/+page.svelte` (similar to documentation listing, using `CourseOverview`)
```html
<!-- src/routes/courses/+page.svelte -->
<script>
    import CourseOverview from '$lib/components/courses/CourseOverview.svelte';
    export let data; // From +page.server.js
</script>

<svelte:head>
    <title>Online Courses - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-white drop-shadow-md">Our Courses</h1>
    {#if data.error}
        <p class="text-center text-red-400 bg-red-100 p-3 rounded">Error: {data.error}</p>
    {:else if data.courses && data.courses.length > 0}
        <CourseOverview courses={data.courses} />
    {:else}
        <p class="text-center text-gray-300">No courses available at the moment.</p>
    {/if}
</div>
```
    *   `[ ]` Create `src/routes/courses/+page.server.js`
```javascript
// src/routes/courses/+page.server.js
import { listPublishedCourses } from '$lib/appwrite_courses.js';

export async function load() {
    try {
        const courses = await listPublishedCourses();
        return {
            courses
        };
    } catch (error) {
        console.error("Error loading courses in +page.server.js:", error);
        return {
            courses: [],
            error: "Failed to load courses."
        };
    }
}
```

*   **Task 3.5: Course Detail & Video Player Components**
    *   `[ ]` Create `src/lib/components/courses/VideoPlayer.svelte`
        *   This component will take a `videoUrl` and display an appropriate video player (e.g., iframe for YouTube/Vimeo, or `<video>` tag for self-hosted).
```html
<!-- src/lib/components/courses/VideoPlayer.svelte -->
<script>
    export let videoUrl;
    export let title = "Course Video";

    // Basic YouTube embed URL detection (can be made more robust)
    let isYouTube = videoUrl && (videoUrl.includes('youtube.com/embed/') || videoUrl.includes('youtu.be/'));
    let embedUrl = videoUrl;

    if (videoUrl && videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = videoUrl.split('watch?v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // Add similar logic for Vimeo or other platforms if needed
</script>

<div class="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
    {#if isYouTube}
        <iframe 
            width="100%" 
            height="100%" 
            src={embedUrl} 
            title={title}
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
    {:else if videoUrl} <!-- Generic video tag for other URLs -->
         <video controls class="w-full h-full" src={videoUrl} title={title}>
            Your browser does not support the video tag.
        </video>
    {:else}
        <p class="text-white flex items-center justify-center h-full">Video URL not provided.</p>
    {/if}
</div>
```
    *   `[ ]` Create `src/lib/components/courses/CourseDetailView.svelte`
        *   This component displays course information, modules, and videos. It will use `VideoPlayer.svelte`.
```html
<!-- src/lib/components/courses/CourseDetailView.svelte -->
<script>
    export let course; // Full course object with modules and videos
    
    import VideoPlayer from './VideoPlayer.svelte';
    import { writable } from 'svelte/store';

    let currentVideoUrl = writable(course?.modules?.[0]?.videos?.[0]?.videoUrl || null);
    let currentVideoTitle = writable(course?.modules?.[0]?.videos?.[0]?.title || "Video");

    function selectVideo(video) {
        currentVideoUrl.set(video.videoUrl);
        currentVideoTitle.set(video.title);
    }

    // Set initial video if course data is loaded
    $: if (course && !($currentVideoUrl) && course?.modules?.[0]?.videos?.[0]) {
        selectVideo(course.modules[0].videos[0]);
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Video Player Section (Main Content) -->
    <div class="md:col-span-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        {#if $currentVideoUrl}
            <VideoPlayer videoUrl={$currentVideoUrl} title={$currentVideoTitle} />
            <h2 class="text-2xl font-semibold mt-4 text-white">{$currentVideoTitle}</h2>
            <!-- Add video description if available -->
        {:else}
            <div class="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <p class="text-white text-xl">Select a video to play.</p>
            </div>
            <h2 class="text-2xl font-semibold mt-4 text-white">Welcome to {course.title}</h2>
        {/if}
        
        <div class="mt-6 prose prose-invert max-w-none text-gray-300">
            <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-3">Course Description</h3>
            {@html course.description || '<p>No description provided.</p>'}
        </div>
    </div>

    <!-- Sidebar: Course Outline/Playlist -->
    <div class="md:col-span-1 bg-gray-800/70 backdrop-blur-md p-4 rounded-lg max-h-[80vh] overflow-y-auto">
        <h3 class="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">Course Content</h3>
        {#if course.modules && course.modules.length > 0}
            {#each course.modules as module (module.$id)}
                <div class="mb-4">
                    <h4 class="text-lg font-semibold text-indigo-300 mb-2">{module.title}</h4>
                    {#if module.videos && module.videos.length > 0}
                        <ul class="space-y-1">
                            {#each module.videos as video (video.$id)}
                                <li>
                                    <button 
                                        on:click={() => selectVideo(video)}
                                        class="w-full text-left px-3 py-2 rounded-md text-sm 
                                               {video.videoUrl === $currentVideoUrl ? 'bg-indigo-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}"
                                    >
                                        {video.order}. {video.title} 
                                        {#if video.durationMinutes}({video.durationMinutes} min){/if}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="text-sm text-gray-400 italic">No videos in this module.</p>
                    {/if}
                </div>
            {/each}
        {:else}
            <p class="text-gray-400">No modules found for this course.</p>
        {/if}
    </div>
</div>
```

*   **Task 3.6: Course Detail Page (`[slug]/+page.svelte` & `+page.server.js`)**
    *   `[ ]` Create `src/routes/courses/[slug]/+page.svelte`
```html
<!-- src/routes/courses/[slug]/+page.svelte -->
<script>
    import CourseDetailView from '$lib/components/courses/CourseDetailView.svelte';
    export let data; // From +page.server.js
</script>

<svelte:head>
    <title>{data.course ? data.course.title : 'Course'} - Network 3.0</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    {#if data.error}
        <p class="text-center text-red-500 bg-red-100 p-4 rounded-md">Error: {data.error}</p>
    {:else if data.course}
        <CourseDetailView course={data.course} />
    {:else}
        <p class="text-center text-gray-400">Course not found.</p>
    {/if}
     <div class="mt-8 text-center">
        <a href="/courses" class="text-sky-300 hover:text-sky-100 hover:underline">&larr; Back to Courses</a>
    </div>
</div>
```
    *   `[ ]` Create `src/routes/courses/[slug]/+page.server.js`
```javascript
// src/routes/courses/[slug]/+page.server.js
import { getCourseDetailsBySlug } from '$lib/appwrite_courses.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const course = await getCourseDetailsBySlug(params.slug);
        if (course) {
            return {
                course
            };
        }
        throw error(404, 'Course not found');
    } catch (err) {
        console.error(`Error loading course ${params.slug}:`, err);
         if (err.status === 404 || err.message?.includes("not found")) {
            throw error(404, 'Course not found');
        }
        throw error(500, 'Failed to load course details.');
    }
}
```
*   `[ ]` Test Courses: Create sample course, modules, and videos in Appwrite. Test navigation, course detail view, and video playback.

### Milestone 4: Polish & Global Elements

*   **Task 4.1: Update Global Layout/Navigation**
    *   `[ ]` Modify `src/routes/+layout.svelte` (or your main navbar component) to include links to `/documentation` and `/courses` if the user is logged in (or based on your access rules).
*   **Task 4.2: Styling and UX Review**
    *   `[ ]` Review all new pages and components for consistent styling and good user experience.
    *   `[ ]` Ensure responsive design for all new sections.
*   **Task 4.3: Code Cleanup & Final Testing**
    *   `[ ]` Remove any console logs used for debugging.
    *   `[ ]` Perform thorough end-to-end testing of all features: login, dashboard (host & client), appointments, documentation, and courses.

## 6. Further Documentation/Information Needed

*   **Markdown Flavor for Documentation:** Do you have a preferred Markdown library or specific features (e.g., syntax highlighting, custom blockquotes) you need for documentation rendering? (The plan assumes basic Markdown or pre-rendered HTML).
*   **Video Hosting/Embedding:** The plan uses a generic approach for YouTube embeds and HTML5 video. If you have specific requirements for other video platforms (Vimeo Pro, Wistia, self-hosted with specific players), the `VideoPlayer.svelte` component will need adjustment.
*   **Admin Interface:** This plan focuses on the user-facing side. How will documentation articles and courses be created/managed? (Manually in Appwrite console, or is a separate admin interface planned?) If an admin interface is needed, that's a separate, significant feature.

This plan provides a structured approach. Remember to commit changes frequently and test each step. 