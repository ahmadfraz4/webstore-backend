import{dj as y,dl as L,di as U,dk as q,r as c,dm as h,dn as v,dp as R,dL as O,j as e,dM as _,dN as P,dO as A,dP as F,dq as T,dQ as B}from"./index-2BrJwuvr.js";function Q(){let a=y(s=>s.productDetails),{Success:x,loading:G,error:o}=y(s=>s.products),n=L(),d=U(),b=q(),[r,j]=c.useState({name:"",description:"",price:0,stock:1,category:""}),[N,S]=c.useState([]),[p,m]=c.useState([]),[w,C]=c.useState(!1),[u,D]=c.useState(!1);const k=s=>{const t=Array.from(s.target.files);let i;t.length>7?(alert("You can select only 8 images"),i=t.slice(0,8)):i=t,S(i);const f=i.map(g=>URL.createObjectURL(g));m(f)};c.useEffect(()=>{a.error&&(h.error(a.error.toString()),n({type:v})),n(R(d.id))},[d.id]),c.useEffect(()=>{o&&(h.error(o.toString()),n({type:v})),x&&(h.success("Product Updated Successfully"),n({type:O}),b("/admin/products"))},[n,o,x]),c.useEffect(()=>{if(a&&a.product&&a.product.images){const{images:s}=a.product,t=s.map(i=>i.url);m(t)}if(a&&a.product){let{name:s,category:t,price:i,stock:f,description:g}=a.product;j(I=>({...I,name:s,category:t,stock:f,price:i,description:g}))}},[a,a.product]);function E(s){s.preventDefault(),D(!0),C(!0);let t=new FormData;console.log(r),t.append("name",r.name),t.append("description",r.description),t.append("price",r.price),t.append("stock",r.stock),t.append("category",r.category);for(let i=0;i<N.length;i++)t.append("images",N[i]);n(B(d.id,t))}c.useEffect(()=>{u&&m([])},[u]);function l(s){j({...r,[s.target.name]:s.target.value})}return a.loading==!1&&a.product?e.jsx("section",{className:"shipping-",children:e.jsx("div",{className:"shipping-box col-12 d-flex flex-column",children:e.jsxs("form",{encType:"multipart/form-data",className:"shippingInfo card col-md-6 col-sm-10 col-12 pt-4 pb-5 px-3 align-self-center mt-4",onSubmit:E,children:[e.jsx("h3",{className:"text-center",children:"Add Product"}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Product Name"})," ",e.jsx(_,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"text",required:!0,name:"name",placeholder:"e.g samsung",onChange:s=>l(s),value:r.name,className:"form-control "})]}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Category"})," ",e.jsx(P,{})]}),e.jsx("input",{type:"text",name:"category",required:!0,placeholder:"e.g mobiles",onChange:s=>l(s),value:r.category,className:"form-control "})]}),e.jsxs("section",{className:"mt-3 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Price"})," ",e.jsx(A,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"number",required:!0,name:"price",placeholder:"123-456-7890",onChange:s=>l(s),value:r.price,className:"form-control"})]}),e.jsxs("section",{className:"mt-3 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Stock"})," ",e.jsx(F,{className:"shipping-form-icon"})]}),e.jsx("input",{type:"number",required:!0,name:"stock",placeholder:"stock",onChange:s=>l(s),value:r.stock,className:"form-control"})]}),e.jsxs("section",{className:"mt-2 shipping-form",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("span",{children:"Description"})," ",e.jsx(P,{})]}),e.jsx("input",{type:"text",required:!0,name:"description",placeholder:"This is ... ",onChange:s=>l(s),value:r.description,className:"form-control "})]}),e.jsx("div",{className:"mt-4 mb-2",children:"Select Images for product (max : 8 )"}),e.jsx("input",{type:"file",className:"",onChange:k,multiple:!0}),e.jsx("section",{className:"d-flex mt-4 overflow-auto",children:p&&p.length>=0&&p.map((s,t)=>e.jsx("img",{src:s,alt:"preview",style:{width:100,height:100}},t))}),e.jsx("section",{className:"d-flex justify-content-center",children:u&&e.jsx("div",{className:"spinner"})}),e.jsx("div",{className:"mt-3 d-flex justify-content-center",children:e.jsx("button",{type:"submit",disabled:w,className:"button-19 py-2 w-75 my-3",children:"Update Product"})})]})})}):e.jsx(T,{})}export{Q as default};