import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from './utils/connectDB'
import schema from './schema'
import cookieParser from 'cookie-parser'
import config from 'config'

const clientDomain: string = config.get('client.domain')

const corsOptions = {
  origin: clientDomain,
  credentials: true
}

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  }
})
const app = express()
app.use(cookieParser())
server.applyMiddleware({ app, cors: corsOptions })
const port = 3333

connectDB()

app.get('/', (req, res) => res.send('Welcome to Order Tracker api'))

app.listen(port, () => console.log(`API listening on port ${port}`))
