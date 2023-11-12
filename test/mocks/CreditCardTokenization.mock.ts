export const jsonWebTokenRepositoryMock = {
  createToken: jest.fn(),
  verifyToken: jest.fn()
}

export const redisRepositoryMock = {
  saveToken: jest.fn(),
  getCreditCardData: jest.fn()
}

export const tokenMock = "eyJhbGciOiJIUzI1NiJ95ENkMNKfG9WMYQNAqdaScHUAT_u2vQgtpom9-7z1w"
export const keyMock = "2292f68e-c868-4344-8751-f6405ea"

export const mockParameter = [
  {
    email: "prueba@gmail.com",    // Correo de gmail.com
    cardNumber: 4532015112830366,
    cvv: 123,   // 3 digitos
    expirationYear: "2023",   // Año actual
    expirationMonth: "1"    // Primer mes
  },
  {
    email: "prueba@hotmail.com",    // Correo de hotmail.com
    cardNumber: 5424180123456789,
    cvv: 5678,    // 4 digitos
    expirationYear: "2028",   // Año actual + 5 años
    expirationMonth: "12"   // Ultimo mes
  },
  {
    email: "prueba@yahoo.es",   // Correo de yahoo.es
    cardNumber: 378282246310005,
    cvv: 321,   // 3 digitos
    expirationYear: "2025",   // En el rango de 5 años
    expirationMonth: "10"   // En el rango de meses
  }
]

export const mockErrorParameter = [
  {
    email: "prueba@outlook.com",    // El dominio del correo no se encuentra dentro de la WhiteList (gmail.com, hotmail.com, yahoo.es)
    cardNumber: 4532015112830366,
    cvv: 123,
    expirationYear: "2023",  
    expirationMonth: "1"
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 5424180123476989,   // Número de tarjeta de crédito que ni cumple con el algoritmo de Luhn
    cvv: 123,   
    expirationYear: "2023",   
    expirationMonth: "1"    
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 54241801234769898,   // La cantidad de digitos (17) excede el minimo de 13 y máximo de 16 caracteres
    cvv: 123,   
    expirationYear: "2023",   
    expirationMonth: "1"    
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 6011111111111117,
    cvv: 12345,   // La cantidad de digitos (5) excede el minimo de 3 y máximo de 4 caracteres
    expirationYear: "2023",   
    expirationMonth: "1"    
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 3530111333300000,
    cvv: 123,   
    expirationYear: "2029",   // El año (2029) no se encuentra en el rango entre año actual (2023) y 5 años posteriores (2028)
    expirationMonth: "1"    
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 3530111333300000,
    cvv: 123,   
    expirationYear: "20252",   // La cantidad de digitos (5) excede los 4 caracteres
    expirationMonth: "1"    
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 4532015112830366,
    cvv: 123,
    expirationYear: "2025",   
    expirationMonth: "13"   // El mes (13) no se encuentra en el rango entre 1 y 12 meses
  }
]

export const mockEmptyParameter = [
  {
    // Todos los campos faltan
  },
  {
    // email: "prueba@gmail.com",
    cardNumber: 4532015112830366,
    cvv: 123,  
    expirationYear: "2023",  
    expirationMonth: "1"   
  },
  {
    email: "prueba@gmail.com",    
    // cardNumber: 4532015112830366,
    cvv: 123,  
    expirationYear: "2023",  
    expirationMonth: "1"   
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 4532015112830366,
    // cvv: 123,  
    expirationYear: "2023",  
    expirationMonth: "1"   
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 4532015112830366,
    cvv: 123,  
    // expirationYear: "2023",  
    expirationMonth: "1"   
  },
  {
    email: "prueba@gmail.com",    
    cardNumber: 4532015112830366,
    cvv: 123,  
    expirationYear: "2023",  
    // expirationMonth: "1"   
  }
]