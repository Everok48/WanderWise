import express, { Express } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const app: Express = express()

app.use(express.json())
app.use(cors())

app.get('/ping', (req, res) => {
  res.send('pong')
})

const createContext = () => ({})
const middleware = createExpressMiddleware({
  router: trpcRouter,
  createContext,
})

app.use('/trpc', middleware as unknown as express.RequestHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`)
})
