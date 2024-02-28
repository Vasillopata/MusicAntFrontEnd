<script lang="ts">
    import { browser } from "$app/environment";

    //export const postId:number; !!!!!!!!!!!!!!
    let liked = false
    

</script>

<button id='temp' on:click={()=>{liked = !liked}} class:like-active={liked}><i class='bx {liked ? 'bxs-heart' : 'bx-heart'}' ></i></button>

<style>

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
    :global(.bxs-heart){
        font-size: 2.5rem;
        transition: all 0.1s;
        cursor: pointer;
        
    }
    :global(.bxs-heart:hover){
        scale: 0.9;
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
    
</style>