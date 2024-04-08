import {getToken} from './UserHandler';


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