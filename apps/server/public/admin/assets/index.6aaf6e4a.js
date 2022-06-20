var k=Object.defineProperty,L=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var S=(e,t,s)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,o=(e,t)=>{for(var s in t||(t={}))q.call(t,s)&&S(e,s,t[s]);if(w)for(var s of w(t))F.call(t,s)&&S(e,s,t[s]);return e},x=(e,t)=>L(e,R(t));import{a as G,ad as H,j as _,ae as J,af as K,ag as Q,w as T}from"./index.eff4e99b.js";import{A as U,r as D,j as m,u as n,w as d,bz as A,bA as X,a4 as Y,bB as Z,ah as ee}from"./vendor.cb65b9e0.js";function te(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!X(e)}const ne={useCollapse:{type:Boolean,default:!0},title:{type:String,default:""},size:{type:String,validator:e=>["small","default","middle",void 0].includes(e),default:"small"},bordered:{type:Boolean,default:!0},column:{type:[Number,Object],default:()=>({xxl:4,xl:3,lg:3,md:3,sm:2,xs:1})},collapseOptions:{type:Object,default:null},schema:{type:Array,default:()=>[]},data:{type:Object}};var se=U({name:"Description",props:ne,emits:["register"],setup(e,{slots:t,emit:s}){const p=D(null),{prefixCls:C}=G("description"),l=H(),c=m(()=>o(o({},e),n(p))),g=m(()=>x(o({},n(c)),{title:void 0})),E=m(()=>!!n(c).title),I=m(()=>o({canExpand:!1},n(g).collapseOptions)),M=m(()=>o(o({},n(l)),n(g)));function B(r){p.value=o(o({},n(p)),r)}function N({label:r,labelMinWidth:i,labelStyle:a}){if(!a&&!i)return r;const u=x(o({},a),{minWidth:`${i}px `});return d("div",{style:u},[r])}function W(){const{schema:r,data:i}=n(g);return n(r).map(a=>{const{render:u,field:j,span:z,show:h,contentMinWidth:v}=a;if(h&&_(h)&&!h(i))return null;const P=()=>{var O;const f=(O=n(g))==null?void 0:O.data;if(!f)return null;const y=Z(f,j);return _(u)?u(y,f):y!=null?y:""},V=v;return d(A.Item,{label:N(a),key:j,span:z},{default:()=>{if(!v)return P();const f={minWidth:`${V}px`};return d("div",{style:f},[P()])}})}).filter(a=>!!a)}const b=()=>{let r;return d(A,Y({class:`${C}`},n(M)),te(r=W())?r:{default:()=>[r]})},$=()=>{const r=e.useCollapse?b():d("div",null,[b()]);if(!e.useCollapse)return r;const{canExpand:i,helpMessage:a}=n(I),{title:u}=n(c);return d(K,{title:u,canExpan:i,helpMessage:a},{default:()=>r,action:()=>J(t,"action")})};return s("register",{setDescProps:B}),()=>n(E)?$():b()}});function ce(e){if(!ee())throw new Error("useDescription() can only be used inside setup() or functional components!");const t=D(null),s=D(!1);function p(l){n(s)&&Q()||(t.value=l,e&&l.setDescProps(e),s.value=!0)}return[p,{setDescProps:l=>{var c;(c=n(t))==null||c.setDescProps(l)}}]}const ie=T(se);export{ie as D,ce as u};
