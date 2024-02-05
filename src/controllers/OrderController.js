let orderModel = require("../models/orderModel");
const productModal = require("../models/productModel");

let newOrder = async (req, res) => {
  try {
    let {
      OrderedItem,
      shippingInfo,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    let order = await orderModel.create({
      user : req.user._id, 
      OrderedItem,
      shippingInfo,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });
    OrderedItem.map(async (item)=>{
       let foundProduct = await productModal.findById(item.product)
       foundProduct.stock = foundProduct.stock - item.quantity;
       foundProduct.save({validateBeforeSave:false})
    })
    res.json({success:true, order})
  } catch (error) {
    console.log(error)
    res.json({success:false, error})
  }
};

// get single order or who place the order

let getSingleOrder = async (req,res) => {
  try {
    let order = await orderModel.findById(req.params.id).populate("user", "name email")
    if(!order){
      return res.json({success:false, message : 'Order not find with this id'})
    }
    res.json({success:true, order})
  } catch (error) {
    res.json({success:false,meessage:error})
  }
}

// get logged in user order

let myOrders = async (req,res) => {
  try {
    let orders = await orderModel.find({user : req.user._id})
    res.json({success:true, orders})
  } catch (error) {
    res.json({success:false,message: error})
  }
}

// view all orders --Admin
let allOrders = async (req,res) => {
  try {
    let orders = await orderModel.find()
    let totalAmount = 0;
    orders.forEach((item)=>{
      totalAmount = item.totalPrice + totalAmount;
    })

    res.json({success:true, totalAmount, orders})
  } catch (error) {
    res.json({success:false,message: error})
  }
}
// update orders --Admin ,in case of deliver or cancel order
let updateOrder = async (req,res) => {
  try {
    // console.log('abc')
    let order = await orderModel.findById(req.params.id)

    if(order.orderStatus == 'Delivered'){
      return res.status(400).json({success:false, message : 'Order has been already delivered'})
    }

    order.OrderedItem.forEach(async (item)=>{
      await updateStock(item.product , order.quantity) // if order is deleverd or cancel then update stock
    })
    console.log(req.body.status)
    if(req.body.status != undefined){
      order.orderStatus = req.body.status;
    }
    
    order.deliveredAt = Date.now();
    if(req.body.status == 'delivered'){
      order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave : false})
    res.json({success:true, order})
  } catch (error) {
    res.json({success:false, error})
  }
}

async function updateStock(product_id, quantity){
  let product =await productModal.findById(product_id)
  product.stock = product.stock - quantity;
  await product.save({validateBeforeSave : false}) 
}

// cancel order 
let cancelOrder = async (req,res) => {
  try {
    let order = await orderModel.findByIdAndDelete(req.params.id)
    if(!order){
      return res.status(400).json({success:false, message : 'Order not exist'})
    }
    res.json({success:true, order})
  } catch (error) {
    console.log(error)
    res.json({success:false,message: error})
  }
}

module.exports = { newOrder,getSingleOrder,myOrders,allOrders,updateOrder, cancelOrder };
