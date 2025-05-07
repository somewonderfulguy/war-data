import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '../utils/authServer'

export const { POST, GET } = toNextJsHandler(auth)
