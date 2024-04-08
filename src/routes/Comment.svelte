<script lang="ts">
    import { slide } from "svelte/transition";
    import LikeButton from "./LikeButton.svelte";
    import SaveButton from "./SaveButton.svelte";

    let parentcomment = ''
    let searchBarElement: HTMLInputElement|undefined = undefined
</script>
<hr>
<div class="comentator">
    <div class="profile-pick">
        <img src="/images/moni.jpg" alt="">
    </div>
    <p>Name</p>
</div>
<div class="comment">
    <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu
    </p>
    <div class="bottom-comment">
        <div>
            <LikeButton/>
        </div>
        <textarea class="parent-comment" name="parent-comment" id="" bind:value={parentcomment}></textarea>
        <div>
            <div class="clear-button">
                {#if parentcomment != ''}
                    <button on:click={()=>{parentcomment = "";searchBarElement?.focus()}} transition:slide={{duration:300}}><i class='bx bx-message-square-x' ></i></button>
                {/if} 
            </div>
        </div>
        
        <div style="margin-left: auto;">
            <button>
                <i class='bx bx-right-arrow'></i>
            </button>
        </div>
    </div>
</div>

<style>
    .clear-button{
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: center;
       margin-left: 0.2rem;
    }
        .clear-button>button{
            font-size: 2rem;
            color: whitesmoke;
        }
        .clear-button>button>i:hover{
            color: red;
        }
    .parent-comment{
        border: whitesmoke;
        outline: none;
        width: 40rem;
        padding: 0.5rem;
        max-height: 9rem;
        height: 3rem;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: transparent;
        color: whitesmoke;
        border: 1px solid var(--black2);
        border-radius: 1rem;
    }
    .bottom-comment{
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        min-height: 3.5rem;
    }
    textarea{
        height: 3rem;
        min-height: 3rem;
        max-height: 9rem;
        width: 40rem;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        padding: 0.5rem;
        color: whitesmoke;
        background-color: transparent;
        outline: none;
        margin-left: 0.5rem;
    }
        textarea::-webkit-scrollbar{
            width: 0.5rem;
        }
    button{
        background-color: transparent;
        box-shadow: 0;
        border: none;
        z-index: 1;
    }
    .bx-right-arrow{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
    }
        .bx-right-arrow:hover{
            color: var(--blue);
        }
    .comment{
        margin-top: 0.5rem;
        align-items: center;
    }
        .comment>p{
                font-size: 0.8rem;
                margin: 0 2rem 0.7rem 2rem;
        }
    .comentator{
        display: flex;
        flex-direction: row;
        height: 3.5rem;
        align-items: center;
        padding-left: 1rem;
    }
        .comentator>p{
            font-size: 1rem;
            margin-bottom: 0;
            padding-left: 0.3rem;
        }
    .profile-pick{
        display: flex;
        flex-direction: row;
        height: 2.5rem;
        width: 2.5rem;
        overflow: hidden;
        z-index: 1;
        border-radius: 100%;
        transition: border-radius 0.2s ease-in-out;
    }
        .profile-pick>img{
            border-radius: inherit;
            object-fit: cover;
            width: 100%;
            height: 100%;
            z-index:0;
        }
            .profile-pick:hover {
                border-radius: 10%;
                cursor: pointer;
                transition: border-radius 0.15s ease-in-out;
            }
</style>