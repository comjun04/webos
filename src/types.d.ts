export type WindowState = 'normal' | 'maximized' | 'minimized'

export interface OpenedWindow {
  id: string
  title: string
  icon?: string
  state: WindowState
}
