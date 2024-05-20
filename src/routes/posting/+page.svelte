<script lang="ts">
    import { fade } from "svelte/transition";
    import Croppie from "croppie";
    import {getUserName} from '$lib/handlers/AccountHandler'
    import { onMount } from "svelte";
    import { createPost } from "$lib/handlers/PostHandler";
    import type { Post } from "$lib/handlers/PostHandler";
    import { goto } from "$app/navigation";

    let selectedPostType = 'img'
    let imageUrl = ''
    let textInput = ''
    let titleInput = ''
    let croppieElement: HTMLDivElement;
    let croppieInstance: Croppie;
    let croppieActive = false;
    let username = ''


    async function handleFileUpload(event: Event) {
        croppieActive = true;
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrl = reader.result as string;
                croppieInstance = new Croppie(croppieElement, {
                    viewport: { width: 798, height: 592 },
                    showZoomer: false,
                    enableZoom: true,
                    enforceBoundary: false
                });
                croppieInstance.bind({
                    url: imageUrl,
                });
            };
            reader.readAsDataURL(file);
        }
    }

    $: postReady = titleInput != '' && ((selectedPostType == "img" && imageUrl != '') || (selectedPostType == "imgtxt" && imageUrl != '' && textInput != "" ) || (selectedPostType == "txt" && textInput != "" ));

    async function cropImage() {
        await croppieInstance.result({ format: "jpeg", size: "viewport" }).then(function (result:any) {
            imageUrl = result;
        });
        croppieActive = false;
    }

    onMount(async()=>{
        username = await getUserName()
    })

    async function handlePost() {
        let img = await fetch(imageUrl).then(res => res.blob());
        let id = await createPost(titleInput, textInput, img, null)
        await goto(`/post/${id}`)
    }

</script>

