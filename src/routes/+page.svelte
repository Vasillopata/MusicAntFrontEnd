<script lang="ts">
    import Post from "./Posts/Post.svelte";
    import PostImgTxt from "./Posts/PostImgTxt.svelte";
    import { page } from "$app/stores";
    import PostTxt from "./Posts/PostTxt.svelte";
    import { getPostsOnFeed } from "$lib/handlers/PostHandler";
    import { onMount } from "svelte";
    import PostReal from "./Posts/PostReal.svelte";
    console.log($page.url.pathname)

    let ready = false;
    let posts: number[] = []

    onMount(async()=>{
        ready = false;
        posts = await getPostsOnFeed();
        console.log(posts)
        ready = true;
    })
</script>

<div class= "feed">
    {#each posts as postId }
        <PostReal {postId}/>
    {/each}
</div>

<style>
    .feed{  
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width:50rem;
        margin-left: calc(50% - 33rem);
        margin-top: 2rem;
    }
</style>

