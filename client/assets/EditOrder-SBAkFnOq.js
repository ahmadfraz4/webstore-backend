import{m as u,k as j,l as f,u as o,r as m,B as a,a2 as N,O as v,j as e,x as g,L as b,a3 as O}from"./index-OK8-cvro.js";function S(){let i=u(),t=j();f();let{order:s,loading:p}=o(d=>d.orderDetails),r=o(d=>d.OrderTools);const[l,c]=m.useState("");m.useEffect(()=>{let d;r.loading&&a.loading("Updating Order..."),r.error&&(a.dismiss(d),a.error(r.error.toString())),r.isUpdated&&(a.dismiss(d),a.success("Order Updated"),i({type:N})),i(v(t.id)),s&&c(s.orderStatus)},[r.error,i,r.isUpdated,t.id]),s&&s.OrderedItem&&s.OrderedItem.reduce((d,n)=>d+n.quantity*n.price,0),`${s&&s.shippingInfo&&s.shippingInfo.address}${s&&s.shippingInfo&&s.shippingInfo.city}${s&&s.shippingInfo&&s.shippingInfo.state}${s&&s.shippingInfo&&s.shippingInfo.country}`;function h(d){c(d.target.value)}function x(d){d.preventDefault(),console.log(l),i(O(t.id,l))}return!p&&s&&s.OrderedItem?e.jsx("section",{className:"shipping-component",children:e.jsxs("div",{className:"shipping-box col-12 d-flex flex-md-row flex-column",children:[e.jsx("div",{className:"col-md-8 col-12 border-0 border-end border-end-2",children:e.jsxs("section",{className:"mt-4",children:[e.jsx("h3",{className:"border-bottom-1 border-bottom pb-2",children:"Shipping Info:"}),e.jsxs("div",{className:"ps-3 ",children:[e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"fw-bold me-2",children:"Name: "})," ",e.jsx("div",{children:s.user.name})]}),e.jsxs("div",{className:"d-flex mt-2",children:[e.jsx("div",{className:"fw-bold me-2",children:"Phone: "})," ",e.jsx("div",{children:s.shippingInfo.phoneNo})]}),e.jsxs("div",{className:"d-flex mt-2",children:[e.jsx("div",{className:"fw-bold me-2",children:"Address: "})," ",e.jsx("div",{children:s.shippingInfo.address})]})]}),e.jsxs("section",{className:"ps-3 mt-5",children:[e.jsx("h3",{children:"Payment"}),e.jsx("div",{className:"d-flex",children:e.jsx("div",{className:"fw-bold me-2 text-success",children:s.paymentInfo.status=="succeeded"?"Paid":"Unpaid"})}),e.jsx("div",{className:"d-flex mt-2",children:e.jsxs("div",{className:"fw-bold me-2",children:["$",s.totalPrice]})})]}),e.jsxs("section",{className:"ps-3 mt-5",children:[e.jsx("h3",{children:"Order Status"}),e.jsx("div",{className:"d-flex",children:e.jsx("div",{className:`fw-bold me-2 text-${s.orderStatus=="delivered"?"success":"red"}`,children:s.orderStatus})})]}),e.jsxs("div",{className:"mt-5",children:[e.jsx("h3",{className:"mb-4 border-bottom-1 border-bottom pb-2",children:"Your Cart Items:"}),e.jsx("div",{className:"ps-3",children:s.OrderedItem&&s.OrderedItem.length>0&&s.OrderedItem.map(d=>e.jsxs("section",{className:"col-12 d-flex align-items-center mt-2",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx(g,{to:`/product/${d.product}`,className:"text-decoration-none pro-image-cart",children:e.jsx("img",{src:"https://mhwoodfurniture.com/wp-content/uploads/2023/11/wd-furniture-hotspot-1.jpg-1-2.webp",className:"w-100",alt:d.name,loading:"lazy"})}),e.jsx("div",{className:"ms-2",children:d.name})]})}),e.jsxs("div",{className:"col-6 text-end pe-sm-3 pe-0 price-order",children:["$",d.quantity," x $",d.price," = $",d.price*d.quantity]})]},d.product))})]})]})}),e.jsx("div",{className:"col-md-4 col-12 ps-2",children:e.jsxs("div",{className:"mt-4",children:[e.jsx("h3",{className:"border-bottom-1 border-bottom pb-2",children:"Order Status"}),s&&s.orderStatus!=="delivered"&&e.jsx("form",{onSubmit:x,children:e.jsxs("section",{className:"mt-3",children:[e.jsxs("select",{value:l,onChange:h,className:"form-control",children:[e.jsx("option",{value:"Processing",children:"processing"}),e.jsx("option",{value:"delivered",children:"delivered"})]}),e.jsx("div",{className:"d-flex justify-content-center mt-4",children:e.jsx("button",{className:"button-19 py-2 w-75",children:"Update Order"})})]})}),s&&s.orderStatus=="delivered"&&e.jsx("p",{children:"Order Delivered"})]})})]})}):e.jsx(b,{})}export{S as default};
