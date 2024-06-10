import { c as create_ssr_component, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import "@tomtom-international/web-sdk-maps";
import { configDotenv } from "dotenv";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let eventName = "";
  let eventDate = "";
  let eventLocation = "";
  configDotenv();
  process.env.PUBLIC_TOMTOM_API_KEY;
  let mapElement;
  let query = "";
  return `<div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10"><h2 class="text-2xl font-bold mb-6" data-svelte-h="svelte-17sbmx0">Neues Event erstellen</h2> <form><div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="name" data-svelte-h="svelte-r4e54c">Event Name</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Event Name"${add_attribute("value", eventName, 0)}></div> <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="date" data-svelte-h="svelte-v3zgi7">Event Datum</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"${add_attribute("value", eventDate, 0)}></div> <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="location" data-svelte-h="svelte-16av9hy">Event Ort</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Event Ort"${add_attribute("value", eventLocation, 0)}></div> <div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2" for="description" data-svelte-h="svelte-veysy7">Event Beschreibung</label> <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Event Beschreibung">${escape("")}</textarea></div> <div class="flex items-center justify-between" data-svelte-h="svelte-e192t1"><button class="btn btn-primary" type="submit">Event erstellen</button></div></form></div> <div class="grid grid-cols-12 space-x-2"><div class="map col-span-8 w-[50rem] h-[30rem]"${add_attribute("this", mapElement, 0)}></div> <div class="col-span-4 space-y-2 w-[25rem] h-[30rem]"><div class="grid grid-cols-4 space-x-2"><div class="col-span-3"><label for="search" data-svelte-h="svelte-15k14q4">Suche einen Ort</label> <input id="search" type="text" class="block w-full"${add_attribute("value", query, 0)}></div> <button class="col-span-1 bg-blue-500 p-2 rounded-lg" data-svelte-h="svelte-1qy3nq1">Suche</button></div> <div class="overflow-y-auto h-full space-y-2">${``}</div></div></div>`;
});
export {
  Page as default
};
