<script lang="ts">
    import { browser } from "$app/environment";


    function like(id: string) {
        if (browser) {
            let likeButton = document.getElementById(id);
            if (likeButton != null) {
                const icon = likeButton.firstElementChild;
                if (icon != null) {
                    icon.style.color = 'red';
                }
                
                
            }
        }
    }
</script>

<div class= "mainPage">
    <div class="post">
        <div class="top-post">
            <div class="top-profile">
                <img src="/images/moni.jpg" alt="">
            </div>
            <p>xX.woman_Under5tander.Xx</p>
        </div>
        <div class="mid-post">
            <img src="https://cdn.britannica.com/51/94351-050-86B70FE1/Leaning-Tower-of-Pisa-Italy.jpg" alt="">
        </div>
        <div class="bot-post">
            <button id='temp' on:click={()=>like('temp')}><i class='bx bx-heart' ></i></button>
            <button><i class='bx bx-message-square'></i></button>
            <button><i class='bx bx-right-arrow'></i> </button>
        </div>
    </div>
</div>


<style>
    .top-post > p:hover{
        cursor: pointer;
    }
    button{
        background-color: transparent;
        box-shadow: 0;
        border: none;
        z-index: 1;
    }
    .like-active {
        color: red !important;
    }
        .like-active > i {
            color: red !important;
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
    .mainPage{  
        display: flex;
        margin-top: 0%;
        width: 100%;
        flex-direction: column;
        align-items: center;
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
    .bx-heart{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;
    }   
        .bx-heart:hover{
            color: var(--blue);
        }
    .post{
        display: flex;
        border: 1px solid var(--black2);
        border-radius: 0.5rem;
        overflow: hidden;
        margin-top: 6rem;
        margin-left: 1rem;
        flex-direction: column;
        width: 40rem;
        margin-bottom: 6rem;
    }
    .top-post{
        display: flex;
        flex-direction: row;
        border: 1px solid var(--black2);  
        height: 4rem;
        align-items: center;
        padding-left: 0.6rem;
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

