<script lang="ts">
  import { onMount } from 'svelte';

  export let data: { events: Array<{ id: string; name: string; date_and_time: string; location: string; description: string }> } = { events: [] };
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
    {/each}
  {:else}
    <div>Loading events...</div>
  {/if}
</div>

<style>
  /* No additional styles needed */
</style>