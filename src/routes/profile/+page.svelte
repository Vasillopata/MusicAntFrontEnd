<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import { getPostsByUser } from "$lib/handlers/PostHandler";
    import type { User } from "$lib/handlers/UserHandler";
    import { getOwnAccount } from "$lib/handlers/AccountHandler";
    import PostReal from "../Posts/PostReal.svelte";
    import {deletePost} from "$lib/handlers/PostHandler";
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
    import { goto } from "$app/navigation";
    import {setPfp, setBanner} from "$lib/handlers/AccountHandler";
    import {getLikedPosts, getSavedPosts} from "$lib/handlers/PostHandler";
    import Loading from '../Loading.svelte'

    let cropperPfp: any;
    let cropperBg: any;
    let imageElementPfp: HTMLImageElement;
    let imageElementBg: HTMLImageElement;
    let ready = false;
    let imageUrlPfp = '';
    let imageUrlBg = '';
    let selectedWindow = 'MyPosts'
    let profile: User = {id: 0, userName: '', email: '', pfp: '', banner: '', createdDate:'', birthDate: '', isLocked:false};
    let posts: number[] = [];
    let showCropperPfp = false;
    let showCropperBg = false;
    let loadingPosts = false;

    async function handleFileUploadPfp(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrlPfp = reader.result as string;
                showCropperPfp = true;
            };
            await reader.readAsDataURL(file);
        }
    }

    async function handleFileUploadBg(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrlBg = reader.result as string;
                showCropperBg = true;
                if (cropperBg) {
                    cropperBg.destroy();
                    cropperBg = null;
                }
            };
            await reader.readAsDataURL(file);
        }
    }

    async function applyCropPfp() {
        if (cropperPfp) {
            const canvas = cropperPfp.getCroppedCanvas();
            if (canvas) {
                imageUrlPfp = canvas.toDataURL();
                const tempImg = await fetch(imageUrlPfp).then(res => res.blob());
                imageUrlPfp = await setPfp(tempImg);
                showCropperPfp = false;
                cropperPfp.destroy();
                cropperPfp = null;
            }
        } else {
            console.error('Cropper is not initialized');
        }
    }

    async function applyCropBg() {
        if (cropperBg) {
            const canvas = cropperBg.getCroppedCanvas();
            if (canvas) {
                imageUrlBg = canvas.toDataURL();
                const tempImg = await fetch(imageUrlBg).then(res => res.blob());
                imageUrlBg = await setBanner(tempImg);
                showCropperBg = false;
                cropperBg.destroy();
                cropperBg = null;
            }
        } else {
            console.error('Cropper is not initialized');
        }
    }

    async function handledeletePost(postId: number){
        await deletePost(postId);
        posts = [...posts.filter((id)=> id != postId)];
        location.reload();
        goto('/profile/');
    }

    async function fetchUserPosts(){
        selectedWindow = 'MyPosts'; 
        loadingPosts=true; 
        posts = [...await getPostsByUser(profile.id, 1, 5)]; 
        loadingPosts=false;
    }
    async function fetchLikedPosts() {
        selectedWindow = 'LikedPosts'; 
        loadingPosts=true; 
        let newPosts: number[] = [];
        newPosts = await getLikedPosts();
        posts = [...newPosts]; 
        loadingPosts=false;
    }
    async function fetchSavedPosts() {
        selectedWindow = 'SavedPosts'; 
        loadingPosts=true;
        let newPosts: number[] = [];
        newPosts = await getSavedPosts();
        posts = [...newPosts];
        loadingPosts=false;
    }

    onMount(async () => {        
        ready = false;
        if (imageElementPfp) {
            cropperPfp = new Cropper(imageElementPfp, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 1,
                cropBoxMovable: true,
                cropBoxResizable: true,
            });
        }

        if (imageElementBg) {
            cropperBg = new Cropper(imageElementBg, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 1,
                cropBoxMovable: true,
                cropBoxResizable: true,
            });
        }

        profile = await getOwnAccount();
        if (profile.pfp) {
            imageUrlPfp = profile.pfp;
        }
        if (profile.banner) {
            imageUrlBg = profile.banner;
        }
        posts = await getPostsByUser(profile.id, 1, 5);
        ready = true;
    })

    afterUpdate(() => {
        if (showCropperPfp && imageElementPfp && !cropperPfp) {
            cropperPfp = new Cropper(imageElementPfp, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 1,
                cropBoxMovable: true,
                cropBoxResizable: true,
            });
        }

        if (showCropperBg && imageElementBg && !cropperBg) {
            cropperBg = new Cropper(imageElementBg, {
                aspectRatio: 95 / 12,
                viewMode: 0,
                dragMode: 'move',
                autoCropArea: 1,
                cropBoxMovable: true,
                cropBoxResizable: true,
            });
        }
    });
</script>

{#if ready}
{#if showCropperPfp}
    <div class="modal">
        <img bind:this={imageElementPfp} src={imageUrlPfp} alt="Image for cropping" />
        <button on:click={applyCropPfp}>Apply Crop</button>
    </div>
{/if}
{#if showCropperBg}
    <div class="modal">
        <img bind:this={imageElementBg} src={imageUrlBg} alt="Image for cropping" />
        <button on:click={applyCropBg}>Apply Crop</button>
    </div>
{/if}
<div class="main">
    <label for="fileInputBg">
        <img id="imageBg" alt="" class="custom-file-input" src={imageUrlBg!=null ? imageUrlBg : ""} />
    </label>
    <input id="fileInputBg" type="file" name="imageBg" accept="image/*" style="display: none;" on:change={handleFileUploadBg} />
    
    <div class="profile-pic-username">
    <label for="fileInputPfp">
        <img id="imagePfp" alt="" class="custom-file-account-img" src={imageUrlPfp!=null ? imageUrlPfp : ""} />
    </label>
    <input id="fileInputPfp" type="file" name="imagePfp" accept="image/*" style="display: none;" on:change={handleFileUploadPfp} />
    <div class="username-p">
        <p>{profile.userName}</p>
    </div>
</div>
    <div class="profile-buttons">
        <button on:click={async()=>{await fetchUserPosts()}}>
            Мои постове
        </button>
        <button on:click={async()=>{await fetchSavedPosts()}}>
            Запазени
        </button>
        <button on:click={async()=>{await fetchLikedPosts()}}>
            Харесани
        </button>
    </div>
    <div class="separator"></div>
    <div class="post-wraper">
        {#if loadingPosts}
            <p>Зареждане...</p>
            <Loading/>
        {/if}
        {#if !loadingPosts}
            {#each posts as postId (postId)} 
                <div style="position: relative">
                    <button class="delete-button" on:click={async()=>{await handledeletePost(postId)}}><i class='bx bxs-trash' ></i></button>
                    <PostReal {postId} />
                </div>
            {/each}
        {/if}
    </div>
</div>
{/if}



<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal img {
        max-width: 80%;
        max-height: 80%;
    }
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
        object-fit: cover;
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