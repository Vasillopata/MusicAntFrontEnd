<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { fade, slide } from "svelte/transition";
    import Post from "../Posts/Post.svelte";

    let bellRing = false 
    let isFan = false 
</script>
<div class="account-page">
    <div class="account-background">
        <img src="https://thumbs.dreamstime.com/b/panoramic-autumn-landscape-wooden-path-fall-nature-backgro-sunset-background-97979511.jpg" alt="">    
    </div>
    <div class="account-img">
            <img src="/images/ale.jpg" alt="">
            <p>Dr Ale</p>
        <div class="account-buttons">
            <button>
                Съобщение
            </button>
            {#if isFan}
                <button on:click={()=>{bellRing = !bellRing}} transition:slide={{duration:300, axis:"x", easing: quintOut}} class="bell">
                    <i class='{bellRing ? "bx bx-bell" : "bx bx-bell-off" }'></i>
                </button>
            {/if}
            <button style="width:{isFan ? "7.5rem" : "6.5rem"}" class:is-fan={isFan} on:click={()=>{isFan = !isFan}}>
                {isFan ? "Вече си фен" : "Стани фен"}
            </button>
        </div>
    </div>
    <div style="display: flex; flex-direction:row; justify-content:space-between">
        <div class="post-list">
            <Post imgURL={'/images/papi1.jpg'}/>
            <Post imgURL={'/images/papi1.jpg'}/>
            <Post imgURL={'/images/papi1.jpg'}/>
        </div>
    </div>
</div>

<style>
    .post-list{
        margin-left: 17rem;
    }
    .account-page{
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .account-background{
        display: flex;
        flex-direction: row;
        width: 95rem;
        height: 12rem;
        margin-left: 2rem;
    }
        .account-background>img{
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 1.5rem;
        }
    .account-img{
        display: flex;
        flex-direction: row;
        width: 95rem;
    }
        .account-img>img{
            object-fit: cover;
            height: 12rem;
            width: 12rem;
            margin-top: -6rem;
            margin-left: 5rem;
            border-radius: 100%;
            outline: 0.4rem solid var(--black1);
        }
        .account-img>p{
            font-size: 2.5rem;
            margin-left: 1.3rem;
        }
        .account-img>.account-buttons{
            margin-top: 1rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            background-color: var(--black1);
            margin-left: auto;
            height: 3rem;
            margin-right: -1rem;
            width: 21rem;
        }
        .account-img>.account-buttons>button{
            border: none;
            background-color: var(--black1);
            color: whitesmoke;
            height: 3rem;
            border: 1px solid var(--gray);
            border-radius: 1.5rem;
            margin-left: 0.5rem;
            padding: 0 0.5rem;
            transition: width 0.3s ease-in-out, border 0.1s ease-in-out;
            text-wrap: nowrap;
        }
            .account-img>.account-buttons>button:hover{
                border: 1px solid whitesmoke;
            }
            .account-img>.account-buttons>.is-fan{
                background-color: var(--blue);
                border: 1px solid var(--blue);
            }
            .account-img>.account-buttons>.bell{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: 1.6rem;
                width: 3rem;
                padding: 0;
            }
</style>