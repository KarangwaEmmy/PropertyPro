const express = require('express');
var cloudinary = require('cloudinary').v2;
const app = express();

const PORT = process.env.PORT || 4000

// var fileupload = require('express-fileupload');
// app.use(fileupload({
//     useTempFiles: true

// }));


cloudinary.config({ 
    cloud_name: 'kemmy', 
    api_key: '221117875621292', 
    api_secret: 'vOVxBeEYkwbaZrYvr-CDHBOxSDA' 
  });

 
app.get('/', (req, res) => res.send('Hello World! THIS IS THE MESSAGE'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

app.post("/upload", function(req, res, next){
    const file = req.files.photo;

     console.log(file);
})