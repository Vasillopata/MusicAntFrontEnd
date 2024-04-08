<script lang="ts">
    import { slide } from "svelte/transition";


    let addcommunity = false

</script>

<button class="add-community" on:click={()=>{addcommunity = !addcommunity}}>
    <p><i class='bx bx-plus'></i>Създай група</p>
    
</button>

{#if addcommunity == true}
    <div class="pop-up-bg">
        <div class="pop-up" transition:slide={{duration:200}}>
            <h2>Създай общност</h2>
            <button class="exit-button" on:click={()=>{addcommunity = false}}><i class='bx bx-x'></i></button>
            <h6>Създайте и развийте общност отностно нещо ,което ви интересува</h6>    
            <div class="input-comunity-name-wraper">
                <input class="input-comunity-name" type="text" placeholder="Име на групата">
                <span>Веднъж създадено името на общността не може да бъде сменено</span>
            </div>
            <h6>Тип на общността </h6> 
            <div class="chose-type">
                <div class="radio-type">
                    <input class="radio" type="radio" id="preference1" name="preference" value="Preference 1">
                    Общност за новини
                </div>
                <div class="radio-type">
                    <input class="radio" type="radio" id="preference1" name="preference" value="Preference 1">
                    Общност за новини
                </div>
                <div class="radio-type">
                    <input class="radio" type="radio" id="preference1" name="preference" value="Preference 1">
                    Общност за новини
                </div>
            </div>
            <h6>Кратко описание на общността</h6>
            <div class="text-area">
                <textarea class="textarea" name="textarea" placeholder="Описание" ></textarea>
            </div>
            <div class="botom-buttons">
                <button class="cancel-button" on:click={()=>{addcommunity = false}}>Откажи</button>
                <button class="submit-button">
                    Създай
                </button>
            </div>
        </div>
    </div>
{/if}


<style>
    .cancel-button{
        background-color: transparent;
        height: 2.8rem;
        width: 8rem;
        margin-bottom: 1rem;
        color: whitesmoke;
        border: none;
        background-color: var(--black1);
        margin-right: 0.5rem;
        border-radius: 0.5rem;
    }
        .cancel-button:hover{
            background-color: var(--black1-hover);
        }
    .submit-button{
        background-color: transparent;
        height: 2.8rem;
        width: 8rem;
        margin-bottom: 1rem;
        color: whitesmoke;
        border: none;
        background-color: var(--black1);
        border-radius: 0.5rem;
    }
        .submit-button:hover{
            background-color: var(--black1-hover);
            color: var(--blue);
        }
    .botom-buttons{
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-top: auto;
    }
    .text-area{
        display: flex;
        flex-direction: column;
    }
    .textarea{
        height: 8rem;
        outline: none;
        border: none;
        background-color: var(--black1);
        resize: none;
        color: white;
        border-radius: 0.5rem;
        padding-top: 0.5rem;
    }
    .radio-type{
        display: flex;
        align-items: center;
        font-size: 1.2rem;
    }
    .radio{
        width: 2rem;
        height: 2rem;
        border-radius: 0;
        
    }
    .radio:hover{

        cursor: pointer;
    }
    .chose-type{
        display: flex;
        flex-direction: column;
        height: 10rem;
        margin-bottom: 2rem;
        justify-content: space-between;
    }
    .input-comunity-name-wraper{
        display: flex;
        margin-top: 0.5rem;
        flex-direction: column;
        margin-bottom: 1rem;
    }
        .input-comunity-name-wraper>span{
            margin-top: 0.2rem;
            font-size: 0.8rem;
        }
    .input-comunity-name{
        border: none;
        outline: none;
        margin-top: 1rem;
        background-color: var(--black1);
        color: whitesmoke;
        height: 2.8rem;
        border-radius: 0.5rem;
        padding-left: 0.5rem;
    }
    .exit-button{
        position: absolute;
        left: 90%;
        font-size: 3rem;
        border: none;
        background-color: transparent;
        color: whitesmoke;
    }
    .exit-button:hover{
        color: var(--blue);
    }
    .add-community{
        display: flex;
        flex-direction: row;
        width: 100%;
        border: none;
        background-color: transparent;
        height: 3rem;
        border-radius: 1rem;
        font-size: 1rem;
        margin-bottom: 1rem;
        color: whitesmoke;
    }
        .add-community>p{
            font-size: 1.5rem;
        }
        .add-community>p>i{
            font-size: 1rem;
        }
        .add-community:hover>p{
            color: var(--blue);
            transition: color 0.1s ease-in-out;
        }
    .pop-up-bg{
        width: 100vw;
        height: 100vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
        z-index: 999;
        background-color: #00000011;
    }
    .pop-up{
        display: flex;
        position: absolute;
        flex-direction: column;
        width: 38rem;
        height: 45rem;
        z-index: 999;
        background-color: var(--black2);
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 1rem;
        padding: 0.5rem 1rem 0 1rem;
    }
        .pop-up>h2{
            margin-top: 1rem;
        }
</style>