<script lang="ts">
  import { onMount } from 'svelte';

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

  /**
     * @type {string | null}
     */
  let selectedDate = null;
  /**
     * @type {{ id: number; title: string; location: string; date: string; description: string; } | null | undefined}
     */
  let selectedEvent = null;

  /**
     * @param {string | null} date
     */
  function selectDate(date) {
    selectedDate = date;
    selectedEvent = events.find(event => event.date === selectedDate);
  }

  onMount(() => {
    selectDate('2024-05-08'); // Setze ein Default-Datum, falls gewünscht
  });



</script>
<div class="event-list">
  {#each data.events as event}
    <div class="event" key={event.id}>
      <div class="event-detail">
        <span class="label">Name:</span>
        <span class="value">{event.name}</span>
      </div>
      <div class="event-detail">
        <span class="label">Datum:</span>
        <span class="value">{event.date_and_time}</span>
      </div>
      <div class="event-detail">
        <span class="label">Location:</span>
        <span class="value">{event.location}</span>
      </div>
      <div class="event-detail">
        <span class="label">Beschreibung:</span>
        <span class="value">{event.description}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  .event-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event {
    padding: 1rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #333; /* Dunkler Hintergrund */
    color: #ddd; /* Helle Schriftfarbe */
  }

  .event-detail {
    display: grid;
    grid-template-columns: 150px 1fr; /* Erste Spalte fest, zweite flexibel */
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .label {
    font-weight: bold;
    text-align: right;
    padding-right: 1rem;
  }

  .value {
    text-align: left;
  }
</style>
