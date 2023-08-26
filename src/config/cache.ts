import * as redis from 'redis'
import type { RedisClientType } from 'redis'

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const REDIS_PORT = process.env.REDIS_PORT || 6380

const cache = redis.createClient({
  url: `redis://${REDIS_HOST}:${+REDIS_PORT}`,
  socket: {
    connectTimeout: 5000,
  },
}) as RedisClientType

cache.on('error', (err) => {
  console.log('Unable to connecto to redis:', err)
})

export default cache
