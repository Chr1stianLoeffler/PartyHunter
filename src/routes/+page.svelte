<script lang="ts">
  let username = '';
  let accountEmail = '';
  let password = '';
  let message = '';


  const register = async () => {
    if (username && accountEmail && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, accountEmail, password })
        });

        if (response.ok) {
          message = 'User registered successfully!';
          // Optionally redirect to a different page after registration
          // goto('/login');

        } else {
          const error = await response.json();
          message = 'Error: ' + error.message;
        }
      } catch (error) {
        message = 'Error: ' + error.message;
      }
    } else {
      message = 'Es fehlen Daten, um sich zu registrieren';
    }
  };

  function handleRegistrationKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      register();
    }
  }

</script>

<div class="container">
  <div class="logo">
    PARTY <span>  HUNTER  </span>
  </div>
  <div class="subtitle">
    ERSTELLE EINEN NEUEN ACCOUNT
  </div>
  <form class="form" on:submit|preventDefault={register}>
    <input class="input" type="text" placeholder="Benutzername" bind:value={username} required />
    <input class="input" type="email" placeholder="E-Mail" bind:value={accountEmail} required />
    <input class="input" type="password" placeholder="Passwort" bind:value={password} required />
    <button class="button" type="submit" on:keypress={handleRegistrationKeyPress}>Registrieren</button>
  </form>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
    color: #fff;
    text-align: center;
  }

  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: 2rem;
    letter-spacing: 0.5rem;
  }

  .logo span {
    display: block;
    font-size: 1rem;
    letter-spacing: normal;
    color: #fff;
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


