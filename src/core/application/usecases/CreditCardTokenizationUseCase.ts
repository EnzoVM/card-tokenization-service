import validator from 'validator'
import JwtGeneratorRepository from '../../domain/repositories/JwtGeneratorRepository'
import TokenizationPersistanceRepository from '../../domain/repositories/TokenizationPersistenceRepository'
import CreditCardDataDTO from '../dto/CreditCardDataDTO'
import ErrorMessages from '../../../utils/ErrorMessages'
import {
  ALLOWED_DOMAINS,
  LUHN_ALGORITHM_CONSTANTS,
  LENGTH_CONSTRAINTS,
  MAX_VALIDITY_YEARS,
  MONTH_RANGE_END,
  MONTH_RANGE_START
} from '../../../utils/constants'

export default class CreditCardTokenizationUseCase {
  
  constructor(
    private readonly jwtGeneratorRepository: JwtGeneratorRepository,
    private readonly tokenizationPersistanceRepository: TokenizationPersistanceRepository
  ) {}
  
  async invoke({
    businessIdentifier,
    email,
    cardNumber,
    cvv,
    expirationYear,
    expirationMonth
  }: CreditCardDataDTO): Promise<string> {
  
    if(
      !this.isValidCreditCard({ cardNumber }) ||
      !this.isValidCvv({ cvv }) ||
      !this.isValidExpirationMonth({ expirationMonth }) ||
      !this.isValidExpirationYear({ expirationYear }) ||
      !this.isValidEmail({ email, emailValidator: validator.isEmail })
    ){
      throw new Error(ErrorMessages.INVALID_CREDIT_CARD)
    }
    
    const token: string = this.jwtGeneratorRepository.createToken({
      email,
      cardNumber,
      cvv,
      expirationYear,
      expirationMonth
    })
    
    await this.tokenizationPersistanceRepository.saveToken({ token, businessIdentifier })
    
    return token
  }
  
  private isValidCreditCard({ cardNumber }:{ cardNumber: number }): boolean {
    const isValidLengthAndNotEmpty: boolean = this.isValidString({ 
      value: cardNumber,
      minLength: LENGTH_CONSTRAINTS.CARD_NUMBER.MIN, 
      maxLength: LENGTH_CONSTRAINTS.CARD_NUMBER.MAX 
    })

    if(isValidLengthAndNotEmpty){
      const digits: number[] = Array.from(cardNumber.toString()).reverse().map(Number)
      const sum: number = digits.reduce((acc, digit, index) => {
        let num: number = digit

        if(index % 2 !== 0){
          num *= LUHN_ALGORITHM_CONSTANTS.DUPLICATION_FACTOR

          if(num > LUHN_ALGORITHM_CONSTANTS.ADJUSTMENT_VALUE){
            num -= LUHN_ALGORITHM_CONSTANTS.ADJUSTMENT_VALUE
          }
        }

        return acc + num
      }, 0)
      
      return sum % LUHN_ALGORITHM_CONSTANTS.MODULO_DIVISOR === LUHN_ALGORITHM_CONSTANTS.MODULO_RESULT_ZERO      
    }

    return isValidLengthAndNotEmpty
  }

  private isValidCvv({ cvv }:{ cvv: number }): boolean {
    return this.isValidString({ 
      value: cvv,
      minLength: LENGTH_CONSTRAINTS.CVV.MIN, 
      maxLength: LENGTH_CONSTRAINTS.CVV.MAX 
    })
  }

  private isValidExpirationMonth({ expirationMonth }:{ expirationMonth: string }): boolean {
    const isValidLengthAndNotEmpty: boolean = this.isValidString({ 
      value: expirationMonth, 
      minLength: LENGTH_CONSTRAINTS.EXPIRATION_MONTH.MIN, 
      maxLength: LENGTH_CONSTRAINTS.EXPIRATION_MONTH.MAX 
    })

    if(isValidLengthAndNotEmpty){
      const month: number = Number(expirationMonth)
      const isValidMonth: boolean = month >= MONTH_RANGE_START && month <= MONTH_RANGE_END

      return isValidMonth
    }
    
    return isValidLengthAndNotEmpty
  }

  private isValidExpirationYear({ expirationYear }:{ expirationYear: string }): boolean {
    const isValidLengthAndNotEmpty: boolean = this.isValidString({ 
      value: expirationYear, 
      minLength: LENGTH_CONSTRAINTS.EXPIRATION_YEAR.MIN, 
      maxLength: LENGTH_CONSTRAINTS.EXPIRATION_YEAR.MAX 
    })

    if(isValidLengthAndNotEmpty){
      const year: number = Number(expirationYear)
      const currentYear: number = new Date().getFullYear()
      const isValidYear: boolean = year >= currentYear && year <= currentYear + MAX_VALIDITY_YEARS

      return isValidYear
    }
    
    return isValidLengthAndNotEmpty
  }

  private isValidEmail({ email, emailValidator }:{ email: string, emailValidator: (value: string, options?: any) => boolean }): boolean {
    const isValidLengthAndNotEmpty: boolean = this.isValidString({ 
      value: email, 
      minLength: LENGTH_CONSTRAINTS.EMAIL.MIN, 
      maxLength: LENGTH_CONSTRAINTS.EMAIL.MAX 
    })

    if(isValidLengthAndNotEmpty) {
      const isValidEmail: boolean = emailValidator(email, { 
        host_whitelist: ALLOWED_DOMAINS 
      })

      return isValidEmail
    }
    
    return isValidLengthAndNotEmpty
  }
  
  private isValidString({ value, minLength, maxLength }:{ value: string | number, minLength: number, maxLength: number }): boolean {
    if(!value){
      return false
    }

    const isValidLength: boolean = validator.isLength(value.toString(), { min: minLength, max: maxLength })
    return isValidLength
  }
}