import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { env } from '@/env'

import * as schema from '../db/authDbSchema'
import { MagicLinkMail } from '../components/MagicLinkMail'

const stringColumn = {
  type: 'string',
  required: false,
  defaultValue: ''
} as const

const resend = new Resend(env.RESEND_API_KEY)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false
      },
      lastName: stringColumn,
      nickname: stringColumn
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // if no name available, then name is email before @
          const name = user.name || user.email.split('@')[0]!
          const nameSplit = name.split(' ')
          const isTwoParts = nameSplit.length === 2
          const firstName = isTwoParts ? nameSplit[0] : null
          const lastName = isTwoParts ? nameSplit[1] : null

          return {
            data: {
              ...user,
              name: firstName ?? user.name,
              ...(lastName && { lastName })
            }
          }
        }
      }
    }
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [
    magicLink({
      expiresIn: 60 * 60 * 24,
      sendMagicLink: async ({ email, url: originalUrl }) => {
        const [foundUser] = await db.select().from(schema.user).where(eq(schema.user.email, email))

        const url = new URL(originalUrl)

        const callbackUrlString = url.searchParams.get('callbackURL') ?? '/'
        const isUa = callbackUrlString.startsWith('/ua')
        const isPl = callbackUrlString.startsWith('/pl')
        const isJa = callbackUrlString.startsWith('/ja')

        let resolverLang: 'en' | 'ua' | 'pl' | 'ja' = 'en'
        if (isUa) {
          resolverLang = 'ua'
        } else if (isPl) {
          resolverLang = 'pl'
        } else if (isJa) {
          resolverLang = 'ja'
        }

        const name = foundUser?.name
        const lastName = foundUser?.lastName
        const resolvedName = name || lastName ? `${name} ${lastName}` : email

        const { error } = await resend.emails.send({
          from: 'War Data <team@war-data.com>',
          to: [email],
          subject: 'Log in to War Data',
          react: MagicLinkMail({
            name: resolvedName,
            url: originalUrl,
            lang: resolverLang
          })
        })

        if (error) {
          console.error('Error sending email:', error)
          throw new Error('Error sending email', { cause: error })
        }
      }
    })
  ]
})

export const getSession = async () =>
  auth.api.getSession({
    headers: await headers()
  })
