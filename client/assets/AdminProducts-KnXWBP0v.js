import{m as f,u as p,r as x,B as i,C as h,y as l,j as t,L as g,x as N,Q as j,f as S,s as k}from"./index-OK8-cvro.js";import{R as C}from"./index-zm6RgzF9.js";import{r as b}from"./cartAction-sVoLzFzA.js";import{D as y}from"./DataGrid-pi9RjSZJ.js";import"./TextField-yTSx48pM.js";function W(){let r=f(),{adminProducts:a,loading:o,error:s}=p(e=>e.products);x.useEffect(()=>{s&&(i.error(s.toString(),{autoClose:1200}),r({type:h})),r(l())},[r,s]);const n=[{field:"id",headerName:"Product_id",minWidth:250,flex:1},{field:"name",headerName:"Name",minWidth:250,flex:.3},{field:"stock",headerName:"Stock",editable:!0,minWidth:100,flex:.3},{field:"price",headerName:"Price",type:"number",minWidth:140,flex:.3,editable:!0},{field:"action",headerName:"Action",minWidth:140,sortable:!1,flex:.3,editable:!0,renderCell:e=>t.jsxs("div",{className:"d-flex",children:[t.jsx(N,{className:"me-4",to:`/edit/product/${e.id}`,children:t.jsx(j,{className:"product-edit-option m-0 fs-5"})}),t.jsx("div",{className:"ms-1",onClick:()=>m(e.id),children:t.jsx(C,{className:"product-delete-option fs-5"})})]}),cellClassName:"d-flex justify-content-center"}],d=[];a&&a.forEach(e=>{d.push({id:e._id,name:e.name,stock:e.stock,price:e.price})});async function m(e){if(window.confirm("sure")){let u=i.loading("deleting product..");try{await S.delete(`${k}/products/delete/${e}`),i.dismiss(u),i.success("Deleted Successfully"),r(b(e)),r(l())}catch(c){i.dismiss(o),i.error(c.toString()),console.log(c)}}}return o?t.jsx(g,{}):t.jsx("div",{className:"px-3",children:t.jsx(y,{rows:d,columns:n,initialState:{pagination:{paginationModel:{pageSize:5}}},pageSizeOptions:[5],checkboxSelection:!0,disableRowSelectionOnClick:!0})})}export{W as default};
