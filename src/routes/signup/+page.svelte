<script lang="ts">
    import {register} from '$lib/handlers/UserHandler'   

    let email = ''
    let username = ''
    let password = ''
    let birthdate: Date = new Date()
    
</script>

<div class="wrap">
    <div class="sign-up">
        <h1 style="position: absolute; top: 2.5rem;">Създай профил</h1>
        <div class="field">
            <input type="email" id="Email" placeholder=" " bind:value={email}>
            <label for="Email">Имейл</label>
        </div>
        <div class="field">
            <input type="text" id="Username" placeholder=" " bind:value={username}>
            <label for="Username">Потребителско име</label>
        </div>
        <div class="field">
            <input type="password" id="password" placeholder=" " bind:value={password}>
            <label for="password">Парола</label>
        </div>
        <input class="birthday-input" type="date" bind:value={birthdate}>
        <button on:click={async(e)=>{await register(e, email, username, password, birthdate)}} class="sign-in-button">Рeгистрация</button>
    </div>
</div>


<style>
    .wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 8rem;
    }
    .birthday-input{
        margin-top: 1rem;
        margin-left: -11.5rem;
    }
    /* Targeting the input[type=date] */
    input[type=date] {
    /* Your custom styles */
    padding: 8px;
    width: 13.6rem;
    border-radius: 4px;
    font-size: 1.3rem;
    background-color: var(--darkest);
    color: whitesmoke;
    border: none;
    }
        input[type=date]:focus {
        background-color: var(--black1) ;
        outline: none;
        }
    /* Styling the date picker icon */
    input[type=date]::-webkit-calendar-picker-indicator {
    /* Your custom styles */
        height: 2rem;
        width: 2rem;
    }

    /* Optional: Styling the placeholder text */
    input[type=date]::placeholder {
    color: #999;
    }
    .sign-in-button{
        width: 25rem ;
        margin-top: 1rem;
        height: 3rem;
        background-color: var(--black1);
        color: whitesmoke;
        outline: none;
        border: none;
        font-size: 1.55rem;
    }
    .sign-up{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 40rem;
        height: 40rem;
        background-color: var(--darkest);
        margin-top: 3rem;
        border-radius: 1.5rem;
        align-items: center;
        justify-content: center;
    }
    .field{
        margin-top: 2rem;
        position: relative;
    }
    .field>input{
        color: whitesmoke;
        background-color: var(--darkest);
        padding: 0.625rem;
        outline: none;
        width: 25rem;
        height: 3rem;
        border-bottom: 2px solid var(--black1);
        border-top: transparent;
        border-left: transparent;
        border-right: transparent;
    }
        .field>label{
            position: absolute;
            top:0;
            left: 0;
            translate: 0.625rem 0.625rem;
            color: black;
            font-size: 1.2rem;
            padding-inline: 0.5rem;
            pointer-events: none;
            color: whitesmoke;
            border: none;
            border-radius: 0.2rem;
            transition: translate 250ms;
                        background-color: 250ms;
                        border-color: 250ms;
        }
    .field:focus-within label,
    .field:not(:has(:placeholder-shown))
    label{
        translate: 0.625rem -1.5rem;
    }
    .field ::placeholder{
        color: transparent;
    }

</style>
