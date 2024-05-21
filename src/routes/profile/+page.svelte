<script lang="ts">
    import Post from "../Posts/Post.svelte"
    import Comment from "../Comment.svelte";
    import { onMount } from "svelte";
    import { getPostsByUser } from "$lib/handlers/PostHandler";
    import type { User } from "$lib/handlers/UserHandler";
    import { getOwnAccount } from "$lib/handlers/AccountHandler";
    import PostReal from "../Posts/PostReal.svelte";
    import {deletePost} from "$lib/handlers/PostHandler";


    let ready = false;
    let imageUrl = ''
    let imageUrlBackground = ''
    let selectedWindow = 'MyPosts'
    let profile: User = {id: 0, userName: '', email: '', pfp: '', banner: '', createdDate:'', birthDate: ''};
    let posts: number[] = []

    async function handleFileUpload(event: Event, field: string) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field == 'pfp')
                    imageUrl = reader.result as string;
                else if (field == 'bg')
                    imageUrlBackground = reader.result as string;
            };
            await reader.readAsDataURL(file);
        }
    }
    
    async function handledeletePost(postId: number){
        await deletePost(postId);
        posts = [...posts.filter((id)=> id != postId)];
    }
    onMount(async()=>{
        ready = false;
        profile = await getOwnAccount();
        posts = await getPostsByUser(profile.id, 1, 5);
        ready = true;
    })
</script>


{#if ready}
<div class="main">
    <label for="imageBg" class="custom-file-input" style="background-image: url({imageUrlBackground!=null ? imageUrlBackground : ""}); ">
        {#if imageUrlBackground}
            <i class='bx bx-edit'></i>
        {:else}
            <i class='bx bxs-image-add' ></i>
        {/if}
    </label>
    <input bind:value={imageUrlBackground} id="imageBg" type="file" name="imageBg" accept="image/*" style="display: none;" on:change={async(e)=> {handleFileUpload(e,'bg')}} />

    <div class="profile-pic-username">
        <label for="image" class="custom-file-account-img" style="background-image: url({imageUrl!=null ? imageUrl : ""}); ">
            {#if imageUrl}
                <i class='bx bx-edit'></i>
            {:else}
                <i class='bx bxs-image-add' ></i>
            {/if}
        </label>
            <input bind:value={imageUrl} id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={async(e)=> {handleFileUpload(e,'pfp')}} />
        <div class="username-p">
            <p>{profile.userName}</p>
            <i class='bx bx-edit'></i>
        </div>
    </div>

    <div class="profile-buttons">
        <button on:click={async()=>{selectedWindow = 'MyPosts'; posts = await getPostsByUser(profile.id, 1, 5)}}>
            Мои постове
        </button>
        <button on:click={()=>{selectedWindow = 'MyComments'; posts = []}}>
            Мои коментари
        </button>
        <button on:click={()=>{selectedWindow = 'SavedPosts'; posts = []}}>
            Запазени
        </button>
        <button on:click={()=>{selectedWindow = 'LikedPosts'; posts = []}}>
            Харесани
        </button>
    </div>
    <div class="separator"></div>

    {#if selectedWindow == 'MyPosts'}
        <div class="post-wraper">
            {#each posts as postId} 
                <div style="position: relative">
                    <button class="delete-button" on:click={async()=>{await handledeletePost(postId)}}><i class='bx bxs-trash' ></i></button>
                    <PostReal {postId} />
                </div>
            {/each}
        </div>
    {/if}
    {#if selectedWindow == 'MyComments'}
        <div class="post-wraper">
            
        </div>
    {/if}
    {#if selectedWindow == 'SavedPosts'}
        <div class="post-wraper">
            
        </div>
    {/if}
    {#if selectedWindow == 'LikedPosts'}
        <div class="post-wraper">
            
        </div>
    {/if}
    
</div>
{/if}



<style>
    .delete-button{
        position: absolute;
        top: 1rem;
        right: -4rem;   
        background-color: var(--darkest);
        font-size: 1.3rem;
        outline: none;
        border: none;
        height: 4rem;
        border-radius: 1.5rem;
        color: whitesmoke;
        width: 4rem;
    }
    .post-wraper{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50rem;
        margin-left: calc(50% - 33rem);
    }
    .main{
        height: 100vh;
    }
    .profile-buttons{
        display: flex;
        flex-direction: row;
        width: 96%;
        justify-content: space-between;
        margin-top: 1rem;
    }
    .profile-buttons>button{
        background-color: var(--darkest);
        font-size: 1.3rem;
        outline: none;
        border: none;
        height: 4rem;
        border-radius: 1.5rem;
        color: whitesmoke;
        width: 15rem;
    }
        .profile-buttons>button:hover{
            background-color: var(--black1-hover);
        }
    .separator{
        width: 96%;
        background-color: var(--black2);
        height: 1px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .username-p{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 1.3rem;
        font-size: 2.5rem;
        margin-bottom: 0;
    }
    .username-p>i{
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }
    .username-p>p{
        margin-bottom: 0;
    }
    .profile-pic-username{
        display: flex;
        flex-direction: row;
    }
        .profile-pic-username>label{
            display: flex;
            flex-direction: row;
        }
    .custom-file-account-img{
        display: flex;
        height: 12rem;
        width: 12rem;
        margin-top: -6rem;
        margin-left: 5rem;
        border-radius: 100%;
        outline: 0.4rem solid var(--black1);
        z-index: 2;
        align-items: center;
        justify-content: center;
        object-fit: inherit !important;
    }
        .custom-file-account-img:hover{
            cursor: pointer;
            opacity: 0.8;
        }
    .custom-file-account-img>i{
        opacity: 0;
        font-size: 1.5rem;
        transition: all 0.1s ease-in-out;
    }
    .custom-file-account-img:hover>i{
        opacity: 1;
        font-size: 1.5rem;
    }
    .custom-file-input{
        margin-top: 1rem;
        flex-direction: row;
        display: flex;
        width: 95rem;
        height: 12rem;
        margin-left: 2rem;
        border-radius: 1.5rem;
        border: 1px solid var(--black2);
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat; 
        background-size: cover; 
        background-position:center;
        z-index: 1;
    }
    .custom-file-input:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    .custom-file-input>i{
        opacity: 0;
        font-size: 3rem;
        transition: all 0.1s ease-in-out;
    }
    .custom-file-input:hover>i{
        opacity: 1;
        font-size: 3rem;
    }
</style>