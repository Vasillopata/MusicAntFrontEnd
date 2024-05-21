import { url } from '$lib/url';
import {getToken} from './UserHandler';
import type { User } from './UserHandler';

export async function getUserNameById(id: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/getUserNameById?userId=${id}`, {
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
    
export async function getUserName() {
    let token = await getToken();
    const response = await fetch(`${url}/account/getUserName`, {
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

export async function getOwnAccount(){
    let token = await getToken();
    const response = await fetch(`${url}/account/getOwnAccount`, {
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
    const user : User = {
        id: data.user.id,
        userName: data.user.userName,
        email: data.user.email,
        birthDate: data.user.birthDate,
        pfp: data.user.pfp,
        banner: data.user.banner,
        createdDate: data.user.createdDate
    };
    
    return user;
}

export async function followAccount(accountId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/followAccount?accountId=${accountId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return;
}

export async function unfollowAccount(accountId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/unfollowAccount?accountId=${accountId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return;
}

export async function checkIfFollowing(accountId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/checkIfFollowing?accountId=${accountId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    if (data == "true") {
        return true;
    } else {
        return false;
    }
}

export async function getRecentFans() {
    let token = await getToken();
    const response = await fetch(`${url}/account/getRecentFans`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const recentFans: User[] = data.recentFans;
    return recentFans;
}