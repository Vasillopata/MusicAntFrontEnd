<script lang="ts">
    import { slide } from "svelte/transition";
    import {page} from "$app/stores";
    import { onMount } from "svelte";
    import {comment} from "$lib/handlers/PostHandler";
    import {getRepliesByComment} from "$lib/handlers/PostHandler";
    import type {Comment as CommentData} from "$lib/handlers/PostHandler";
    import Comment from "../../Comment.svelte";
    import {getCommentById} from "$lib/handlers/PostHandler";
    
    
    let ready = false;
    let replies : CommentData[] = [];
    let repliesPerReply: number[] = [];   

    let inputcomment = '';
    let commentId= 0;
    let parentcomment: CommentData|undefined = undefined;
    let parentReplies: number = 0;
    async function handleComment(){
        if(inputcomment == ''){
            return;
        }
        if(parentcomment == undefined){
            return;
        }
        const newComment = await comment(parentcomment.postId, inputcomment, commentId);
        inputcomment = '';
        replies = [newComment, ...replies];
    }
    onMount(async()=>{
        ready = false;
        commentId = parseInt($page.params.commentId);
        let parentCommentdata = await getCommentById(commentId);
        parentcomment = parentCommentdata.comment;
        parentReplies = parentCommentdata.repliesCount;
        let commentdata: any = await getRepliesByComment(commentId);
        replies = commentdata.replies;
        repliesPerReply = commentdata.repliesPerReply;
        ready = true;
    })
</script>


{#if ready}
<div class="main-wrap">
    {#if parentcomment != undefined}
        <Comment comment={parentcomment} repliesCount={parentReplies}/>
    {/if}
    
    <div class="parent-comment-buttons">
        <button on:click={async()=>{await handleComment()}} class="coment-button" style="{inputcomment!='' ? 'color:var(--blue)' :''}">Коментирай</button>
        {#if inputcomment != ''}
            <button on:click={()=>{inputcomment = "";}} transition:slide={{duration:400}} class="search-bar-clear"><i class='bx bx-message-square-x' ></i></button>
        {/if}
    </div>
    <textarea class="parent-comment" name="parent-comment" id="" bind:value={inputcomment}></textarea>
    <div class="comments">
        <h3 style="margin-top: 1rem; margin-left: 1rem">Коментари</h3>
        {#if replies.length == 0}
            <h4 style="margin-top: 1rem; margin-left: 3rem; margin-bottom: 2rem">Няма коментари</h4>
        {:else}
            {#each replies as reply, index (reply.id)}
                <Comment comment={reply} repliesCount={repliesPerReply[index]}/>
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