import { writable } from 'svelte/store';

export const currentUser = writable(null); // Initialize with null (no user logged in) 