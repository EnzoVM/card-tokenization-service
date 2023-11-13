import GetCreditCardDataUseCase from '../../src/core/application/usecases/GetCreditCardDataUseCase'
import errorMessages from '../../src/utils/errorMessages'
import { 
  jsonWebTokenRepositoryMock,
  redisRepositoryMock,
  creditCardDataMock,
  creditCardDataNullMock,
  creditCardInformationMock,
  dataFormattedMock,
  tokenEmptyMock,
  tokenMock
} from '../mocks/GetCreditCardData.mock'

const getCreditCardDataUseCase = new GetCreditCardDataUseCase(
  jsonWebTokenRepositoryMock,
  redisRepositoryMock
)

describe('OPERATION SUCCESS', () => {
  test('GetCreditCardDataUseCase class should exist', () => {
    expect(GetCreditCardDataUseCase).toBeDefined()
    expect(GetCreditCardDataUseCase).toBeInstanceOf(Function)
  })

  test('Invoke function should exist', () => {
    expect(getCreditCardDataUseCase).toBeInstanceOf(GetCreditCardDataUseCase)
    expect(getCreditCardDataUseCase.invoke).toBeDefined();
    expect(getCreditCardDataUseCase.invoke).toBeInstanceOf(Function)
  })
  
  test('Should return a credit card information', async () => {
    redisRepositoryMock.getCreditCardData.mockResolvedValue(creditCardDataMock)
    jsonWebTokenRepositoryMock.verifyToken.mockReturnValue(creditCardInformationMock)
    
    const response = await getCreditCardDataUseCase.invoke({ token: tokenMock })

    expect(response).toStrictEqual(dataFormattedMock)
  })
})

describe('PROCESS ERROR', () => {
  test('Should throw an error when the token is not found in Redis', async () => {
    redisRepositoryMock.getCreditCardData.mockResolvedValue(creditCardDataNullMock)

    await expect(getCreditCardDataUseCase.invoke({ token: tokenMock })).rejects.toThrow(errorMessages.EXPIRED_CREDIT_CARD)
    await expect(getCreditCardDataUseCase.invoke({ token: tokenMock })).rejects.toBeInstanceOf(Error)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should throw an error when the request parameters do not contain a valid token', async () => {
    await expect(getCreditCardDataUseCase.invoke({ token: tokenEmptyMock })).rejects.toThrow(errorMessages.INVALID_PARAMETER)
    await expect(getCreditCardDataUseCase.invoke({ token: tokenEmptyMock })).rejects.toBeInstanceOf(Error)
  })
})