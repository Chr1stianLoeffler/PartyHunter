import { c as create_ssr_component, e as each, a as add_attribute, b as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = { events: [] } } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex flex-col gap-4">${data.events && Array.isArray(data.events) ? `${each(data.events, (event) => {
    return `<div class="p-4 border border-gray-700 rounded-lg bg-gray-800 text-gray-300"${add_attribute("key", event.id, 0)}><div class="grid grid-cols-[150px_1fr] gap-2 mb-2"><span class="font-bold text-right pr-4" data-svelte-h="svelte-1ubgfz0">Name:</span> <span class="text-left">${escape(event.name)}</span></div> <div class="grid grid-cols-[150px_1fr] gap-2 mb-2"><span class="font-bold text-right pr-4" data-svelte-h="svelte-1sky57m">Datum:</span> <span class="text-left">${escape(event.date_and_time)}</span></div> <div class="grid grid-cols-[150px_1fr] gap-2 mb-2"><span class="font-bold text-right pr-4" data-svelte-h="svelte-bzv400">Location:</span> <span class="text-left">${escape(event.location.name)}</span></div> <div class="grid grid-cols-[150px_1fr] gap-2 mb-2"><span class="font-bold text-right pr-4" data-svelte-h="svelte-17n8k6">Beschreibung:</span> <span class="text-left">${escape(event.description)}</span></div> </div>`;
  })}` : `<div data-svelte-h="svelte-1kht867">Loading events...</div>`} </div>`;
});
export {
  Page as default
};
