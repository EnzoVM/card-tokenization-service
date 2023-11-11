import { Router } from 'express'
import { tokenization, getCreditCardData } from '../controllers/TokenizationController'
import { validateBusinessIdentifier } from '../middleware/ValidateBusinessIdentifier'

const tokenizationRouter = Router()

tokenizationRouter
  .post('/', validateBusinessIdentifier, tokenization)
  .get('/:token', validateBusinessIdentifier, getCreditCardData)

export default tokenizationRouter