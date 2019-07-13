import responses from '../helpers/responses';
import users from '../models/User';
import jwt from 'jsonwebtoken';

const decode = {

   async verifyToken(req, res, next) {


       try {
           const tokens = req.headers['authorization']
           const token = tokens.split(' ')[1]
           const decoded = jwt.verify(token, 'rugumbira')
           const {email}=req.body;
           const user  = users.filter(user => user.email === email);
           req.user = user
           if (!user) {
               responses.response(res,400,'invalid token please sign up',true)
           }
           next()




       }
       catch (error) {
        responses.response(res,400,'Please provide a valid token',true)
       }


   }
}

export default decode;