import{r as a,dw as p,dl as f,di as j,dj as P,dm as b,dx as h,dy as g,j as e,dq as N,dr as C,dz as u}from"./index-IuHDVHko.js";const k=a.lazy(()=>p(()=>import("./ProductCard-c8cJrNkc.js"),__vite__mapDeps([0,1,2,3])));function E(){let r=f(),x=j(),[s,o]=a.useState(1),{products:c,error:d,loading:m,productCounts:_,resultPrePage:n,filteredProductCount:l}=P(t=>t.products);a.useEffect(()=>{d&&(b.error(d,{autoClose:1e3}),r(h())),r(g(x.keyword,s))},[r,s,d]);function i(t){switch(t){case"-":s>1&&(o(s-1),r(u("-")));break;case"+":l>n*s&&(o(s+1),r(u("+")));break;default:o(s);break}}return m?e.jsx(N,{}):e.jsxs("div",{className:"products-section-home",children:[e.jsx(C,{title:"Products -- Webstore"}),e.jsx("div",{className:"robo-font fs-2 text-center mb-2 mt-4",children:"All Products"}),e.jsx("div",{className:"d-flex col-12 flex-wrap row-gap-10 justify-content-around",children:e.jsx(a.Suspense,{fallback:e.jsx("div",{children:"Loading Products..."}),children:c&&c.map((t,v)=>e.jsx(k,{product:t},t._id))})}),e.jsxs("div",{className:"pagination mt-4 mb-5 d-flex justify-content-end container",children:[s>1&&e.jsxs("button",{className:"button-web",onClick:()=>i("-"),children:["← ",e.jsx("span",{className:"ms-2",children:"Back"})]}),l>n*s&&e.jsxs("button",{className:"button-web ms-4",onClick:()=>i("+"),children:[e.jsx("span",{className:"me-2",children:"Next"})," →"]})]})]})}export{E as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ProductCard-c8cJrNkc.js","assets/index-IuHDVHko.js","assets/index-X6qW-BMb.css","assets/react-stars-DPIpjBWH.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}