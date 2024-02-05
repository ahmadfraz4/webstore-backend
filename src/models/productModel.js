let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    //  we use array of object when we want to apply any operation like get, post etc on spcific field , and it also got id, 
    name : {
        type : String, required : [true, `Please enter the product name`], trim : true
    },
    description : {
        type : String, required : [true, `Please enter the product description`]
    },
    price : {
        type : Number , required : [true, 'Please enter product price']
    },
    ratings : {
        type : Number , default : 0
    },
    images : [ // array of object
        {
            public_id:{
                type : String, required : true
            },url :  {
                type : String, required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,'please enter product category']
    },
    stock : {
        type : Number, required:[true, 'please enter product stock'], default : 1
    },numOfReviews : {
        type: Number, default : 0
    },
    reviews : [
        {
            user : {type : mongoose.Schema.Types.ObjectId},
            name : {type: String, required : true},
            rating : {type: Number, required : true},
            comment : {type : String, required : true}
        },
    ],
    user : {type : mongoose.Schema.ObjectId, ref:'user',required : true }, // to know who created product
    createdAt : {
        type : Date,  default : Date.now()
    }
})

let productModal = mongoose.model('product',productSchema)
module.exports = productModal