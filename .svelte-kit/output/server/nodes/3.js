import * as universal from '../entries/pages/events/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/events/+page.ts";
export const imports = ["_app/immutable/nodes/3.DXbi-4Xd.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.qm__v8Ou.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
