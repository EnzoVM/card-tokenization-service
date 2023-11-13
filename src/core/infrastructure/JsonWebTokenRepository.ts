import JwtGeneratorRepository from "../domain/repositories/JwtGeneratorRepository";
import jwt from 'jsonwebtoken'
import config from '../../utils/config'
import { TOKEN_EXPIRATION_TIME } from '../../utils/constants'
import errorMessages from "../../utils/errorMessages"
import CreditCardTokenData from "../domain/entities/CreditCardTokenData";

export default class JsonWebTokenRepository implements JwtGeneratorRepository {

  createToken ({ 
    email, 
    cardNumber, 
    cvv, 
    expirationYear, 
    expirationMonth 
  }: CreditCardTokenData): string {
    try {
      const {
        TOKEN: { SECRET_KEY }
      } = config
      
      if(!SECRET_KEY) {
        throw new Error(errorMessages.INVALID_SECRET_KEY)
      }

      const payload = {
        email, 
        cardNumber, 
        cvv, 
        expirationYear, 
        expirationMonth 
      }
      
      const options = {
        expiresIn: TOKEN_EXPIRATION_TIME,
      }

      const token: string = jwt.sign(payload, SECRET_KEY, options)
            
      return token
    
    } catch (error: any) {
      throw new Error(errorMessages.JWT_TOOL_ERROR + error.message)
    }
  }

  verifyToken ({ token }: { token: string }): CreditCardTokenData {
    try {
      const {
        TOKEN: { SECRET_KEY }
      } = config

      if(!SECRET_KEY) {
        throw new Error(errorMessages.INVALID_SECRET_KEY)
      }

      const decodedToken = jwt.verify(token, SECRET_KEY) as CreditCardTokenData
      
      return decodedToken
      
    } catch (error: any) {
      throw new Error(errorMessages.JWT_TOOL_ERROR + error.message)
    }
  }
}