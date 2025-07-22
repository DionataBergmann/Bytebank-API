import multer, { StorageEngine } from 'multer'
import path from 'path'
import fs from 'fs'
import type { Request } from 'express'

const uploadDir = path.join(__dirname, '../../../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req: Request, file: Express.Multer.File, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
})

export const upload = multer({ storage })
