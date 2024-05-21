<script lang="ts">
    import { slide } from "svelte/transition";
    import PostReal from "../../Posts/PostReal.svelte";
    import {page} from "$app/stores";
    import { onMount } from "svelte";
    import {comment} from "$lib/handlers/PostHandler";
    import {getCommentsByPost} from "$lib/handlers/PostHandler";
    import type {Comment as CommentData} from "$lib/handlers/PostHandler";
    import Comment from "../../Comment.svelte";
    
    
    let ready = false;
    let comments : CommentData[] = [];
    let repliesPerComment: number[] = [];   

    let inputcomment = '';
    let postId= 0;
    async function handleComment(){
        if(inputcomment == ''){
            return;
        }
        const newComment = await comment(postId, inputcomment, null);
        inputcomment = '';
        comments = [newComment, ...comments];
    }
    onMount(async()=>{
        ready = false;
        postId = parseInt($page.params.postId);
        let commentdata: any = await getCommentsByPost(postId);
        comments = commentdata.comments;
        repliesPerComment = commentdata.repliesPerComment;
        ready = true;
    })
</script>


{#if ready}
<div class="main-wrap">
    <PostReal {postId}/>
    <div class="parent-comment-buttons">
        <button on:click={async()=>{await handleComment()}} class="coment-button" style="{inputcomment!='' ? 'color:var(--blue)' :''}">Коментирай</button>
        {#if inputcomment != ''}
            <button on:click={()=>{inputcomment = "";}} transition:slide={{duration:400}} class="search-bar-clear"><i class='bx bx-message-square-x' ></i></button>
        {/if}
    </div>
    <textarea class="parent-comment" name="parent-comment" id="" bind:value={inputcomment}></textarea>
    <div class="comments">
        <h3 style="margin-top: 1rem; margin-left: 1rem">Коментари</h3>
        {#if comments.length == 0}
            <h4 style="margin-top: 1rem; margin-left: 3rem; margin-bottom: 2rem">Няма коментари</h4>
        {:else}
            {#each comments as comment, index (comment.id)}
                <Comment {comment} repliesCount={repliesPerComment[index]}/>
            {/each}
        {/if}
    </div>
</div>
{/if}


<style>
    .coment-button{
        font-size:1.4rem; 
        margin-top: 0.5rem; 
        margin-bottom:0.5rem; 
        padding-left: 1rem;
    }
    .parent-comment-buttons{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        font-size: 2rem;
    }
        .parent-comment-buttons>button{
            background-color: transparent;
            outline: none;
            border: none;
            color: whitesmoke;
        }
    .parent-comment{
        border: whitesmoke;
        outline: none;
        width: 100%;
        padding: 0.5rem;
        height: 13rem;
        overflow-x: scroll;
        overflow-x: hidden;
        resize: none;
        background-color: transparent;
        color: whitesmoke;
        border: 1px solid var(--black2);
        border-radius: 1rem;
    }
    .comments{
        display: flex;
        flex-direction: column !important;
        width: 100%;
    }
    .main-wrap{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50rem;
        margin-left: calc(50% - 33rem);
        margin-top: 2rem;
    }
    .parent-comment::-webkit-scrollbar {
        width: 0.5rem !important;
        overflow:visible !important;
    }
</style>