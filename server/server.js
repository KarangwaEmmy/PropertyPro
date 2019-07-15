import express from "express";
import router from './routes/routes';
const app = express();
const PORT = process.env.PORT || 4000

 app.use(express.json())
 app.use(express.urlencoded({extended: false}))

app.use('/api/v1/', router);
router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Welcome to PropertyPro-Lite API!' });
  });

app.listen(PORT, () => console.log(`PropertyPro is listening on port ${PORT}!`))

export default app;