import { Router } from 'express'
import { register, login, getProfile } from '../controllers/authController'
import { authenticateToken } from '../middleware/authMiddleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authenticateToken, getProfile)

export default router
