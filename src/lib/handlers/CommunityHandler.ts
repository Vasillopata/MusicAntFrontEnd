import { url } from "$lib/url";
import { getToken } from "./UserHandler";

export interface Community {
    id: number;
    name: string;
    type: string;   
    description: string|null;
    ownerId: number;
}

export async function createCommunity(name:string, type:string, description:string|null){
    let token = await getToken();
    const model = {
        name: name,
        type: type,
        description: description
    };

    const response = await fetch(`${url}/community/createCommunity`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const community: Community = data.community;
    return community;
}

export async function getUserCommunities() {
    let token = await getToken();
    const response = await fetch(`${url}/community/getUserCommunities`, {
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
    const communities: Community[] = data.communities;
    return communities;
}

export async function getCommunityById(communityId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/community/getCommunityById?communityId=${communityId}`, {
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
    const community: Community = data.community;
    return community;       
}

export async function becomeMember(communityId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/community/becomeMember?communityId=${communityId}`, {
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

export async function endMembership(communityId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/community/endMembership?communityId=${communityId}`, {
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

export async function checkIfMember(communityId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/community/checkIfMember?communityId=${communityId}`, {
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

export async function deleteCommunity(communityId:number) {
    let token = await getToken();
    const response = await fetch(`${url}/community/deleteCommunity?communityId=${communityId}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return;
}