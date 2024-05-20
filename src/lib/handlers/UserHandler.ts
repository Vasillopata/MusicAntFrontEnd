import { browser } from "$app/environment";
import { goto } from "$app/navigation";

export interface User{
    id: number;
    userName: string;
    email: string;
    pfpUrl: string;
    bannerUrl: string;
    createdDate: string;
    birthDate: string;
}



export async function getToken() {
    let cookie;
    if (browser) {
        cookie = document.cookie.split('; ').find(row => row.startsWith('token'));
    }
    if (!cookie) {
        console.log('Token not found');
        return;
    }

    const token = cookie.split('=')[1];
    return token;
}

export async function isLoggedIn() {
    let cookie;
    if (browser){
        cookie = document.cookie.split('; ').find(row => row.startsWith('token'));
    }
    if (!cookie) {
        return false;
    }

    return true;
}
export async function logout() {
    if (browser) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        await goto('/login');
        location.reload();
    }
}

export async function login(event: Event,email: string, password: string) {
    event.preventDefault();

    const model = {
        Email: email,
        Password: password,
    };
    console.log(model);
    const response = await fetch('https://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login successful!");
        document.cookie = `token=${data.token};path=/;Secure;SameSite=Strict;`;
        await goto('/');
        location.reload();
    } else {
        console.error("Login failed: ", data.message);
    }
}
export async function getUserNameById(userId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/getUserNameById?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
}
export async function register(event: Event, email: string,userName: string, password: string, birthDate: Date) {
    event.preventDefault();

    const model = {
        Email: email,
        UserName: userName,
        Password: password,
        BirthDate: birthDate
    };
    console.log(model);
    const response = await fetch('https://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Registration successful!");
        document.cookie = `token=${data.token};path=/;Secure;SameSite=Strict;`;
        await goto('/');
        location.reload();
    } else {
        console.error("Registration failed: ", data.message);
    }
}