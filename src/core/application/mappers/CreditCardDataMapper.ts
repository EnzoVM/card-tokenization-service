import CreditCardTokenData from "../../domain/entities/CreditCardTokenData";
import CreditCardDataResponseDTO from "../dto/CreditCardDataResponseDTO";

export default class CreditCardDataMapper {

  static filter ({ 
    creditCardInformation 
  }:{ 
    creditCardInformation: CreditCardTokenData
  }): CreditCardDataResponseDTO {
    return {
      email: creditCardInformation.email,
      cardNumber: creditCardInformation.cardNumber,
      expirationYear: creditCardInformation.expirationYear,
      expirationMonth: creditCardInformation.expirationMonth 
    }
  }
}