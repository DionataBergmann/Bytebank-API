import { Request, Response } from 'express'
import prisma from '../../prisma/client'

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany()
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar transações' })
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.create({
      data: req.body,
    })
    res.json(transaction)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar transação' })
  }
}
