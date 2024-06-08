<script lang="ts">
    import {goto} from "$app/navigation";

    let username = '';
    let password = '';
    let message = '';
    let token = '';
    let errorMessage = '';

    const login = async() => {
        if (username && password) {
            const response = await fetch('/api/users', {
                method: 'LOGIN',
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
</script>