import{u as y,m as L,k as U,l as q,r as c,B as h,C as v,n as R,Y as _,j as e,J as A,L as F,Z as G}from"./index-OK8-cvro.js";import{L as P,a as O,G as T}from"./index-mtqM0PcY.js";function J(){let a=y(s=>s.productDetails),{Success:x,loading:Y,error:o}=y(s=>s.products),n=L(),d=U(),b=q(),[r,j]=c.useState({name:"",description:"",price:0,stock:1,category:""}),[N,S]=c.useState([]),[m,p]=c.useState([]),[w,C]=c.useState(!1),[u,D]=c.useState(!1);const k=s=>{const t=Array.from(s.target.files);let i;t.length>7?(alert("You can select only 8 images"),i=t.slice(0,8)):i=t,S(i);const f=i.map(g=>URL.createObjectURL(g));p(f)};c.useEffect(()=>{a.error&&(h.error(a.error.toString()),n({type:v})),n(R(d.id))},[d.id]),c.useEffect(()=>{o&&(h.error(o.toString()),n({type:v})),x&&(h.success("Product Updated Successfully"),n({type:_}),b("/admin/products"))},[n,o,x]),c.useEffect(()=>{if(a&&a.product&&a.product.images){const{images:s}=a.product,t=s.map(i=>i.url);p(t)}if(a&&a.product){let{name:s,category:t,price:i,stock:f,description:g}=a.product;j(I=>({...I,name:s,category:t,stock:f,price:i,description:g}))}},[a,a.product]);function E(s){s.preventDefault(),D(!0),C(!0);let t=new FormData;console.log(r),t.append("name",r.name),t.append("description",r.description),t.append("price",r.price),t.append("stock",r.stock),t.append("category",r.category);for(let i=0;i<N.length;i++)t.append("images",N[i]);n(G(d.id,t))}c.useEffect(()=>{u&&p([])},[u]);function l(s){j({...r,[s.target.name]:s.target.value})}return a.loading==!1&&a.product?e.jsx("section",{className:"shipping-",children:e.jsx("div",{className:"shipping-box col-12 d-flex flex-column",children:e.jsxs("form",{encType:"multipart/form-data",className:"shippingInfo card col-md-6 col-sm-10 col-12 pt-4 pb-5 px-3 align-self-center mt-4",onSubmit:E,children:[e.jsx("h3",{className:"text-center",children:"Add Product"}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Product Name"})," ",e.jsx(A,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"text",required:!0,name:"name",placeholder:"e.g samsung",onChange:s=>l(s),value:r.name,className:"form-control "})]}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Category"})," ",e.jsx(P,{})]}),e.jsx("input",{type:"text",name:"category",required:!0,placeholder:"e.g mobiles",onChange:s=>l(s),value:r.category,className:"form-control "})]}),e.jsxs("section",{className:"mt-3 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Price"})," ",e.jsx(O,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"number",required:!0,name:"price",placeholder:"123-456-7890",onChange:s=>l(s),value:r.price,className:"form-control"})]}),e.jsxs("section",{className:"mt-3 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Stock"})," ",e.jsx(T,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"number",required:!0,name:"stock",placeholder:"stock",onChange:s=>l(s),value:r.stock,className:"form-control"})]}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Description"})," ",e.jsx(P,{})]}),e.jsx("input",{type:"text",required:!0,name:"description",placeholder:"This is ... ",onChange:s=>l(s),value:r.description,className:"form-control "})]}),e.jsx("div",{className:"mt-4 mb-2",children:"Select Images for product (max : 8 )"}),e.jsx("input",{type:"file",className:"",onChange:k,multiple:!0}),e.jsx("section",{className:"d-flex mt-4 overflow-auto",children:m&&m.length>=0&&m.map((s,t)=>e.jsx("img",{src:s,loading:"lazy",alt:"preview",style:{width:100,height:100}},t))}),e.jsx("section",{className:"d-flex justify-content-center",children:u&&e.jsx("div",{className:"spinner"})}),e.jsx("div",{className:"mt-3 d-flex justify-content-center",children:e.jsx("button",{type:"submit",disabled:w,className:"button-19 py-2 w-75 my-3",children:"Update Product"})})]})})}):e.jsx(F,{})}export{J as default};
