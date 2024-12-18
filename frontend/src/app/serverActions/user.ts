// app/actions/saveUser.ts
'use server'

import clientPromise from '@/lib/mongodb'
import jsonwebtoken from 'jsonwebtoken'
import { SigninSchema, LoginSchema, updatePasswordSchema, createPasswordHash, verifyPassword } from '@/lib/schema'

const dbName = 'pizzaChess'
const collectionName = 'test'
const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function signup(data: { userName: string; password: string; displayName: string }) {
  try {
    const client = await clientPromise
    const db = client.db('pizzaChess') // 替換為你的資料庫名稱
    const collection = db.collection('test')

    // zod schema validation
    let parsedData = SigninSchema.parse(data)

    const user = await collection.findOne({ userName: parsedData.userName })

    if (user) {
      return {
        success: false,
        error: 'User already exists, please change userName',
      }
    }

    // create password hash
    const { passwordHash, salt } = createPasswordHash(parsedData.password)

    const result = await collection.insertOne({
      userName: parsedData.userName,
      password: passwordHash,
      displayName: parsedData.displayName,
      rating: 1200,
      createdAt: new Date(),
      salt,
    })

    const token = tokenEncode(parsedData.userName)

    return { success: true, token }
  } catch (error) {
    console.error('Error signup:', error)
    return { success: false, error: 'Failed to signup' }
  }
}

export async function login(data: { userName: string; password: string }) {
  try {
    const client = await clientPromise
    const db = client.db('pizzaChess') // 替換為你的資料庫名稱
    const collection = db.collection('test')

    // zod schema validation
    const parsedData = LoginSchema.parse(data)

    const user = await collection.findOne({ userName: parsedData.userName })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    if (!verifyPassword(parsedData.password, user.password, user.salt)) {
      return { success: false, error: 'Password is incorrect' }
    }

    const token = tokenEncode(parsedData.userName)

    return { success: true, token }
  } catch (error) {
    console.error('Error logging in:', error)
    return { success: false, error: 'Failed to log in' }
  }
}

export async function updatePassword(data: { oldPassword: string; newPassword: string }, token: string) {
  try {
    const client = await clientPromise
    const db = client.db('pizzaChess') // 替換為你的資料庫名稱
    const collection = db.collection('test')

    // zod schema validation
    const parsedData = updatePasswordSchema.parse(data)

    const decodeData = tokenDecode(token)

    if (typeof decodeData === 'string') {
      return { success: false, error: 'system error' }
    }

    const user = await collection.findOne({ userName: decodeData.data })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    if (!verifyPassword(parsedData.oldPassword, user.password, user.salt)) {
      return { success: false, error: 'Password is incorrect' }
    }

    const { passwordHash, salt } = createPasswordHash(parsedData.newPassword)

    console.log('newPasswordHash', passwordHash)
    console.log('old', user.password)

    await collection.updateOne({ userName: decodeData.data }, { $set: { password: passwordHash, salt } })

    return { success: true }
  } catch (error) {
    console.error('Error updating password:', error)
    return { success: false, error: 'Failed to update password' }
  }
}

export async function getInfo(token: string) {
  try {
    const client = await clientPromise
    const db = client.db('pizzaChess') // 替換為你的資料庫名稱
    const collection = db.collection('test')

    const decodeData = tokenDecode(token)

    if (typeof decodeData === 'string') {
      return { success: false, error: 'system error' }
    }

    const user = await collection.findOne({ userName: decodeData.data })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Error getting user info:', error)
    return { success: false, error: 'Failed to get user info' }
  }
}

const tokenEncode = (userName: string) => {
  if (!TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined')
  }

  return jsonwebtoken.sign({ data: userName }, TOKEN_SECRET, {
    expiresIn: '24h',
  })
}

const tokenDecode = (token: string) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined')
  }

  return jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
}
