import { createClient } from "redis";
import config from "../utils/config";

export const connection = () => {
  const client = createClient({
    socket: {
      host: config.REDIS.HOST,
      port: config.REDIS.PORT
    }
  })
  
  client.on('error', err => console.log('Redis Client Error', err))
  
  return client
}