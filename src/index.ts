import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import routes from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(routes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
