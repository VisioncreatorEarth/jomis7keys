import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68357409002d8b46f512');

export const account = new Account(client);
export { ID } from 'appwrite'; 