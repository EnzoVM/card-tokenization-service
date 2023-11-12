import { DEFAULT_VALUE } from "./constants"

export default {
  TOKEN: {
    SECRET_KEY: process.env.TOKEN_SECRET_KEY ?? DEFAULT_VALUE.STRING
  },
  PORT: Number(process.env.NODE_LOCAL_PORT) ?? DEFAULT_VALUE.NUMBER,
  REDIS: {
    HOST: process.env.REDIS_HOST ?? DEFAULT_VALUE.STRING,
    PORT: Number(process.env.REDIS_DOCKER_PORT) ?? DEFAULT_VALUE.NUMBER
  }
}