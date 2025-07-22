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

  res.json({ token })
}
