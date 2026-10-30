import{a as m,r as d,c as G,i as v,d as K,p as Y,b as Q,u as R,t as ee,g as V,j as b,a6 as D,T as te}from"./globals-hsrtI5qR.js";import{w as I,r as ae}from"./permission-service-D5Z1ErZE.js";class h{static async beginLogin(){try{return await m("begin_login")}catch(t){throw console.error("Failed to begin login:",t),t}}static async removeAccount(t){try{await m("remove_account",{accountId:t})}catch(a){throw console.error("Failed to remove account:",a),a}}static async getActiveAccount(){try{return await m("get_active_account")}catch(t){throw console.error("Failed to get active account:",t),t}}static async setActiveAccount(t){try{await m("set_active_account",{accountId:t})}catch(a){throw console.error("Failed to set active account:",a),a}}static async getAccounts(){try{return await m("get_accounts")}catch(t){throw console.error("Failed to get accounts:",t),t}}static async cancelLogin(){try{await m("cancel_login")}catch(t){throw console.error("Failed to cancel login:",t),t}}static async isFlatpak(){try{return await m("is_flatpak")}catch(t){return console.error("Failed to check Flatpak status:",t),!1}}}let re={data:""},se=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||re,oe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ie=/\/\*[^]*?\*\/|  +/g,B=/\n+/g,x=(e,t)=>{let a="",s="",c="";for(let r in e){let o=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+o+";":s+=r[1]=="f"?x(o,r):r+"{"+x(o,r[1]=="k"?"":t)+"}":typeof o=="object"?s+=x(o,t?t.replace(/([^,])+/g,n=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,n):n?n+" "+i:i)):r):o!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=x.p?x.p(r,o):r+":"+o+";")}return a+(t&&c?t+"{"+c+"}":c)+s},A={},W=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+W(e[a]);return t}return e},ne=(e,t,a,s,c)=>{let r=W(e),o=A[r]||(A[r]=(i=>{let l=0,u=11;for(;l<i.length;)u=101*u+i.charCodeAt(l++)>>>0;return"go"+u})(r));if(!A[o]){let i=r!==e?e:(l=>{let u,p,g=[{}];for(;u=oe.exec(l.replace(ie,""));)u[4]?g.shift():u[3]?(p=u[3].replace(B," ").trim(),g.unshift(g[0][p]=g[0][p]||{})):g[0][u[1]]=u[2].replace(B," ").trim();return g[0]})(e);A[o]=x(c?{["@keyframes "+o]:i}:i,a?"":"."+o)}let n=a&&A.g?A.g:null;return a&&(A.g=A[o]),((i,l,u,p)=>{p?l.data=l.data.replace(p,i):l.data.indexOf(i)===-1&&(l.data=u?i+l.data:l.data+i)})(A[o],t,s,n),o},ce=(e,t,a)=>e.reduce((s,c,r)=>{let o=t[r];if(o&&o.call){let n=o(a),i=n&&n.props&&n.props.className||/^go/.test(n)&&n;o=i?"."+i:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+c+(o??"")},"");function P(e){let t=this||{},a=e.call?e(t.p):e;return ne(a.unshift?a.raw?ce(a,[].slice.call(arguments,1),t.p):a.reduce((s,c)=>Object.assign(s,c&&c.call?c(t.p):c),{}):a,se(t.target),t.g,t.o,t.k)}let X,M,O;P.bind({g:1});let w=P.bind({k:1});function le(e,t,a,s){x.p=t,X=e,M=a,O=s}function _(e,t){let a=this||{};return function(){let s=arguments;function c(r,o){let n=Object.assign({},r),i=n.className||c.className;a.p=Object.assign({theme:M&&M()},n),a.o=/ *go\d+/.test(i),n.className=P.apply(a,s)+(i?" "+i:"");let l=e;return e[0]&&(l=n.as||e,delete n.as),O&&l[0]&&O(n),X(l,n)}return c}}var ue=e=>typeof e=="function",C=(e,t)=>ue(e)?e(t):e,de=(()=>{let e=0;return()=>(++e).toString()})(),Z=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),fe=20,J=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,fe)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return J(e,{type:e.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(r=>r.id===s||s===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let c=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+c}))}}},T=[],k={toasts:[],pausedAt:void 0},S=e=>{k=J(k,e),T.forEach(t=>{t(k)})},pe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},me=(e={})=>{let[t,a]=d.useState(k),s=d.useRef(k);d.useEffect(()=>(s.current!==k&&a(k),T.push(a),()=>{let r=T.indexOf(a);r>-1&&T.splice(r,1)}),[]);let c=t.toasts.map(r=>{var o,n,i;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((o=e[r.type])==null?void 0:o.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((n=e[r.type])==null?void 0:n.duration)||(e==null?void 0:e.duration)||pe[r.type],style:{...e.style,...(i=e[r.type])==null?void 0:i.style,...r.style}}});return{...t,toasts:c}},ge=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||de()}),L=e=>(t,a)=>{let s=ge(t,e,a);return S({type:2,toast:s}),s.id},f=(e,t)=>L("blank")(e,t);f.error=L("error");f.success=L("success");f.loading=L("loading");f.custom=L("custom");f.dismiss=e=>{S({type:3,toastId:e})};f.remove=e=>S({type:4,toastId:e});f.promise=(e,t,a)=>{let s=f.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(c=>{let r=t.success?C(t.success,c):void 0;return r?f.success(r,{id:s,...a,...a==null?void 0:a.success}):f.dismiss(s),c}).catch(c=>{let r=t.error?C(t.error,c):void 0;r?f.error(r,{id:s,...a,...a==null?void 0:a.error}):f.dismiss(s)}),e};var he=(e,t)=>{S({type:1,toast:{id:e,height:t}})},ye=()=>{S({type:5,time:Date.now()})},j=new Map,ve=1e3,be=(e,t=ve)=>{if(j.has(e))return;let a=setTimeout(()=>{j.delete(e),S({type:4,toastId:e})},t);j.set(e,a)},Ae=e=>{let{toasts:t,pausedAt:a}=me(e);d.useEffect(()=>{if(a)return;let r=Date.now(),o=t.map(n=>{if(n.duration===1/0)return;let i=(n.duration||0)+n.pauseDuration-(r-n.createdAt);if(i<0){n.visible&&f.dismiss(n.id);return}return setTimeout(()=>f.dismiss(n.id),i)});return()=>{o.forEach(n=>n&&clearTimeout(n))}},[t,a]);let s=d.useCallback(()=>{a&&S({type:6,time:Date.now()})},[a]),c=d.useCallback((r,o)=>{let{reverseOrder:n=!1,gutter:i=8,defaultPosition:l}=o||{},u=t.filter(y=>(y.position||l)===(r.position||l)&&y.height),p=u.findIndex(y=>y.id===r.id),g=u.filter((y,N)=>N<p&&y.visible).length;return u.filter(y=>y.visible).slice(...n?[g+1]:[0,g]).reduce((y,N)=>y+(N.height||0)+i,0)},[t]);return d.useEffect(()=>{t.forEach(r=>{if(r.dismissed)be(r.id,r.removeDelay);else{let o=j.get(r.id);o&&(clearTimeout(o),j.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:he,startPause:ye,endPause:s,calculateOffset:c}}},we=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,xe=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_e=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ke=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${we} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${xe} 0.15s ease-out forwards;
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
    animation: ${_e} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Se=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ee=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Se} 1s linear infinite;
`,Fe=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,je=w`
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
}`,Le=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${je} 0.2s ease-out forwards;
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
`,$e=_("div")`
  position: absolute;
`,Te=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ce=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Pe=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ce} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ne=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(Pe,null,t):t:a==="blank"?null:d.createElement(Te,null,d.createElement(Ee,{...s}),a!=="loading"&&d.createElement($e,null,a==="error"?d.createElement(ke,{...s}):d.createElement(Le,{...s})))},Re=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,De=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ue="0%{opacity:0;} 100%{opacity:1;}",Me="0%{opacity:1;} 100%{opacity:0;}",Oe=_("div")`
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
`,ze=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ie=(e,t)=>{let a=e.includes("top")?1:-1,[s,c]=Z()?[Ue,Me]:[Re(a),De(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Be=d.memo(({toast:e,position:t,style:a,children:s})=>{let c=e.height?Ie(e.position||t||"top-center",e.visible):{opacity:0},r=d.createElement(Ne,{toast:e}),o=d.createElement(ze,{...e.ariaProps},C(e.message,e));return d.createElement(Oe,{className:e.className,style:{...c,...a,...e.style}},typeof s=="function"?s({icon:r,message:o}):d.createElement(d.Fragment,null,r,o))});le(d.createElement);var He=({id:e,className:t,style:a,onHeightUpdate:s,children:c})=>{let r=d.useCallback(o=>{if(o){let n=()=>{let i=o.getBoundingClientRect().height;s(e,i)};n(),new MutationObserver(n).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:r,className:t,style:a},c)},qe=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Z()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...c}},Ge=P`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Ve=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:c,containerStyle:r,containerClassName:o})=>{let{toasts:n,handlers:i}=Ae(a);return d.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...r},className:o,onMouseEnter:i.startPause,onMouseLeave:i.endPause},n.map(l=>{let u=l.position||t,p=i.calculateOffset(l,{reverseOrder:e,gutter:s,defaultPosition:t}),g=qe(u,p);return d.createElement(He,{id:l.id,key:l.id,onHeightUpdate:i.updateHeight,className:l.visible?Ge:"",style:g},l.type==="custom"?C(l.message,l):c?c(l):d.createElement(Be,{toast:l,position:u}))}))};function H(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null){if("message"in e&&typeof e.message=="string")return e.message;if("error"in e&&typeof e.error=="string")return e.error;try{return JSON.stringify(e)}catch{return"[Unable to parse error object]"}}return String(e)}const E=e=>{const t=(e==null?void 0:e.id)??null,a=(e==null?void 0:e.username)??null;Promise.all([I.setTrait("mojang_uuid",t),I.setTrait("mojang_username",a)]).then(()=>{console.log(t?`[AuthStore] Flagsmith mojang traits set for ${t}`:"[AuthStore] Flagsmith mojang traits cleared (no active account).")}).catch(s=>{console.error("[AuthStore] Error updating Flagsmith mojang traits:",s)}),ae().catch(s=>{console.error("[AuthStore] Error refreshing permissions:",s)})},We=G((e,t)=>({accounts:[],activeAccount:null,accountsLoaded:!1,isLoading:!1,error:null,initializeAccounts:async()=>{try{e({isLoading:!0,error:null});const a=await h.getAccounts(),s={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"},c=a.find(i=>i.active)??(a.length>0?a[0]:s),r=a.length>0?a:[s];e({accounts:r,activeAccount:c,accountsLoaded:!0});let o=c;try{const i=await h.getActiveAccount();i&&(o=i)}catch(i){console.warn("Active account refresh failed, keeping cached account:",i)}const n=r.map(i=>({...i,active:o?i.id===o.id:!1}));e({accounts:n,activeAccount:o,isLoading:!1}),E(o)}catch(a){console.error("Failed to initialize accounts:",a);const s={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"};e({accounts:[s],activeAccount:s,isLoading:!1,accountsLoaded:!0}),E(s)}},addAccount:async()=>{e({isLoading:!0,error:null});const[a,s]=await Promise.all([K().catch(()=>({use_browser_based_login:!1})),h.isFlatpak().catch(()=>!1)]),c=s||a.use_browser_based_login,r=(async()=>{const o=await h.beginLogin();if(!o)throw new Error(v.t("auth.errors.login_cancelled"));const n=await h.getAccounts(),i=await h.getActiveAccount();return E(i),{newAccount:o,accounts:n,activeAccount:i}})();c||f.promise(r,{loading:v.t("auth.loading.browser_sign_in"),success:({newAccount:o})=>v.t("auth.success.account_added",{username:o.username}),error:o=>o.message},{loading:{duration:5e4},success:{duration:1500},error:{duration:1500}});try{const{newAccount:o,accounts:n,activeAccount:i}=await r;c&&f.success(v.t("auth.success.account_added",{username:o.username}),{duration:1500});const l=n.map(u=>({...u,active:i?u.id===i.id:!1}));e({accounts:l,activeAccount:i,isLoading:!1,error:null})}catch(o){const n=H(o);c&&!n.includes(v.t("auth.errors.login_cancelled"))&&f.error(n||v.t("auth.errors.login_failed"),{duration:1500}),n.includes(v.t("auth.errors.login_cancelled"))?(console.log("Account add cancelled by user."),e({isLoading:!1,error:null})):(console.error("Failed to add account:",o),e({error:v.t("auth.errors.add_account",{error:n}),isLoading:!1}))}},removeAccount:async a=>{var s;try{e({isLoading:!0,error:null});const c=((s=t().activeAccount)==null?void 0:s.id)===a;await h.removeAccount(a);const r=await h.getAccounts(),o=await h.getActiveAccount(),n=r.map(i=>({...i,active:o?i.id===o.id:!1}));e({accounts:n,activeAccount:o,isLoading:!1}),c&&E(o)}catch(c){console.error("Failed to remove account:",c),e({error:v.t("auth.errors.remove_account",{error:H(c)}),isLoading:!1})}},setActiveAccount:async a=>{const s=t().activeAccount,c=t().accounts;try{e({isLoading:!0,error:null}),await h.setActiveAccount(a);const r=await h.getActiveAccount(),o=t().accounts.map(n=>({...n,active:n.id===a}));e({accounts:o,activeAccount:r,isLoading:!1}),E(r)}catch(r){console.error("Failed to set active account:",r);const o=r instanceof Error?r.message:String(r.message??r);if(o.includes("invalid_grant")||o.includes("expired")){try{await h.removeAccount(a);const i=await h.getAccounts(),l=await h.getActiveAccount(),u=i.map(p=>({...p,active:l?p.id===l.id:!1}));e({accounts:u,activeAccount:l,isLoading:!1,error:null}),E(l)}catch(i){console.error("Failed to remove expired account:",i),e({accounts:c,activeAccount:s,isLoading:!1})}f.error(v.t("auth.errors.session_expired"),{duration:5e3})}else{if(s)try{await h.setActiveAccount(s.id)}catch(i){console.error("Failed to revert active account in backend:",i)}e({accounts:c,activeAccount:s,error:v.t("auth.errors.set_active",{error:o}),isLoading:!1}),f.error(v.t("auth.errors.switch_failed",{error:o}),{duration:3e3})}}}})),Xe=/^[a-zA-Z0-9_]{2,16}$/,Ze=/^(?:[0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;class Je{static async getUserSkinData(){return await m("get_user_skin_data")}static async getAllSkins(){return await m("get_all_skins")}static async uploadSkin(t){await m("upload_skin",{skinVariant:t})}static async resetSkin(){await m("reset_skin")}static async applySkinFromBase64(t,a,s){await m("apply_skin_from_base64",{base64Data:t,skinVariant:a,skinName:s})}static async updateSkinProperties(t,a,s){return await m("update_skin_properties",{id:t,name:a,variant:s})}static async addSkinLocally(t,a,s,c){let r;if(Xe.test(t))r={type:"Profile",details:{query:t}};else if(Ze.test(t))r={type:"Profile",details:{query:t}};else{let n=!1,i=!1,l="";try{const u=new URL(t);if(u.protocol==="http:"||u.protocol==="https:")n=!0;else if(u.protocol==="file:"){i=!0;let p=decodeURIComponent(u.pathname);p.length>2&&p.startsWith("/")&&p[2]===":"&&(p=p.substring(1)),l=p}}catch{}n?r={type:"Url",details:{url:t}}:i?r={type:"FilePath",details:{path:l}}:r={type:"FilePath",details:{path:t}}}return await m("add_skin_locally",{payload:{source:r,target_skin_name:a,target_skin_variant:s,description:c??null}})}static async removeSkin(t){return await m("remove_skin",{id:t})}static async getBase64FromSkinSource(t){return await m("get_base64_from_skin_source_command",{source:t})}static async getActiveSkin(){return await m("get_active_skin")}static async getFaceAvatar(t,a,s=!0){return await m("get_face_avatar",{uuid:t,size:a,overlay:s})}}const Ke=G()(Y(e=>({selectedSkinId:null,setSelectedSkinId:t=>e({selectedSkinId:t}),skinRevision:0,bumpSkinRevision:()=>e(t=>({skinRevision:t.skinRevision+1}))}),{name:"skin-store",partialize:e=>({selectedSkinId:e.selectedSkinId})})),z=e=>e.replace(/-/g,"").toLowerCase(),U=new Map,q=(e,t,a)=>`${z(e)}:${t}:${a}`;function Ye({uuid:e,size:t=64,overlay:a=!0}){const s=We(i=>{var l;return(l=i.activeAccount)==null?void 0:l.id}),c=Ke(i=>i.skinRevision),[r,o]=d.useState(()=>e?U.get(q(e,t,a))??null:null),n=!!e&&!!s&&z(e)===z(s);return d.useEffect(()=>{if(!e){o(null);return}const i=q(e,t,a),l=U.get(i);l&&o(l);let u=!1;return(async()=>{try{const g=await Je.getFaceAvatar(e,t,a),y=Q(g);U.set(i,y),u||o(y)}catch(g){console.error("[usePlayerAvatar] Failed to load avatar:",g),!u&&!l&&o(null)}})(),()=>{u=!0}},[e,t,a,n,n?c:0]),r}function Qe({message:e,uuid:t}){const a=Ye({uuid:t,size:32});return b.jsxs("div",{className:"flex items-center gap-3",children:[a?b.jsx("img",{src:a,alt:"",className:"w-8 h-8 rounded flex-shrink-0",style:{imageRendering:"pixelated"}}):b.jsx("div",{className:"w-8 h-8 rounded flex-shrink-0 bg-white/20 animate-pulse"}),b.jsx("span",{children:e})]})}const at={success:e=>{const t=f.success(e);return F(t),t},error:e=>{const t=f.error(e);return F(t),t},loading:e=>{const t=f.loading(e);return F(t),t},info:e=>{const t=f(e);return F(t),t},player:(e,t)=>{const a=f(s=>b.jsx(Qe,{message:e,uuid:t}),{duration:3e3});return F(a),a},custom:(e,t)=>{const a=f.custom(s=>b.jsxs("div",{className:"flex items-center gap-3",children:[t&&b.jsx("div",{className:"flex-shrink-0",children:t}),b.jsx("span",{children:e})]}));return F(a),a},dismiss:e=>{f.dismiss(e)}};function F(e){setTimeout(()=>{const t=document.getElementById(`toast-${e}`);t&&V.fromTo(t,{x:50,opacity:0,scale:.95},{x:0,opacity:1,scale:1,duration:.4,ease:"power2.out"})},10)}function rt(){const e=R(c=>c.accentColor);R(c=>c.borderRadius);const t=R(c=>c.isBackgroundAnimationEnabled),a=d.useRef(null),s=ee({accentColor:e.value});return d.useEffect(()=>{if(!t)return;document.querySelectorAll('[id^="toast-"]').forEach(r=>{V.to(r,{backgroundColor:`${e.value}30`,borderColor:`${e.value}80`,borderBottomColor:e.value,duration:.2,ease:"power2.out"})})},[e,t]),b.jsx("div",{ref:a,children:b.jsx(Ve,{position:"bottom-right",toastOptions:{className:`${te}`,style:s,success:{style:{...s,...D("success",e.value)},iconTheme:{primary:"#059669",secondary:"#d1fae5"}},error:{style:{...s,...D("error",e.value)},iconTheme:{primary:"#dc2626",secondary:"#fee2e2"}},loading:{style:{...s,...D("default",e.value)},iconTheme:{primary:e.value,secondary:"#ffffff"},duration:1/0},duration:3e3}})})}export{rt as G,h as M,Ye as a,Ke as b,f as c,Je as d,H as p,at as t,We as u};
