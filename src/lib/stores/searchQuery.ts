import { url } from "$lib/url";
import { getToken } from "$lib/handlers/UserHandler";
import { writable } from "svelte/store";


export let currentSearchQuery = writable<string>('');

export async function search() {
    let query:string = '';
    currentSearchQuery.subscribe(value => {
        query = value;
    })();
    console.log('searching ' + query);
    let token = await getToken();
    const response = await fetch(`${url}/misc/search?input=${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}