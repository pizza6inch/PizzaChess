// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || '' // 從環境變數讀取 MongoDB URI
const options = {}

let client: MongoClient
let clientPromise: Promise<any>

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // 為了在開發環境下避免熱重載導致多次連接
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  // 在生產環境中使用單一連接
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
