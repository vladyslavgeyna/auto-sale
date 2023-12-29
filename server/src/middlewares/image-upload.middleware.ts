import multer from 'multer'

export const imageUploadMiddleware = multer({ storage: multer.memoryStorage() })
