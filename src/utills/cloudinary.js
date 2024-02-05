require("dotenv").config();
let { v2 } = require("cloudinary");
let fs = require('fs');

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

let cloudinary = async (filePath, folder) =>{
    try {
        if (!filePath) return null;
        let response = await v2.uploader.upload(filePath , {
            resource_type: 'auto',folder : folder
        });
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(filePath)
        return null
    }
}
let destroyCloudinaryImage = async (image_id)=>{
    try {
        await v2.uploader.destroy(image_id);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {cloudinary, destroyCloudinaryImage}