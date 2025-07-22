import { Router } from 'express'
import authRoutes from './authRoutes'
import transactionRoutes from './transactionRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/transactions', transactionRoutes)

export default routes
