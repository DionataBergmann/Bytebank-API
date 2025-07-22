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

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const transaction = await prisma.transaction.update({
      where: { id },
      data: req.body
    })
    res.json(transaction)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar transação' })
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.transaction.delete({ where: { id } })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar transação' })
  }
}
