import { c as create_ssr_component } from "../../chunks/ssr.js";
const css = {
  code: ".container.svelte-1gl1jrg{height:100vh}.bg-effect.svelte-1gl1jrg{background:linear-gradient(270deg, #fd749b, #281ac8);animation:svelte-1gl1jrg-pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, svelte-1gl1jrg-glow 5s linear infinite}@keyframes svelte-1gl1jrg-glow{0%{background-color:#fd749b}33%{background-color:#281ac8}66%{background-color:#ffcc70}100%{background-color:#fd749b}}@keyframes svelte-1gl1jrg-pulse{50%{transform:scale(1.5)}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["\\r\\n<script>\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"container h-full mx-auto flex justify-center items-center\\">\\r\\n  <div class=\\"space-y-10 text-center flex flex-col items-center\\">\\r\\n    <h2 class=\\"text-2xl font-bold\\">Willkommen bei</h2>\\r\\n    <figure class=\\"relative w-64 h-64 md:w-80 md:h-80\\">\\r\\n      <div class=\\"bg-effect absolute top-0 left-0 w-full h-full rounded-full blur-[50px] transition-all z-[-1]\\"></div>\\r\\n      <img src=\\"/PartyHunterLogo.png\\" alt=\\"Party Hunter Logo\\" class=\\"w-full h-full object-cover\\">\\r\\n    </figure>\\r\\n    <div class=\\"flex justify-center space-x-2\\">\\r\\n      \\r\\n      <a class=\\"btn variant-filled\\" href=\\"https://skeleton.dev/\\" target=\\"_blank\\" rel=\\"noreferrer\\">\\r\\n        Entdecke neue Events und Partys in deiner Nähe!\\r\\n      </a>\\r\\n    </div>\\r\\n    <div class=\\"space-y-2\\">\\r\\n      \\r\\n      <a class=\\"btn glass\\" href=\\"registrieren\\">Jetzt Registrieren</a>\\r\\n      \\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .container {\\r\\n    height: 100vh; /* Vollbild Container */\\r\\n  }\\r\\n\\r\\n  .bg-effect {\\r\\n    background: linear-gradient(270deg, #fd749b, #281ac8);\\r\\n    animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;\\r\\n  }\\r\\n\\r\\n  @keyframes glow {\\r\\n    0% {\\r\\n      background-color: #fd749b;\\r\\n    }\\r\\n    33% {\\r\\n      background-color: #281ac8;\\r\\n    }\\r\\n    66% {\\r\\n      background-color: #ffcc70;\\r\\n    }\\r\\n    100% {\\r\\n      background-color: #fd749b;\\r\\n    }\\r\\n  }\\r\\n\\r\\n  @keyframes pulse {\\r\\n    50% {\\r\\n      transform: scale(1.5);\\r\\n    }\\r\\n  }\\r\\n</style>"],"names":[],"mappings":"AA2BE,yBAAW,CACT,MAAM,CAAE,KACV,CAEA,yBAAW,CACT,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CACrD,SAAS,CAAE,oBAAK,CAAC,EAAE,CAAC,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,QAAQ,CAAC,CAAC,mBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC1E,CAEA,WAAW,mBAAK,CACd,EAAG,CACD,gBAAgB,CAAE,OACpB,CACA,GAAI,CACF,gBAAgB,CAAE,OACpB,CACA,GAAI,CACF,gBAAgB,CAAE,OACpB,CACA,IAAK,CACH,gBAAgB,CAAE,OACpB,CACF,CAEA,WAAW,oBAAM,CACf,GAAI,CACF,SAAS,CAAE,MAAM,GAAG,CACtB,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container h-full mx-auto flex justify-center items-center svelte-1gl1jrg" data-svelte-h="svelte-4v1kg1"><div class="space-y-10 text-center flex flex-col items-center"><h2 class="text-2xl font-bold">Willkommen bei</h2> <figure class="relative w-64 h-64 md:w-80 md:h-80"><div class="bg-effect absolute top-0 left-0 w-full h-full rounded-full blur-[50px] transition-all z-[-1] svelte-1gl1jrg"></div> <img src="/PartyHunterLogo.png" alt="Party Hunter Logo" class="w-full h-full object-cover"></figure> <div class="flex justify-center space-x-2"><a class="btn variant-filled" href="https://skeleton.dev/" target="_blank" rel="noreferrer">Entdecke neue Events und Partys in deiner Nähe!</a></div> <div class="space-y-2"><a class="btn glass" href="registrieren">Jetzt Registrieren</a></div></div> </div>`;
});
export {
  Page as default
};