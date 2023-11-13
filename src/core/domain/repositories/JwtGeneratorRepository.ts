import CreditCardTokenData from "../entities/CreditCardTokenData"

export default interface JwtGeneratorRepository {
  createToken: ({ 
    email,
    cardNumber,
    cvv,
    expirationYear,
    expirationMonth 
  }: CreditCardTokenData) => string

  verifyToken: ({
    token
  }:{
    token: string
  }) => CreditCardTokenData
}