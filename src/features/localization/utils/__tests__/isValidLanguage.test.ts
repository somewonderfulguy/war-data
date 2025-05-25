import { isValidLanguage } from '../isValidLanguage'
import { LANGUAGES } from '../../constants/localizationConstants'

describe('isValidLanguage', () => {
  it('should return true for supported languages', () => {
    LANGUAGES.forEach((lang) => {
      expect(isValidLanguage(lang)).toBe(true)
    })
  })

  it('should return false for unsupported languages', () => {
    const unsupportedLanguages = ['de', 'fr', 'es', 'it', 'invalid']

    unsupportedLanguages.forEach((lang) => {
      expect(isValidLanguage(lang)).toBe(false)
    })
  })

  it('should handle case sensitivity correctly', () => {
    // Should be case sensitive - uppercase versions should not match
    expect(isValidLanguage('EN')).toBe(false)
    expect(isValidLanguage('Jp')).toBe(false)
  })

  it('should handle empty strings', () => {
    expect(isValidLanguage('')).toBe(false)
  })

  it('should handle non-string inputs gracefully', () => {
    // @ts-expect-error Testing invalid input type
    expect(isValidLanguage(123)).toBe(false)
    // @ts-expect-error Testing invalid input type
    expect(isValidLanguage(null)).toBe(false)
    // @ts-expect-error Testing invalid input type
    expect(isValidLanguage(undefined)).toBe(false)
  })
})
