import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { type VariantProps } from 'native-variants'
import { type ComponentProps } from 'react'
import { View } from 'react-native'

const separatorVariants = styled((ctx, t) =>
  ctx({
    slots: ['root'],
    base: {
      root: {
        backgroundColor: t.colors.border,
      },
    },
    variants: {
      orientation: {
        vertical: {
          root: {
            height: '100%',
            width: 0.5,
          },
        },
        horizontal: {
          root: {
            width: '100%',
            height: 0.5,
          },
        },
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  })
)

function Separator({
  style,
  orientation,
  ...props
}: ComponentProps<typeof View> & VariantProps<typeof separatorVariants>) {
  const styles = separatorVariants({ orientation })

  return <View style={cn(styles.root, style)} {...props} />
}

export { Separator }
