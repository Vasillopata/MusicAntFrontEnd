<script lang="ts">
    import { browser } from "$app/environment";

    let saved = false
</script>

<button id='temp' on:click={()=>{saved = !saved}} class:like-active={saved}><i class='bx {saved ? 'bxs-bookmark' : 'bx-bookmark'}' ></i></button>

<style>

    button{
        background-color: transparent;
        box-shadow: 0;
        border: none;
        z-index: 1;
    }
    .like-active {
        color: var(--blue);
    }
        .like-active > i {
            color: var(--blue);
        }
        button > i {
            z-index: 0;
        }
    :global(.bxs-bookmark){
        font-size: 2.6rem;
        transition: all 0.1s;
        cursor: pointer;
        
    }
        :global(.bxs-bookmark:hover){
            scale: 0.9;
        }
    :global(.bx-bookmark){
        color: whitesmoke;
        font-size: 2.6rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;

    }   
        :global(.bx-bookmark:hover){
            color: var(--blue) !important;
        }
    
</style>