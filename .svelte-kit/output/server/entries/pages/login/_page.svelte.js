import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username = "";
  let password = "";
  return `<div class="container"><form class="form"><input class="input" type="text" placeholder="Benutzername" required${add_attribute("value", username, 0)}> <input class="input" type="password" placeholder="Passwort" required${add_attribute("value", password, 0)}> <button class="button" type="submit" data-svelte-h="svelte-avxlee">Login</button></form> ${``}</div>`;
});
export {
  Page as default
};
