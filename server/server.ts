import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from './utils/connectDB'
import schema from './schema'
import cookieParser from 'cookie-parser'

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
server.applyMiddleware({ app })
const port = 3333

connectDB()

app.use(express.json()) // to accept body data
app.options('/', cors()) // CORS pre-flight
app.use(cors()) // enable CORS

app.get('/', (req, res) => res.send('Welcome to Order Tracker api'))

app.listen(port, () => console.log(`API listening on port ${port}`))
