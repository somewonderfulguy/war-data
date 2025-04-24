import type { themes } from '../constants/themes'

export type Theme = (typeof themes)[number]
export type ResolvedTheme = Exclude<Theme, 'system'>
