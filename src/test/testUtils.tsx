import { render as renderRtl, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'

const render = (
  ui: ReactNode,
  { wrapper: Wrapper, ...options }: RenderOptions = {},
) =>
  renderRtl(ui, {
    wrapper: ({ children }) =>
      Wrapper ? <Wrapper>{children}</Wrapper> : <>{children}</>,
    ...options,
  })

export * from '@testing-library/react'
export { render, userEvent }
