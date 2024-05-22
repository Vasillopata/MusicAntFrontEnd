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
        id: data.id,
        userName: data.userName,
        email: data.email,
        birthDate: data.birthDate,
        createdDate: data.createdDate,
        pfp: null,
        banner: null,
        isLocked: data.isLocked
    };
    if (data.pfp) {
        user.pfp = `data:image/jpeg;base64,${data.pfp}`;
    }
    if (data.banner) {
        user.banner = `data:image/jpeg;base64,${data.banner}`;
    }
    
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
    for (let i = 0; i < recentFans.length; i++) {
        if (recentFans[i].pfp) {
            recentFans[i].pfp = `data:image/jpeg;base64,${recentFans[i].pfp}`;
        }
    }
    return recentFans;
}

export async function setPfp(file: Blob) {
    let token = await getToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${url}/account/setPfp`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    return imageUrl;
}

export async function setBanner(file: Blob) {
    let token = await getToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${url}/account/setBanner`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    return imageUrl;
}

export async function getOwnPfp() {
    let token = await getToken();
    const response = await fetch(`${url}/account/getOwnPfp`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status == 404) {
        return '';
    } else if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    return imageUrl;
}

export async function getPfpById(userId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/getPfpById?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status == 404) {
        return '';
    } else if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    return imageUrl;
}

export async function getAccount(userId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/getAccount?appUserId=${userId}`, {
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
        id: data.id,
        userName: data.userName,
        email: data.email,
        birthDate: data.birthDate,
        createdDate: data.createdDate,
        pfp: null,
        banner: null,
        isLocked: data.isLocked
    };
    if (data.pfp) {
        user.pfp = `data:image/jpeg;base64,${data.pfp}`;
    }
    if (data.banner) {
        user.banner = `data:image/jpeg;base64,${data.banner}`;
    }
    
    return user;
}

export async function checkIfAdmin() {
    let token = await getToken();
    const response = await fetch(`${url}/account/checkIfAdmin`, {
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
    if (data == "true") {
        return true;
    } else {
        return false;
    }
}

export async function checkIfModerator(communityId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/checkIfModerator?communityId=${communityId}`, {
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
    if (data == "true") {
        return true;
    } else {
        return false;
    }
}

export async function checkIfOwner(communityId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/checkIfOwner?communityId=${communityId}`, {
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
    if (data == "true") {
        return true;
    } else {
        return false;
    }
}

export async function lockAccount(userId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/lockAccount?userId=${userId}`, {
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

export async function unlockAccount(userId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/account/unlockAccount?userId=${userId}`, {
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