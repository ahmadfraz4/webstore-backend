import{G as n,k as o,m as c,u as s,r as u,z as h,j as t,L as m,x as f}from"./index-OK8-cvro.js";import{D as x}from"./DataGrid-pi9RjSZJ.js";import"./TextField-yTSx48pM.js";function p(r){return n({tag:"svg",attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M3 1v12h12v-12h-12zM14 12h-10v-10h10v10zM2 14v-10.5l-1-1v12.5h12.5l-1-1h-10.5z"},child:[]},{tag:"path",attr:{d:"M5.5 4l2.5 2.5-3 3 1.5 1.5 3-3 2.5 2.5v-6.5z"},child:[]}]})(r)}function N(){o();let r=c();s(e=>e.User);let{orders:a,loading:d,error:v}=s(e=>e.myOrders);u.useEffect(()=>{r(h())},[r]);const l=[{field:"id",headerName:"order_id",minWidth:250,flex:1},{field:"status",headerName:"Status",minWidth:250,flex:.3,editable:!0,renderCell:e=>t.jsx("div",{style:{color:e.value==="Processing"?"red":"green"},children:e.value})},{field:"Qty",headerName:"Quantity",editable:!0,minWidth:100,flex:.3},{field:"amount",headerName:"Amount",type:"number",minWidth:140,flex:.3,editable:!0},{field:"action",headerName:"Action",minWidth:140,sortable:!1,flex:.3,editable:!0,renderCell:e=>t.jsx(f,{className:"new-window",to:`/order/${e.id}`,children:t.jsx(p,{})}),cellClassName:"d-flex justify-content-center"}],i=[];return a&&a.forEach(e=>{i.push({id:e._id,status:e.orderStatus,Qty:e.OrderedItem.length,amount:e.totalPrice})}),d?t.jsx(m,{}):t.jsx("div",{className:"px-3",children:t.jsx(x,{rows:i,columns:l,initialState:{pagination:{paginationModel:{pageSize:5}}},pageSizeOptions:[5],checkboxSelection:!0,disableRowSelectionOnClick:!0})})}export{N as default};
