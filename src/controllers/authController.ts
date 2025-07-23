import { Request, Response } from 'express'
import prisma from '../../prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) return res.status(400).json({ error: 'Email já cadastrado' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })

  res.status(201).json({ message: 'Usuário criado com sucesso', userId: user.id })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) return res.status(401).json({ error: 'Senha inválida' })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
}
export const getProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' })

    const [, token] = authHeader.split(' ')
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

    res.json(user)
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}
