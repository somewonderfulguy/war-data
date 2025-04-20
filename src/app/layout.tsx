import '~/styles/globals.css'

import { type Metadata } from 'next'
import { Geist } from 'next/font/google'

import { ApplicationLayout } from '~/components/ApplicationLayout'

export const metadata: Metadata = {
  title: 'War Data',
  description: 'Application to visualize stats and data of the war in Ukraine',
  authors: [{ name: 'Dmitriy Yastrebov' }],
  icons: [{ rel: 'icon', url: '/favicon.svg' }]
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
})

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={`${geist.variable} h-full`}>
    <body className="h-full">
      <ApplicationLayout>{children}</ApplicationLayout>
    </body>
  </html>
)

export default RootLayout
