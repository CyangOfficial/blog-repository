var m=Object.defineProperty;var u=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var f=(r,t,e)=>t in r?m(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,l=(r,t)=>{for(var e in t||(t={}))_.call(t,e)&&f(r,e,t[e]);if(u)for(var e of u(t))p.call(t,e)&&f(r,e,t[e]);return r};var c=(r,t,e)=>new Promise((i,s)=>{var d=a=>{try{o(e.next(a))}catch(n){s(n)}},b=a=>{try{o(e.throw(a))}catch(n){s(n)}},o=a=>a.done?i(a.value):Promise.resolve(a.value).then(d,b);o((e=e.apply(r,t)).next())});import{F as y}from"./index.87f2c6de.js";import{$ as S,u as j}from"./vendor.67815207.js";function T(r,t){function e(){S(()=>c(this,null,function*(){if(!r)return;(yield y(()=>import("./sortable.esm.6bfbf233.js"),[])).default.create(j(r),l({animation:500,delay:400,delayOnTouchOnly:!0},t))}))}return{initSortable:e}}export{T as u};