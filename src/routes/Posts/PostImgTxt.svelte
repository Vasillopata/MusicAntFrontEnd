<script lang="ts">
    import LikeButton from "../LikeButton.svelte";
    import { browser } from "$app/environment";

    export let imgURL: string
    
    function like(id: string) {
        if (browser) {
            let likeButton = document.getElementById(id);
            if (likeButton != null) {
                const icon = likeButton.firstElementChild as HTMLButtonElement;
                if (icon != null) {
                    if(icon.style.color == 'red'){
                        icon.style.color = 'whitesmoke'
                        icon.classList.remove('bxs-heart')
                        icon.classList.add('bx-heart')
                    }else{
                        icon.style.color = 'red';
                        icon.classList.remove('bx-heart')
                        icon.classList.add('bxs-heart')
                    }
                }
            }
        }
    }
</script>

<div class="post-separator"></div>
<div class="post">
    <div class="top-post">
        <div class="top-profile">
            <img src="/images/moni.jpg" alt="">
        </div>
        <p>xX.woman_Under5tander.Xx</p>
    </div>
    <div class="post-title">
        defend women rights
    </div>
    <div class="mid-post">
        <img class="fg-image" src={imgURL} alt="">
        <img class="bg-image" src={imgURL} alt="">
    </div>
    <div class="post-txt">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt
    </div>
    <div class="bot-post">
        <LikeButton/>
        <button><i class='bx bx-message-square'></i></button>
        <button><i class='bx bx-right-arrow'></i> </button>
        <button style="margin-left: auto;"><i class='bx bx-bookmark'></i></button>
    </div>
</div>

<style>
    .post-title{
        display: flex;
        font-size: 1.4rem;
        flex-direction: row;
        min-height: 0;
        max-height: 2rem;
        align-items: center;
        padding-left: 0.3rem;
        text-align: start;
        margin-bottom: 0.5rem;
    }
    .post-txt{
        margin-top: 0.4rem;
        display: flex;
        flex-direction: row;
        max-height: 9rem;
        align-items: center;
        padding-left: 0.3rem;
        text-align: start;
    }
    :global(.bxs-heart){
        font-size: 2.5rem;
        transition: all 0.1s;
        cursor: pointer;
    }
    :global(.bxs-heart:hover){
        scale: 0.9;
    }
      .bx-right-arrow{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;
    }
        .bx-right-arrow:hover{
            color: var(--blue);
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
        :global(.bx-heart){
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;

    }   
        :global(.bx-heart:hover){
            color: var(--blue);
        }
    .bx-bookmark{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;
    }   
    .bx-bookmark:hover{
        color: var(--blue);
    }
    .post{
        display: flex;
        overflow: hidden;
        border-radius: 1rem;
        flex-direction: column;
        width: 50rem;
        padding: 0 1rem;
        transition: background-color 0.15s ease-in-out;
    }
        .post:hover{
            background-color: var(--black1-hover);
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
        max-height: 28rem;
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        border: 1px solid var(--black2);
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
        background-color: var(--black2);
        height: 1px;
        width: 49rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
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
        button > i {
            z-index: 0;
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