<div class="create-post-area">
    <div class="type-of-post">
    <button on:click={()=>selectedPostType = "img"}>
        <i class='bx bx-image-alt'></i> снимка
    </button>
    <button on:click={()=>selectedPostType = "imgtxt"}>
        <i class='bx bx-edit' ></i>снимка с текст
    </button>
    <button on:click={()=>selectedPostType = "txt"}>
        <i class='bx bx-text' ></i>текст
    </button>
    </div>
   
    <div class="create-post">
        <div class="top-post">
            <div class="top-profile">
                <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="">
            </div>
            <p>{username}</p>
        </div>
        <div class="post-title">
            <input bind:value={titleInput} placeholder="Заглавие..." type="text">
        </div>
        {#if selectedPostType == 'img'}
            <div class="create-post-img">
                <label for="image" class="custom-file-input" style="background-image: url({imageUrl!=null ? imageUrl : ""}); background-repeat: no-repeat; background-size:contain; background-position:center; opacity:{croppieActive ? "0" : ""}">
                    {#if imageUrl}
                        <span>Change</span>
                    {:else}
                        <i class='bx bxs-image-add' ></i>
                    {/if}
                </label>
                <input bind:value={imageUrl} id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
                {#if croppieActive}
                <div bind:this={croppieElement}>
                    <button on:click={async ()=>{await cropImage()}}><i class='bx bx-crop'></i></button>
                </div>
                {/if}
            </div>
        {:else if selectedPostType == 'imgtxt'}
            <div class="create-post-imgtxt">
                <label for="image" class="custom-file-input" style="background-image: url({imageUrl!=null ? imageUrl : ""}); background-repeat: no-repeat; background-size:contain; background-position:center; opacity:{croppieActive ? "0" : ""}">
                    {#if imageUrl}
                        <span>Change</span>
                    {:else}
                        <i class='bx bxs-image-add' ></i>
                    {/if}
                </label>
                <input bind:value={imageUrl} id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
                {#if croppieActive}
                <div bind:this={croppieElement}>
                    <button on:click={async ()=>{await cropImage()}}><i class='bx bx-crop'></i></button>
                </div>
                {/if}
            </div>
            <div  class="txt-for-imgtxt">
                <textarea bind:value={textInput} placeholder="Текст..."></textarea>
            </div>
        {:else if selectedPostType == 'txt'}
            <div class="create-post-txt">
                <textarea bind:value={textInput} placeholder="Текст..."></textarea>
            </div>
        {/if}
    </div>
    
        <button transition:fade={{duration: 100}} class="submit-button" class:submit-inactive={!postReady} on:click={
            async()=>{
                await handlePost()
            }
        }>Качи</button>
</div>



<style>
    
    :global(.croppie-container) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999; /* Adjust z-index as needed */
        box-sizing: border-box !important;
    }
        :global(.croppie-container > button) {
            position: absolute;
            bottom: 0;
            right:0;
            width: 4rem;
            height:4rem;
            z-index: 999;
            margin: 0 2rem 2rem 0;
            outline: none;
            border: none;
            border-radius: 1rem;
            font-size: 2rem;
            line-height: 2rem;
            background-color: var(--blue);
            color: whitesmoke;
            transition: opacity 0.1s ease-in-out;
        }
            :global(.croppie-container > button:hover) {
                opacity:0.9;
            }
    .submit-button{
        display: flex;
        margin-left: 1rem;
        position: absolute;
        bottom: 0rem;
        right: 20rem;
        background-color: transparent;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: var(--darkest);
        outline: none;            
        color: whitesmoke;
        border-radius: 0.5rem;
        font-size: 2rem;
        padding: 0.2rem;
        width: 8rem;
        height: 4rem;
        transition: all 0.1s ease-in-out;
    }
    .submit-inactive{
        opacity: 0.5;
        pointer-events: none;
    }
        .submit-button:hover{
            color: var(--blue);
        }
    .create-post-area{
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        margin-right: 8rem;
    }

    .txt-for-imgtxt{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 9rem;
    }
        .txt-for-imgtxt>textarea{
            width: 100%;
            height: 100%;
            resize: none;
            box-sizing: border-box;
            overflow: hidden;
            background-color: var(--black1);
            color: whitesmoke;
            outline: none;
            border: none;
        }
    .post-title{
        display: flex;
        position: static;
        flex-direction: column;
        height: 3rem;
        justify-content: center;
        font-size: 1.4rem;
    }
        .post-title>input{
            background-color: var(--black1);
            position: static;
            color: whitesmoke;
            border: none;
            outline: none;
        }
    .custom-file-input>span{
        opacity: 0;
        position: relative;
        justify-content: flex-end;
        align-items: baseline;
        color: whitesmoke;
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 30rem;
        background-color: #00000000;
        font-size: 3rem;
        transition: opacity 0.1s ease-in-out, background-color 0.1s ease-in-out;
    }
    .custom-file-input>span:hover{
        opacity: 1;
        font-size: 3rem;
        color: whitesmoke;
        background-color: #00000040;
    }
    .custom-file-input>i{
        cursor: pointer;
    }
    .create-post-imgtxt{
        border: 1px solid var(--black2);
        
    }
        .create-post-imgtxt:hover{
            color: var(--blue);
            cursor: pointer;
        }    
        .create-post-imgtxt label{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 28rem;
            justify-content: center;
            align-items: center;
            font-size: 4rem;
            transition: 0.1s ease-in-out;
            cursor: pointer;
        }
    .create-post-txt{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 37rem;
        border: 1px solid var(--black2);
    }
        .create-post-txt>textarea{
            width: 100%;
            height: 100%;
            resize: none;
            box-sizing: border-box;
            overflow: hidden;
            background-color: var(--black1);
            color: whitesmoke;
            outline: none;
            border: none;
        }
    .create-post-img{
        border: 1px solid var(--black2);
        position: relative;
    }
        .create-post-img:hover{
            color: var(--blue);
            cursor: pointer;
        }    
        .create-post-img label{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 37rem;
            justify-content: center;
            align-items: center;
            font-size: 4rem;
            transition: 0.1s ease-in-out;
            cursor: pointer;
        }
    .type-of-post{
        display:flex;
        flex-direction: row;
        position: static;
        flex-direction:row;
        justify-content:space-between;
        width:50rem;
        height: 6rem;
        background-color:var(--darkest);
        margin: 0.7rem 0;
        margin-bottom: 0;
        border-radius: 1.5rem 1.5rem 0 0;
        padding: 0 2rem;
        align-items: center;
    }
    .create-post{
        display: flex;
        overflow: hidden;
        flex-direction: column;
        width: 50rem;
    }
    .type-of-post>button{
        outline:none;
        border:none;
        background-color:var(--darkest);
        color:whitesmoke;
        border-radius: 1.5rem;
        font-size: 1.5rem;
        height: 80%;
        padding: 0 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.2rem;
    }
    .type-of-post>button:hover{
        background-color: var(--black1);
    }
    .top-profile{
        display: flex;
        flex-direction: row;
        height: 3rem;
        width: 3rem;
        overflow: hidden;
        z-index: 1;
        border-radius: 10%;
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
    .top-post{
        display: flex;
        position: static;
        flex-direction: row;
        border: 1px solid var(--black2);  
        border-radius: 1px 1px 0 0;
        height: 4rem;
        align-items: center;
        padding-left: 0.6rem;
        border-top: hidden;
    }
        .top-post>p{
            margin-bottom: 0px;  
            margin-left: 0.3rem;
        }
        
</style>