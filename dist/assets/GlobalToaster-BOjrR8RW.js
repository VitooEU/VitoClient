import{a as m,r as d,c as G,i as v,g as K,p as Y,d as Q,u as N,t as ee,b as V,j as b,h as te,a6 as D,T as ae,q as re}from"./globals-BgnoTnKG.js";import{w as B,r as se}from"./permission-service-Dz7D8OY0.js";class h{static async beginLogin(){try{return await m("begin_login")}catch(t){throw console.error("Failed to begin login:",t),t}}static async removeAccount(t){try{await m("remove_account",{accountId:t})}catch(a){throw console.error("Failed to remove account:",a),a}}static async getActiveAccount(){try{return await m("get_active_account")}catch(t){throw console.error("Failed to get active account:",t),t}}static async setActiveAccount(t){try{await m("set_active_account",{accountId:t})}catch(a){throw console.error("Failed to set active account:",a),a}}static async getAccounts(){try{return await m("get_accounts")}catch(t){throw console.error("Failed to get accounts:",t),t}}static async cancelLogin(){try{await m("cancel_login")}catch(t){throw console.error("Failed to cancel login:",t),t}}static async isFlatpak(){try{return await m("is_flatpak")}catch(t){return console.error("Failed to check Flatpak status:",t),!1}}}let oe={data:""},ie=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||oe,ne=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ce=/\/\*[^]*?\*\/|  +/g,I=/\n+/g,x=(e,t)=>{let a="",o="",c="";for(let r in e){let s=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+s+";":o+=r[1]=="f"?x(s,r):r+"{"+x(s,r[1]=="k"?"":t)+"}":typeof s=="object"?o+=x(s,t?t.replace(/([^,])+/g,i=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,n=>/&/.test(n)?n.replace(/&/g,i):i?i+" "+n:n)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=x.p?x.p(r,s):r+":"+s+";")}return a+(t&&c?t+"{"+c+"}":c)+o},w={},W=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+W(e[a]);return t}return e},le=(e,t,a,o,c)=>{let r=W(e),s=w[r]||(w[r]=(n=>{let l=0,u=11;for(;l<n.length;)u=101*u+n.charCodeAt(l++)>>>0;return"go"+u})(r));if(!w[s]){let n=r!==e?e:(l=>{let u,p,g=[{}];for(;u=ne.exec(l.replace(ce,""));)u[4]?g.shift():u[3]?(p=u[3].replace(I," ").trim(),g.unshift(g[0][p]=g[0][p]||{})):g[0][u[1]]=u[2].replace(I," ").trim();return g[0]})(e);w[s]=x(c?{["@keyframes "+s]:n}:n,a?"":"."+s)}let i=a&&w.g?w.g:null;return a&&(w.g=w[s]),((n,l,u,p)=>{p?l.data=l.data.replace(p,n):l.data.indexOf(n)===-1&&(l.data=u?n+l.data:l.data+n)})(w[s],t,o,i),s},ue=(e,t,a)=>e.reduce((o,c,r)=>{let s=t[r];if(s&&s.call){let i=s(a),n=i&&i.props&&i.props.className||/^go/.test(i)&&i;s=n?"."+n:i&&typeof i=="object"?i.props?"":x(i,""):i===!1?"":i}return o+c+(s??"")},"");function P(e){let t=this||{},a=e.call?e(t.p):e;return le(a.unshift?a.raw?ue(a,[].slice.call(arguments,1),t.p):a.reduce((o,c)=>Object.assign(o,c&&c.call?c(t.p):c),{}):a,ie(t.target),t.g,t.o,t.k)}let X,M,O;P.bind({g:1});let A=P.bind({k:1});function de(e,t,a,o){x.p=t,X=e,M=a,O=o}function _(e,t){let a=this||{};return function(){let o=arguments;function c(r,s){let i=Object.assign({},r),n=i.className||c.className;a.p=Object.assign({theme:M&&M()},i),a.o=/ *go\d+/.test(n),i.className=P.apply(a,o)+(n?" "+n:"");let l=e;return e[0]&&(l=i.as||e,delete i.as),O&&l[0]&&O(i),X(l,i)}return c}}var fe=e=>typeof e=="function",T=(e,t)=>fe(e)?e(t):e,pe=(()=>{let e=0;return()=>(++e).toString()})(),Z=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),me=20,J=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,me)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return J(e,{type:e.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let c=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+c}))}}},C=[],k={toasts:[],pausedAt:void 0},S=e=>{k=J(k,e),C.forEach(t=>{t(k)})},ge={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},he=(e={})=>{let[t,a]=d.useState(k),o=d.useRef(k);d.useEffect(()=>(o.current!==k&&a(k),C.push(a),()=>{let r=C.indexOf(a);r>-1&&C.splice(r,1)}),[]);let c=t.toasts.map(r=>{var s,i,n;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((s=e[r.type])==null?void 0:s.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((i=e[r.type])==null?void 0:i.duration)||(e==null?void 0:e.duration)||ge[r.type],style:{...e.style,...(n=e[r.type])==null?void 0:n.style,...r.style}}});return{...t,toasts:c}},ye=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||pe()}),$=e=>(t,a)=>{let o=ye(t,e,a);return S({type:2,toast:o}),o.id},f=(e,t)=>$("blank")(e,t);f.error=$("error");f.success=$("success");f.loading=$("loading");f.custom=$("custom");f.dismiss=e=>{S({type:3,toastId:e})};f.remove=e=>S({type:4,toastId:e});f.promise=(e,t,a)=>{let o=f.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(c=>{let r=t.success?T(t.success,c):void 0;return r?f.success(r,{id:o,...a,...a==null?void 0:a.success}):f.dismiss(o),c}).catch(c=>{let r=t.error?T(t.error,c):void 0;r?f.error(r,{id:o,...a,...a==null?void 0:a.error}):f.dismiss(o)}),e};var ve=(e,t)=>{S({type:1,toast:{id:e,height:t}})},be=()=>{S({type:5,time:Date.now()})},j=new Map,we=1e3,Ae=(e,t=we)=>{if(j.has(e))return;let a=setTimeout(()=>{j.delete(e),S({type:4,toastId:e})},t);j.set(e,a)},xe=e=>{let{toasts:t,pausedAt:a}=he(e);d.useEffect(()=>{if(a)return;let r=Date.now(),s=t.map(i=>{if(i.duration===1/0)return;let n=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(n<0){i.visible&&f.dismiss(i.id);return}return setTimeout(()=>f.dismiss(i.id),n)});return()=>{s.forEach(i=>i&&clearTimeout(i))}},[t,a]);let o=d.useCallback(()=>{a&&S({type:6,time:Date.now()})},[a]),c=d.useCallback((r,s)=>{let{reverseOrder:i=!1,gutter:n=8,defaultPosition:l}=s||{},u=t.filter(y=>(y.position||l)===(r.position||l)&&y.height),p=u.findIndex(y=>y.id===r.id),g=u.filter((y,R)=>R<p&&y.visible).length;return u.filter(y=>y.visible).slice(...i?[g+1]:[0,g]).reduce((y,R)=>y+(R.height||0)+n,0)},[t]);return d.useEffect(()=>{t.forEach(r=>{if(r.dismissed)Ae(r.id,r.removeDelay);else{let s=j.get(r.id);s&&(clearTimeout(s),j.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:ve,startPause:be,endPause:o,calculateOffset:c}}},_e=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ke=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Se=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ee=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ke} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Fe=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,je=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Fe} 1s linear infinite;
`,$e=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Le=A`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ce=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Le} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Te=_("div")`
  position: absolute;
`,Pe=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Re=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ne=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Re} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,De=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?d.createElement(Ne,null,t):t:a==="blank"?null:d.createElement(Pe,null,d.createElement(je,{...o}),a!=="loading"&&d.createElement(Te,null,a==="error"?d.createElement(Ee,{...o}):d.createElement(Ce,{...o})))},Ue=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Me=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Oe="0%{opacity:0;} 100%{opacity:1;}",ze="0%{opacity:1;} 100%{opacity:0;}",Be=_("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ie=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,qe=(e,t)=>{let a=e.includes("top")?1:-1,[o,c]=Z()?[Oe,ze]:[Ue(a),Me(a)];return{animation:t?`${A(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},He=d.memo(({toast:e,position:t,style:a,children:o})=>{let c=e.height?qe(e.position||t||"top-center",e.visible):{opacity:0},r=d.createElement(De,{toast:e}),s=d.createElement(Ie,{...e.ariaProps},T(e.message,e));return d.createElement(Be,{className:e.className,style:{...c,...a,...e.style}},typeof o=="function"?o({icon:r,message:s}):d.createElement(d.Fragment,null,r,s))});de(d.createElement);var Ge=({id:e,className:t,style:a,onHeightUpdate:o,children:c})=>{let r=d.useCallback(s=>{if(s){let i=()=>{let n=s.getBoundingClientRect().height;o(e,n)};i(),new MutationObserver(i).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return d.createElement("div",{ref:r,className:t,style:a},c)},Ve=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Z()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...c}},We=P`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,L=16,Xe=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:c,containerStyle:r,containerClassName:s})=>{let{toasts:i,handlers:n}=xe(a);return d.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:L,left:L,right:L,bottom:L,pointerEvents:"none",...r},className:s,onMouseEnter:n.startPause,onMouseLeave:n.endPause},i.map(l=>{let u=l.position||t,p=n.calculateOffset(l,{reverseOrder:e,gutter:o,defaultPosition:t}),g=Ve(u,p);return d.createElement(Ge,{id:l.id,key:l.id,onHeightUpdate:n.updateHeight,className:l.visible?We:"",style:g},l.type==="custom"?T(l.message,l):c?c(l):d.createElement(He,{toast:l,position:u}))}))};function q(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null){if("message"in e&&typeof e.message=="string")return e.message;if("error"in e&&typeof e.error=="string")return e.error;try{return JSON.stringify(e)}catch{return"[Unable to parse error object]"}}return String(e)}const E=e=>{const t=(e==null?void 0:e.id)??null,a=(e==null?void 0:e.username)??null;Promise.all([B.setTrait("mojang_uuid",t),B.setTrait("mojang_username",a)]).then(()=>{console.log(t?`[AuthStore] Flagsmith mojang traits set for ${t}`:"[AuthStore] Flagsmith mojang traits cleared (no active account).")}).catch(o=>{console.error("[AuthStore] Error updating Flagsmith mojang traits:",o)}),se().catch(o=>{console.error("[AuthStore] Error refreshing permissions:",o)})},Ze=G((e,t)=>({accounts:[],activeAccount:null,accountsLoaded:!1,isLoading:!1,error:null,initializeAccounts:async()=>{try{e({isLoading:!0,error:null});const a=await h.getAccounts(),o={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"},c=a.find(n=>n.active)??(a.length>0?a[0]:o),r=a.length>0?a:[o];e({accounts:r,activeAccount:c,accountsLoaded:!0});let s=c;try{const n=await h.getActiveAccount();n&&(s=n)}catch(n){console.warn("Active account refresh failed, keeping cached account:",n)}const i=r.map(n=>({...n,active:s?n.id===s.id:!1}));e({accounts:i,activeAccount:s,isLoading:!1}),E(s)}catch(a){console.error("Failed to initialize accounts:",a);const o={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"};e({accounts:[o],activeAccount:o,isLoading:!1,accountsLoaded:!0}),E(o)}},addAccount:async()=>{e({isLoading:!0,error:null});const[a,o]=await Promise.all([K().catch(()=>({use_browser_based_login:!1})),h.isFlatpak().catch(()=>!1)]),c=o||a.use_browser_based_login,r=(async()=>{const s=await h.beginLogin();if(!s)throw new Error(v.t("auth.errors.login_cancelled"));const i=await h.getAccounts(),n=await h.getActiveAccount();return E(n),{newAccount:s,accounts:i,activeAccount:n}})();c||f.promise(r,{loading:v.t("auth.loading.browser_sign_in"),success:({newAccount:s})=>v.t("auth.success.account_added",{username:s.username}),error:s=>s.message},{loading:{duration:5e4},success:{duration:1500},error:{duration:1500}});try{const{newAccount:s,accounts:i,activeAccount:n}=await r;c&&f.success(v.t("auth.success.account_added",{username:s.username}),{duration:1500});const l=i.map(u=>({...u,active:n?u.id===n.id:!1}));e({accounts:l,activeAccount:n,isLoading:!1,error:null})}catch(s){const i=q(s);c&&!i.includes(v.t("auth.errors.login_cancelled"))&&f.error(i||v.t("auth.errors.login_failed"),{duration:1500}),i.includes(v.t("auth.errors.login_cancelled"))?(console.log("Account add cancelled by user."),e({isLoading:!1,error:null})):(console.error("Failed to add account:",s),e({error:v.t("auth.errors.add_account",{error:i}),isLoading:!1}))}},removeAccount:async a=>{var o;try{e({isLoading:!0,error:null});const c=((o=t().activeAccount)==null?void 0:o.id)===a;await h.removeAccount(a);const r=await h.getAccounts(),s=await h.getActiveAccount(),i=r.map(n=>({...n,active:s?n.id===s.id:!1}));e({accounts:i,activeAccount:s,isLoading:!1}),c&&E(s)}catch(c){console.error("Failed to remove account:",c),e({error:v.t("auth.errors.remove_account",{error:q(c)}),isLoading:!1})}},setActiveAccount:async a=>{const o=t().activeAccount,c=t().accounts;try{e({isLoading:!0,error:null}),await h.setActiveAccount(a);const r=await h.getActiveAccount(),s=t().accounts.map(i=>({...i,active:i.id===a}));e({accounts:s,activeAccount:r,isLoading:!1}),E(r)}catch(r){console.error("Failed to set active account:",r);const s=r instanceof Error?r.message:String(r.message??r);if(s.includes("invalid_grant")||s.includes("expired")){try{await h.removeAccount(a);const n=await h.getAccounts(),l=await h.getActiveAccount(),u=n.map(p=>({...p,active:l?p.id===l.id:!1}));e({accounts:u,activeAccount:l,isLoading:!1,error:null}),E(l)}catch(n){console.error("Failed to remove expired account:",n),e({accounts:c,activeAccount:o,isLoading:!1})}f.error(v.t("auth.errors.session_expired"),{duration:5e3})}else{if(o)try{await h.setActiveAccount(o.id)}catch(n){console.error("Failed to revert active account in backend:",n)}e({accounts:c,activeAccount:o,error:v.t("auth.errors.set_active",{error:s}),isLoading:!1}),f.error(v.t("auth.errors.switch_failed",{error:s}),{duration:3e3})}}}})),Je=/^[a-zA-Z0-9_]{2,16}$/,Ke=/^(?:[0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;class Ye{static async getUserSkinData(){return await m("get_user_skin_data")}static async getAllSkins(){return await m("get_all_skins")}static async uploadSkin(t){await m("upload_skin",{skinVariant:t})}static async resetSkin(){await m("reset_skin")}static async applySkinFromBase64(t,a,o){await m("apply_skin_from_base64",{base64Data:t,skinVariant:a,skinName:o})}static async updateSkinProperties(t,a,o){return await m("update_skin_properties",{id:t,name:a,variant:o})}static async addSkinLocally(t,a,o,c){let r;if(Je.test(t))r={type:"Profile",details:{query:t}};else if(Ke.test(t))r={type:"Profile",details:{query:t}};else{let i=!1,n=!1,l="";try{const u=new URL(t);if(u.protocol==="http:"||u.protocol==="https:")i=!0;else if(u.protocol==="file:"){n=!0;let p=decodeURIComponent(u.pathname);p.length>2&&p.startsWith("/")&&p[2]===":"&&(p=p.substring(1)),l=p}}catch{}i?r={type:"Url",details:{url:t}}:n?r={type:"FilePath",details:{path:l}}:r={type:"FilePath",details:{path:t}}}return await m("add_skin_locally",{payload:{source:r,target_skin_name:a,target_skin_variant:o,description:c??null}})}static async removeSkin(t){return await m("remove_skin",{id:t})}static async getBase64FromSkinSource(t){return await m("get_base64_from_skin_source_command",{source:t})}static async getActiveSkin(){return await m("get_active_skin")}static async getFaceAvatar(t,a,o=!0){return await m("get_face_avatar",{uuid:t,size:a,overlay:o})}}const Qe=G()(Y(e=>({selectedSkinId:null,setSelectedSkinId:t=>e({selectedSkinId:t}),skinRevision:0,bumpSkinRevision:()=>e(t=>({skinRevision:t.skinRevision+1}))}),{name:"skin-store",partialize:e=>({selectedSkinId:e.selectedSkinId})})),z=e=>e.replace(/-/g,"").toLowerCase(),U=new Map,H=(e,t,a)=>`${z(e)}:${t}:${a}`;function et({uuid:e,size:t=64,overlay:a=!0}){const o=Ze(n=>{var l;return(l=n.activeAccount)==null?void 0:l.id}),c=Qe(n=>n.skinRevision),[r,s]=d.useState(()=>e?U.get(H(e,t,a))??null:null),i=!!e&&!!o&&z(e)===z(o);return d.useEffect(()=>{if(!e){s(null);return}const n=H(e,t,a),l=U.get(n);l&&s(l);let u=!1;return(async()=>{try{const g=await Ye.getFaceAvatar(e,t,a),y=Q(g);U.set(n,y),u||s(y)}catch(g){console.error("[usePlayerAvatar] Failed to load avatar:",g),!u&&!l&&s(null)}})(),()=>{u=!0}},[e,t,a,i,i?c:0]),r}function tt({message:e,uuid:t}){const a=et({uuid:t,size:32});return b.jsxs("div",{className:"flex items-center gap-3",children:[a?b.jsx("img",{src:a,alt:"",className:"w-8 h-8 rounded flex-shrink-0",style:{imageRendering:"pixelated"}}):b.jsx("div",{className:"w-8 h-8 rounded flex-shrink-0 bg-white/20 animate-pulse"}),b.jsx("span",{children:e})]})}const st={success:e=>{const t=f.success(e);return F(t),t},error:e=>{const t=f.error(e);return F(t),t},loading:e=>{const t=f.loading(e);return F(t),t},info:e=>{const t=f(e);return F(t),t},player:(e,t)=>{const a=f(o=>b.jsx(tt,{message:e,uuid:t}),{duration:3e3});return F(a),a},custom:(e,t)=>{const a=f.custom(o=>b.jsxs("div",{className:"flex items-center gap-3",children:[t&&b.jsx("div",{className:"flex-shrink-0",children:t}),b.jsx("span",{children:e})]}));return F(a),a},dismiss:e=>{f.dismiss(e)}};function F(e){setTimeout(()=>{const t=document.getElementById(`toast-${e}`);t&&V.fromTo(t,{x:50,opacity:0,scale:.95},{x:0,opacity:1,scale:1,duration:.4,ease:"power2.out"})},10)}function ot(){const e=N(i=>i.accentColor),t=N(i=>i.borderRadius),a=N(i=>i.isBackgroundAnimationEnabled),o=d.useRef(null),c=te(t),r=re(),s=ee({accentColor:e.value,borderRadius:t});return d.useEffect(()=>{if(!a)return;document.querySelectorAll('[id^="toast-"]').forEach(n=>{V.to(n,{backgroundColor:`${e.value}30`,borderColor:`${e.value}80`,borderBottomColor:e.value,duration:.2,ease:"power2.out"})})},[e,a]),b.jsx("div",{ref:o,children:b.jsx(Xe,{position:"bottom-right",toastOptions:{className:`${ae} ${r}`,style:s,success:{style:{...D("success",e.value),boxShadow:"none",...c},iconTheme:{primary:"#059669",secondary:"#d1fae5"}},error:{style:{...D("error",e.value),boxShadow:"none",...c},iconTheme:{primary:"#dc2626",secondary:"#fee2e2"}},loading:{style:{...D("default",e.value),boxShadow:"none",...c},iconTheme:{primary:e.value,secondary:"#ffffff"},duration:1/0},duration:3e3}})})}export{ot as G,h as M,Ze as a,Qe as b,f as c,Ye as d,q as p,st as t,et as u};
