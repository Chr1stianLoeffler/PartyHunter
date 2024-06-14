

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BfZb6oaY.js","_app/immutable/chunks/scheduler.C9xG8wYf.js","_app/immutable/chunks/index.qm__v8Ou.js","_app/immutable/chunks/entry.DPijoe0a.js","_app/immutable/chunks/index.U-Bm33l8.js"];
export const stylesheets = ["_app/immutable/assets/5.BGOapWTb.css"];
export const fonts = [];
