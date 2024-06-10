<script lang="ts">
  import {goto} from "$app/navigation";

  let eventName = '';
  let eventDate = '';
  let eventLocation = '';
  let eventDescription = '';
  let errorMessage = '';

  const handleSubmit = async (e) => {
    if (eventName && eventDate && eventLocation && eventDescription) {
      const token = sessionStorage.getItem("jwt")
      const username = sessionStorage.getItem("username")

      const response = await fetch('/api/events', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'username': `Bearer ${username}`
        },
        body: JSON.stringify({eventName, eventDate, eventLocation, eventDescription})
      });

      if (response.ok) {
        errorMessage = "Das Event wurde erfolgreich erstellt."
      } else if (response.status == 401) {
        const errorData = await response.json();
        errorMessage = errorData.message;
      } else {
        const errorData = await response.json();
        errorMessage = 'Error: ' + errorData.message;
      }
    } else {
      errorMessage = "Es fehlen Informationen um ein Event zu erstellen"
    }
  };
</script>

<div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
  <h2 class="text-2xl text-gray-700 font-bold mb-6">Neues Event erstellen</h2>
  <form on:submit={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Event Name</label>
      <input bind:value={eventName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Event Name">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date">Event Datum</label>
      <input bind:value={eventDate} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="location">Event Ort</label>
      <input bind:value={eventLocation} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Event Ort">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Event Beschreibung</label>
      <textarea bind:value={eventDescription} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Event Beschreibung"></textarea>
    </div>
    <div class="flex items-center justify-between">
      <button class="btn text-gray-700 btn-primary" type="submit">Event erstellen</button>
    </div>
  </form>

  {#if errorMessage}
    <div class="error-message text-gray-700">{errorMessage}</div>
  {/if}
</div>
