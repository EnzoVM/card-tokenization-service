import TokenizationPersistanceRepository from "../domain/repositories/TokenizationPersistenceRepository";
import errorMessages from "../../utils/errorMessages"
import { v4 as uuid } from 'uuid'
import { REDIS_EXPIRATION_TIME_SECONDS } from "../../utils/constants"
import { connection } from "../../database/redisConnection";

const client = connection()

export default class RedisRepository implements TokenizationPersistanceRepository{
  
  async saveToken ({ token }:{ token: string }): Promise<string> {
    try {
      await client.connect()
    
      const key: string = uuid()
      await client.set(key, token, {
        EX: REDIS_EXPIRATION_TIME_SECONDS,
      })
      
      return key
      
    } catch (error: any) {
      throw new Error(errorMessages.REDIS_SERVICE_ERROR + error.message)

    } finally {
      await client.disconnect()
    }
  }

  async getCreditCardData ({ token }: { token: string; }): Promise<string | null> {
    try {
      await client.connect()

      const tokenFound = await client.get(token)

      if(!tokenFound){
        return null
      }

      return tokenFound
    
    } catch (error: any) {
      throw new Error(errorMessages.REDIS_SERVICE_ERROR + error.message)

    } finally {
      await client.disconnect()
    }
  }
}