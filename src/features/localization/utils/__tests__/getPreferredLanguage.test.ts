import { getPreferredLanguage } from '../getPreferredLanguage'
import { DEFAULT_LANGUAGE } from '../../constants/localizationConstants'

describe('getPreferredLanguage', () => {
  // Store the original navigator to restore after tests
  const originalNavigator = global.navigator

  // Clean up mocks after each test
  afterEach(() => {
    vi.restoreAllMocks()
    // Restore the original navigator
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    })
  })

  it('should return default language when navigator is undefined', () => {
    // Temporarily set navigator to undefined
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
    })

    expect(getPreferredLanguage()).toBe(DEFAULT_LANGUAGE)
  })

  it('should return matched language from navigator.languages', () => {
    // Mock navigator with supported language in the languages array
    Object.defineProperty(global, 'navigator', {
      value: {
        languages: ['jp', 'en-US', 'fr'],
        language: 'en-US',
      },
      writable: true,
    })

    expect(getPreferredLanguage()).toBe('jp')
  })

  it('should return matched language from navigator.language when languages is not available', () => {
    // Mock navigator with supported language in language property but no languages array
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'pl-PL',
      },
      writable: true,
    })

    expect(getPreferredLanguage()).toBe('pl')
  })

  it('should extract language code from language tags with regions', () => {
    // Mock navigator with language tags that include region codes
    Object.defineProperty(global, 'navigator', {
      value: {
        languages: ['ua-UA', 'en-US', 'fr-FR'], // Put ua-UA first so it's checked first
        language: 'en-US',
      },
      writable: true,
    })

    expect(getPreferredLanguage()).toBe('ua')
  })

  it('should return default language when no supported languages are found', () => {
    // Mock navigator with only unsupported languages
    Object.defineProperty(global, 'navigator', {
      value: {
        languages: ['de-DE', 'fr-FR', 'es-ES'],
        language: 'de-DE',
      },
      writable: true,
    })

    expect(getPreferredLanguage()).toBe(DEFAULT_LANGUAGE)
  })
})
