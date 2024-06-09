<script>
  import { onMount } from 'svelte';

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

  let selectedDate = null;
  let selectedEvent = null;

  function selectDate(date) {
    selectedDate = date;
    selectedEvent = events.find(event => event.date === selectedDate);
  }

  onMount(() => {
    selectDate('2024-05-08'); // Setze ein Default-Datum, falls gewünscht
  });
</script>

<div class="flex h-screen">
  <!-- Sidebar für Monate -->
  <div class="w-1/4 bg-black text-white p-4">
    <div class="flex justify-between items-center">
      <button class="btn">←</button>
      <h2 class="text-xl font-bold">2024</h2>
      <button class="btn">→</button>
    </div>
    <ul class="mt-4 space-y-2">
      {#each ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'] as month, i}
        <li>
          <button class="w-full text-left p-2 rounded-lg {month === 'Mai' ? 'bg-purple-500' : 'bg-black'}" on:click={() => selectDate(`2024-${i + 1}-08`)}>
            {month}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Kalender und Event-Details -->
  <div class="w-3/4 flex flex-col">
    <!-- Kalender -->
    <div class="flex justify-center bg-black text-white py-4">
      <h2 class="text-2xl font-bold">Mai 2024</h2>
    </div>
    <div class="grid grid-cols-7 gap-2 p-4 bg-gray-900 text-white flex-grow">
      {#each Array(31) as _, i}
        <div class="p-4 bg-black rounded-lg text-center {selectedDate === `2024-05-${String(i + 1).padStart(2, '0')}` ? 'bg-red-500' : ''}" on:click={() => selectDate(`2024-05-${String(i + 1).padStart(2, '0')}`)}>
          {i + 1}
        </div>
      {/each}
    </div>
    <!-- Event-Details -->
    {#if selectedEvent}
      <div class="p-4 bg-purple-500 text-white flex-grow">
        <h2 class="text-4xl font-bold">{selectedEvent.date}</h2>
        <h3 class="text-2xl mt-2">{selectedEvent.title}</h3>
        <p class="mt-4">{selectedEvent.description}</p>
        <p class="mt-2">📍 {selectedEvent.location}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .btn {
    padding: 0.5rem 1rem;
    background-color: #6b7280; /* Tailwind Gray-500 */
    border-radius: 0.375rem; /* Tailwind Rounded-md */
    cursor: pointer;
    color: #fff;
  }

  .btn:hover {
    background-color: #4b5563; /* Tailwind Gray-600 */
  }
</style>

