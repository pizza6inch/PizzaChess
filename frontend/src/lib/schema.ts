const { z } = require('zod')
import exp from 'constants'
import crypto from 'crypto'

export const SigninSchema = z.object({
  userName: z.string().min(1, 'name is required').max(15, 'max length is 15'),
  password: z.string().min(6, 'password must be at least 6 characters'),
  displayName: z.string().min(1, 'displayName is required').max(15, 'max length is 15'),
})

export const LoginSchema = z.object({
  userName: z.string().min(1, 'name is required').max(15, 'max length is 15'),
  password: z.string().min(6, 'password must be at least 6 characters'),
})

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'password must be at least 6 characters'),
  newPassword: z.string().min(6, 'password must be at least 6 characters'),
})

export const createPasswordHash = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex')

  const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  return { salt, passwordHash }
}

export const verifyPassword = (password: string, passwordHash: string, salt: string) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  return passwordHash === hash
}
