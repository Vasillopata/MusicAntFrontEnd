<script lang='ts'>
  import { slide } from "svelte/transition";
  import AddComunity from "./AddComunity.svelte";
  import { logout } from "$lib/handlers/UserHandler";

    let addcommunity = false
    
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


    <div class="side-nav">
        <a href="/" on:click={(e)=>{toggleCategory(e,'fans')}} class="side-button" class:side-button-opened={fansOpened}>
            <span>Скорошни Фенове</span>
            <i class='bx bx-chevron-down'></i>
        </a>
        {#if fansOpened}
            <div transition:slide class="dropdown">
                <a href="/">
                    <div class="top-profile"><img src="/images/account.png" alt=""></div>
                    <span>Vasil Petrov</span>
                </a>
                <a href="/">
                    <div class="top-profile"><img src="/images/papi.png" alt=""></div>
                    <span>RockEnjoyer123</span>
                </a>    
                <a href="/account">
                    <div class="top-profile"><img src="/images/ale.jpg" alt=""></div>
                    <span>Dr music</span>
                </a>                  
                <a href="/">
                    <div class="top-profile"><img src="/images/advokad.png" alt=""></div>
                    <span>Ivan Petrov</span>
                </a>     
                <a href="/">
                    <div class="top-profile"><img src="/images/account.png" alt=""></div>
                    <span>Account</span>
                </a>               
            </div>
        {/if}
        <a href="/" on:click={(e)=>{toggleCategory(e,'genre')}} class="side-button" class:side-button-opened={genreOpened}>
            <span>Твоите общности</span>
            <i class='bx bx-chevron-down'></i>
        </a>
        {#if genreOpened}
            <div transition:slide class="dropdown-community">
                <AddComunity/>
                <a href="/">
                    <div class="top-profile-community"><img src="/images/account.png" alt=""></div>
                    <span>community</span>
                </a>
                <a href="/">
                    <div class="top-profile-community"><img src="/images/account.png" alt=""></div>
                    <span>community</span>
                </a>    
                <a href="/account">
                    <div class="top-profile-community"><img src="/images/account.png" alt=""></div>
                    <span>community</span>
                </a>                  
                <a href="/">
                    <div class="top-profile-community"><img src="/images/account.png" alt=""></div>
                    <span>community</span>
                </a>     
                <a href="/">
                    <div class="top-profile-community"><img src="/images/account.png" alt=""></div>
                    <span>community</span>
                </a>               
            </div>
        {/if}
        <a href="/" on:click={(e)=>{toggleCategory(e,'resources')}} class="side-button" class:side-button-opened={resourcesOpened}>
            <span>Ресурси</span>
            <i class='bx bx-chevron-down'></i>
        </a>
        {#if resourcesOpened}
            <div transition:slide class="dropdown">
                <a href="/">Помощ</a>
                <a href="/">Правила</a>
            </div>
        {/if}
        <!-- <a href="/" on:click={(e)=>{toggleCategory(e,'saved')}} class="side-button" class:side-button-opened={savedOpened}>
            <span>Запазени</span>
            <i class='bx bx-chevron-down'></i>
        </a>
        {#if savedOpened}
            <div transition:slide class="dropdown">
                
            </div>
        {/if} -->
        
    </div>


<style>
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
    .dropdown-community{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        padding: 0 1rem 0 0.75rem;
        border-left: 1px solid var(--black1-hover);
    }

        .dropdown-community>a{
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
            .dropdown-community>a>span{
                margin-bottom: 0.5rem;
                overflow: hidden;
                text-overflow:ellipsis;
                min-width: 0;
            }
    .top-profile-community{
        display: flex;
        flex-direction: row;
        height: 3rem !important;
        width: 3rem !important;
        min-width: 3rem;
        overflow: hidden;
        z-index: 1;
        border-radius: 10%;
        transition: border-radius 0.2s ease-in-out;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
        .top-profile-community>img{
            border-radius: inherit;
            object-fit: cover;
            border-radius: 10%;
            width: 100%;
            height: 100%;
            z-index:0;
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
    .side-nav{
        display: flex;
        flex-direction: column;
        min-width: 17.5rem;
        width:17.5rem;
        color: whitesmoke;
        background-color:var(--black1);
        padding: 1rem 0.5rem;
        overflow: hidden;
        z-index: 3;
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
</style>