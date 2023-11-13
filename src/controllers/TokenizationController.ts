import { Request, Response } from 'express'
import CreditCardTokenizationUseCase from "../core/application/usecases/CreditCardTokenizationUseCase"
import GetCreditCardDataUseCase from '../core/application/usecases/GetCreditCardDataUseCase'
import RedisRepository from "../core/infrastructure/RedisRepository"
import JsonWebTokenRepository from "../core/infrastructure/JsonWebTokenRepository"

const jsonWebTokenRepository = new JsonWebTokenRepository()
const redisRepository = new RedisRepository()

const creditCardTokenizationUseCase = new CreditCardTokenizationUseCase(
  jsonWebTokenRepository,
  redisRepository
)

const getCreditCardDataUseCase = new GetCreditCardDataUseCase(
  jsonWebTokenRepository,
  redisRepository
)

export const tokenization = async (req: Request, res: Response) => {
  const { email, cardNumber, cvv, expirationYear, expirationMonth } = req.body
  
  try { 
    const tokenCreated = await creditCardTokenizationUseCase.invoke({
      email,
      cardNumber: Number(cardNumber),
      cvv: Number(cvv),
      expirationYear,
      expirationMonth
    })
    
    res.status(201).json({
      status: 'Ok',
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

export const getCreditCardData = async (req: Request, res: Response) => {
  const { token } = req.params
  
  try { 
    const creditCardInformation = await getCreditCardDataUseCase.invoke({ token })
    
    res.status(200).json({
      status: 'Ok',
      message: 'Credit card details successfully retrieved',
      data: creditCardInformation
    })

  } catch (error: any)  {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}