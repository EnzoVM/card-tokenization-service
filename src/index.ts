import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './utils/config'
import tokenizationRouter from './routes/tokenization.routes'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.set('PORT', config.PORT)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Card Tokenization Service is ON'
  }).end()
})

app.use('/api/v1/token', tokenizationRouter)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})

