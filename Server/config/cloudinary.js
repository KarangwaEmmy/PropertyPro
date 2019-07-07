var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'kemmy', 
    api_key: '221117875621292', 
    api_secret: 'vOVxBeEYkwbaZrYvr-CDHBOxSDA' 
  });

cloudinary.uploader.upload("image.jpg", function(error, result){
    console.log(result, error);
})

