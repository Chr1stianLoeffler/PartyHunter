import{s as V,n as M,r as z}from"../chunks/scheduler.C9xG8wYf.js";import{S as A,i as H,e as m,s as b,c as _,a as R,g as U,b as C,d as P,f as i,h as L,j as d,k as N,l as w,p as B,t as F,m as J,n as K}from"../chunks/index.C0W_kJsx.js";import{g as Y}from"../chunks/entry.1CaP3hbU.js";function O(u){let e,t;return{c(){e=m("div"),t=F(u[3]),this.h()},l(a){e=_(a,"DIV",{class:!0});var n=R(e);t=J(n,u[3]),n.forEach(P),this.h()},h(){i(e,"class","error-message")},m(a,n){L(a,e,n),d(e,t)},p(a,n){n&8&&K(t,a[3])},d(a){a&&P(e)}}}function G(u){let e,t,a='PARTY <span class="svelte-u1d3uv">HUNTER</span>',n,f,T="ERSTELLE EINEN NEUEN ACCOUNT",g,l,c,I,h,k,s,y,v,j="Registrieren",D,S,q,r=u[3]&&O(u);return{c(){e=m("div"),t=m("div"),t.innerHTML=a,n=b(),f=m("div"),f.textContent=T,g=b(),l=m("form"),c=m("input"),I=b(),h=m("input"),k=b(),s=m("input"),y=b(),v=m("button"),v.textContent=j,D=b(),r&&r.c(),this.h()},l(o){e=_(o,"DIV",{class:!0});var p=R(e);t=_(p,"DIV",{class:!0,"data-svelte-h":!0}),U(t)!=="svelte-12bvki3"&&(t.innerHTML=a),n=C(p),f=_(p,"DIV",{class:!0,"data-svelte-h":!0}),U(f)!=="svelte-12hla44"&&(f.textContent=T),g=C(p),l=_(p,"FORM",{class:!0});var E=R(l);c=_(E,"INPUT",{class:!0,type:!0,placeholder:!0}),I=C(E),h=_(E,"INPUT",{class:!0,type:!0,placeholder:!0}),k=C(E),s=_(E,"INPUT",{class:!0,type:!0,placeholder:!0}),y=C(E),v=_(E,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),U(v)!=="svelte-nhkwhq"&&(v.textContent=j),E.forEach(P),D=C(p),r&&r.l(p),p.forEach(P),this.h()},h(){i(t,"class","logo svelte-u1d3uv"),i(f,"class","subtitle svelte-u1d3uv"),i(c,"class","input svelte-u1d3uv"),i(c,"type","text"),i(c,"placeholder","Benutzername"),c.required=!0,i(h,"class","input svelte-u1d3uv"),i(h,"type","email"),i(h,"placeholder","E-Mail"),h.required=!0,i(s,"class","input svelte-u1d3uv"),i(s,"type","password"),i(s,"placeholder","Passwort"),s.required=!0,i(v,"class","button svelte-u1d3uv"),i(v,"type","submit"),i(l,"class","form svelte-u1d3uv"),i(e,"class","container svelte-u1d3uv")},m(o,p){L(o,e,p),d(e,t),d(e,n),d(e,f),d(e,g),d(e,l),d(l,c),N(c,u[0]),d(l,I),d(l,h),N(h,u[1]),d(l,k),d(l,s),N(s,u[2]),d(l,y),d(l,v),d(e,D),r&&r.m(e,null),S||(q=[w(c,"input",u[6]),w(h,"input",u[7]),w(s,"input",u[8]),w(v,"keypress",u[5]),w(l,"submit",B(u[4]))],S=!0)},p(o,[p]){p&1&&c.value!==o[0]&&N(c,o[0]),p&2&&h.value!==o[1]&&N(h,o[1]),p&4&&s.value!==o[2]&&N(s,o[2]),o[3]?r?r.p(o,p):(r=O(o),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},i:M,o:M,d(o){o&&P(e),r&&r.d(),S=!1,z(q)}}}function Q(u,e,t){let a="",n="",f="",T,g="";const l=async()=>{if(a&&n&&f){const s=await fetch("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,accountEmail:n,password:f})});if(s.ok)T=s.headers.get("Authorization"),T&&sessionStorage.setItem("jwt",T),sessionStorage.setItem("username",a),Y("/main");else if(s.status==409){const y=await s.json();t(3,g=y.message)}else{const y=await s.json();t(3,g="Error: "+y.message)}}else t(3,g="Es fehlen Daten, um sich zu registrieren")};function c(s){s.key==="Enter"&&l()}function I(){a=this.value,t(0,a)}function h(){n=this.value,t(1,n)}function k(){f=this.value,t(2,f)}return[a,n,f,g,l,c,I,h,k]}class x extends A{constructor(e){super(),H(this,e,Q,G,V,{})}}export{x as component};
