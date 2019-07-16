import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Helper = {

  generateToken(id) {
    const token = jwt.sign({
      owner: id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '24h',
    });
    return token;
  },
};

export default Helper;