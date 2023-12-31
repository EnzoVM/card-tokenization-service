import CreditCardTokenizationUseCase from "../../src/core/application/usecases/CreditCardTokenizationUseCase"
import errorMessages from "../../src/utils/errorMessages"
import { 
  jsonWebTokenRepositoryMock,
  redisRepositoryMock,
  mockErrorParameter,
  mockParameter,
  tokenMock,
  keyMock,
  mockEmptyParameter
} from "../mocks/CreditCardTokenization.mock"

const creditCardTokenizationUseCase = new CreditCardTokenizationUseCase(
  jsonWebTokenRepositoryMock,
  redisRepositoryMock
)

describe('OPERATION SUCCESS', () => {
  test('CreditCardTokenizationUseCase class should exist', () => {
    expect(CreditCardTokenizationUseCase).toBeDefined()
    expect(CreditCardTokenizationUseCase).toBeInstanceOf(Function)
  })

  test('Invoke function should exist', () => {
    expect(creditCardTokenizationUseCase).toBeInstanceOf(CreditCardTokenizationUseCase)
    expect(creditCardTokenizationUseCase.invoke).toBeDefined();
    expect(creditCardTokenizationUseCase.invoke).toBeInstanceOf(Function)
  })
  
  test('Should return a token', async () => {
    for(const parameter of mockParameter){
      jsonWebTokenRepositoryMock.createToken.mockReturnValue(tokenMock)
      redisRepositoryMock.saveToken.mockResolvedValue(keyMock)
      
      const response = await creditCardTokenizationUseCase.invoke(parameter)

      expect(response).toStrictEqual(keyMock)
    }
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should throw an error when the request body contains an attribute that does not meet the constraints.', async () => {
    for(const parameter of mockErrorParameter){
      await expect(creditCardTokenizationUseCase.invoke(parameter)).rejects.toThrow(errorMessages.INVALID_CREDIT_CARD)
      await expect(creditCardTokenizationUseCase.invoke(parameter)).rejects.toBeInstanceOf(Error)
    }
  })
  
  test('Should throw an error when the request body contains an empty attribute, which is expected to be required.', async () => {
    for(const parameter of mockEmptyParameter){
      //@ts-ignore
      await expect(creditCardTokenizationUseCase.invoke(parameter)).rejects.toThrow(errorMessages.INVALID_CREDIT_CARD)
      //@ts-ignore
      await expect(creditCardTokenizationUseCase.invoke(parameter)).rejects.toBeInstanceOf(Error)
    }
  })
})
