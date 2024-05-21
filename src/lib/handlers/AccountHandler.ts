import {getToken} from './UserHandler';
import type { User } from './UserHandler';

export async function getUserNameById(id: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/getUserNameById?userId=${id}`, {
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
    const response = await fetch('https://localhost:5000/account/getUserName', {
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
    const response = await fetch('https://localhost:5000/account/getOwnAccount', {
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