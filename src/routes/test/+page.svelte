<script lang="ts">
    import {getPostById, getPostImg} from "$lib/handlers/PostHandler";
    import type {Post} from "$lib/handlers/PostHandler";
    import { onMount } from "svelte";

    let post: Post|undefined = undefined
    let imgURL: string
    onMount(async ()=>{
        imgURL = await getPostImg(1);
        post = await getPostById(1);
    })
</script>
<div style="background-color: red; width: 100%; height:100%; display:flex">
    <img style="height:500px; width: 500px" src="{imgURL}" alt="">
    <p>{post?.title}</p>
</div>


