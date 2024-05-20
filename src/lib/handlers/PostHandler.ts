import { getToken } from "./UserHandler";

export interface Post {
    id: number;
    title: string;
    text: string|null;
    userId: number;
    communityId: number|null;
}

export async function createPost(title: string, text: string|null, image: Blob|null, communityId: number|null){
    let token = await getToken();
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Text', text || '');
    if (image) {
        formData.append('Image', image); 
    }
    if (communityId) {
        formData.append('CommunityId', communityId.toString());
    }

    const response = await fetch('https://localhost:5000/post/createPost', {
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

    const postId = await response.text();
    return postId;
}

export async function getPostImg(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPostImg?postId=${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}

export async function getPostById(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPostById?postId=${postId}`, {
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
    console.log(data);
    let post: Post = {
        id: data.id,
        title: data.title,
        text: data.text,
        userId: data.userId,
        communityId: data.communityId
    };
    return post;
}   

export async function getPosts(userId: number, initPost: number, amount: number, communityId: number|null){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPosts?userId=${userId}&initPost=${initPost}&amount=${amount}&communityId=${communityId}`, {
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
    const ids: number[] = data.posts;
    return ids;
}