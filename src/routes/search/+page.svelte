<script lang="ts">
    import {currentSearchQuery, search} from '$lib/stores/searchQuery'
    import { onMount } from 'svelte';
    import type {User} from '$lib/handlers/UserHandler'
    import { slide } from 'svelte/transition';
    import type { Post } from '$lib/handlers/PostHandler';
    import type { Community } from '$lib/handlers/CommunityHandler';
    import AccountLink from "../AccountLink.svelte";
    import PostLink from "../PostLink.svelte";
    import CommunityLink from '../CommunityLink.svelte';

    let ready = false

    let data:any = undefined;
    let friends: User[] = []
    let profiles: User[] = []
    let posts: Post[] = []
    let postImgs: string[] = []
    let communities: Community[] = []

    let friendsOpened = false
    let profilesOpened = false
    let postsOpened = false
    let communitiesOpened = false

    async function handleSearch(){
        ready = false;
        data = await search();
        friends = data.friends;
        profiles = data.profiles;
        posts = data.posts;
        postImgs = data.postImgs;
        communities = data.communities;
        ready = true;
    }
    $:{
        if ($currentSearchQuery){
            handleSearch();
        }
    }
    onMount(async () => {
        handleSearch();
    }) 
</script>

{#if ready}
<div class="wrap">
    <div class="friends">
        <button on:click={()=>{friendsOpened = !friendsOpened}}>Приятели</button>
        {#if friendsOpened}
            <div class="dropdown-body"transition:slide>
                {#each friends as friend}
                    <AccountLink username="{friend.userName}" id={friend.id} image={friend.pfp}/>           
                {/each}
            </div>
        {/if}
    </div>
    <div class="profiles">
        <button on:click={()=>{profilesOpened = !profilesOpened}}>Профили</button>
        {#if profilesOpened}
            <div class="dropdown-body"transition:slide>
                {#each profiles as profile}
                    <AccountLink username="{profile.userName}" id={profile.id} image={profile.pfp}/>           
                {/each}
            </div>
        {/if}
    </div>
    <div class="post">
        <button on:click={()=>{postsOpened = !postsOpened}}>Публикации</button>
        {#if postsOpened}
            <div class="dropdown-body"transition:slide>
                {#each posts as post, index}
                    <PostLink title={post.title} image={postImgs[index]} id={post.id}/>
                {/each}
            </div>
        {/if}
    </div>
    <div class="communities">
        <button on:click={()=>{communitiesOpened = !communitiesOpened}}>Общности</button>
        {#if communitiesOpened}
            <div class="dropdown-body" transition:slide>
                {#each communities as community}
                    <CommunityLink {community}/> 
                {/each}
            </div>
        {/if}
    </div>
</div>
{/if}
<style>
    .wrap{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
        .wrap>div{
            margin-bottom: 0.5rem;
        }
    div>button{
        border: none;
        outline: none;
        font-size: 2rem;
        background-color: var(--darkest);
        color: whitesmoke;
        border-radius: 1rem;
        width: 30rem;
        height: 3.5rem;
        text-align: left;
        padding-left: 1rem;
    }
        .dropdown-body{
            display: flex;
            flex-direction: column;
            padding: 1rem;
            width: 100%;
        }
</style>