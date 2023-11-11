import { Router } from 'express'
import { tokenization } from '../controllers/TokenizationController'
import { validateBusinessIdentifier } from '../middleware/ValidateBusinessIdentifier'

const tokenizationRouter = Router()

tokenizationRouter
  .post('/', validateBusinessIdentifier, tokenization)

export default tokenizationRouter