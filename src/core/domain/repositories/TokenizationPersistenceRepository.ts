import TokenInfo from "../entities/TokenInfo"

export default interface TokenizationPersistenceRepository {
  saveToken: ({ 
    token, 
    businessIdentifier 
  }: TokenInfo) => Promise<void>
}