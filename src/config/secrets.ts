import { config } from 'dotenv'

config({ path: '.env' })

const BASEURL: string | undefined = process.env.BASE_URL

const ENVIRONMENT: string | undefined = process.env.NODE_ENV

const ISPRODUCTION = ENVIRONMENT === 'production'

const PORT: string | number = Number(process.env?.PORT || 7000)

const DATABASEURL = process.env.DATABASE_URL

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const SECRET_KEY = process.env.SECRET_KEY

export { BASEURL, ENVIRONMENT, ISPRODUCTION, DATABASEURL, PORT, JWT_SECRET, SECRET_KEY }
