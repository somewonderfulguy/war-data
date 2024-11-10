import type { Decorator } from '@storybook/react'
import { useEffect } from 'react'

const ThemeDecorator: Decorator = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme

  useEffect(() => {
    const body = document.querySelector('body')
    if (!body) return console.error('body element not found')

    theme === 'dark' ? body.classList.add('dark') : body.classList.remove('dark')
  }, [theme])

  return <Story />
}

export default ThemeDecorator
