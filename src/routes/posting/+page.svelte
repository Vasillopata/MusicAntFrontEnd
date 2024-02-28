<script lang="ts">
    import { backInOut, circInOut, cubicInOut, linear, sineInOut } from "svelte/easing";
    import { fade, fly, slide } from "svelte/transition";

    let selectedPostType = 'img'
    let imageUrl = ''
    let textInput = ''
    let titleInput = ''
    function handleFileUpload(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
    $: postReady = titleInput != '' && ((selectedPostType == "img" && imageUrl != '') || (selectedPostType == "imgtxt" && imageUrl != '' && textInput != "" ) || (selectedPostType == "txt" && textInput != "" ))

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
            <p>OodaOdaodadadadadaOoda</p>
        </div>
        <div class="post-title">
            <input bind:value={titleInput} placeholder="Заглавие..." type="text">
        </div>
        {#if selectedPostType == 'img'}
            <div class="create-post-img">
                <label for="image" class="custom-file-input" style="background-image: url({imageUrl!=null ? imageUrl : ""}); background-repeat: no-repeat; background-size:contain; background-position:center;">
                    {#if imageUrl}
                        <span>Change</span>
                    {:else}
                        <i class='bx bxs-image-add' ></i>
                    {/if}
                </label>
                <input bind:value={imageUrl} id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
            </div>
        {:else if selectedPostType == 'imgtxt'}
            <div class="create-post-imgtxt">
                <label for="image" class="custom-file-input" style="background-image: url({imageUrl!=null ? imageUrl : ""}); background-repeat: no-repeat; background-size:contain; background-position:center;">
                    {#if imageUrl}
                        <span>Change</span>
                    {:else}
                        <i class='bx bxs-image-add' ></i>
                    {/if}
                </label>
                <input bind:value={imageUrl} id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
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
    {#if postReady }
        <button transition:fade={{duration: 100}} class="submit-button">Качи</button>
    {/if}
</div>



<style>
    .submit-button{
        display: flex;
        left: 100%;
        margin-left: 1rem;
        position: absolute;
        border-radius: 1.5rem;
        background-color: var(--black1);
        bottom: 0rem;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;            
        color: var(--blue);
        border-radius: 1.5rem;
        font-size: 2rem;
        padding: 0.2rem;
        transition: all 0.1s ease-in-out;
    }
        .submit-button:hover{
            color: whitesmoke;
        }
    .create-post-area{
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
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
    .mid-post{
        display: flex;
        flex-direction: row;
        border: 1px solid var(--black2);
        width: 100%;
        min-height: 20rem;  /* временни мин и макс !!!!!!!!!!!*/
        max-height: 40rem;  /* временни мин и макс !!!!!!!!!!!*/
    }
        .top-post>p{
            margin-bottom: 0px;  
            margin-left: 0.3rem;
        }
        .mid-post >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    .bot-post{
        display: flex;
        flex-direction: row;
        border: 1px solid var(--black2);
        height: 4rem;
        align-items: center;
        padding-left: 0.6rem;
    }
</style>