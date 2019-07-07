var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET 
  });

cloudinary.uploader.upload("image.jpg", function(error, result){
    console.log(result, error);
})

