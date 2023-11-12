import JwtGeneratorRepository from "../../domain/repositories/JwtGeneratorRepository";
import TokenizationPersistanceRepository from '../../domain/repositories/TokenizationPersistenceRepository'
import CreditCardDataResponseDTO from "../dto/CreditCardDataResponseDTO";
import errorMessages from "../../../utils/errorMessages";
import CreditCardDataMapper from "../mappers/CreditCardDataMapper";

export default class GetCreditCardDataUseCase {

  constructor(
    private readonly jwtGeneratorRepository: JwtGeneratorRepository,
    private readonly tokenizationPersistanceRepository: TokenizationPersistanceRepository
  ) {}

  async invoke ({ token }:{ token: string }): Promise<CreditCardDataResponseDTO> {
    if(!token){
      throw new Error(errorMessages.INVALID_PARAMETER)
    }
    
    const creditCardData = await this.tokenizationPersistanceRepository.getCreditCardData({ token })
    if(!creditCardData){
      throw new Error(errorMessages.EXPIRED_CREDIT_CARD)
    }
    
    const creditCardInformation = await this.jwtGeneratorRepository.verifyToken({ token: creditCardData })
    const dataFormatted = CreditCardDataMapper.filter({ creditCardInformation })
    
    return dataFormatted
  }
}