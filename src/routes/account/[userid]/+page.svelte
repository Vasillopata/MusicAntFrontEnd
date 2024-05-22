<script lang="ts">
    import PostReal from "../../Posts/PostReal.svelte";
    import {deletePost, getPostsByUser} from "$lib/handlers/PostHandler";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { getUserNameById, type User } from "$lib/handlers/UserHandler";
    import { followAccount, unfollowAccount, checkIfFollowing } from "$lib/handlers/AccountHandler";
    import {getAccount} from "$lib/handlers/AccountHandler";
    import {defaultPfp} from '$lib/defaultPfp';
    import { checkIfAdmin, lockAccount, unlockAccount } from "$lib/handlers/AccountHandler";
    import { goto } from "$app/navigation";

    let isFan = false;
    let posts: number[] = [];
    let userId: number;
    let userName: string;
    let user: User = {id: 0, userName: "", email: "", pfp: null, banner: null, createdDate: '', birthDate: '', isLocked: false};
    let accountLocked = false;
    let canEdit = false;

    let ready = false;

    async function handleFollow(){
        if(isFan){
            isFan = false;
            await unfollowAccount(userId);
        }else{
            isFan = true;
            await followAccount(userId);
        }
    }

    async function handleLock() {
        if(accountLocked){
            await unlockAccount(userId);
            accountLocked = false;
        }else{
            await lockAccount(userId);
            accountLocked = true;
        }
        location.reload();
        goto(`/account/${userId}`);
    }

    onMount(async()=>{
        ready = false;
        userId = Number($page.params.userid);
        user = await getAccount(userId);
        posts = await getPostsByUser(userId, 1, 5);
        userName = await getUserNameById(userId);
        isFan = await checkIfFollowing(userId);
        if (await checkIfAdmin()){
            canEdit = true;
        }
        ready = true;
    })
</script>


{#if ready}
    <div class="account-page">
        <div class="account-background">
            <img src="{user.banner}" alt="">    
        </div>
        <div class="account-img">
                <img src="{user.pfp != null ? user.pfp : defaultPfp}" alt="">
                <p>{user.userName}</p>
                {#if user.isLocked}
                    <p style="color:red;">Профилът е заключен.</p>
                {/if}
            <div class="account-buttons">
                {#if canEdit}
                <button on:click={async()=>{await handleLock()}}>
                    {accountLocked ? "Отключи" : "Заключи"} профил
                </button>
                {/if}
                <button style="width:{isFan ? "7.5rem" : "6.5rem"}" class:is-fan={isFan} on:click={async()=>{await handleFollow()}}>
                    {isFan ? "Вече си фен" : "Стани фен"}
                </button>
            </div>
        </div>
        <div style="display: flex; flex-direction:row; justify-content:space-between">
            <div class="post-list">
                {#each posts as id}
                    <div style="position: relative;">
                        <button class="delete-button" on:click={
                        async()=>{await deletePost(id); location.reload(); goto(`/account/${id}`)}}>
                            <i class='bx bxs-trash' ></i>
                        </button>
                        <PostReal postId={id}/> 
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}


<style>
    .delete-button{
        position: absolute;
        top: 1rem;
        right: -4rem;   
        background-color: var(--darkest);
        font-size: 1.3rem;
        outline: none;
        border: none;
        height: 4rem;
        border-radius: 1.5rem;
        color: whitesmoke;
        width: 4rem;
    }
    .post-list{
        margin-left: 17rem;
    }
    .account-page{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .account-background{
        display: flex;
        flex-direction: row;
        width: 95rem;
        height: 12rem;
        margin-left: 2rem;
    }
        .account-background>img{
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 1.5rem;
        }
    .account-img{
        display: flex;
        flex-direction: row;
        width: 95rem;
    }
        .account-img>img{
            object-fit: cover;
            height: 12rem;
            width: 12rem;
            margin-top: -6rem;
            margin-left: 5rem;
            border-radius: 100%;
            outline: 0.4rem solid var(--black1);
        }
        .account-img>p{
            font-size: 2.5rem;
            margin-left: 1.3rem;
        }
        .account-img>.account-buttons{
            margin-top: 1rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            background-color: var(--black1);
            margin-left: auto;
            height: 3rem;
            margin-right: -1rem;
            width: 21rem;
        }
        .account-img>.account-buttons>button{
            border: none;
            background-color: var(--black1);
            color: whitesmoke;
            height: 3rem;
            border: 1px solid var(--gray);
            border-radius: 1.5rem;
            margin-left: 0.5rem;
            padding: 0 0.5rem;
            transition: width 0.3s ease-in-out, border 0.1s ease-in-out;
            text-wrap: nowrap;
        }
            .account-img>.account-buttons>button:hover{
                border: 1px solid whitesmoke;
            }
            .account-img>.account-buttons>.is-fan{
                background-color: var(--blue);
                border: 1px solid var(--blue);
            }
            .account-img>.account-buttons>.bell{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: 1.6rem;
                width: 3rem;
                padding: 0;
            }
</style>