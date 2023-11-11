export default {
  TOKEN: {
    SECRET_KEY: process.env.TOKEN_SECRET_KEY ?? ''
  },
  PORT: process.env.PORT ?? 3000
}