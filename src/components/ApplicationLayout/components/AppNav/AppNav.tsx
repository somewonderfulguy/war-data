'use client'

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  PresentationChartBarIcon,
  HomeIcon,
  WindowIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { BiFootball } from 'react-icons/bi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useCurrentLocale, useIsRtl, useScopedI18n } from '@/locales/client'
import { isDevelopment } from '@/constants/common'

const useLinks = () => {
  const t = useScopedI18n('nav')

  return [
    ...(isDevelopment
      ? [
          {
            name: t('home'),
            href: '/',
            icon: HomeIcon
          }
        ]
      : []),
    ...(isDevelopment
      ? [
          {
            name: t('dashboard'),
            icon: PresentationChartBarIcon,
            children: [
              {
                name: t('dashboard.main'),
                href: '/dashboard',
                icon: ChartBarSquareIcon
              },
              {
                name: t('dashboard.invoices'),
                href: '/dashboard/invoices',
                icon: DocumentDuplicateIcon
              },
              { name: t('dashboard.customers'), href: '/dashboard/customers', icon: UserGroupIcon }
            ]
          }
        ]
      : []),
    ...(isDevelopment ? [{ name: t('chatGPT'), href: '/chat-gpt', icon: ChatBubbleLeftRightIcon }] : []),
    { name: t('fcClubs'), href: '/fc-clubs', icon: BiFootball },
    { name: t('about'), href: '/about', icon: WindowIcon },
    ...(isDevelopment
      ? [
          {
            name: 'Development pages',
            icon: QuestionMarkCircleIcon,
            children: [
              { name: 'Error example', href: '/error-example', icon: ExclamationCircleIcon },
              { name: 'Not found example', href: '/path-that-does-not-exist', icon: QuestionMarkCircleIcon }
            ]
          }
        ]
      : [])
  ]
}

export default function AppNav() {
  const pathname = usePathname()
  const currentLocale = useCurrentLocale()

  const isRtl = useIsRtl()

  const links = useLinks()

  const [openItems, setOpenItems] = useState(() =>
    links.reduce<Record<string, boolean>>((acc, link) => {
      acc[link.name] = true
      return acc
    }, {})
  )

  return (
    <nav>
      <ul>
        {links.map((link, idx) => {
          const LinkIcon = link.icon
          const item = (
            <>
              <LinkIcon className="w-6" size="1.8em" />
              <p>{link.name}</p>
            </>
          )
          const withLocale = (href: string) => `/${currentLocale}${href}`
          const childrenHrefs = link.children?.map((child) => withLocale(child.href)) || []

          return (
            <li key={idx}>
              {link.href ? (
                <Link
                  href={link.href}
                  className={`${
                    pathname === withLocale(link.href) && 'bg-primary/[0.05]'
                  } flex items-center gap-2 rounded-lg p-2 text-sm text-primary hover:bg-primary/[0.05]`}
                >
                  {item}
                </Link>
              ) : (
                <button
                  className={`flex w-full items-center justify-start gap-2 rounded-lg p-2 text-sm text-primary ${childrenHrefs.includes(pathname) ? 'font-semibold' : 'font-medium'} hover:bg-primary/[0.05]`}
                  onClick={() => setOpenItems((prev) => ({ ...prev, [link.name]: !prev[link.name] }))}
                >
                  {item}
                </button>
              )}
              {openItems[link.name] &&
                link.children?.map((child) => {
                  const ChildIcon = child.icon
                  const isActive = pathname === withLocale(child.href)
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex h-[36px] items-center gap-2 rounded-md text-primary ${isActive && 'bg-primary/[0.05]'} px-1 py-[6px] ${isRtl ? 'pr-[1.2rem]' : 'pl-[1.2rem]'} text-sm font-medium hover:bg-primary/[0.05]`}
                    >
                      <ChildIcon className="w-6" />
                      <p className="hidden md:block">{child.name}</p>
                    </Link>
                  )
                })}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
