<script lang="ts">
    import {goto} from "$app/navigation";

    let username = '';
    let password = '';
    let message = '';
    let token = '';
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
                if (token)
                    sessionStorage.setItem("jwt", token)
                sessionStorage.setItem("username", username)
                goto("/main")
            } else if (response.status == 409){
                const errorData = await response.json();
                errorMessage = errorData.message;
            } else {
                const errorData = await response.json();
                errorMessage = 'Error: ' + errorData.message;
            }
        } else {
            errorMessage = 'Es fehlen Daten, um sich zu registrieren';
        }
    }

    function handleRegistrationKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            login();
        }
    }
</script>

<div class="container">
    <form class="form" on:submit|preventDefault={login}>
        <input class="input" type="text" placeholder="Benutzername" bind:value={username} required />
        <input class="input" type="password" placeholder="Passwort" bind:value={password} required />
        <button class="button" type="submit" on:keypress={handleRegistrationKeyPress}>Login</button>
    </form>
    {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
    {/if}
</div>