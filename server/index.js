require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learn.8odum.mongodb.net/mern-learn?retryWrites=true&w=majority`, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    })
    // .then(() => {
    //   console.log("succes")
    // }).catch(err => {
    //   console.log("err", err)
    // })

    console.log("MongoDB connected")
  } catch (error) {
    console.log("xxx",error.massage)
    process.exit(1)
  }
}

connectDB()

const app = express()

// app.get('/', (req, res) => res.send('Hello world'))
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

// const PORT =  8080
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
