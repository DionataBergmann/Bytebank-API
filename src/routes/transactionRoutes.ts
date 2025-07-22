import { Router } from 'express'
import prisma from '../../prisma/client'
import { authenticateToken } from '../middleware/authMiddleware'
import { upload } from '../middleware/uploadMiddleware'

const router = Router()

router.use(authenticateToken)

router.get('/', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { type, value, date, category, file } = req.body
    const transaction = await prisma.transaction.create({
      data: { type, value, date, category, file }
    })
    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const updated = await prisma.transaction.update({
      where: { id },
      data: req.body
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.transaction.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' })
  }
})

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filename = req.file?.filename
    if (!filename) return res.status(400).json({ error: 'Arquivo não enviado' })

    return res.status(200).json({ file: filename })
  } catch (error) {
    return res.status(500).json({ error: 'Erro no upload' })
  }
})

export default router
