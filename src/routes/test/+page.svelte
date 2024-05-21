<script lang="ts">
    import {getPostById} from "$lib/handlers/PostHandler";
    import type {Post} from "$lib/handlers/PostHandler";
    import { onMount } from "svelte";

    let post: Post|undefined = undefined
    let imgURL: string
    onMount(async ()=>{
        post = await getPostById(1);
    })
</script>
<div style="background-color: red; width: 100%; height:100%; display:flex">
    <img style="height:500px; width: 500px" src="{post?.image}" alt="">
    <p>{post?.title}</p>
</div>


