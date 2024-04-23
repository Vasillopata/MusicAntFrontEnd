<script>
    import { onMount } from 'svelte';
    import LikeButton from '../LikeButton.svelte';
    import SaveButton from '../SaveButton.svelte';
</script>

<div class="post-separator"></div>
<div class="post">
    <div class="top-post">
        <div class="top-profile">
            <img src="/images/ale.jpg" alt="">
        </div>
        <p>Jon Doe</p>
    </div>
    <div class="post-title">
        Tower of Pisa
    </div>
        <div class="mid-post">
            As you ascend higher, the subtle incline becomes more pronounced, creating a thrilling sensation of defying gravity. Yet, the tower's lean is not just a physical anomaly; it's a metaphor for resilience and adaptation. Despite its apparent flaw, the tower has withstood the test of time, surviving earthquakes, wars, and centuries of weathering.
            From the top of the tower, the panoramic vista unfolds before you like a masterpiece painting, with the rolling hills of Tuscany stretching into the distance. Below, the bustling streets of Pisa bustle with life, while the serene Arno River meanders through the landscape, reflecting the beauty of the city's Renaissance architecture.
            As you stand atop this architectural wonder, you can't help but feel a sense of awe and wonder at the craftsmanship of those who built it centuries ago. The Leaning Tower of Pisa is more than just a leaning edifice; it's a symbol of human ambition, perseverance, and the enduring power of art to inspire and captivate us across generations.
        </div>
    <div class="bot-post">
        <LikeButton/>
        <a href="/PostPage"><i class='bx bx-message-square'></i></a>
        <div style="margin-left: auto;">
        <SaveButton/>
        </div>
    </div>
</div>
    
<style>
    .post-separator {
        background-color: var(--black2);
        height: 1px;
        width: 50rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .bx-message-square{
        color: whitesmoke;
        font-size: 2.5rem;
        transition: color 0.1s ease-in-out;
        cursor: pointer;
    }
        .bx-message-square:hover{
            color: var(--blue);
        }
    .post-title{
        display: flex;
        font-size: 1.4rem;
        flex-direction: row;
        min-height: 0;
        max-height: 2rem;
        align-items: center;
        padding-left: 0.3rem;
        margin-bottom: 0.5rem;
    }
    .post{
        display: flex;
        overflow: hidden;
        border-radius: 1rem;
        flex-direction: column;
        width: 50rem;
        padding: 0 1rem;
        transition: background-color 0.15s ease-in-out;
    }
        .post:hover{
            background-color: var(--black1-hover);
        }
    .top-post{
        display: flex;
        flex-direction: row;
        height: 5rem;
        align-items: center;
        padding-left: 0.3rem;
    }
    .mid-post{
        text-decoration: none !important;
        color: whitesmoke;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 18rem;
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
    }
        .top-post>p{
            margin-bottom: 0px;
            margin-left: 0.3rem;
        }
    .bot-post{
        display: flex;
        flex-direction: row;
        height: 4rem;
        align-items: center;
        padding-left: 0.3rem;
    }
    .post-separator{
        width: 50rem;
        height: 1px;
        background-color: var(--black2);
    }
    .top-post > p:hover{
        cursor: pointer;
    }
    .top-profile{
        display: flex;
        flex-direction: row;
        height: 3rem;
        width: 3rem;
        overflow: hidden;
        z-index: 1;
        border-radius: 100%;
        transition: border-radius 0.2s ease-in-out;
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
</style>