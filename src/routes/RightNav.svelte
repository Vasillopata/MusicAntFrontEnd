<script lang="ts">
    import { page } from "$app/stores";
    import {scrollY} from '$lib/store'

    let arraytest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    $: console.log($page.url.pathname);
    let navOffsetY:number = ($page.url.pathname.includes('account') ? 18 : 0);
</script>

{#if $page.url.pathname != "/"}
<div class="right-nav" style="top: {Math.max(0, navOffsetY - ($scrollY / 16))}rem;">
    {#if $page.url.pathname.includes('account')}
    {#each arraytest as test}
        <p>account</p>
    {/each}
    {:else if $page.url.pathname == '/login'}
        asdasdasd
    {/if}
</div>
{/if}


<style>
    .right-nav{
        position: sticky;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        background-color: red;
        flex-direction: column;
        height: 888px;
        width:22rem;
        margin-right: 6.5rem;
    }
    .right-nav::-webkit-scrollbar {
        width: 4px !important;
        overflow:visible !important;
    }
</style>