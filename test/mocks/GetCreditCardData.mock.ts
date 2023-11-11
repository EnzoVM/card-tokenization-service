export const jsonWebTokenRepositoryMock = {
  createToken: jest.fn(),
  verifyToken: jest.fn()
}

export const redisRepositoryMock = {
  saveToken: jest.fn(),
  getCreditCardData: jest.fn()
}

export const tokenMock = "2292f68e-c868-4344-8751-f6405ea"
export const tokenEmptyMock = ""

export const creditCardDataMock = "eyJhbGciOiJIUzI1NiJ95ENkMNKfG9WMYQNAqdaScHUAT_u2vQgtpom9-7z1w"
export const creditCardDataNullMock = null

export const creditCardInformationMock = {
  email: "prueba@gmail.com", 
  cardNumber: 4532015112830366,
  cvv: 123, 
  expirationYear: "2023",   
  expirationMonth: "1"    
}

export const dataFormattedMock = {
  email: "prueba@gmail.com", 
  cardNumber: 4532015112830366,
  expirationYear: "2023",   
  expirationMonth: "1"    
}