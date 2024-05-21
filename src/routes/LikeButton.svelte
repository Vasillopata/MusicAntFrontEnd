<script lang="ts">
    import { browser } from "$app/environment";
    import {checkIfLiked, likePost, unlikePost} from "$lib/handlers/PostHandler";
    import {onMount} from "svelte";

    export let postId:number; 
    let liked = false
    
    async function handleClick(){
        if (liked){
            liked = false;
            await unlikePost(postId);
        }else{
            liked = true;
            await likePost(postId);
        }
    }
    onMount(async ()=>{
        liked = await checkIfLiked(postId);
    })
</script>

<button id='temp' on:click={async()=> await handleClick()} class:like-active={liked}><i class='bx {liked ? 'bxs-heart' : 'bx-heart'}' ></i></button>

<style>

    button{
        background-color: transparent;
        box-shadow: 0;
        border: none;
        z-index: 1;
    }
    .like-active {
        color: red;
    }
        .like-active > i {
            color: red;
        }
        button > i {
            z-index: 0;
        }
    :global(.bxs-heart){
        font-size: 2.5rem;
        transition: all 0.1s;
        cursor: pointer;
        
    }
        :global(.bxs-heart:hover){
            scale: 0.9;
        }
    :global(.bx-heart){
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;

    }   
        :global(.bx-heart:hover){
            color: red !important;
        }
    
</style>