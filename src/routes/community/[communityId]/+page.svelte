<script lang="ts">
    import { getCommunityById, checkIfMember, becomeMember, endMembership } from "$lib/handlers/CommunityHandler";
    import type { Community } from "$lib/handlers/CommunityHandler";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import {getPostsByCommunity} from "$lib/handlers/PostHandler";
    import CreatePost from "../../posting/CreatePost.svelte";
    import PostReal from "../../Posts/PostReal.svelte";

    let ready = false;
    let communityId:number = 0;
    let community:Community = {} as Community;
    let isMember = false;
    let postIds:number[] = [];

    async function handleMembership(){
        if(isMember){
            isMember = false;
            await endMembership(communityId);
        }else{
            isMember = true;
            console.log("becoming member")	
            await becomeMember(communityId);
            console.log("became member")
        }
    }

    let creatingPost = false;

    onMount(async ()=>{
        ready = false;
        communityId = Number($page.params.communityId);
        community = await getCommunityById(communityId);
        postIds = await getPostsByCommunity(communityId, 1, 10);
        isMember = await checkIfMember(communityId);
        ready = true;
    });
</script>


{#if ready}
    <div class="account-page">
        <div class="account-img">
            <p>
                {#if community.type == 'news'}
                    <i class='bx bxs-news'></i>
                {:else if community.type == 'fan'}
                    <i class='bx bx-star'></i>
                {:else if community.type == 'event'}
                    <i class='bx bxs-calendar-event' ></i>
                {/if}
                {community.name}
            </p>
            <div class="account-buttons">
                <button on:click={()=>creatingPost = !creatingPost}>
                    <span style="text-decoration: none; color:whitesmoke">Качи в Общността</span>
                </button>
                <button class:is-member={isMember} on:click={async()=>{await handleMembership()}}>
                    {isMember ? "Участваш в общността" : "Участвай в Общността"}
                </button>
            </div>
        </div>
        {#if creatingPost}
        <div style="width: 100%; display:flex; flex-direction:row; justify-content:center;">
            <CreatePost />
        </div>
        {:else}
            <div class="community-description">
                <p style="padding: 2rem;">{community.description}</p>
            </div>
            <div class="separator"></div>
            <div style="display: flex; flex-direction:row; justify-content:space-between">
                <div class="post-list">
                    {#each postIds as id}
                        <PostReal postId={id}/> 
                    {/each}
                </div>
            </div>
        {/if}
    </div>
{/if}


<style>
    .separator{
        height: 1px;
        width: 100%;
        background-color: var(--gray);
        margin-bottom: 4rem;
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
    .account-img{
        display: flex;
        flex-direction: row;
        width: 95rem;
        justify-content: space-between;
    }
        .account-img>p{
            font-size: 2.5rem;
            padding: 1rem 0 0 2rem;        
        }
        .account-img>.account-buttons{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            background-color: var(--black1);
            height: 3rem;
            padding: 1rem 0 0 0;
        }
        .account-buttons>button{
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
            .account-img>.account-buttons>.is-member{
                background-color: var(--blue);
                border: 1px solid var(--blue);
            }
</style>