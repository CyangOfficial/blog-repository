import{A as l,a8 as d,cc as m,a as _,j as f,a0 as e,B as g,a1 as E,a5 as a,w as c}from"./vendor.67815207.js";/* empty css                */import{_ as C,I as L,aB as h,b as B,P as I}from"./index.87f2c6de.js";const T=l({name:"ErrorAction",components:{Icon:L,Tooltip:d,Badge:m},setup(){const{t:o}=B(),{push:n}=_(),t=h(),r=f(()=>t.getErrorLogListCount);function s(){n(I.ERROR_LOG_PAGE).then(()=>{t.setErrorLogListCount(0)})}return{t:o,getCount:r,handleToErrorList:s}}});function j(o,n,t,r,s,k){const i=e("Icon"),u=e("Badge"),p=e("Tooltip");return g(),E(p,{title:o.t("layout.header.tooltipErrorLog"),placement:"bottom",mouseEnterDelay:.5,onClick:o.handleToErrorList},{default:a(()=>[c(u,{count:o.getCount,offset:[0,10],overflowCount:99},{default:a(()=>[c(i,{icon:"ion:bug-outline"})]),_:1},8,["count"])]),_:1},8,["title","mouseEnterDelay","onClick"])}var $=C(T,[["render",j]]);export{$ as default};
