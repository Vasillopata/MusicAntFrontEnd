<script lang="ts">
    import RightNav from "./RightNav.svelte";
import "./style.css";
    import {slide} from 'svelte/transition'
    let searchBarInput = ''
    let searchBarElement: HTMLInputElement|undefined = undefined
    let fansOpened = false
    let genreOpened = false
    let resourcesOpened = false
    let savedOpened = false
    function toggleCategory(e:Event,name:string){
        e.preventDefault()
        switch(name){
            case 'fans':
                fansOpened = !fansOpened
                genreOpened = false
                resourcesOpened = false
                savedOpened = false
                break
            case 'genre':                
                genreOpened = !genreOpened
                fansOpened = false
                resourcesOpened = false
                savedOpened = false
                break
            case 'resources':
                resourcesOpened = !resourcesOpened
                savedOpened = false
                genreOpened = false
                fansOpened = false
                break
            case 'saved':
                savedOpened = !savedOpened
                genreOpened = false
                fansOpened = false
                resourcesOpened = false
                break
        }
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
            <i class='bx bx-search' style="position: absolute; top:50%;left:1.5rem; font-size:2rem; transform:translateY(-50%); opacity:1 !important;z-index:1"></i>
            <input placeholder="Търси..." class="search-bar" type="text" name="" bind:value={searchBarInput} bind:this={searchBarElement}> 
            {#if searchBarInput != ''}
                <button on:click={()=>{searchBarInput = "";searchBarElement?.focus()}} transition:slide={{duration:400}} class="search-bar-clear"><i class='bx bx-message-square-x' ></i></button>
            {/if}
        </div>
        <a class="post-button" href="/posting">Качи</a>
        <a style="text-decoration: none" href="/login"><button class="login-button">Вход</button></a>
    </div>
    <div style="display: flex; flex-direction: row; box-sizing:border-box; margin-top:6rem; min-height:100%">
        <div class="side-nav">
            <a href="/" on:click={(e)=>{toggleCategory(e,'fans')}} class="side-button" class:side-button-opened={fansOpened}>
                <span>Фенове</span>
                <i class='bx bx-chevron-down'></i>
            </a>
            {#if fansOpened}
                <div transition:slide class="dropdown">
                    <a href="/">
                        <div class="top-profile"><img src="/images/moni.jpg" alt=""></div>
                        <span>xX.woman_Under5tander.Xx</span>
                    </a>
                    <a href="/">
                        <div class="top-profile"><img src="/images/papi.png" alt=""></div>
                        <span>Iskender Nursultan Aziz Öztürk</span>
                    </a>    
                    <a href="/account">
                        <div class="top-profile"><img src="/images/ale.jpg" alt=""></div>
                        <span>Dr Porn</span>
                    </a>                  
                    <a href="/">
                        <div class="top-profile"><img src="/images/advokad.png" alt=""></div>
                        <span>Advokaát</span>
                    </a>     
                    <a href="/">
                        <div class="top-profile"><img src="/images/ben.png" alt=""></div>
                        <span>Ben Shapiro</span>
                    </a>               
                </div>
            {/if}
            <a href="/" on:click={(e)=>{toggleCategory(e,'genre')}} class="side-button" class:side-button-opened={genreOpened}>
                <span>Жанрове</span>
                <i class='bx bx-chevron-down'></i>
            </a>
            {#if genreOpened}
                <div transition:slide class="genre-dropdown">
                    <a href="/">
                        <span>Рок</span>
                    </a>
                    <a href="/">
                        <span>Блус</span>
                    </a>
                    <a href="/">
                        <span>Метъл</span>
                    </a>    
                    <a href="/">
                        <span>Класическа</span>
                    </a>              
                    <a href="/">
                        <span>Фолк</span>
                    </a>     
                    <a href="/">
                        <span>Джас</span>
                    </a>     
                    <a href="/">
                        <span>Поп</span>
                    </a> 
                    <a href="/">
                        <span>Електронна</span>
                    </a> 
                </div>
            {/if}
            <a href="/" on:click={(e)=>{toggleCategory(e,'resources')}} class="side-button" class:side-button-opened={resourcesOpened}>
                <span>Ресурси</span>
                <i class='bx bx-chevron-down'></i>
            </a>
            {#if resourcesOpened}
                <div transition:slide class="dropdown">
                    
                </div>
            {/if}
            <a href="/" on:click={(e)=>{toggleCategory(e,'saved')}} class="side-button" class:side-button-opened={savedOpened}>
                <span>Запазени</span>
                <i class='bx bx-chevron-down'></i>
            </a>
            {#if savedOpened}
                <div transition:slide class="dropdown">
                    
                </div>
            {/if}
        </div>
        <main>
            <slot/>
            <RightNav/>
        </main>
    </div>
</div>

<style>
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
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .genre-dropdown{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 16rem;
        margin: 0 0.5rem 1rem 0.5rem;
        padding: 0 1rem 0 0.5rem;
        border-left: 1px solid var(--black1-hover);
    }
        .genre-dropdown>a{
            align-items: center;
            display: flex;
            flex-direction: row;
            color: whitesmoke;
            text-decoration: none;
            width: 100%;
            border-bottom: 1px solid var(--black1);
            margin-bottom: 0.5rem;
            z-index: 3;
            position: relative;
            font-size: 1.2rem;
        }   
            .genre-dropdown>a>span{
                width: 10rem;
                margin-bottom: 0.5rem;
                text-wrap: wrap;
                word-break: break-all;
            }
            .genre-dropdown>a>:hover{
                color: var(--blue);
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
    .dropdown{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        padding: 0 1rem 0 0.75rem;
        border-left: 1px solid var(--black1-hover);
    }
        .dropdown>a{
            align-items: center;
            display: flex;
            flex-direction: row;
            color: whitesmoke;
            text-decoration: none;
            width: 100%;
            border-bottom: 1px solid var(--black1);
            margin-bottom: 0.5rem;
            z-index: 3;
            position: relative;
        }   
            .dropdown>a>span{
                margin-bottom: 0.5rem;
                overflow: hidden;
                text-overflow:ellipsis;
                min-width: 0;
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
        min-height: 100vh;
        box-sizing: border-box;
        overflow: hidden !important;
    }
    main {
        position: relative;
        display: flex;
        height:100%;
        width:100%;
        overflow-y: scroll !important;
        flex-direction: row;
        background-color: var(--black1);
        color: whitesmoke;
        padding:0 1rem;
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
        position: fixed;
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
    .side-nav{
        display: flex;
        flex-direction: column;
        width: 20rem;
        color: whitesmoke;
        background-color:var(--black1);
        box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.3);
        padding: 1rem 0.5rem;
        overflow: hidden;
    }
        .side-nav > a{
            text-decoration: none;
            color: whitesmoke;
            font-size: larger;
        }
        .side-button-opened{
            background-color: var(--black1);
        }
            .side-button-opened>i{
                transform: rotate(180deg);
            }
        .side-button{
            display: flex;
            background-color: var(--darkest);
            width:100%;
            height: 3rem;
            margin: 0 0 1rem 0;
            border-radius: 2rem;
            justify-content: space-between;
            padding: 0 1rem;
            align-items: center;
        }   
            .side-button>i{
                font-size: 1.5rem;
                transition: transform 0.2s ease-in-out;
            }
            .side-button:hover{
                background-color: var(--black1-hover);
                cursor: pointer;
                color: whitesmoke   !important;
            }
    * {
        box-sizing: border-box;
    }
</style>
