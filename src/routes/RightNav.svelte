<!-- <script lang="ts">
    import { page } from "$app/stores";
    import {scrollY} from '$lib/store'
    import { onMount } from "svelte";

    let ready = false;

    let arraytest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    $: console.log($page.url.pathname);
    let navOffsetY:number = 0;

    
    let rightNavEl:HTMLDivElement;
    async function calcOffset(){
        navOffsetY = (await $page.url.pathname.includes('account') ? 18 : 0);
        rightNavEl.style.top = `${Math.max(2, navOffsetY - ($scrollY / 16))}rem`;
    }

    onMount(async() => {
        await calcOffset();
        ready = true;
    });
</script>

{#if ready && $page.url.pathname != '/' && $page.url.pathname.includes('account') }
<div class="right-nav" style="top: 0rem;" bind:this={rightNavEl}>
    {#if $page.url.pathname.includes('account')}
    {#each arraytest as test}
        <p>account</p>
    {/each}
    {/if}
    {#if $page.url.pathname.includes('account')}
    {#each arraytest as test}
        <p>account</p>
    {/each}
    {/if}
</div>  
{/if}


<style>
    .right-nav{
        position: sticky;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;                             
        flex-direction: column;
        height: 888px;
        width:23rem;
        margin-right: 4.4rem;
        background-color: var(--darkest);
        color: whitesmoke;
        border-radius: 1rem 0rem 0rem 1rem;
        margin-bottom: 4rem;
        padding: 1rem;
    }
    .right-nav::-webkit-scrollbar {
        width: 4px !important;
        overflow:visible !important;
    }
</style> -->