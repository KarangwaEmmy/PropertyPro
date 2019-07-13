import express from "express";
import router from './routes/routes';
const app = express();
const PORT = process.env.PORT || 4000

 app.use(express.json())
 app.use(express.urlencoded({extended: false}))

app.use('/api/v1/', router);

app.listen(PORT, () => console.log(`PropertyPro is listening on port ${PORT}!`))

export default app;