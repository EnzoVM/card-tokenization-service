import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import errorMessages from '../utils/errorMessages'
import { ALLOWED_MERCHANT_NAMES } from '../utils/constants'
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from '../utils/constants'

export const validateBusinessIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  
  const tokenFound: string | undefined = req.header(AUTHORIZATION_HEADER)?.replace(BEARER_PREFIX, '');
  
  if(!tokenFound) {
    return res.status(401).json({
        message: errorMessages.UNAUTHORIZED_ACCESS
    })
  }
  
  try {
    const decodedToken: string = jwt.verify(tokenFound, config.TOKEN.SECRET_KEY) as string
        
    if(!ALLOWED_MERCHANT_NAMES.includes(decodedToken)){
      return res.status(401).json({
        message: errorMessages.NOT_ALLOWED_STORE
    })
    }
    
    next()

  } catch (error) {
    return res.status(401).json({
      message: errorMessages.INVALID_TOKEN
    })
  }
}