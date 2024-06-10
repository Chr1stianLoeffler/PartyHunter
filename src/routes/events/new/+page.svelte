<script lang="ts">
  import {goto} from "$app/navigation";

  let eventName = '';
  let eventDate = '';
  let eventLocation: { name: any; address?: string; latitude?: number; longitude?: number; } = {name: ""};
  let eventDescription = '';
  let errorMessage = '';

  const handleSubmit = async (e:any) => {
    if (eventName && eventDate && eventLocation.name !== "" && eventDescription) {
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

  import type { LocationPoint } from "../../../events/event";
  import tt from "@tomtom-international/web-sdk-maps";
  import "@tomtom-international/web-sdk-maps/dist/maps.css";
  import { onMount } from "svelte";

  let map: tt.Map;
  let mapElement: HTMLElement;
  let marker: tt.Marker;
  onMount(() => {
    map = tt.map({
      key: 'OvTfqyf8PyjDAEEWc0evLsKYaVNdGvbL',
      container: mapElement,
      center: [8.461771, 49.482983],
      zoom: 13,
    });
    marker = new tt.Marker().setLngLat([8.461771, 49.482983]).addTo(map);
  });

  let searchResults: LocationPoint[];
  let query = "";
  function queryTomTom() {
    fetch(
      `https://api.tomtom.com/search/2/search/${query}.json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=OvTfqyf8PyjDAEEWc0evLsKYaVNdGvbL`,
    )
      .then((response) => response.json())
      .then((data) => {
        searchResults = data.results.map((element: any) => {
          if(!element.poi) element.poi = {name: element.address.freeformAddress};
          if(!element.poi.name) element.poi.name = element.address.freeformAddress;
          return {
            name: element.poi.name,
            address: element.address.freeformAddress,
            longitude: element.position.lon,
            latitude: element.position.lat,
          };
        });
      });
  }

  function setLL(longitude: number, latitude: number, name: string, address: string) {
    if (marker) {
      marker.remove();
    }
    if (map) {
      map.setCenter([longitude, latitude]);
      map.setZoom(14);
      marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
    }
    eventLocation = {
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude
    };
    console.log([longitude,latitude])
  }
</script>

<div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
  <h2 class="text-2xl text-gray-700 font-bold mb-6">Neues Event erstellen</h2>
  <form on:submit={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
        >Event Name</label
      >
      <input
        bind:value={eventName}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Event Name"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date"
        >Event Datum</label
      >
      <input
        bind:value={eventDate}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="date"
        type="date"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="location"
        >Event Ort</label
      >
      <div class="grid grid-cols-12 space-x-2">
        <div class="map col-span-8 w-[40rem] h-[24rem]" bind:this={mapElement}></div>
        <div class="col-span-4 space-y-2 w-[22rem] h-[20rem]">
          <div class="grid grid-cols-4 space-x-2">
            <div class="text-gray-700 col-span-2">
              <label for="search">Suche einen Ort</label>
              <input
                id="search"
                type="text"
                class="block w-full border-black border-2 rounded"
                bind:value={query}
                on:keydown={(e) => {
                  if (e.key == "Enter") {
                    queryTomTom();
                  }
                }}
              />
            </div>
            <button
              on:click={() => {
                queryTomTom();
              }}
              class="col-span-1 bg-blue-500 p-2 rounded-lg">Suche</button
            >
          </div>
          <div class="overflow-y-auto h-full space-y-2">
            {#if searchResults}
              {#each searchResults as searchResult}
                <div
                  class="bg-white rounded p-2 grid grid-cols-4 space-y-1 items-center border"
                >
                  <div class="text-gray-700 col-span-3">
                    <p class="text-base">{searchResult.name}</p>
                    <p class="text-sm">{searchResult.address}</p>
                  </div>
                  <button
                    class="col-span-1 bg-blue-500 p-y-2 rounded-lg w-23 h-11"
                    on:click={() =>
                      setLL(searchResult.longitude, searchResult.latitude, searchResult.name, searchResult.address)}
                    >Auswählen</button
                  >
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="description">Event Beschreibung</label
      >
      <textarea
        bind:value={eventDescription}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        placeholder="Event Beschreibung"
      ></textarea>
    </div>
    <div class="flex items-center justify-between">
      <button class="btn text-gray-700 btn-primary" type="submit">Event erstellen</button>
    </div>
  </form>

  {#if errorMessage}
    <div class="error-message text-gray-700">{errorMessage}</div>
  {/if}
</div>


