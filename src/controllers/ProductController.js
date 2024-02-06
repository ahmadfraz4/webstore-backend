const productModal = require("../models/productModel");
const ErrorHandler = require("../utills/errorHandler");
const catchAsyncErrors = require("../middleware/AsyncErrorHandler");
const ApiFeatures = require("../utills/ApiFeatures");
const { cloudinary, destroyCloudinaryImage } = require("../utills/cloudinary");

const getProducts = catchAsyncErrors(async (req, res, next) => {
  let resultPrePage = 6;
  let productCount = await productModal.countDocuments(); // predefined function
  // // passing all products and query in apiFeature class
  // // instead of trycatch we will wrap functin into given catchAsyncErrors , & if there's error, it will reject promise
  // let products = new ApiFeatures(productModal.find(), req.query)
  //   .search()
  //   .filter()
  //   .pagination(resultPrePage); // calling search() funtion in ApiFeature
  // let allProducts = await products.query; // qurey =  productModal.find()// return all products if no query because pros have all products, and query is productModal.find()
  // console.log(allProducts.length)
  const apiFeatures = new ApiFeatures(productModal.find(), req.query)
        .search()
        .filter();

    // Get the count of all products after filtration but before pagination
    let filteredProductCount = await apiFeatures.query.clone().countDocuments();

    // Apply pagination
    let paginatedProducts = apiFeatures.pagination(resultPrePage);
    let allProducts = await paginatedProducts.query; // This should now have the filtered and paginated products

  res.json({  productCount, resultPrePage, allProducts, filteredProductCount });
});

// detail of product

let getProductDetails = async (req, res, next) => {
  try {
    let product = await productModal.findById(req.params.id);
    if (!product) {
      // return res.json({success : false, message : 'not found'})
      return next(new ErrorHandler("product not found", 404)); // i can use this because i have app.use(errMdlware) in server.js file
      // If there is an error that you want to pass to the error-handling middleware, you typically use next(err) to trigger the error-handling middleware. In the error-handling middleware, the order is (err, req, res, next).
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json(error);
  }
};

// create product -- Admin

let createProduct = async (req, res, next) => {
  // console.log('hit')
  try {
    req.body.user = req.user.id;
    let {name, price, description, category, stock} = req.body;
    let productImagesPath = req.files && req.files.images;
    // console.log(productImagesPath)
    let options = {
      user:req.user.id ,name , price , description, category, stock, images:[]
    }
    // console.log(req.files.images)
    if (productImagesPath && productImagesPath.length > 0) {
      const uploadPromises = productImagesPath.map(async (item) => {
        let productImage = await cloudinary(item.buffer, 'Webstore/products');
        return {
          public_id: productImage.public_id,
          url: productImage.url
        };
      });
    
      options.images = await Promise.all(uploadPromises);
    }
    // console.log(options.images)
    let product = await productModal.create(options);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error)
    res.json({ error });
  }
};


// Get all products

let getAllProductsAdmin = async (req,res) =>{
  try {
    let allProducts = await productModal.find();
    res.json({
      success:true, 
      products : allProducts
    })
  } catch (error) {
    res.json({
      success:false,message:error
    })
  }
}

// update product --Admin

let updateProduct = async (req, res, next) => {
  try {
    let {name, price, description, category, stock} = req.body;
    let product_id = req.params.id;

    let getProduct = await productModal.findById({ _id: product_id });

    if (!getProduct) {
      return next(new ErrorHandler("product not found", 404));
    }
    // console.log(req.files)
    let newBody = {
      name, description, stock, price, images:[], category
    }
   console.log(req.body.images)
    let images = req.files && req.files.images;

    if (images && images.length > 0) {
      const uploadPromises = images.map(async (item) => {
        let productImage = await cloudinary(item.buffer, 'Webstore/products');
        return {
          public_id: productImage.public_id,
          url: productImage.url
        };
      });
    
      newBody.images = await Promise.all(uploadPromises);
    }

    getProduct.images.map(async (img) =>{
      await destroyCloudinaryImage(img.public_id)
    })
   
    getProduct = await productModal.findByIdAndUpdate(product_id, newBody, {
      new: true,
    });
    
   
    res.json({ success: true, newProduct : getProduct });
  } catch (error) {
    res.json({ error });
  }
};
// update product --Admin

let deleteProduct = async (req, res, next) => {
  try {
    let product_id = req.params.id;
    let delProduct = await productModal.findById({ _id: product_id });
    if (!product_id) {
      // return res.json({error : 'product not found'})
      return next(new ErrorHandler("product not found", 404)); // passing params to class ErrorHandler
    }
    for(let i = 0; i < delProduct.images.length; i++){
      await destroyCloudinaryImage(delProduct.images[i].public_id)
    }
    await productModal.findByIdAndDelete(delProduct._id)

    res.json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    res.json({ error });
  }
};
// crearte review
let createProductReviews = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  let reviews = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };
  let product = await productModal.findById(productId);

  let isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  ); // find is not for mongoose , it is used as array method like map or filter

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id.toString() == req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(reviews);
    product.numOfReviews = product.reviews.length; // number of reviews that a product has = lenght of product.reviews array
  }
  // calculating average
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  let avg =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  product.ratings = avg.toFixed(2);
  
  let createdProduct =  await product.save({ validateBeforeSave: false });
  res.json({ success: true, review : reviews });
});
// get reviews
let getProductReviews = async (req, res) => {
  try {
    let product = await productModal.findById(req.query.id);
    if (!product) {
      return res.json({ success: false, message: "product not exist" });
    }
    res.json({
      success: true,
      message: product.reviews,
    });
  } catch (error) {
    res.send(error);
  }
};
// delete reviews
let deleteProductReview = async (req, res) => {
  try {
    let product = await productModal.findById(req.query.productId);
    if (!product) {
      return res.json({ success: false, message: "product not exist" });
    }

    let review = product.reviews.find((item, index) => {
      if (item._id.toString() == req.query.reviewId.toString()) {
        if (item.user.toString() == req.user._id.toString()) {
          return product.reviews.filter((rev) => rev._id.toString() == req.query.reviewId.toString())
        }
      }
    });

    if(review == undefined || !review){
        return res.json({success : false, message : 'Unauthorized'})
    }
    let remainingReview = product.reviews.filter((rev)=>rev._id !== review._id)

    product.reviews = remainingReview
    let avg = 0;
    remainingReview.forEach((item)=>{
        avg = avg + item.rating;
    })
    let totalRating = avg / remainingReview.length;
    product.ratings = totalRating.toFixed(2);
    product.numOfReviews = remainingReview.length;
    product.save({validateBeforeSave : false})
   
    res.json({
      success: true,
      message: product.reviews,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  getAllProductsAdmin,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReviews,
  getProductReviews,
  deleteProductReview,
};
