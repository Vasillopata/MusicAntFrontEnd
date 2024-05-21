<script lang="ts">
    import type { Community } from "$lib/handlers/CommunityHandler";

    export let community: Community
</script>

<div class="Box">
    <a href="/community/{community.id}">
        {#if community.type == 'news'}
            <i class='bx bxs-news'></i>
        {:else if community.type == 'fan'}
            <i class='bx bx-star'></i>
        {:else if community.type == 'event'}
            <i class='bx bxs-calendar-event' ></i>
        {/if}
        <span>{community.name}</span>
    </a>  
</div>


<style>
    i {
        font-size: 2rem;
        margin-right: 0.5rem;
    }
    .Box{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        max-width: 25rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
        .Box:hover{
            background-color: var(--black2);
            transition: background-color 0.1s ease-in-out;
        }
        .Box>a{
            align-items: center;
            display: flex;
            flex-direction: row;
            color: whitesmoke;
            text-decoration: none;
            z-index: 3;
            position: relative;
        }   
            .Box>a>span{
                overflow: hidden;
                text-overflow:ellipsis;
                min-width: 0;
                margin-left: 0.8rem;
            }
    .top-profile{
        display: flex;
        flex-direction: row;
        height: 3rem !important;
        width: 3rem !important;
        min-width: 3rem;
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