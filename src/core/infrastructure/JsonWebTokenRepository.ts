import JwtGeneratorRepository from "../domain/repositories/JwtGeneratorRepository";
import jwt from 'jsonwebtoken'
import config from '../../utils/config'
import { TOKEN_EXPIRATION_TIME } from '../../utils/constants'
import errorMessages from "../../utils/ErrorMessages"
import CreditCardTokenData from "../domain/entities/CreditCardTokenData";

export default class JsonWebTokenRepository implements JwtGeneratorRepository {
  
  createToken({ 
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
      throw new Error(errorMessages.ERROR_CREATING_TOKEN + error.message)
    }
  }

}