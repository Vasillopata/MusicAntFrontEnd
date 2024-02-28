<script lang="ts">
    import Post from "./Posts/Post.svelte";
    import PostImgTxt from "./Posts/PostImgTxt.svelte";
    import { page } from "$app/stores";
    console.log($page.url.pathname)
</script>

<div class= "mainPage">
    <PostImgTxt imgURL={'https://cdn.britannica.com/51/94351-050-86B70FE1/Leaning-Tower-of-Pisa-Italy.jpg'}/>
    <Post imgURL={'/images/monstro.jpg'}/>
    <Post imgURL={'/images/niggawebp.webp'}/>
    <Post imgURL={'/images/OIG.png'}/>
    <Post imgURL={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}/>
    <Post imgURL={'/images/papi2.jpg'}/>
    <Post imgURL={'/images/papi1.jpg'}/>
    <Post imgURL={'/images/papi.png'}/>
</div>

<style>
    .mainPage{  
        display: flex;
        margin-top: 0%;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-left: -5rem;
    }
</style>

