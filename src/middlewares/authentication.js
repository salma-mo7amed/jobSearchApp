// import modules:
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';



// create auth and token:
export const auth = async (req, res, next) => {
  const {token} = req.headers
  jwt.verify(token, 'secret_key', async(err,decoded)=>{
  if (err){
    return next(new AppError('invalid token', 401))
  }
  next()
  })
}


