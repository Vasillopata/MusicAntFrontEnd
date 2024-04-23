<script lang="ts">
    import { slide } from "svelte/transition";
    import Comment from "../Comment.svelte";
    import Post from "../Posts/Post.svelte";
    import { browser } from "$app/environment";
    
    let parentcomment = ''
    let searchBarElement: HTMLInputElement|undefined = undefined

</script>

<div class="main-wrap">
    <Post imgURL={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}/>
    <div class="parent-comment-buttons">
        <button class="coment-button" style="{parentcomment!='' ? 'color:var(--blue)' :''}">Коментирай</button>
        {#if parentcomment != ''}
            <button on:click={()=>{parentcomment = "";searchBarElement?.focus()}} transition:slide={{duration:400}} class="search-bar-clear"><i class='bx bx-message-square-x' ></i></button>
        {/if}
    </div>
    <textarea class="parent-comment" name="parent-comment" id="" bind:value={parentcomment}></textarea>
    <div class="comments">
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>  
    </div>
</div>


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