import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import ErrorMessages from '../utils/ErrorMessages'
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from '../utils/constants'

export const validateBusinessIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  
  const tokenFound: string | undefined = req.header(AUTHORIZATION_HEADER)?.replace(BEARER_PREFIX, '');
  
  if(!tokenFound) {
    return res.status(401).json({
        message: ErrorMessages.UNAUTHORIZED_ACCESS
    })
  }
  
  try {
    const decodedToken: string = jwt.verify(tokenFound, config.TOKEN.SECRET_KEY) as string

    req.body.businessIdentifier = decodedToken

    next()

  } catch (error) {
    return res.status(401).json({
      message: ErrorMessages.INVALID_TOKEN
    })
  }
}