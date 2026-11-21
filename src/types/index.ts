export interface StackItem {
  id: string
  name: string
  category: 'core' | 'styling' | 'animation' | 'icons'
  version: string
  status: 'configured' | 'pending' | 'ready'
  description: string
}

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}
