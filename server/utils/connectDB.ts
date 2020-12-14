import mongoose from 'mongoose'
import config from 'config'

const db: string = config.get('db.uri')

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log('mongoDB connected')
  } catch (error) {
    console.log('error:', error)
    process.exit(1) // exit with failure
  }
}
