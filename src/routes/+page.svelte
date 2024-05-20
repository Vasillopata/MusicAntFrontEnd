<script lang="ts">
    import Post from "./Posts/Post.svelte";
    import PostImgTxt from "./Posts/PostImgTxt.svelte";
    import { page } from "$app/stores";
    import PostTxt from "./Posts/PostTxt.svelte";
    console.log($page.url.pathname)
</script>

<div class= "feed">
    <PostImgTxt imgURL={'ab67706c0000da8481d620645973fe11fe5b2782.jpeg'}/>
    <PostTxt/>
    <Post imgURL={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}/>
    <Post imgURL={'/images/papi2.jpg'}/>
    <Post imgURL={'/images/papi1.jpg'}/>
    <Post imgURL={'/images/papi.png'}/>
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

