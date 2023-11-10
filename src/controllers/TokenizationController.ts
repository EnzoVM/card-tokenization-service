import { Request, Response } from 'express'
import CreditCardTokenizationUseCase from "../core/application/usecases/CreditCardTokenizationUseCase"
import TokenRedisRepository from "../core/infrastructure/redis/TokenRedisRepository"
import TokenizationJwtRepository from "../core/infrastructure/jwt/TokenizationJwtRepository"

const creditCardTokenizationUseCase = new CreditCardTokenizationUseCase(
  new TokenizationJwtRepository(),
  new TokenRedisRepository()
)

export const tokenization = async (req: Request, res: Response) => {
  const businessIdentifier = req.body.businessIdentifier
  const {
    email,
    cardNumber,
    cvv,
    expirationYear,
    expirationMonth
  } = req.body
  
  try { 
    const tokenCreated = await creditCardTokenizationUseCase.invoke({
      businessIdentifier,
      email,
      cardNumber: Number(cardNumber),
      cvv: Number(cvv),
      expirationYear,
      expirationMonth
    })
    
    res.status(201).json({
      status: 201,
      message: 'Token has been saved succesfully',
      data: tokenCreated
    })

  } catch (error: any)  {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}