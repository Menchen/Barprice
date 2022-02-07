import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import itemRoutes from "./routes/index"
import http from 'http'
import https from 'https'
import fs from 'fs'
const privateKey = fs.readFileSync('./localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };


const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use("/api", itemRoutes)

const dbUri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

mongoose.connect(dbUri, dbOptions).then(() => {
  // httpServer.listen(PORT, () =>
  //   console.log(`HTTP Server running on port: ${PORT}!`)
  // )
  httpsServer.listen(PORT, () =>
    console.log(`HTTPS Server running on port: ${PORT}!`)
  )
}
).catch(error => {
  throw error
})
