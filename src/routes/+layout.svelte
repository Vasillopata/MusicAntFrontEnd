<script lang="ts">
    import { onMount } from 'svelte';
    import LeftNav from './LeftNav.svelte';
    import RightNav from "./RightNav.svelte";
    import "./style.css";
    import {slide} from 'svelte/transition';
    import { writable } from 'svelte/store';
    import {isLoggedIn} from '$lib/handlers/UserHandler'
    import {currentSearchQuery} from '$lib/stores/searchQuery'
    
    let searchBarInput = ''
    let searchBarElement: HTMLInputElement|undefined = undefined

    let website: HTMLDivElement;
    let loggedIn = false
    import { scrollY } from '$lib/store'
    import { goto } from '$app/navigation';

    onMount(async() => {
        loggedIn = await isLoggedIn()
        await website.addEventListener('scroll', () => {
            scrollY.set(website.scrollTop);
        });
    });
    async function handleSearch(){
        await currentSearchQuery.set(searchBarInput)
        searchBarInput = ''
        goto('/search')
    }
</script>



<div class="app">
    <div class="top-nav">
        <div class="logo">
            <a style="text-decoration: none;" href="/" class="logo-button">
                <img src="/images/ant.svg" alt="">
                MUSIC<span style="color:var(--blue)">A</span>NT
            </a>
        </div>
        <div style="position: relative; margin: 0 auto;">
            <button class="search-button" on:click={async()=> {await handleSearch()} }>
                <i class='bx bx-search'></i>
            </button>
            <input placeholder="Търси..." class="search-bar" type="text" name="" bind:value={searchBarInput} bind:this={searchBarElement}> 
            {#if searchBarInput != ''}
                <button on:click={()=>{searchBarInput = "";searchBarElement?.focus()}} transition:slide={{duration:400}} class="search-bar-clear"><i class='bx bx-message-square-x' ></i></button>
            {/if}
        </div>
        <a class="post-button" href="/posting">Качи</a>

        {#if loggedIn}
        <a href="/profile">
            <div class="account-img">
                <img src="/images/ale.jpg" alt="">
            </div>
        </a>
            
        {:else}
        <a style="text-decoration: none" href="/login"><button class="login-button">Вход</button></a>
        {/if}
    </div>
    <div class="website-wrap-wrap">
        <LeftNav/>
        <div class="website-wrap" bind:this={website}>
            <main>
                <slot/>
            </main>
            <RightNav/>
        </div>
    </div>
</div>

<style>
    .search-button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute; 
        height: 2rem;
        width: 2rem;
        top:50%;
        left:0.8rem; 
        font-size:2rem; 
        transform:translateY(-50%); 
        opacity:1 !important;z-index:1; 
        background: none; 
        border: none; 
        color:whitesmoke;
        transition: color 0.1s ease-in-out;
    }
        .search-button:hover>i{
            color: var(--blue);
        }
    .account-img{
        border-radius: 100%;
        cursor: pointer;
    }
    .account-img>img{
        object-fit: cover;
        height: 4rem;
        width: 4rem;
        border-radius: 100%;
        cursor: pointer;
    }
        .account-img>img:hover{
            border: 1px solid var(--black2);
        }
    .website-wrap-wrap {
        display:flex;
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    .website-wrap {
        display: flex;
        flex-direction: row;
        width:100%;
        flex-grow: 1;
        overflow:auto;
        align-items: normal;
        position: relative;
    }
        main {
            display: flex;
            flex-direction: column;
            width:100%;
            background-color: var(--black1);
            color: whitesmoke;
        }
    .post-button{
        display: flex;
        flex-direction: row;
        height: 3.5rem;
        width: 6.5rem;
        border-radius: 1.5rem;
        justify-content: center;
        align-items: center;
        background-color: var(--black1);
        border: none;
        font-size: 1.5rem;
        color: whitesmoke;
        margin-right: 1.5rem;
        text-decoration:none ;
    }
        .post-button:hover{
            background-color: var(--black1-hover);
        }
    
    .login-button{
        border: none;
        background-color: var(--blue);
        color: whitesmoke;
        font-size: 1.5rem;
        border-radius: 1.5rem;
        height:3.4rem ;
        width: 6.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
        .login-button:hover{
            opacity: 0.85;
        }
    .search-bar-clear {
        position: absolute; 
        top:50%;right:1.5rem; 
        font-size:1.75rem; 
        transform:translateY(-50%) scaleX(-1);
        opacity:1 !important;
        z-index:1; 
        background:none; 
        border:none; 
        color:whitesmoke;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh !important;
        height: 100vh !important;
        min-width: 100vw !important;
        box-sizing: border-box;
        background-color: var(--black1);
    }

    .search-bar{
        background-color: var(--black1);
        border: none;
        height: 3.5rem;
        width: 60rem;
        border-radius: 1.5rem;
        padding-left: 4rem;
        color: whitesmoke;
        font-size: 1.2rem;
        opacity: 0.3;
        transition:opacity 0.1s ease-in-out;
    }
        .search-bar::placeholder{
            color: whitesmoke;
        }
        .search-bar:hover, .search-bar:focus{
            opacity: 1;
            outline: none;
        }
    .logo{
        display: flex;
        font-size: 4.7rem;
        background-color: var(--darkest);
    }
    .logo-button{
        background-color: var(--darkest);
        border: none;
        color: whitesmoke;
        font-size: 2rem;
        font-variant: small-caps;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 0.07rem;
        transition: color 0.1s ease-in-out;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
        .logo-button>img{
            height: 5.5rem;
            filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(39deg) brightness(121%) contrast(103%);
            transition: filter 0.1s ease-in-out;
            margin-right: 0.6rem;
        }
        .logo-button:hover>img{
            filter: brightness(0) saturate(100%) invert(58%) sepia(40%) saturate(915%) hue-rotate(194deg) brightness(90%) contrast(89%);
        }
        .logo-button:hover{
            color: var(--blue);
        }
        .logo-button:hover>span{
            color: rgb(245, 245, 245) !important;
        }
    .top-nav{
        display: flex;
        flex-direction: row;
        height: 6rem !important;
        color: whitesmoke;
        background-color:var(--darkest);
        box-shadow: 0px  4px 5px rgba(0, 0, 0, 0.3);
        justify-content: flex-start;
        align-items: center;
        padding: 0 1rem;
        width: 100%;
        z-index: 5;
    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>
