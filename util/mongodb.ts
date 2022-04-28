import * as mongoDB from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB


let cachedClient: mongoDB.MongoClient | null = null
let cachedDb: mongoDB.Db | null = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
    if(cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri ?? '')
    await client.connect()

    const db: mongoDB.Db = client.db(dbName)

    cachedClient = client
    cachedDb = db

    return { client, db }
}
