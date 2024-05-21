<script lang="ts">
    import LikeButton from "../LikeButton.svelte";
    import SaveButton from "../SaveButton.svelte";
    import {getPostById} from "$lib/handlers/PostHandler";
    import type {Post} from "$lib/handlers/PostHandler";
    import { onMount } from "svelte";
    import {getUserNameById} from "$lib/handlers/UserHandler";
    import {getCommunityById, type Community} from "$lib/handlers/CommunityHandler";


    export let postId: number;

    
    let post: Post|undefined = undefined;
    let username: string = "";
    let community: Community = {name: "", description: "", id: 0, type: "", ownerId: 0};

    onMount(async ()=>{
        post = await getPostById(postId);
        username = await getUserNameById(post.userId);
        if (post.communityId != null){
            community = await getCommunityById(post.communityId);
        }
    })
</script>

<div class="post-separator"></div>
<div class="post">
    <div class="top-post">
        <div class="top-profile">
            <img src="/images/ale.jpg" alt="">
        </div>
        <p>{username}</p>
        {#if community.name != ''}
            <a style="margin-left: auto;" class="community-link" on:click|stopPropagation href="/community/{community.id}">
                {#if community.type == 'news'}
                    <i class='bx bxs-news'></i>
                {:else if community.type == 'fan'}
                    <i class='bx bx-star'></i>
                {:else if community.type == 'event'}
                    <i class='bx bxs-calendar-event' ></i>
                {/if}
                {community.name}
            </a>
        {/if}
    </div>
    <div class="post-title">
        {post?.title}
    </div>
    <a href="/post/{postId}">
        {#if post?.image}
            <div class="mid-post">
                <img class="fg-image" src={post?.image} alt="">
                <img class="bg-image" src={post?.image} alt="">
            </div> 
        {/if}
        {#if post?.text}
            <div class="text-for-post">
                <p>{post?.text}</p>
            </div>
        {/if}
    </a>
    <div class="bot-post">
        <LikeButton {postId}/>
        <a href="/post/{post?.id}"><i class='bx bx-message-square'></i></a>
        <div style="margin-left: auto;">
        <SaveButton {postId}/>
        </div>
    </div>
</div>


<style>
    .community-link {
        color: whitesmoke;
        text-decoration: none;
        font-size: 1.2rem;
        margin-right: 1rem;
    }
        .community-link:hover {
            text-decoration: underline;
        }
    .text-for-post{
        display: flex;
        flex-direction: row;
        padding-left: 0.3rem;
        margin-bottom: 0.5rem;
        color: whitesmoke;
        text-decoration: none !important;;
        border-bottom: none;
    }
    .text-for-post>p{
        text-decoration: none !important;
    }
    .bx-message-square{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;
    }
        .bx-message-square:hover{
            color: var(--blue);
        }
    .post-title{
        display: flex;
        font-size: 1.4rem;
        flex-direction: row;
        min-height: 0;
        max-height: 2rem;
        align-items: center;
        padding-left: 0.3rem;
        margin-bottom: 0.5rem;
    }
    .post{
        display: flex;
        overflow: hidden;
        border-radius: 1rem;
        flex-direction: column;
        width: 50rem;
        padding: 0 1rem;
        transition: background-color 0.15s ease-in-out;
        text-decoration: none !important;
    }
    .post>a{
        text-decoration: none !important;
    }
        .post:hover{
            background-color: var(--black1-hover);
            text-decoration: none !important;
        }
    .top-post{
        display: flex;
        flex-direction: row;
        height: 5rem;
        align-items: center;
        padding-left: 0.3rem;
    }
    .mid-post{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 40rem;
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        border: 1px solid var(--black2);
        text-decoration-color: var(--black1) !important;
    }
        .mid-post>.fg-image{
            border-radius: 1rem;
            height: 100%;
            width: 100%;
            object-fit:contain;
            z-index: 2;
            filter: drop-shadow(0px 0px 4px var(--black1)) ;
        }
        .top-post>p{
            margin-bottom: 0px;
            margin-left: 0.3rem;
        }
    .bot-post{
        display: flex;
        flex-direction: row;
        height: 4rem;
        align-items: center;
        padding-left: 0.3rem;
    }
    .bg-image{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        width: 105%;
        height: 105%;
        opacity: 0.25;
        filter: blur(10px);
        z-index: 1;
        border-radius: 3rem;
    }
    .post-separator{
        width: 50rem;
        height: 1px;
        background-color: var(--black2);
    }
    .top-post > p:hover{
        cursor: pointer;
    }
    button{
        background-color: transparent;
        box-shadow: 0;
        border: none;
        z-index: 1;
    }
    .top-profile{
        display: flex;
        flex-direction: row;
        height: 3rem;
        width: 3rem;
        overflow: hidden;
        z-index: 1;
        border-radius: 100%;
        transition: border-radius 0.2s ease-in-out;
    }
        .top-profile>img{
            border-radius: inherit;
            object-fit: cover;
            width: 100%;
            height: 100%;
            z-index:0;
        }
            .top-profile:hover {
                border-radius: 10%;
                cursor: pointer;
                transition: border-radius 0.15s ease-in-out;
            }
</style>