

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/main/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.B7ACgTI_.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.C0W_kJsx.js"];
export const stylesheets = [];
export const fonts = [];
