import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 

  if (!token) return res.status(401).json({ error: 'Token não fornecido' })

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' })

    // @ts-ignore
    req.user = decoded 
    next()
  })
}
