import { sign, verify } from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET || 'secret'
const tokenExpire = process.env.TOKEN_EXPIRE || '1h'

const refreshTokenSecret = process.env.REFRESH_SECRET || 'refresh'
const refreshTokenExpire = process.env.REFRESH_EXPIRE || '1d'

const generateToken = (id: string, refresh?: boolean) => {
  let secret = tokenSecret
  let expire = tokenExpire

  if (refresh) {
    secret = refreshTokenSecret
    expire = refreshTokenExpire
  }

  return sign({ id }, secret, {
    expiresIn: expire,
  })
}

const verifyToken = (token: string, refresh?: boolean) => {
  let secret = tokenSecret
  if (refresh) {
    secret = refreshTokenSecret
  }
  return verify(token, secret)
}

export { verifyToken, generateToken }
