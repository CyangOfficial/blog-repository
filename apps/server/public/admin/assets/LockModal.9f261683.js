var f=(e,d,o)=>new Promise((m,r)=>{var p=s=>{try{a(o.next(s))}catch(n){r(n)}},t=s=>{try{a(o.throw(s))}catch(n){r(n)}},a=s=>s.done?m(s.value):Promise.resolve(s.value).then(p,t);a((o=o.apply(e,d)).next())});import{_ as w,a as C,f as x,b as y}from"./index.87f2c6de.js";import{B as F,a as $}from"./index.01eba134.js";import{B as S,u as b}from"./useForm.c04cc559.js";import{u as L}from"./lock.3fb7002a.js";import{h as M}from"./header.d801b988.js";import{A as I,j as _,a0 as u,B as N,a1 as R,a5 as g,H as l,K as c,J as j,w as k,ad as P,a4 as U}from"./vendor.67815207.js";import"./useWindowSizeFn.e1e81155.js";/* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css                *//* empty css                */import"./index.877aa7e1.js";import"./download.7d0575e0.js";import"./index.9377c3f0.js";const V=I({name:"LockModal",components:{BasicModal:F,BasicForm:S},setup(){const{t:e}=y(),{prefixCls:d}=C("header-lock-modal"),o=x(),m=L(),r=_(()=>{var i;return(i=o.getUserInfo)==null?void 0:i.realName}),[p,{closeModal:t}]=$(),[a,{validateFields:s,resetFields:n}]=b({showActionButtonGroup:!1,schemas:[{field:"password",label:e("layout.header.lockScreenPassword"),component:"InputPassword",required:!0}]});function h(){return f(this,null,function*(){const B=(yield s()).password;t(),m.setLockInfo({isLock:!0,pwd:B}),yield n()})}const v=_(()=>{const{avatar:i}=o.getUserInfo;return i||M});return{t:e,prefixCls:d,getRealName:r,register:p,registerForm:a,handleLock:h,avatar:v}}}),z=["src"];function A(e,d,o,m,r,p){const t=u("BasicForm"),a=u("a-button"),s=u("BasicModal");return N(),R(s,U({footer:null,title:e.t("layout.header.lockScreen")},e.$attrs,{class:e.prefixCls,onRegister:e.register}),{default:g(()=>[l("div",{class:c(`${e.prefixCls}__entry`)},[l("div",{class:c(`${e.prefixCls}__header`)},[l("img",{src:e.avatar,class:c(`${e.prefixCls}__header-img`)},null,10,z),l("p",{class:c(`${e.prefixCls}__header-name`)},j(e.getRealName),3)],2),k(t,{onRegister:e.registerForm},null,8,["onRegister"]),l("div",{class:c(`${e.prefixCls}__footer`)},[k(a,{type:"primary",block:"",class:"mt-2",onClick:e.handleLock},{default:g(()=>[P(j(e.t("layout.header.lockScreenBtn")),1)]),_:1},8,["onClick"])],2)],2)]),_:1},16,["title","class","onRegister"])}var te=w(V,[["render",A]]);export{te as default};
