var cloudinary = require('cloudinary');

require('dotenv').config();

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET 
  });

cloudinary.uploader.upload("image.jpg", function(error, result){
    console.log(result, error);
})

