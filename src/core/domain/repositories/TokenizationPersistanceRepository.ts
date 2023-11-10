import TokenInfo from "../entities/TokenInfo"

export default interface TokenizationPersistanceRepository {
  saveToken: ({ token, businessIdentifier }: TokenInfo) => Promise<void>
}