import { url } from "$lib/url";
import { getToken, type User } from "./UserHandler";

export interface Comment {
    id: number;
    userId: number;
    user: User;
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

    const response = await fetch(`${url}/post/createPost`, {
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
    const response = await fetch(`${url}/post/getPostImg?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/getPostById?postId=${postId}`, {
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
        image: null,
        id: data.id,
        title: data.title,
        text: data.text,
        userId: data.userId,
        communityId: data.communityId,
        datePosted: data.datePosted
    };
    if (data.image) {
        post.image = `data:image/jpeg;base64,${data.image}`;
    }
    return post;
}   

export async function getPostsByUser(userId: number, initPost: number, amount: number){
    let token = await getToken();
    const response = await fetch(`${url}/post/getPostsByUser?userId=${userId}&initPost=${initPost}&amount=${amount}`, {
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
    const response = await fetch(`${url}/post/getPostsByCommunity?communityId=${communityId}&initPost=${initPost}&amount=${amount}`, {
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
    const response = await fetch(`${url}/post/getPostsOnFeed`, {
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
    const response = await fetch(`${url}/post/likePost?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/unlikePost?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/deletePost?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/savePost?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/unsavePost?postId=${postId}`, {
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

export async function comment(postId: number|null, text: string, parentCommentId: number|null){
    let token = await getToken();
    const model = {
        PostId: postId,
        Text: text,
        ParentCommentId: parentCommentId
    };
    const response = await fetch(`${url}/post/comment`, {
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
    const response = await fetch(`${url}/post/deleteComment?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/checkIfLiked?postId=${postId}`, {
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
    const response = await fetch(`${url}/post/checkIfSaved?postId=${postId}`, {
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

export async function getCommentsByPost(postId: number){
    let token = await getToken();
    const response = await fetch(`${url}/post/getCommentsByPost?postId=${postId}`, {
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
    const comments: Comment[] = data.comments;
    const repliesPerComment: number[] = data.repliesPerComment;
    return {comments, repliesPerComment};
}

export async function getRepliesByComment(commentId: number){
    let token = await getToken();
    const response = await fetch(`${url}/post/getRepliesByComment?commentId=${commentId}`, {
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
    const replies: Comment[] = data.replies;
    const repliesPerReply: number[] = data.repliesPerReply;
    return {replies, repliesPerReply};
}

export async function getCommentById(commentId: number){
    let token = await getToken();
    const response = await fetch(`${url}/post/getCommentById?commentId=${commentId}`, {
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
    const comment: Comment = data.comment;
    const repliesCount: number = data.repliesCount;
    return {comment, repliesCount};
}


