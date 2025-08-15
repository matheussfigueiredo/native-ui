import { StyleProp } from 'react-native'

function flattenStyle<T>(style: StyleProp<T>): T[] {
  if (!style) return []
  if (Array.isArray(style)) {
    return style.flat
      ? (style.flat().filter(Boolean) as T[])
      : (style.filter(Boolean) as T[])
  }
  // @ts-ignore
  return [style]
}

export function cn<T extends object>(...styles: StyleProp<T>[]): T {
  return styles
    .flatMap(flattenStyle)
    .filter((s): s is T => !!s)
    .reduce<T>((acc, style) => ({ ...acc, ...style }), {} as T)
}
