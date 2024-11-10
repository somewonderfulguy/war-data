import { Themes } from '../constants/themes'

export type Theme = (typeof Themes)[number]
export type ResolvedTheme = Exclude<Theme, 'system'>
