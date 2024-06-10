

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.D1e825rW.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.C0W_kJsx.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/3.BI34zFiX.css"];
export const fonts = [];
