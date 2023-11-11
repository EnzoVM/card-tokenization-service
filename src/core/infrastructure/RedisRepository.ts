import { createClient } from "redis";
import TokenizationPersistanceRepository from "../domain/repositories/TokenizationPersistenceRepository";
import errorMessages from "../../utils/ErrorMessages"
import TokenInfo from "../domain/entities/TokenInfo";

const client = createClient();

export default class RedisRepository implements TokenizationPersistanceRepository{
  
  async saveToken ({ token, businessIdentifier }: TokenInfo): Promise<void> {
    try {
      await client.connect()

      const data = {
        businessIdentifier,
        token
      }

      await client.set(token, JSON.stringify(data), {
        EX: 60,
      })
      
      await client.disconnect()
      
    } catch (error: any) {
      await client.disconnect()
      throw new Error(errorMessages.ERROR_SAVING_REDIS + error.message)
    }
  }

}