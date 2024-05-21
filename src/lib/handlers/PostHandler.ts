import { getToken } from "./UserHandler";

export interface Comment {
    id: number;
    userId: number;
    postId: number;
    text: string;
    parentCommentId: number|null;
    datePosted: string;
    deleted: boolean;
}
export interface Post {
    id: number;
    title: string;
    text: string|null;
    userId: number;
    communityId: number|null;
    datePosted: string;
    image: string|null;
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
        image: `data:image/jpeg;base64,${data.image}`,
        id: data.id,
        title: data.title,
        text: data.text,
        userId: data.userId,
        communityId: data.communityId,
        datePosted: data.datePosted
    };
    return post;
}   

export async function getPostsByUser(userId: number, initPost: number, amount: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPostsByUser?userId=${userId}&initPost=${initPost}&amount=${amount}`, {
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

export async function getPostsByCommunity(communityId: number, initPost: number, amount: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPostsByCommunity?communityId=${communityId}&initPost=${initPost}&amount=${amount}`, {
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
export async function getPostsOnFeed(){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/getPostsOnFeed`, {
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

export async function likePost(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/likePost?postId=${postId}`, {
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

export async function unlikePost(postId: number){    
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/unlikePost?postId=${postId}`, {
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

export async function deletePost(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/deletePost?postId=${postId}`, {
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

export async function savePost(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/savePost?postId=${postId}`, {
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

export async function unsavePost(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/unsavePost?postId=${postId}`, {
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

export async function comment(postId: number, text: string, parentCommentId: number|null){
    let token = await getToken();
    const model = {
        PostId: postId,
        Text: text,
        ParentCommentId: parentCommentId
    };
    const response = await fetch(`https://localhost:5000/post/comment`, {
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
    const comment: Comment = data.comment;
    return comment;
}

export async function deleteComment(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/deleteComment?postId=${postId}`, {
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

export async function checkIfLiked(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/checkIfLiked?postId=${postId}`, {
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
    if (data === 'true') {
        return true;
    } else {
        return false;
    }
}

export async function checkIfSaved(postId: number){
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/post/checkIfSaved?postId=${postId}`, {
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
    if (data === 'true') {
        return true;
    } else {
        return false;
    }
}


