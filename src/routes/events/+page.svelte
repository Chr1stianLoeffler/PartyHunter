<script lang="ts">
  import { onMount } from 'svelte';

<<<<<<< HEAD
  export let data: { events: Array<{ id: string; name: string; date_and_time: string; location: string; description: string }> } = { events: [] };
=======
  export let data: { events: Array<{ id: string; name: string; date: string; location: string; description: string }> };

  let events = [
    {
      id: 1,
      title: 'Schneckenhof-Party',
      location: 'Schloss Mannheim, Innenhof',
      date: '2024-05-08',
      description: 'Schneckenhofparty, immer donnerstags, ab 21 Uhr, Eintritt 5 €'
    }
    // Weitere Events hinzufügen
  ];


  let selectedDate: string | null = null;
  /**
     * @type {{ id: number; title: string; location: {name:string}; date: string; description: string; } | null | undefined}
     */
  let selectedEvent = null;

  /**
     * @param {string | null} date
     */
  function selectDate(date: string | null) {
    selectedDate = date;
    selectedEvent = events.find(event => event.date === selectedDate);
  }

  onMount(() => {
    selectDate('2024-05-08'); // Setze ein Default-Datum, falls gewünscht
  });



>>>>>>> 66367344da65412c629232627e2b3af1b2f64837
</script>

<div class="flex flex-col gap-4">
  {#if data.events && Array.isArray(data.events)}
    {#each data.events as event}
      <div class="p-4 border border-gray-700 rounded-lg bg-gray-800 text-gray-300" key={event.id}>
        <div class="grid grid-cols-[150px_1fr] gap-2 mb-2">
          <span class="font-bold text-right pr-4">Name:</span>
          <span class="text-left">{event.name}</span>
        </div>
        <div class="grid grid-cols-[150px_1fr] gap-2 mb-2">
          <span class="font-bold text-right pr-4">Datum:</span>
          <span class="text-left">{event.date_and_time}</span>
        </div>
        <div class="grid grid-cols-[150px_1fr] gap-2 mb-2">
          <span class="font-bold text-right pr-4">Location:</span>
          <span class="text-left">{event.location}</span>
        </div>
        <div class="grid grid-cols-[150px_1fr] gap-2 mb-2">
          <span class="font-bold text-right pr-4">Beschreibung:</span>
          <span class="text-left">{event.description}</span>
        </div>
      </div>
<<<<<<< HEAD
    {/each}
  {:else}
    <div>Loading events...</div>
  {/if}
=======
      <div class="event-detail">
        <span class="label">Datum:</span>
        <span class="value">{event.date_and_time}</span>
      </div>
      <div class="event-detail">
        <span class="label">Location:</span>
        <span class="value">{event.location.name}</span>
      </div>
      <div class="event-detail">
        <span class="label">Beschreibung:</span>
        <span class="value">{event.description}</span>
      </div>
    </div>
  {/each}
>>>>>>> 66367344da65412c629232627e2b3af1b2f64837
</div>

<style>
  /* No additional styles needed */
</style>