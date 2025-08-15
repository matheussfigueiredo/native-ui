import { cn } from '@/lib/cn'
import glyphmaps_icon from '@/lib/icons.json'
import { styled, theme } from '@/lib/nva'
import { type ComponentProps, memo } from 'react'
import { type ColorValue, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useTypography } from './typography'

const iconVariants = styled((ctx, t) =>
  ctx({
    slots: ['root'],
    base: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  })
)

function getIconColor(
  color: string | ColorValue | undefined,
  ctxStyles: any
): ColorValue {
  return color ?? ctxStyles?.color ?? theme.colors.primary
}

type IconGlyphmap = keyof typeof glyphmaps_icon

function IconComponent({
  name,
  size = 20,
  color,
  style,
  ...props
}: ComponentProps<typeof View> & {
  size?: number
  name: IconGlyphmap
  color?: string | ColorValue
}) {
  const styles = iconVariants()
  const ctxStyles = useTypography()
  const xml = glyphmaps_icon[name!]

  if (!xml) {
    return null
  }

  return (
    <View style={cn(styles.root, style)} {...props}>
      <SvgXml
        xml={xml}
        width={size}
        height={size}
        color={getIconColor(color, ctxStyles)}
      />
    </View>
  )
}

const Icon = memo(IconComponent)

export { Icon }
