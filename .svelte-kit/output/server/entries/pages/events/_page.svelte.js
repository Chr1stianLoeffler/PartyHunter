import { c as create_ssr_component, d as each, e as escape } from "../../../chunks/ssr.js";
const css = {
  code: ".btn.svelte-1bidu7p{padding:0.5rem 1rem;background-color:#6b7280;border-radius:0.375rem;cursor:pointer;color:#fff}.btn.svelte-1bidu7p:hover{background-color:#4b5563}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n  import { onMount } from 'svelte';\\r\\n\\r\\n  let events = [\\r\\n    {\\r\\n      id: 1,\\r\\n      title: 'Schneckenhof-Party',\\r\\n      location: 'Schloss Mannheim, Innenhof',\\r\\n      date: '2024-05-08',\\r\\n      description: 'Schneckenhofparty, immer donnerstags, ab 21 Uhr, Eintritt 5 €'\\r\\n    }\\r\\n    // Weitere Events hinzufügen\\r\\n  ];\\r\\n\\r\\n  let selectedDate = null;\\r\\n  let selectedEvent = null;\\r\\n\\r\\n  function selectDate(date) {\\r\\n    selectedDate = date;\\r\\n    selectedEvent = events.find(event => event.date === selectedDate);\\r\\n  }\\r\\n\\r\\n  onMount(() => {\\r\\n    selectDate('2024-05-08'); // Setze ein Default-Datum, falls gewünscht\\r\\n  });\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"flex h-screen\\">\\r\\n  <!-- Sidebar für Monate -->\\r\\n  <div class=\\"w-1/4 bg-black text-white p-4\\">\\r\\n    <div class=\\"flex justify-between items-center\\">\\r\\n      <button class=\\"btn\\">←</button>\\r\\n      <h2 class=\\"text-xl font-bold\\">2024</h2>\\r\\n      <button class=\\"btn\\">→</button>\\r\\n    </div>\\r\\n    <ul class=\\"mt-4 space-y-2\\">\\r\\n      {#each ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'] as month, i}\\r\\n        <li>\\r\\n          <button class=\\"w-full text-left p-2 rounded-lg {month === 'Mai' ? 'bg-purple-500' : 'bg-black'}\\" on:click={() => selectDate(\`2024-\${i + 1}-08\`)}>\\r\\n            {month}\\r\\n          </button>\\r\\n        </li>\\r\\n      {/each}\\r\\n    </ul>\\r\\n  </div>\\r\\n\\r\\n  <!-- Kalender und Event-Details -->\\r\\n  <div class=\\"w-3/4 flex flex-col\\">\\r\\n    <!-- Kalender -->\\r\\n    <div class=\\"flex justify-center bg-black text-white py-4\\">\\r\\n      <h2 class=\\"text-2xl font-bold\\">Mai 2024</h2>\\r\\n    </div>\\r\\n    <div class=\\"grid grid-cols-7 gap-2 p-4 bg-gray-900 text-white flex-grow\\">\\r\\n      {#each Array(31) as _, i}\\r\\n        <div class=\\"p-4 bg-black rounded-lg text-center {selectedDate === \`2024-05-\${String(i + 1).padStart(2, '0')}\` ? 'bg-red-500' : ''}\\" on:click={() => selectDate(\`2024-05-\${String(i + 1).padStart(2, '0')}\`)}>\\r\\n          {i + 1}\\r\\n        </div>\\r\\n      {/each}\\r\\n    </div>\\r\\n    <!-- Event-Details -->\\r\\n    {#if selectedEvent}\\r\\n      <div class=\\"p-4 bg-purple-500 text-white flex-grow\\">\\r\\n        <h2 class=\\"text-4xl font-bold\\">{selectedEvent.date}</h2>\\r\\n        <h3 class=\\"text-2xl mt-2\\">{selectedEvent.title}</h3>\\r\\n        <p class=\\"mt-4\\">{selectedEvent.description}</p>\\r\\n        <p class=\\"mt-2\\">📍 {selectedEvent.location}</p>\\r\\n      </div>\\r\\n    {/if}\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .btn {\\r\\n    padding: 0.5rem 1rem;\\r\\n    background-color: #6b7280; /* Tailwind Gray-500 */\\r\\n    border-radius: 0.375rem; /* Tailwind Rounded-md */\\r\\n    cursor: pointer;\\r\\n    color: #fff;\\r\\n  }\\r\\n\\r\\n  .btn:hover {\\r\\n    background-color: #4b5563; /* Tailwind Gray-600 */\\r\\n  }\\r\\n</style>\\r\\n\\r\\n"],"names":[],"mappings":"AAwEE,mBAAK,CACH,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,QAAQ,CACvB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IACT,CAEA,mBAAI,MAAO,CACT,gBAAgB,CAAE,OACpB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedDate = null;
  $$result.css.add(css);
  return `<div class="flex h-screen"> <div class="w-1/4 bg-black text-white p-4"><div class="flex justify-between items-center" data-svelte-h="svelte-120zbhg"><button class="btn svelte-1bidu7p">←</button> <h2 class="text-xl font-bold">2024</h2> <button class="btn svelte-1bidu7p">→</button></div> <ul class="mt-4 space-y-2">${each(
    [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember"
    ],
    (month, i) => {
      return `<li><button class="${"w-full text-left p-2 rounded-lg " + escape(month === "Mai" ? "bg-purple-500" : "bg-black", true)}">${escape(month)}</button> </li>`;
    }
  )}</ul></div>  <div class="w-3/4 flex flex-col"> <div class="flex justify-center bg-black text-white py-4" data-svelte-h="svelte-l1t28k"><h2 class="text-2xl font-bold">Mai 2024</h2></div> <div class="grid grid-cols-7 gap-2 p-4 bg-gray-900 text-white flex-grow">${each(Array(31), (_, i) => {
    return `<div class="${"p-4 bg-black rounded-lg text-center " + escape(
      selectedDate === `2024-05-${String(i + 1).padStart(2, "0")}` ? "bg-red-500" : "",
      true
    )}">${escape(i + 1)} </div>`;
  })}</div>  ${``}</div> </div>`;
});
export {
  Page as default
};
