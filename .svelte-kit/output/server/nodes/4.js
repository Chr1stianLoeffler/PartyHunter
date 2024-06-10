

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.Ch3Jytrp.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.C0W_kJsx.js"];
export const stylesheets = [];
export const fonts = [];
