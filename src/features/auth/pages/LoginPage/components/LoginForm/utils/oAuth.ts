import { authClient } from '@/features/auth/utils/authClient'

export const signInGoogle = () =>
  authClient.signIn.social({
    provider: 'google',
    callbackURL: '/sign-in'
  })
