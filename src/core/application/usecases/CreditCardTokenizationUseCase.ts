import validator from 'validator'
import JwtGeneratorRepository from '../../domain/repositories/JwtGeneratorRepository'
import TokenizationPersistanceRepository from '../../domain/repositories/TokenizationPersistanceRepository'
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
      !this.validateCreditCard({ cardNumber: cardNumber.toString() }) ||
      !this.validateCvv({ cvv: cvv.toString() }) ||
      !this.validateExpirationMonth({ expirationMonth }) ||
      !this.validateExpirationYear({ expirationYear }) ||
      !this.validateEmail({ email })
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

  /**
   * Valida un número de tarjeta de crédito según criterios específicos.
   * - Longitud: Debe tener entre 13 y 16 caracteres.
   * - No debe estar vacío.
   * - Debe pasar el algoritmo de Luhn para garantizar validez.
   * 
   * @param {number} cardNumber - El número de tarjeta de crédito a validar.
   * @returns {boolean} - Devuelve true si el número de tarjeta es válido, de lo contrario, false.
  */
  validateCreditCard({ cardNumber }:{ cardNumber: string }): boolean {
    let sum: number = 0
    let isEvenPosition: boolean = false

    const digits: number[] = cardNumber.split('').map(Number)
    const isValidLengthAndEmpty: boolean = this.validateString({ value: cardNumber, minLength: LENGTH_CONSTRAINTS.CARD_NUMBER.MIN, maxLength: LENGTH_CONSTRAINTS.CARD_NUMBER.MAX })

    if(isValidLengthAndEmpty){
      for(let i = digits.length-1; i >= 0; i--){
        let digit: number = digits[i]
        
        if(isEvenPosition){
          digit *= LUHN_ALGORITHM_CONSTANTS.DUPLICATION_FACTOR
          
          if(digit > LUHN_ALGORITHM_CONSTANTS.ADJUSTMENT_VALUE){
            digit -= LUHN_ALGORITHM_CONSTANTS.ADJUSTMENT_VALUE
          }
        }
        
        sum += digit
        isEvenPosition = !isEvenPosition
      }
      
      return sum % LUHN_ALGORITHM_CONSTANTS.MODULO_DIVISOR === LUHN_ALGORITHM_CONSTANTS.MODULO_RESULT_ZERO
    }

    return false
  }

  /**
   * Valida el código CVV de una tarjeta según criterios específicos.
   * - Longitud: Debe tener entre 3 y 4 caracteres.
   * - No debe estar vacío.
   * 
   * @param {number} cvv - El código CVV de la tarjeta a validar.
   * @returns {boolean} - Devuelve true si el código CVV es válido, de lo contrario, false.
  */
  validateCvv({ cvv }:{ cvv: string }): boolean {
    return this.validateString({ value: cvv, minLength: LENGTH_CONSTRAINTS.CVV.MIN, maxLength: LENGTH_CONSTRAINTS.CVV.MAX })
  }

  /**
   * Valida el mes de vencimiento de una tarjeta según criterios específicos.
   * - Longitud: Debe tener entre 1 y 2 caracteres.
   * - Rango: Debe estar entre el primer mes y doceavo mes.
   * - No debe estar vacío.
   * 
   * @param {string} expirationMonth - El mes de vencimiento de la tarjeta a validar.
   * @returns {boolean} - Devuelve true si el mes de vencimiento es válido, de lo contrario, false.
  */
  validateExpirationMonth({ expirationMonth }:{ expirationMonth: string }): boolean {
    const month: number = Number(expirationMonth)
    
    const isValidMonth: boolean = month >= MONTH_RANGE_START && month <= MONTH_RANGE_END
    const isValidLengthAndEmpty: boolean = this.validateString({ value: expirationMonth, minLength: LENGTH_CONSTRAINTS.EXPIRATION_MONTH.MIN, maxLength: LENGTH_CONSTRAINTS.EXPIRATION_MONTH.MAX })

    return isValidLengthAndEmpty && isValidMonth
  }

  /**
   * Valida el año de vencimiento de una tarjeta según criterios específicos.
   * - Longitud: Debe tener 4 caracteres.
   * - Rango: Debe ser el año actual o hasta 5 años en el futuro.
   * - No debe estar vacío.
   * 
   * @param {string} expirationYear - El año de vencimiento de la tarjeta a validar.
   * @returns {boolean} - Devuelve true si el año de vencimiento es válido, de lo contrario, false.
  */
  validateExpirationYear({ expirationYear }:{ expirationYear: string }): boolean {
    const year: number = Number(expirationYear)
    const currentYear: number = new Date().getFullYear()
    
    const isValidYear: boolean = year >= currentYear && year <= currentYear + MAX_VALIDITY_YEARS
    const isValidLengthAndEmpty: boolean = this.validateString({ value: expirationYear, minLength: LENGTH_CONSTRAINTS.EXPIRATION_YEAR.MIN, maxLength: LENGTH_CONSTRAINTS.EXPIRATION_YEAR.MAX })

    return isValidLengthAndEmpty && isValidYear
  }

  /**
   * Valida un correo electrónico según criterios específicos.
   * - Longitud: Debe tener entre 5 y 100 caracteres.
   * - Formato: Debe cumplir con el formato de correo electrónico y pertenecer a ciertos dominios permitidos (gmail.com, hotmail.com, yahoo.es).
   * - No debe estar vacío.
   * 
   * @param {string} email - La dirección de correo electrónico a validar.
   * @returns {boolean} - Devuelve true si el correo electrónico es válido, de lo contrario, false.
  */
  validateEmail({ email }:{ email: string }): boolean {
    const isValidEmail: boolean = validator.isEmail(email, { host_whitelist: ALLOWED_DOMAINS })
    const isValidLengthAndEmpty: boolean = this.validateString({ value: email, minLength: LENGTH_CONSTRAINTS.EMAIL.MIN, maxLength: LENGTH_CONSTRAINTS.EMAIL.MAX })

    return isValidLengthAndEmpty && isValidEmail
  }

  /**
   * Valida una cadena de texto según criterios específicos.
   * - Longitud: Debe tener entre minLength y maxLength caracteres.
   * - No debe estar vacía, considerando espacios en blanco.
   * 
   * @param {Object} options - Opciones para la validación de la cadena.
   * @param {string} options.value - La cadena de texto a validar.
   * @param {number} options.minLength - Longitud mínima permitida.
   * @param {number} options.maxLength - Longitud máxima permitida.
   * @returns {boolean} - Devuelve true si la cadena de texto es válida, de lo contrario, false.
  */
  validateString({ value, minLength, maxLength }:{ value: string, minLength: number, maxLength: number }): boolean {
    const isValidLength: boolean = validator.isLength(value, { min: minLength, max: maxLength })
    const isEmptyValue: boolean = validator.isEmpty(value, { ignore_whitespace: true })

    return isValidLength && !isEmptyValue
  }
}