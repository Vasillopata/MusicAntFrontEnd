<script lang="ts">
    import {login} from '$lib/handlers/UserHandler'

    let email: string = ''
    let password: string = ''
</script>

<div class="wrap">
    <div class="Log-in">
    <h1 style="position: absolute; top: 2.5rem;">Вписване</h1>
    <div class="field">
        <input type="email" id="email" placeholder=" " bind:value={email}>
        <label for="email">Имейл</label>
    </div>
    <div class="field">
        <input type="password" id="password" placeholder=" "  bind:value={password}>
        <label for="password">Парола</label>
    </div>
    <button class="sign-in-button" on:click={async(e)=>{await login(e,email,password)}}>Вписване</button>
    <p>Нямаш акаунт? <a style="text-decoration: none;" href="/signup">Регистрирай се!</a></p>
</div>
</div>

<style>
    .wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right:8rem;
    }
    .Log-in>p{
        margin-top: 1rem;
    }
    .Log-in>p>a{
        text-decoration: none;
        color: var(--blue);
    }
        .Log-in>p>a:hover{
            opacity: 0.9;
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
    .Log-in{
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