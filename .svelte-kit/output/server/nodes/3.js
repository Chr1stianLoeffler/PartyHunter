import * as universal from '../entries/pages/events/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/events/+page.ts";
export const imports = ["_app/immutable/nodes/3.BfDoYzGv.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.C0W_kJsx.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/3.Ct-6dp0s.css"];
export const fonts = [];
