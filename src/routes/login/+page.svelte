<script lang="ts">
    import {goto} from "$app/navigation";
    import { browser } from '$app/environment';

    let username = '';
    let password = '';
    let message = '';
    let token: string|null = '';
    let errorMessage = '';

    const login = async() => {
        if (username && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if (response.ok) {
                message = 'User registered successfully!';
                token = response.headers.get("Authorization")
                if(browser){
                    if (token)
                        sessionStorage.setItem("jwt", token)
                    sessionStorage.setItem("username", username)
                }
                goto("/events")
            } else if (response.status == 409){
                const errorData = await response.json();
                errorMessage = errorData.message;
            } else {
                const errorData = await response.json();
                errorMessage = 'Error: ' + errorData.message;
            }
        } else {
            errorMessage = 'Es fehlen Daten, um sich einzulogen';
        }
    }

    function handleRegistrationKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            login();
        }
    }
</script>

<div class="container">
    <div class="logo">
        <img src="/PartyHunterLogo.png" alt="Party Hunter Logo" style="width: 300px; height: auto; object-fit: cover;">
    </div>

<div class="subtitle">
    LOGE DICH HIER EIN 
</div>

    <form class="form" on:submit|preventDefault={login}>
        <input class="input" type="text" placeholder="Benutzername" bind:value={username} required />
        <input class="input" type="password" placeholder="Passwort" bind:value={password} required />
        <button class="button" type="submit" on:keypress={handleRegistrationKeyPress}>Login</button>
    </form>
    {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
    {/if}

</div>


<style>

    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 190vh;
        min-height: 30vh;
        background-color: #000;
        color: #fff;
        text-align: center;
    }
    .logo {
        margin-bottom: 2rem;
    }
    .subtitle {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .input {
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 300px;
    }
    .button {
        background: linear-gradient(45deg, #7f00ff, #e100ff);
        border: none;
        border-radius: 5px;
        padding: 1rem 2rem;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
    }
    .button:hover {
        transform: scale(1.1);
    }
</style>
