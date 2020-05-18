import { ContextParameters } from 'graphql-yoga/dist/types'
import { verifyToken } from './jwt'

export interface decodedToken {
  iat: number
  exp: number
  id: string
}

const getAuthId = (req: ContextParameters): string => {
  const header = req.request.headers.authorization
  if (!header) throw new Error("You aren't authorized")

  const token = header.replace('Bearer ', '')

  const decoded: decodedToken = verifyToken(token) as decodedToken

  return decoded.id
}

export { getAuthId }
