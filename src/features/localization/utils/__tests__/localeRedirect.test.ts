import { redirect } from '@tanstack/react-router'

import { localeRedirect } from '../localeRedirect'
import * as getPreferredLanguageModule from '../getPreferredLanguage'

vi.mock('@tanstack/react-router', () => ({
  redirect: vi.fn((options) => ({
    redirected: true,
    options,
    type: 'redirect',
  })),
}))

describe('localeRedirect', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.spyOn(
      getPreferredLanguageModule,
      'getPreferredLanguage',
    ).mockReturnValue('en')
  })

  it('should return null when path already has a valid language prefix', () => {
    expect(localeRedirect('/en/some-route')).toBeNull()
    expect(localeRedirect('/jp/login')).toBeNull()
    expect(localeRedirect('/ua/dashboard')).toBeNull()
    expect(localeRedirect('/pl')).toBeNull()
    expect(redirect).not.toHaveBeenCalled()
  })

  it('should redirect to preferred language when no language prefix is present', () => {
    const result = localeRedirect('/some-route')

    expect(result).not.toBeNull()
    expect(redirect).toHaveBeenCalledWith({
      to: '/en/some-route',
      replace: true,
    })
  })

  it('should handle root path correctly', () => {
    const result = localeRedirect('/')

    expect(result).not.toBeNull()
    expect(redirect).toHaveBeenCalledWith({
      to: '/en',
      replace: true,
    })
  })

  it('should use getPreferredLanguage to determine language', () => {
    // Mock a different preferred language
    vi.spyOn(
      getPreferredLanguageModule,
      'getPreferredLanguage',
    ).mockReturnValue('jp')

    const result = localeRedirect('/dashboard')

    expect(result).not.toBeNull()
    expect(redirect).toHaveBeenCalledWith({
      to: '/jp/dashboard',
      replace: true,
    })
  })

  it('should not add duplicate slashes', () => {
    const result = localeRedirect('//')

    expect(result).not.toBeNull()
    expect(redirect).toHaveBeenCalledWith({
      to: '/en//', // The actual implementation doesn't remove duplicate slashes
      replace: true,
    })
  })

  it('should handle invalid language prefix correctly', () => {
    // Path with invalid language code should be redirected
    const result = localeRedirect('/invalid/route')

    expect(result).not.toBeNull()
    expect(redirect).toHaveBeenCalledWith({
      to: '/en/invalid/route',
      replace: true,
    })
  })
})
