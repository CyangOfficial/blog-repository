import{A as r,r as l,S as d,B as n,a1 as m,a5 as u,H as f,X as c,u as h,bE as x}from"./vendor.cb65b9e0.js";/* empty css               *//* empty css               *//* empty css               */import{u as p}from"./useECharts.b5442aff.js";import"./index.eff4e99b.js";const E=r({props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"400px"}},setup(e){const t=e,a=l(null),{setOptions:s}=p(a);return d(()=>t.loading,()=>{t.loading||s({legend:{bottom:0,data:["Visits","Sales"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"2017",max:100},{text:"2017",max:100},{text:"2018",max:100},{text:"2019",max:100},{text:"2020",max:100},{text:"2021",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"Visits",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"Sales",itemStyle:{color:"#67e0e3"}}]}]})},{immediate:!0}),(g,b)=>(n(),m(h(x),{title:"\u9500\u552E\u7EDF\u8BA1",loading:e.loading},{default:u(()=>[f("div",{ref:(i,o)=>{o.chartRef=i,a.value=i},style:c({width:e.width,height:e.height})},null,4)]),_:1},8,["loading"]))}});export{E as default};
