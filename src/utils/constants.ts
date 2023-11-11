// usecases/CreditCardTokenizationUseCase
export const LUHN_ALGORITHM_CONSTANTS = {
  DUPLICATION_FACTOR: 2,
  ADJUSTMENT_VALUE: 9,
  MODULO_DIVISOR : 10,
  MODULO_RESULT_ZERO: 0
}

export const LENGTH_CONSTRAINTS = {
  CARD_NUMBER: {
    MIN: 13,
    MAX: 16,
  },
  CVV: {
    MIN: 3,
    MAX: 4,
  },
  EXPIRATION_MONTH: {
    MIN: 1,
    MAX: 2,
  },
  EXPIRATION_YEAR: {
    MIN: 4,
    MAX: 4,
  },
  EMAIL: {
    MIN: 5,
    MAX: 100,
  }
}

export const MONTH_RANGE_START: number = 1
export const MONTH_RANGE_END: number = 12
export const MAX_VALIDITY_YEARS: number = 5
export const ALLOWED_DOMAINS: string[] = ['gmail.com', 'hotmail.com', 'yahoo.es']

// infrastructure/JsonWebTokenRepository
export const TOKEN_EXPIRATION_TIME: string = '1m'

// infrastructure/RedisRepository
export const REDIS_EXPIRATION_TIME_SECONDS: number = 60

// Middleware/ValidateBusinessIdentifier
export const AUTHORIZATION_HEADER = 'Authorization'
export const BEARER_PREFIX = 'Bearer '
export const ALLOWED_MERCHANT_NAMES: string[] = ['Comercio de Prueba']
