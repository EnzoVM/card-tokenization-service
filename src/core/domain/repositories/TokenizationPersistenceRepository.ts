
export default interface TokenizationPersistenceRepository {
  saveToken: ({
    token
  }:{
    token: string
  }) => Promise<string>
  
  getCreditCardData: ({
    token
  }:{
    token: string
  }) => Promise<string | null>
}