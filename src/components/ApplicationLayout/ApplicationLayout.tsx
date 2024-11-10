'use client'

import { useState, ReactNode } from 'react'
import { LuX as XIcon, LuMenu as MenuIcon } from 'react-icons/lu'

import { TooltipGroup, TooltipProvider } from '@/components/ui/tooltip'
import { useChangeLocale, useCurrentLocale, useIsRtl } from '@/locales/client'

import AppNav from './components/AppNav'
import AppControlButton from './components/AppControlButton'
import AppControlSelect from './components/AppControlSelect'
import UserButton from './components/UserButton'
import ThemeSwitcher from './components/ThemeSwitcher'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'ua', label: 'Українська' },
  { code: 'jp', label: '日本語' },
  { code: 'he', label: 'עברית' }
]

const iconSharedClassName = 'h-4 w-4' as const

type Props = {
  children: ReactNode
}

export default function ApplicationLayout({ children }: Props) {
  const isRtl = useIsRtl()

  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  return (
    <TooltipProvider>
      <div className="relative overflow-hidden">
        {/* Top controls */}
        <div className={`fixed top-4 ${isRtl ? 'right-4' : 'left-4'} z-20 flex gap-1`}>
          <TooltipGroup tooltipContent={<p>Toggle sidebar</p>}>
            <AppControlButton onClick={() => setIsDrawerOpen((prev) => !prev)}>
              {isDrawerOpen ? <XIcon className={iconSharedClassName} /> : <MenuIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup>

          <ThemeSwitcher />

          <AppControlSelect
            value={currentLocale}
            onValueChange={changeLocale}
            trigger={
              <TooltipGroup tooltipContent={<p>Change language</p>}>
                <AppControlSelect.Trigger>{currentLocale.toUpperCase()}</AppControlSelect.Trigger>
              </TooltipGroup>
            }
            options={languages.map((lang) => ({ value: lang.code, label: lang.label }))}
          />

          <UserButton />
        </div>

        <div className="flex h-full">
          {/* Drawer */}
          <div
            className={`${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 ${
              isRtl ? 'right-0' : 'left-0'
            } h-full w-[270px] bg-secondary p-4 pt-18 transition-transform duration-300 ease-in-out`}
          >
            <AppNav />
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow overflow-y-auto transition-[margin] duration-300 ease-in-out ${isDrawerOpen ? (isRtl ? 'mr-[270px]' : 'ml-[270px]') : 'ml-0'} `}
          >
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
