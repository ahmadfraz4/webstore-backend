require("dotenv").config();
let { v2 } = require("cloudinary");
let fs = require('fs');
const { Readable } = require('stream');
let streamifier = require('streamifier');

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

let cloudinary = async (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = v2.uploader.upload_stream(
         {
           folder: folder,resource_type: 'auto'
         },
         (error, result) => {
           if (result) {
             resolve(result);
           } else {
            conosle.log(error)
             reject(error);
            }
          }
        );
        // Cannot read properties of undefined (reading 'uploader')
        streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
      });
};


let destroyCloudinaryImage = async (image_id)=>{
    try {
        await v2.uploader.destroy(image_id);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {cloudinary, destroyCloudinaryImage}