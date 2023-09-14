import 'reflect-metadata'
import { App } from './app'

declare module 'express' {
  export interface Request {
    user?: any
  }
}

const app = new App()

app.listen()
